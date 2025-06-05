import React from "react";

export default function Button({
 children,
 className = "",
 ...props
}: { children: React.ReactNode; [key: string]: any }) {
  return (
    <button
      className={`bg-primary-400 text-white py-2 px-4 rounded-xl hover:bg-primary-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}