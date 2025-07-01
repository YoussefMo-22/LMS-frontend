// import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonUI from "../../../shared/components/UI/Button";

const AddEditCourseModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOpen = searchParams.get("modal") === "add" || searchParams.get("modal") === "edit";

  const handleClose = () => navigate("/dashboard/courses", { replace: true });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4">
          {searchParams.get("modal") === "edit" ? "Edit Course" : "Add New Course"}
        </h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Number of Enrolled Students"
            className="w-full border p-2 rounded"
          />
          <select className="w-full border p-2 rounded">
            <option value="published">Published</option>
            <option value="in-progress">In Progress</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="flex justify-end gap-2">
            <ButtonUI type="button" className="bg-gray-300" onClick={handleClose}>Cancel</ButtonUI>
            <ButtonUI type="submit" className="bg-primary-500 text-white">Save</ButtonUI>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditCourseModal;