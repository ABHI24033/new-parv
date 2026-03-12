import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { approveDSAForm } from "@/lib/actions/dsa";
import DocumentViewer from "./DocumentsViewer";
import { useUserState } from "@/app/dashboard/store";

export default function Profile({ data, role }) {

  const userState = useUserState();
  const approve = async () => {
    // const res = await handleApproveDSA(data?.username);
    const res = await approveDSAForm(data?.username);
    if (res?.success) {
      alert("DSA Approved: " + res.message);
    } else {
      alert("Error: " + res.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:py-10 md:px-4">
      <div className="flex flex-col md:flex-row space-y-4 justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-10 h-10 md:w-14 md:h-14">
            <AvatarImage src={data?.photo} />
            <AvatarFallback>
              {data?.full_name
                ? data.full_name
                    .split(" ")
                    .map(word => word[0])
                    .join("")
                : ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg md:text-2xl font-bold">{data?.full_name}</h2>
            <div className="flex gap-2 items-center">
              <Badge variant="outline">{data?.status}</Badge>
            </div>
          </div>
        </div>
        {/* {userState?.profile?.role === "Admin" && (
          <div className="flex gap-2">
            <Button variant="outline">Edit profile</Button>
            <Button onClick={approve}>Approve</Button>
            <Button variant="destructive" className="cursor-pointer">
              Reject
            </Button>
          </div>
        )} */}
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 grid gap-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <strong>User ID:</strong> {data?.username}
            </div>
            <div>
              <strong>Name:</strong> {data?.full_name}
            </div>
            <div>
              <strong>Guardian's name:</strong> {data?.guardian_name}
            </div>
            <div>
              <strong>Aadhar Number:</strong> {data?.aadhar_no}
            </div>
            <div>
              <strong>PAN Number:</strong> {data?.pan_no}
            </div>
            <div>
              <strong>Marrital Status:</strong> {data?.marital_status}
            </div>
            <div>
              <strong>Email:</strong> {data?.email}
            </div>
            <div>
              <strong>Phone number:</strong> {data?.phone_no}
            </div>
            <div>
              <strong>Alternate Phone Number:</strong> {data?.alt_phone_no}
            </div>
            <div>
              <strong>Date of Birth:</strong> {data?.dob}
            </div>
            <div>
              <strong>Date of joining:</strong> {data?.date_of_joining}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <div className="grid">
            <div>
              <p className="text-xs">{data?.phone}</p>
            </div>
            <h4 className="font-bold">Permanent Address</h4>
            <div>
              <p>{data?.permanent_address}</p>
            </div>
            <h4 className="font-bold">Present Address</h4>
            <div>
              <p>{data?.present_address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data?.photo && (
              <DocumentViewer src={data.photo} name="Applicant's Image" />
            )}
            {data?.aadhar && (
              <DocumentViewer src={data.aadhar} name="Aadhar card" />
            )}
            {data?.pan && (
              <DocumentViewer src={data.pan} name="PAN card" />
            )}
            {data?.education_certificate && (
              <DocumentViewer
                src={data.education_certificate}
                name="Educational Certificate"
              />
            )}
            {data?.bank_doc && (
              <DocumentViewer src={data.bank_doc} name="Bank documents" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}