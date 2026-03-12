import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const FormTextarea = ({
  id,
  label,
  name,
  required = false,
  value,
  onChange,
  error,
  placeholder,
  className,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        id={id}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "h-26",
          className,
          error && "border-red-500 focus-visible:ring-red-500"
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormTextarea;
