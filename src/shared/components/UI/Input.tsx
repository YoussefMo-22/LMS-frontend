import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 icon?: React.ReactNode;
}

export default function InputUI({ icon, ...props }: InputProps) {
  return (
    <div className="relative">
      {typeof icon === 'string'
        ? <img className="absolute left-3 top-2" src={icon} alt="Input icon" />
        : icon && <span className="absolute left-3 top-2">{icon}</span>
      }
      <input
        className={`w-full border rounded-xl py-2 pl-10 pr-4 border-primary-700 text-primary-700 outline-none placeholder:text-primary-500 focus:border-blue-800 focus:ring-1 focus:ring-blue-800 transition ${props.className || ''}`}
        {...props}
      />
    </div>
  );
}