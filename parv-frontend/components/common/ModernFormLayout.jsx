import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const FormLayout = ({ title, children, description, icon: Icon }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Card className="border-none bg-white shadow-none ring-0">
        <CardContent className="pb-20 md:pb-0 px-0">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export const FormSection = ({ title, children, description, className = "" }) => (
  <div className={`flex w-full flex-col h-full ${className}`}>
    {title && (
      <div className="px-1 mb-4">
        <h3 className="text-lg font-bold text-gray-700 tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {description}
          </p>
        )}
      </div>
    )}
    <Card className="border-none bg-[#f8f9fc] rounded-2xl p-6 md:p-8 flex-grow shadow-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {children}
      </div>
    </Card>
  </div>
);

export const FormField = ({ label, children, error, required, className = "" }) => (
  <div className={`flex flex-col space-y-2 ${className}`}>
    {label && (
      <label className="text-sm font-semibold text-gray-600 flex items-center gap-1 ml-0.5">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <div className="relative">
      <div className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100/50 ${error ? 'ring-1 ring-red-400' : ''}`}>
        {children}
      </div>
    </div>
    {error && (
      <span className="text-[10px] font-bold text-red-500 ml-1 mt-1 uppercase tracking-wider">
        {error}
      </span>
    )}
  </div>
);

export default FormLayout;
