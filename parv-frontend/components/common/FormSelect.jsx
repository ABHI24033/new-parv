"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const FormSelect = ({
  id,
  label,
  name,
  required = false,
  value,
  onChange,
  error,
  placeholder,
  options,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Select name={name} value={value} onValueChange={onChange}>
        <SelectTrigger
          id={id}
          className={cn("w-full", error && "border-red-500 focus-visible:ring-red-500")}
        >
          <SelectValue placeholder={placeholder || "Select option"} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
