import React, { useEffect } from "react";
import cx from "classnames";
import { formatDollars, parseDollars } from "@/utils/splitUtils";

export default function DollarInput({
  label,
  error,
  onChange,
  type,
  placeholder,
  initialValue = "",
  resetKey = 0,
}: {
  type: "inline" | "full-width";
  label?: string;
  onChange: (cents: number | null) => void;
  error?: string;
  placeholder?: string;
  initialValue?: string;
  resetKey?: number;
}) {
  const [value, setValue] = React.useState(initialValue);
  const [valid, setValid] = React.useState(true);

  const inputBox = (
    <input
      type="number"
      name={`input-${label}`}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        const parsed = parseDollars(newValue);
        setValid(parsed !== null);
        onChange(parsed);
      }}
      className={cx(
        "rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset",
        "placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
        error || !valid
          ? "ring-red-400 focus:ring-red-600 text-red-900"
          : "ring-gray-300 focus:ring-indigo-600 text-gray-900",
        type == "inline" ? "w-[4.5rem] inline" : "w-full block",
      )}
      placeholder={placeholder}
    />
  );
  if (type == "inline") {
    return inputBox;
  }
  return (
    <div className={cx(label && "mt-5")}>
      {label && (
        <label
          htmlFor={`input-${label}`}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-1">{inputBox}</div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
