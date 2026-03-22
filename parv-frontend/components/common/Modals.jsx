"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { renderDialogFieldTable, renderMembersCards } from "@/components/common/render_dialog_field";
import { Separator } from "../ui/separator";
import { formatDateToString } from "@/lib/dateformate";
import { AlertTriangle } from "lucide-react";
import { InfoIcon } from "lucide-react";


export const SuccessModal = ({
  open,
  onOpenChange,
  message = "Form submitted successfully!",
  title = "Success"
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center max-w-xs">
        <CheckCircle2 className="text-green-500 w-12 h-12 mx-auto" />
        <h2 className="text-lg font-semibold text-green-700 leading-5">{title}</h2>
        <p className="text-sm text-gray-600 leading-0">{message}</p>
        <div className="flex w-full justify-end">
          <Button className="mt-4 w-fit mx-auto" onClick={handleRedirect}>
            Go to Dashboard
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};
export const UserSuccessModal = ({
  open,
  onOpenChange,
  message = "Form submitted successfully!",
  title = "Success",
  redirectTo,
  buttonText
}) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectTo || "/");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="text-center max-w-xs">
        <CheckCircle2 className="text-green-500 w-12 h-12 mx-auto" />
        <h2 className="text-lg font-semibold text-green-700 leading-5">{title}</h2>
        <p className="text-sm text-gray-600 leading-0">{message}</p>
        {
          buttonText ?
            <div className="flex w-full justify-end">
              <Button className="mt-4 w-fit mx-auto float-end" onClick={handleRedirect}>
                {buttonText}
              </Button>
            </div>
            :
            <div className="h-8"></div>
        }
      </DialogContent>
    </Dialog>
  );
};


export function AlertModal({
  open,
  onClose,
  onConfirm,
  isLoading,
  heading,
  message,
  btnText,
  icon,
}) {
  const isDelete = (!heading && !btnText) || btnText?.toLowerCase() === "delete";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center gap-2 text-center">
          {/* Icon */}
          {isDelete ? (
            <AlertTriangle className="w-12 h-12 text-red-500" />
          ) : (
            icon || <InfoIcon className="w-12 h-12 text-blue-500 " />
          )}

          {/* Heading */}
          <DialogTitle>
            {isDelete ? "Delete" : heading}
          </DialogTitle>
        </DialogHeader>

        {/* Message */}
        <div className="text-sm text-muted-foreground text-center">
          {isDelete
            ? "This action cannot be undone. Are you sure you want to permanently delete this item?"
            : message}
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-center gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          {isDelete ? (
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={onConfirm}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? "Loading..." : btnText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



export const LoadingModal = ({ open }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="text-center flex w-full flex-col justify-center items-center space-y-4 max-w-sm">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <h2 className="text-lg font-medium text-gray-700">Processing your request...</h2>
      </DialogContent>
    </Dialog>
  );
};

export const PreviewModal = ({ isDialogOpen, setIsDialogOpen, formData, handleFinalSubmit, isSubmitting }) => {

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Confirm Your Application</DialogTitle>
          <DialogDescription>
            Please review your details before final submission.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto py-4">
          <table className="w-full text-left text-sm table-auto">
            <tbody>
              {Object.entries(formData).map(([key, value]) =>
                renderDialogFieldTable(key, value)
              )}
            </tbody>
          </table>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm & Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export const PreviewModalWithMembers = ({ isDialogOpen, setIsDialogOpen, formData, handleFinalSubmit, isSubmitting }) => {

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Confirm Your Application</DialogTitle>
          <DialogDescription>
            Please review your details before final submission.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto py-4">
          <table className="w-full text-left text-sm table-auto">
            <tbody>
              {Object.entries(formData).map(([key, value]) =>
                renderDialogFieldTable(key, value)
              )}
            </tbody>
          </table>
          {renderMembersCards(formData?.members)}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm & Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const ReportDialog = ({
  open,
  onOpenChange,
  report,
}) => {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Telecaller Daily Report</DialogTitle>
          <DialogDescription>
            {report?.formSubmitDate ? formatDateToString(report?.formSubmitDate) : "No Date"}
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-2" />

        <div className="space-y-2 text-sm">
          <p><strong>Username:</strong> {report?.username || "N/A"}</p>
          <p><strong>Monthly Goal:</strong> {report?.monthlyGoal ?? '-'}</p>
          <p><strong>Daily Goal:</strong> {report?.dailyGoal ?? '-'}</p>
          <p><strong>Total Connectors Call:</strong> {report?.totalConnectorsCall ?? '-'}</p>
          <p><strong>Old Connector Call:</strong> {report?.oldConnectorCall ?? '-'}</p>
          <p><strong>Doc Collection Call:</strong> {report?.docCollectionCall ?? '-'}</p>
          <p><strong>New Leads Today:</strong> {report?.newLeadsToday ?? '-'}</p>
          <p><strong>Total Leads:</strong> {report?.totalLeads ?? '-'}</p>
          <p><strong>Notes:</strong> {report?.notes || "No notes added."}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const DocsViewModal = ({ url, title, open, onClose }) => {
  const isPDF = typeof url === "string" && url.toLowerCase().includes(".pdf");

  return (
    // <Dialog open={open} onOpenChange={onClose}>
    //   <DialogContent className="max-w-4xl w-[95vw] max-h-[95vh] h-auto flex flex-col overflow-hidden rounded-2xl border-none shadow-2xl bg-white">
    //     <DialogHeader className="shrink-0 border-b bg-white">
    //       <DialogTitle className="text-xl font-bold text-gray-800 tabular-nums">{title}</DialogTitle>
    //     </DialogHeader>

    //     <div className="flex-1 overflow-auto bg-zinc-50/80 flex items-center justify-center">
    //       {isPDF ? (
    //         <iframe src={url} className="w-full h-[70vh] rounded-lg border shadow-sm" title={title} />
    //       ) : (
    //         <div className="relative group w-full h-full flex items-center justify-center">
    //           <img
    //             src={typeof url === "string" ? url : (url instanceof File ? URL.createObjectURL(url) : "")}
    //             alt={title}
    //             style={{ width: "700px" }}
    //             className="max-w-full max-h-[90vh] w-auto h-auto object-contain border-white bg-white"
    //           />
    //         </div>
    //       )}
    //     </div>

    //     <DialogFooter className="p-4 bg-white border-t shrink-0 flex justify-end">
    //       <Button
    //         variant="outline"
    //         onClick={onClose}
    //         className="font-bold border-zinc-200 hover:bg-zinc-50 rounded-xl px-10 h-11"
    //       >
    //         Close
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>

    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-5xl h-fit p-0 flex flex-col overflow-hidden rounded-2xl border-none shadow-2xl bg-white">

        {/* Header */}
        <DialogHeader className="px-5 border-b bg-white flex flex-row items-center justify-between">
          <DialogTitle className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-zinc-100 flex items-center justify-center">

          {isPDF ? (
            <iframe
              src={url}
              title={title}
              className="w-full h-full rounded-xl border bg-white shadow-sm"
            />
          ) : (
            <div className="w-full h-full flex justify-center">
              <img
                src={
                  typeof url === "string"
                    ? url
                    : url instanceof File
                      ? URL.createObjectURL(url)
                      : ""
                }
                alt={title}
                style={{
                  maxHeight: "500px"
                }}
                className="max-w-full max-h-full object-contain rounded-xl shadow bg-white"
              />
            </div>
          )}

        </div>

        {/* Footer */}
        <DialogFooter className="px-4 py-3 border-t bg-white flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl px-6 md:px-8 h-10 md:h-11 font-medium"
          >
            Close
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};



