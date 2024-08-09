import React, { useState, useRef, useEffect, forwardRef } from "react";

export const TextInput = forwardRef(
  ({ value, onChange, placeholder, className }, ref) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`flex-grow rounded-md border border-gray-300 bg-zinc-50 px-3 py-2 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 ${className}`}
      ref={ref}
    />
  ),
);

export const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const isDisabled = options.every((option) => !option.value);

  const handleOptionClick = (optionValue) => {
    if (isDisabled) return;
    if (multiple) {
      // for multiple selection, toggle the option's selected state.
      const newValue = Array.isArray(value) ? value : [];
      const updatedValue = newValue.includes(optionValue)
        ? newValue.filter((v) => v !== optionValue)
        : [...newValue, optionValue];
      onChange(updatedValue);
    } else {
      // for single selection, update the value and close the dropdown.
      onChange(optionValue);
      setIsOpen(false);
      buttonRef.current.focus();
    }
  };

  // manage keyboard navigation for the main button
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    } else if (event.key === "ArrowDown" && isOpen) {
      event.preventDefault();
      const firstOption = dropdownRef.current.querySelector('[role="option"]');
      if (firstOption) firstOption.focus();
    }
  };

  // manage keyboard navigation within dropdown options
  const handleOptionKeyDown = (event, optionValue) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionClick(optionValue);
    } else if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current.focus();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const options = Array.from(
        dropdownRef.current.querySelectorAll('[role="option"]'),
      );
      const currentIndex = options.indexOf(event.target);
      const nextIndex =
        // use modulo `%` operators to cycle through the list when going past the ends
        event.key === "ArrowDown"
          ? (currentIndex + 1) % options.length
          : (currentIndex - 1 + options.length) % options.length;
      options[nextIndex].focus();
    }
  };

  // set up listener to handle closing via outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      // if the dropdown is active and a click happens outside of it, close the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDisplayValue = () => {
    if (isDisabled) return "Choice";
    if (multiple) {
      // show comma-separated list of options if multi-select
      return Array.isArray(value) && value.length > 0
        ? value.map((v) => options.find((o) => o.value === v)?.label).join(", ")
        : placeholder || "Select choices";
    } else {
      return (
        // show the selected option if single-select
        options.find((o) => o.value === value)?.label ||
        placeholder ||
        "Select a choice"
      );
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={isDisabled}
        className={`form-select w-auto min-w-[100px] cursor-pointer rounded-md border border-gray-300 bg-zinc-50 py-2 pl-4 pr-8 text-left focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 ${
          isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }`}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
      >
        {getDisplayValue()}
      </button>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-10 mt-1 w-full min-w-[100px] rounded-md border border-gray-300 bg-zinc-50 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
          tabIndex={-1}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={
                multiple ? value.includes(option.value) : value === option.value
              }
              tabIndex={0}
              className={`cursor-pointer px-4 py-2 hover:opacity-50 ${
                (
                  multiple
                    ? value.includes(option.value)
                    : value === option.value
                )
                  ? "bg-gray-200 dark:bg-zinc-600"
                  : ""
              }`}
              onClick={() => handleOptionClick(option.value)}
              onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
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
