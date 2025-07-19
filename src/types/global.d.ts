// Global type declarations for the LMS application

// React Hook Form type extensions
declare module 'react-hook-form' {
  // Make useFieldArray more flexible
  function useFieldArray<TFieldValues extends FieldValues = FieldValues>(
    props: {
      control: UseFormReturn<TFieldValues>['control'];
      name: string;
      keyName?: string;
      shouldUnregister?: boolean;
    }
  ): {
    fields: Array<{ id: string; [key: string]: any }>;
    append: (value: any) => void;
    prepend: (value: any) => void;
    remove: (index?: number | number[]) => void;
    insert: (index: number, value: any) => void;
    swap: (from: number, to: number) => void;
    move: (from: number, to: number) => void;
    update: (index: number, value: any) => void;
    replace: (value: any[]) => void;
  };
}

// Global type declarations
declare global {
  // Add any global types here
  interface Window {
    // Global window properties if needed
  }
}

// Export to make this a module
export {}; 