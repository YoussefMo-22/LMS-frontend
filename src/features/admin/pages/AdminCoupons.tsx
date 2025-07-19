import React, { useState } from "react";
import { useAllCoupons, useCreateCoupon, useUpdateCoupon, useDeleteCoupon } from '../../courses/hooks/useCoupon';
import type { Coupon } from '../../courses/types/coupon';
import { Helmet } from 'react-helmet-async';

const emptyCoupon: Partial<Coupon> = {
  code: '',
  discount: 0,
  expireDate: '',
  maxUses: 1,
  courseId: '',
};

const AdminCoupons = () => {
  const { data, isLoading, error } = useAllCoupons();
  const createCoupon = useCreateCoupon();
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<Coupon>>(emptyCoupon);
  const [editId, setEditId] = useState<string | null>(null);
  const updateCoupon = useUpdateCoupon(editId || '');
  const deleteCoupon = useDeleteCoupon(editId || '');

  const coupons = data?.data?.coupons || [];

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

  return (
    <>
      <Helmet>
        <title>Coupons | Admin | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Coupons</h1>
          <button className="bg-primary-500 text-white px-4 py-2 rounded" onClick={openCreate}>Create Coupon</button>
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
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id} className="border-b">
                  <td className="p-2">{coupon.code}</td>
                  <td className="p-2">{coupon.discount}%</td>
                  <td className="p-2">{coupon.expireDate?.slice(0, 10)}</td>
                  <td className="p-2">{coupon.maxUses}</td>
                  <td className="p-2">{coupon.courseId}</td>
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

export default AdminCoupons; 