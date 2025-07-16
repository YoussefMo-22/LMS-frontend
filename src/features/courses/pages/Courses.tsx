import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import CourseCard from '../../../shared/components/CourseCard';
import CourseFilters from '../components/CourseFilters';
import PageSizeSelector from '../components/PageSizeSelector';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';
import Pagination from '../../../shared/components/UI/Pagination';
import type { Course } from '../types';
import { FixedSizeGrid as Grid } from 'react-window';
import type { GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Helmet } from 'react-helmet-async';

function Courses() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Initialize state from URL params
    const [currentPage, setCurrentPage] = useState(() => {
        const page = searchParams.get('page');
        return page ? parseInt(page, 10) : 1;
    });
    
    const [pageSize, setPageSize] = useState(() => {
        const size = searchParams.get('size');
        return size ? parseInt(size, 10) : 12;
    });
    
    const [searchQuery, setSearchQuery] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
    
    const { courses, loading, error, pagination } = useCourses(currentPage, pageSize);

    // Get unique languages from courses
    const languages = useMemo(() => {
        const uniqueLanguages = new Set<string>();
        courses.forEach(course => {
            const language = course.language || course.Language;
            if (language) {
                uniqueLanguages.add(language);
            }
        });
        return Array.from(uniqueLanguages);
    }, [courses]);

    // Update URL when pagination changes
    useEffect(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', currentPage.toString());
        newSearchParams.set('size', pageSize.toString());
        setSearchParams(newSearchParams);
    }, [currentPage, pageSize, searchParams, setSearchParams]);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Reset filters when changing pages for server-side filtering
        setSearchQuery('');
        setLanguageFilter('');
        setPriceRange({ min: 0, max: Infinity });
    };

    // Handle page size change
    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to first page when changing page size
        setSearchQuery('');
        setLanguageFilter('');
        setPriceRange({ min: 0, max: Infinity });
    };

    // Filter courses based on search and filters (client-side filtering)
    const filteredCourses = useMemo(() => {
        return courses.filter((course: Course) => {
            const matchesSearch = searchQuery === '' || 
                course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (course.category && course.category.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesLanguage = languageFilter === '' || 
                (course.language || course.Language) === languageFilter;

            const coursePrice = course.priceAfterDiscount || course.price;
            const matchesPrice = coursePrice >= priceRange.min && coursePrice <= priceRange.max;

            return matchesSearch && matchesLanguage && matchesPrice;
        });
    }, [courses, searchQuery, languageFilter, priceRange]);

    const columnCount = 3;
    const rowCount = Math.ceil(courses.length / columnCount);
    const cardHeight = 350;
    const cardWidth = 340;

    if (loading) {
        return (
            <div className="container mx-auto py-8">
                <LoadingSpinner 
                    size="lg" 
                    text="Loading courses..." 
                    className="min-h-[400px]" 
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Courses</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>All Courses | LevelUp LMS</title>
                <meta name="description" content="Browse all available courses on LevelUp LMS. Filter by language, price, and more. Find your next learning opportunity!" />
            </Helmet>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary-400 mb-2">All Courses</h1>
                    <p className="text-gray-600">Discover amazing courses from top instructors</p>
                </div>

                {/* Filters */}
                <CourseFilters
                    onSearch={setSearchQuery}
                    onLanguageFilter={setLanguageFilter}
                    onPriceFilter={(min, max) => setPriceRange({ min, max })}
                    languages={languages}
                />
                
                {/* Results count and page size selector */}
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <p className="text-gray-600">
                            Showing {filteredCourses.length} of {pagination.totalItems} courses
                        </p>
                        <PageSizeSelector
                            currentPageSize={pageSize}
                            onPageSizeChange={handlePageSizeChange}
                        />
                    </div>
                    <p className="text-gray-600">
                        Page {pagination.currentPage} of {pagination.totalPages}
                    </p>
                </div>
                
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-bold text-gray-600 mb-4">
                            {courses.length === 0 ? 'No Courses Available' : 'No Courses Match Your Filters'}
                        </h2>
                        <p className="text-gray-500">
                            {courses.length === 0 
                                ? 'Check back later for new courses!' 
                                : 'Try adjusting your search criteria or filters.'
                            }
                        </p>
                    </div>
                ) : (
                    <>
                        {courses.length > 20 ? (
                            <div style={{ width: '100%', height: rowCount * cardHeight }}>
                                <AutoSizer>
                                    {({ height, width }: { height: number; width: number }) => (
                                        <Grid
                                            columnCount={columnCount}
                                            columnWidth={cardWidth}
                                            height={height}
                                            rowCount={rowCount}
                                            rowHeight={cardHeight}
                                            width={width}
                                        >
                                            {({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
                                                const idx = rowIndex * columnCount + columnIndex;
                                                if (idx >= courses.length) return null;
                                                const course = courses[idx];
                                                // Use _id for CourseCard, fallback to idx for key
                                                const cardProps = {
                                                    ...course,
                                                    id: typeof course._id === 'string' ? course._id : String(idx),
                                                };
                                                return (
                                                    <div style={style} key={cardProps.id}>
                                                        <CourseCard {...cardProps} />
                                                    </div>
                                                );
                                            }}
                                        </Grid>
                                    )}
                                </AutoSizer>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <CourseCard
                                        key={course._id}
                                        id={course._id}
                                        title={course.title}
                                        instructor={course.instructor}
                                        price={course.priceAfterDiscount || course.price}
                                        originalPrice={course.priceAfterDiscount ? course.price : undefined}
                                        language={course.language || course.Language}
                                        category={course.category}
                                    />
                                ))}
                            </div>
                        )}
                        
                        {/* Pagination */}
                        <div className="mt-8">
                            <Pagination
                                currentPage={pagination.currentPage}
                                totalPages={pagination.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Courses;