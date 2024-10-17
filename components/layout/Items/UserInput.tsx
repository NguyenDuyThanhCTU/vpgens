import React from "react";

interface UserInputProps {
  label: string;
  value: any;
  field: string;
  setValue: (value: any) => void;
  required?: boolean;
}

const UserInput = ({
  label,
  value,
  setValue,
  field,
  required,
}: UserInputProps) => {
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
        className="border rounded-md outline-none px-4 py-1 mt-1 border-slate-300 focus:border-blue-500 focus:border-2"
      />
    </div>
  );
};

export default UserInput;
