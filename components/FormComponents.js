import React, { useState, useRef, useEffect } from "react";

export const TextInput = ({ value, onChange, placeholder, className }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`flex-grow rounded-md border border-gray-300 bg-zinc-50 px-3 py-2 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 ${className}`}
  />
);

export const Select = ({ value, onChange, options, children }) => (
  <select
    value={value}
    onChange={onChange}
    className="form-select min-w-7 rounded-md border border-gray-300 bg-zinc-50 py-2 pl-4 pr-8 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
  >
    {children}
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const MultiSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="form-select min-w-48 cursor-pointer rounded-md border border-gray-300 bg-zinc-50 py-2 pl-4 pr-8 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length > 0
          ? value
              .map((v) => options.find((o) => o.value === v)?.label)
              .join(", ")
          : placeholder || "Select options"}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-zinc-50 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
          {options.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                value.includes(option.value)
                  ? "bg-gray-200 dark:bg-zinc-600"
                  : ""
              }`}
              onClick={() => toggleOption(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Checkbox = ({ label, checked, onChange, disabled = false }) => (
  <label className="flex cursor-pointer items-center space-x-2">
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-5 w-5 rounded border-zinc-300 bg-zinc-100 text-accent dark:border-zinc-600 dark:bg-zinc-800"
    />
    <span>{label}</span>
  </label>
);

export const Button = ({
  onClick,
  children,
  disabled = false,
  variant = "primary",
  className,
}) => {
  const baseClasses =
    "rounded-md font-semibold transition duration-200 ease-in-out";
  const variantClasses = {
    primary: "bg-accent px-3 py-2 hover:bg-accent/50 dark:text-zinc-900",
    secondary:
      "py-2 text-zinc-500 hover:text-accent flex items-center inline-flex gap-x-1",
    delete:
      "px-3 py-2 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-600/10 dark:hover:bg-red-400/10",
  };
  const extraClasses = className;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${extraClasses} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {children}
    </button>
  );
};
