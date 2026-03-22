"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Loader2Icon, Upload } from "lucide-react";
import { X, Loader2, FileUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { DocsViewModal } from "./Modals";
import { useState } from "react";

export const FormFileUpload = ({
  id,
  label,
  required = false,
  value,
  onChange,
  error,
  isUploading,
  handleRemoveDocsFromCloudaniry,
  isRemoving,
}) => {
  const [open, setOpen] = useState(false);

  // Check if this specific field is currently uploading or removing
  const currentlyUploading = isUploading?.[id] || false;
  const currentlyRemoving = isRemoving?.[id] || false;

  return (
    <div className="space-y-3">
      {/* Label - Handled by FormField but kept for standalone use if needed */}
      {!label ? null : (
        <Label htmlFor={id} className="font-bold text-gray-700 hidden">
          {label}
        </Label>
      )}

      {/* FILE PREVIEW TAG */}
      {value && typeof value === "string" && !currentlyUploading && (
        <div className="flex items-center justify-between w-full bg-blue-50/50 p-4 rounded-2xl border border-blue-100 shadow-sm animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
              <Upload size={18} />
            </div>
            <div
              className="font-bold text-blue-700 hover:text-blue-800 cursor-pointer transition-colors"
              onClick={() => setOpen(true)}
            >
              Click to view {label}
            </div>
          </div>

          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-red-50 hover:text-red-500 text-gray-400 transition-all"
                  onClick={() => handleRemoveDocsFromCloudaniry(value, id)}
                  disabled={currentlyRemoving}
                >
                  {currentlyRemoving ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <X size={20} />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-gray-900 text-white border-none rounded-lg font-bold">
                <p>Remove File</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* UPLOAD AREA */}
      {(!value || typeof value !== "string" || currentlyUploading) && (
        <div
          className={cn(
            "relative group flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 transition-all duration-300 bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-400",
            error ? "border-red-300 bg-red-50/50" : "border-gray-200"
          )}
        >
          {currentlyUploading ? (
            <div className="flex flex-col items-center gap-3 text-sm font-bold text-blue-600 py-2">
              <Loader2Icon className="animate-spin text-blue-600" size={32} />
              <span className="animate-pulse">Uploading Document...</span>
            </div>
          ) : (
            <>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300 mb-3">
                <FileUp size={28} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-gray-700">Click to upload {label}</p>
                <p className="text-xs text-gray-500 font-medium italic">Support: JPG, PNG, PDF (Max 2MB)</p>
              </div>
              <Input
                type="file"
                id={id}
                onChange={onChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>
      )}

      {/* PREVIEW MODAL */}
      <DocsViewModal open={open} url={value} title={label} onClose={() => setOpen(false)} />
    </div>
  );
};



export const FormFileUploadForMembers = ({
  id,
  label,
  required = false,
  value,
  onChange,
  error,
  handleUpload,
  uploading,
  removing,
  index,
  handleRemoveDocsFromCloudaniry,
}) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Show existing file link if already uploaded and it's a string (URL) */}
      {value && typeof value === "string" && (
        <div variant={'outline'} className={"flex justify-between w-fit  items-center text-xs font-semibold rounded-md gap-4 border px-2 py-1"}>
          <div className="cursor-pointer" role="button" onClick={() => setOpen(true)}>
            {label}
          </div>
          <div className="flex gap-2 cursor-pointer">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {
                    removing?.[`${index}-${id}`] ?
                      <Loader2 size={17} className="animate-spin" />
                      :
                      <X
                        size={17}
                        role="button"
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveDocsFromCloudaniry(value, index, id)}
                      />
                  }
                </TooltipTrigger>
                <TooltipContent>
                  <p>Remove</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}

      <div className={cn("flex border rounded-md", error && "border-red-500  focus-visible:ring-red-500")}>
        <Input
          type="file"
          id={id}
          disabled={value && typeof value === "string"}
          onChange={onChange}
          className={cn("border-none", error && "border-red-500  focus-visible:ring-red-500")}
        />
        <Button
          variant={"outline"}
          size={'icon'}
          disabled={value && typeof value === "string"}
          className={cn("border-none", error && "border-red-500  focus-visible:ring-red-500")}
          onClick={() => handleUpload(id, index)}
        >
          {
            uploading?.[`${index}-${id}`] ? <Loader2 className="animate-spin" /> : <Upload />
          }
        </Button>
      </div>


      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <DocsViewModal
        open={open}
        url={value}
        title={label}
        onClose={onClose}
      />
    </div>
  );
};


