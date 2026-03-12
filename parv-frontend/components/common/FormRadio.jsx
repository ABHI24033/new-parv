"use client";

import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export const FormRadio = ({
  id,
  label,
  required = false,
  value,
  onChange,
  error,
  options,
}) => {
  return (
    <div className="space-y-2 col-span-full">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={cn("flex items-center space-x-4", error && "border border-red-500 p-2 rounded-md")}
      >
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2">
            <RadioGroupItem value={opt.value} id={`${id}_${opt.value}`} />
            <Label htmlFor={`${id}_${opt.value}`}>{opt.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
