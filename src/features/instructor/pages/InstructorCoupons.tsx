import React, { useState, useMemo } from "react";
import { useAllCoupons, useCreateCoupon, useUpdateCoupon, useDeleteCoupon } from '../../courses/hooks/useCoupon';
import type { Coupon } from '../../courses/types/coupon';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const emptyCoupon: Partial<Coupon> = {
  code: '',
  discount: 0,
  expireDate: '',
  maxUses: 1,
  courseId: '',
};

const InstructorCoupons = () => {
  const { data, isLoading, error } = useAllCoupons();
  const createCoupon = useCreateCoupon();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<Coupon>>(emptyCoupon);
  const [editId, setEditId] = useState<string | null>(null);
  const updateCoupon = useUpdateCoupon(editId || '');
  const deleteCoupon = useDeleteCoupon(editId || '');
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const user = useSelector((state: any) => state.auth.user);

  // Only show coupons for instructor's courses (or all if admin)
  const coupons = useMemo(() => {
    let list = data?.data?.coupons || [];
    if (user?.role === 'instructor') {
      // Optionally, filter by instructor's courses (if you have a list of their courseIds)
      // For now, show all
    }
    if (search) {
      list = list.filter(c => c.code.toLowerCase().includes(search.toLowerCase()));
    }
    if (filterCourse) {
      list = list.filter(c => c.courseId === filterCourse);
    }
    return list;
  }, [data, user, search, filterCourse]);

  const openCreate = () => {
    setForm(emptyCoupon);
    setEditId(null);
    setModalOpen(true);
  };
  const openEdit = (coupon: Coupon) => {
    setForm(coupon);
    setEditId(coupon._id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setForm(emptyCoupon);
    setEditId(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateCoupon.mutateAsync(form);
    } else {
      await createCoupon.mutateAsync(form);
    }
    closeModal();
  };
  const handleDelete = async (id: string) => {
    setEditId(id);
    await deleteCoupon.mutateAsync();
    setEditId(null);
  };

  // Advanced: get unique courseIds for filter dropdown
  const courseIds = useMemo(() => {
    const set = new Set<string>();
    (data?.data?.coupons || []).forEach(c => set.add(c.courseId));
    return Array.from(set);
  }, [data]);

  // Advanced: check expiration/usage
  const isExpired = (coupon: Coupon) => new Date(coupon.expireDate) < new Date();
  // Usage count would require backend support; here we just show maxUses

  return (
    <>
      <Helmet>
        <title>Coupons | Instructor | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">My Coupons</h1>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search by code"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border p-2 rounded"
            />
            <select
              value={filterCourse}
              onChange={e => setFilterCourse(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Courses</option>
              {courseIds.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
            <button className="bg-primary-500 text-white px-4 py-2 rounded" onClick={openCreate}>Create Coupon</button>
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading coupons: {error.message}</div>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Code</th>
                <th className="p-2 text-left">Discount</th>
                <th className="p-2 text-left">Expire Date</th>
                <th className="p-2 text-left">Max Uses</th>
                <th className="p-2 text-left">Course ID</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className={`border-b ${isExpired(coupon) ? 'bg-red-50' : ''}`}>
                  <td className="p-2 font-mono">{coupon.code}</td>
                  <td className="p-2">{coupon.discount}%</td>
                  <td className="p-2">{coupon.expireDate?.slice(0, 10)}</td>
                  <td className="p-2">{coupon.maxUses}</td>
                  <td className="p-2">{coupon.courseId}</td>
                  <td className="p-2">
                    {isExpired(coupon) ? <span className="text-red-500 font-semibold">Expired</span> : <span className="text-green-600">Active</span>}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button className="text-blue-500" onClick={() => openEdit(coupon)}>Edit</button>
                    <button className="text-red-500" onClick={() => handleDelete(coupon._id)}>Delete</button>
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
              <h2 className="text-xl font-bold mb-2">{editId ? 'Edit Coupon' : 'Create Coupon'}</h2>
              <input name="code" value={form.code || ''} onChange={handleChange} placeholder="Code" className="w-full border p-2 rounded" required />
              <input name="discount" type="number" value={form.discount || ''} onChange={handleChange} placeholder="Discount (%)" className="w-full border p-2 rounded" required />
              <input name="expireDate" type="date" value={form.expireDate ? form.expireDate.slice(0, 10) : ''} onChange={handleChange} placeholder="Expire Date" className="w-full border p-2 rounded" required />
              <input name="maxUses" type="number" value={form.maxUses || ''} onChange={handleChange} placeholder="Max Uses" className="w-full border p-2 rounded" required />
              <input name="courseId" value={form.courseId || ''} onChange={handleChange} placeholder="Course ID" className="w-full border p-2 rounded" required />
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

export default InstructorCoupons; 