import React from "react";

export default function ButtonUI({
 children,
 className = "",
 ...props
}: { children: React.ReactNode; [key: string]: any }) {
  return (
    <button
      className={`bg-primary-400  py-2 px-4 rounded-xl transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}