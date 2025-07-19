import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ButtonUI from "../../../shared/components/UI/Button";
import { useUpdateAdminCourse, useAdminCourse } from '../../courses/hooks/useCourseFlow';
import type { UpdateCourseData } from '../../courses/types';

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'published', label: 'Published' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'archived', label: 'Archived' },
];

const AdminAddEditCourseModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get("modal") === "edit";
  const courseId = searchParams.get("id");
  const updateCourse = useUpdateAdminCourse(courseId!);
  const { data: courseData } = useAdminCourse(courseId!);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateCourseData>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      duration: "",
      category: "",
      status: 'draft',
    },
  });

  useEffect(() => {
    if (isOpen && courseData?.data) {
      const course = courseData.data;
      reset({
        title: course.title,
        description: course.description,
        price: course.price,
        duration: course.duration,
        category: course.category,
        status: course.status,
      });
    }
  }, [isOpen, courseData, reset]);

  const handleClose = () => navigate("/admin/courses", { replace: true });

  const onSubmit = async (data: UpdateCourseData) => {
    try {
      if (isOpen && courseId) {
        await updateCourse.mutateAsync(data);
      }
      handleClose();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">Edit Course (Admin)</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              placeholder="Course Title"
              className="w-full border p-2 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Course Description"
              className="w-full border p-2 rounded h-24 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
              type="number"
              placeholder="Price"
              className="w-full border p-2 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("duration", { required: "Duration is required" })}
              type="text"
              placeholder="Duration (e.g., 10 hours)"
              className="w-full border p-2 rounded"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
            )}
          </div>
          <div>
            <input
              {...register("category", { required: "Category is required" })}
              type="text"
              placeholder="Category (e.g., Web Development)"
              className="w-full border p-2 rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>
          <div>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full border p-2 rounded"
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <ButtonUI
              type="button"
              className="bg-gray-300"
              onClick={handleClose}
              disabled={updateCourse.isPending}
            >
              Cancel
            </ButtonUI>
            <ButtonUI
              type="submit"
              className="bg-primary-500 text-white"
              disabled={updateCourse.isPending}
            >
              {updateCourse.isPending ? "Saving..." : "Save"}
            </ButtonUI>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddEditCourseModal; 