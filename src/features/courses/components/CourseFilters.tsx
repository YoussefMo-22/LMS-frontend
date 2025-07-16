import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import Input from '../../../shared/components/UI/Input';

interface CourseFiltersProps {
  onSearch: (query: string) => void;
  onLanguageFilter: (language: string) => void;
  onPriceFilter: (minPrice: number, maxPrice: number) => void;
  languages: string[];
}

export default function CourseFilters({
  onSearch,
  onLanguageFilter,
  onPriceFilter,
  languages,
}: CourseFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    onLanguageFilter(language);
  };

  const handlePriceFilter = () => {
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    onPriceFilter(min, max);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('');
    setMinPrice('');
    setMaxPrice('');
    onSearch('');
    onLanguageFilter('');
    onPriceFilter(0, Infinity);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FontAwesomeIcon icon={faFilter} className="text-primary-400" />
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Courses
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by title, instructor, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Language Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"
            >
              <option value="">All Languages</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Price
            </label>
            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Price
            </label>
            <Input
              type="number"
              placeholder="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePriceFilter}
            className="px-4 py-2 bg-primary-400 text-white rounded-md hover:bg-primary-500 transition-colors"
          >
            Apply Price Filter
          </button>
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
} 