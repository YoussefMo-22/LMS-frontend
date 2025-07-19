import React, { useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { useLessonsByCourse, useCreateLesson, useUpdateLesson, useDeleteLesson } from '../../courses/hooks/useLesson';
import type { Lesson } from '../../courses/types/lesson';
import { Helmet } from 'react-helmet-async';

const emptyLesson: Partial<Lesson> = {
  title: '',
  content_type: 'video',
  lesson_order: 1,
  course_id: '',
};

const InstructorLessons = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading, error } = useLessonsByCourse(courseId!);
  const createLesson = useCreateLesson();
  const [editId, setEditId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<Lesson>>(emptyLesson);
  const [file, setFile] = useState<File | null>(null);
  const updateLesson = useUpdateLesson(editId || '', courseId!);
  const deleteLesson = useDeleteLesson(editId || '', courseId!);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lessons = data?.data || [];

  const openCreate = () => {
    setForm({ ...emptyLesson, course_id: courseId });
    setEditId(null);
    setFile(null);
    setModalOpen(true);
  };
  const openEdit = (lesson: Lesson) => {
    setForm({ ...lesson, course_id: courseId });
    setEditId(lesson._id);
    setFile(null);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setForm(emptyLesson);
    setEditId(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value as string);
    });
    if (file) formData.append('content_url', file);
    if (editId) {
      await updateLesson.mutateAsync(formData);
    } else {
      await createLesson.mutateAsync(formData);
    }
    closeModal();
  };
  const handleDelete = async (id: string) => {
    setEditId(id);
    await deleteLesson.mutateAsync();
    setEditId(null);
  };

  return (
    <>
      <Helmet>
        <title>Lessons | Instructor | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lessons</h1>
          <button className="bg-primary-500 text-white px-4 py-2 rounded" onClick={openCreate}>Create Lesson</button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading lessons: {error.message}</div>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Order</th>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Content</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson._id} className="border-b">
                  <td className="p-2">{lesson.lesson_order}</td>
                  <td className="p-2">{lesson.title}</td>
                  <td className="p-2">{lesson.content_type}</td>
                  <td className="p-2">
                    {lesson.content_type === 'video' ? (
                      <a href={lesson.content_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Video</a>
                    ) : lesson.content_type === 'pdf' ? (
                      <a href={lesson.content_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">PDF</a>
                    ) : (
                      <a href={lesson.content_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Content</a>
                    )}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button className="text-blue-500" onClick={() => openEdit(lesson)}>Edit</button>
                    <button className="text-red-500" onClick={() => handleDelete(lesson._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
              <h2 className="text-xl font-bold mb-2">{editId ? 'Edit Lesson' : 'Create Lesson'}</h2>
              <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
              <select name="content_type" value={form.content_type || 'video'} onChange={handleChange} className="w-full border p-2 rounded" required>
                <option value="video">Video</option>
                <option value="pdf">PDF</option>
                <option value="text">Text</option>
                <option value="audio">Audio</option>
                <option value="other">Other</option>
              </select>
              <input name="lesson_order" type="number" value={form.lesson_order || 1} onChange={handleChange} placeholder="Order" className="w-full border p-2 rounded" required />
              <input name="course_id" value={form.course_id || ''} onChange={handleChange} placeholder="Course ID" className="w-full border p-2 rounded" required />
              <input name="content_url" type="file" ref={fileInputRef} onChange={handleFileChange} className="w-full border p-2 rounded" accept="video/*,application/pdf,audio/*,.txt" />
              <div className="flex gap-2 justify-end">
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
                <button type="submit" className="bg-primary-500 text-white px-4 py-2 rounded">{editId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default InstructorLessons; 