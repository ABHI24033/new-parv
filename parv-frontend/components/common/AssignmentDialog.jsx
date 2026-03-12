// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useUserState } from "@/app/dashboard/store";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { setTelecallersData } from "@/lib/actions/telecaller";
// // import { setTelecallersData } from "@/lib/actions/file_action";

// export default function AssignmentDialog({ username }) {
//   const userState = useUserState();
//   const [url, setURL] = useState("");

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Add Assignment</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add Assignment</DialogTitle>
//           <DialogDescription>
//             Add the URL of new assignment and click Add button.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex flex-col items-start gap-4">
//           <Label htmlFor="name" className="text-right">
//             Assignment URL
//           </Label>
//           <Input id="name" onChange={(e) => setURL(e.target.value)} />
//         </div>
//         <DialogFooter>
//           <Button
//             type="submit"
//             onClick={() => {
//               userState.user.getIdToken().then((token) => {
//                 console.log(token,username, url);
//                 setTelecallersData(token, username, url);
//               });
//             }}
//           >
//             Add
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }




"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserState } from "@/app/dashboard/store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setTelecallersData } from "@/lib/actions/telecaller";

export default function AssignmentDialog({ username }) {
  const userState = useUserState();
  const [url, setURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    try {
      const token = await userState.user.getIdToken();
      const res = await setTelecallersData(token, username, url);
      if (res.success) {
        alert("Assignment added successfully.");
        setURL("");
        setOpen(false);
      } else {
        alert("Failed to add assignment.");
      }
    } catch (err) {
      console.error("Error adding assignment:", err);
      alert("An error occurred while adding the assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Assignment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogDescription>
            Add the URL of the new assignment and click the Add button.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start gap-4">
          <Label htmlFor="assignment-url" className="text-right">
            Assignment URL
          </Label>
          <Input
            id="assignment-url"
            value={url}
            onChange={(e) => setURL(e.target.value)}
            placeholder="https://example.com/assignment.pdf"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
