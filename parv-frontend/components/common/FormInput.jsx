
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FormInput = ({
  id,
  label,
  name,
  required = false,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value || ""}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(error && "border-red-500 focus-visible:ring-red-500")}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
