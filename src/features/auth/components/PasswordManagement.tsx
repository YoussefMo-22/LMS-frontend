import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePassword, useGenerate2FA } from '../hooks/useAuth';
import type { UpdatePasswordRequest } from '../types/auth';

interface PasswordManagementProps {
  onSuccess?: () => void;
}

interface UpdatePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordManagement: React.FC<PasswordManagementProps> = ({ onSuccess }) => {
  const [showTwoFASetup, setShowTwoFASetup] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');

  const updatePasswordMutation = useUpdatePassword();
  const generate2FAMutation = useGenerate2FA();

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<UpdatePasswordFormData>();
  const newPassword = watch('newPassword');

  const handleUpdatePassword = async (data: UpdatePasswordFormData) => {
    try {
      const updateData: UpdatePasswordRequest = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      };
      
      await updatePasswordMutation.mutateAsync(updateData);
      reset();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Password update error:', error);
    }
  };

  const handleGenerate2FA = async () => {
    try {
      const response = await generate2FAMutation.mutateAsync();
      setQrCode(response.qrCode);
      setShowTwoFASetup(true);
    } catch (error) {
      console.error('2FA generation error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
        <p className="text-gray-600">
          Manage your password and two-factor authentication
        </p>
      </div>

      {/* Update Password Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Password</h3>
        <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              {...register('oldPassword', { 
                required: 'Current password is required'
              })}
              placeholder="Enter your current password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register('newPassword', { 
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                }
              })}
              placeholder="Enter your new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your new password',
                validate: value => value === newPassword || 'Passwords do not match'
              })}
              placeholder="Confirm your new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={updatePasswordMutation.isPending}
            className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
        
        {!showTwoFASetup ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <button
              type="button"
              onClick={handleGenerate2FA}
              disabled={generate2FAMutation.isPending}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {generate2FAMutation.isPending ? 'Generating...' : 'Setup 2FA'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-md font-semibold text-gray-900 mb-2">Scan QR Code</h4>
              <p className="text-sm text-gray-600 mb-4">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </p>
              {qrCode && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={qrCode} 
                    alt="2FA QR Code" 
                    className="border border-gray-300 rounded-lg"
                  />
                </div>
              )}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Instructions:</strong>
                </p>
                <ol className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>1. Download an authenticator app if you don't have one</li>
                  <li>2. Open the app and scan the QR code above</li>
                  <li>3. Enter the 6-digit code from the app when logging in</li>
                </ol>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTwoFASetup(false)}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Back to Security Settings
            </button>
          </div>
        )}
      </div>

      {/* Security Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Security Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use a strong, unique password</li>
          <li>• Enable two-factor authentication for extra security</li>
          <li>• Never share your authentication codes</li>
          <li>• Keep your authenticator app secure</li>
        </ul>
      </div>
    </div>
  );
};

export default PasswordManagement; 