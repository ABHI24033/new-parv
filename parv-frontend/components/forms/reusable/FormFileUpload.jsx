import { FormFileUpload as OriginalFormFileUpload } from "@/components/common/FormFile";

// We re-export the existing highly complex and functional FormFile upload system
// to maintain uniform imports via the new reusable components architecture.
export function FormFileUpload(props) {
    return <OriginalFormFileUpload {...props} />;
}
