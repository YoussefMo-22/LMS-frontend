import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface RoleSelectProps {
  register: UseFormRegisterReturn;
  error?: string;
  showAdmin?: boolean;
  className?: string;
}

const RoleSelect: React.FC<RoleSelectProps> = ({ 
  register, 
  error, 
  showAdmin = true,
  className = "w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Role
      </label>
      <select
        {...register}
        className={className}
      >
        <option value="student">Student</option>
        <option value="instructor">Instructor</option>
        {showAdmin && <option value="admin">Admin</option>}
      </select>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default RoleSelect;
