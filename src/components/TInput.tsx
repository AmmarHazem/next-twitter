import { FC } from "react";

const TInput: FC<TInputProps> = ({ onChange, disabled, placeholder, type, value }) => {
  return (
    <input
      className="w-full p-4 text-lg bg-black border-2 border-neutral-800 rounded-md outline-none text-white focus:border-sky-500 focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
    />
  );
};

interface TInputProps {
  placeholder?: string;
  value?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default TInput;
