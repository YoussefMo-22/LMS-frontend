# Role Management in Signup Form

## Current Implementation

The signup form now includes role selection with three options:
- **Student** (value: `user`)
- **Instructor** (value: `instructor`) 
- **Admin** (value: `admin`) - *Temporary, will be removed*

## How to Remove Admin Option

To remove the admin option from the signup form, simply change the `showAdmin` prop in the `SignupForm.tsx`:

```tsx
// In src/features/auth/components/SignupForm.tsx
<RoleSelect
  register={register('role', { required: 'Please select a role' })}
  error={errors.role?.message}
  showAdmin={false} // Change this to false to hide admin option
/>
```

## Files Modified

1. **`src/features/auth/types/auth.ts`**
   - Added `role` field to `SignupRequest` interface

2. **`src/features/auth/components/SignupForm.tsx`**
   - Added role selection to the form
   - Uses `RoleSelect` component for better maintainability

3. **`src/features/auth/components/RoleSelect.tsx`**
   - Reusable component for role selection
   - Configurable to show/hide admin option

## Role Values

- `user` = Student
- `instructor` = Instructor  
- `admin` = Admin (temporary)

## API Integration

The signup request now includes the role field:

```typescript
interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'instructor' | 'admin';
}
```

## Future Considerations

1. **Role-based Routing**: Implement different dashboards based on user role
2. **Permission System**: Add role-based permissions for different features
3. **Admin Panel**: Create separate admin-only features and routes
4. **Role Validation**: Add server-side validation for role assignments 