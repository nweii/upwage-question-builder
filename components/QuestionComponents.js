export const TextInput = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="flex-grow rounded-md border border-gray-300 bg-zinc-50 px-3 py-2 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
  />
);

export const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="form-select min-w-7 rounded-md border border-gray-300 bg-zinc-50 py-2 pl-4 pr-8 focus:border-accent focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex cursor-pointer items-center space-x-2">
    <input
      type="checkbox"
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
}) => {
  const baseClasses = "rounded-md px-3 py-2 font-semibold";
  const variantClasses = {
    primary: "bg-accent hover:bg-accent/90",
    secondary: "text-zinc-500 hover:text-accent",
    delete: "hover:bg-gray-50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {children}
    </button>
  );
};
