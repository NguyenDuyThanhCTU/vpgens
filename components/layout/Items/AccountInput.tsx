import React from "react";

interface AccountInputProps {
  label: string;
  value: any;
  field: string;
  setValue: (value: any) => void;
  required?: boolean;
}

const AccountInput = ({
  label,
  value,
  setValue,
  field,
  required,
}: AccountInputProps) => {
  return (
    <div className="flex flex-col">
      <label>
        {label}
        {required && "*"}
      </label>

      <input
        type={`${
          field === "password" || field === "repassword" ? "password" : "text"
        }`}
        required={required ? true : false}
        value={value[field]}
        name={value[field]}
        onChange={(e) => setValue({ ...value, [field]: e.target.value })}
        className="border  outline-none px-4 py-2 mt-2 border-slate-300 focus:border-blue-500 focus:border-2"
      />
    </div>
  );
};

export default AccountInput;
