
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { approveDSAForm } from "@/lib/actions/dsa";

export default function DSA({ data }) {

  const approve = async () => {

    const res = await approveDSAForm(data?.username);
    if (res?.success) {
      alert("DSA Approved: " + res.message);
    } else {
      alert("Error: " + res.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row space-y-4 justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={data?.photo} className={""} />
            <AvatarFallback>{data?.full_name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{data?.full_name}</h2>
            <div className="flex gap-2 items-center">
              <Badge variant="outline">{data?.status}</Badge>
              {/* <span className="text-green-600 text-sm">Active</span> */}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"}>Edit profile</Button>
          <Button onClick={approve} >Approve</Button>
          <Button variant={"destructive"} className={"cursor-pointer"}>Reject</Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6 grid gap-2">
          <div className="grid md:grid-cols-2 gap-4">
            <div><strong>User ID:</strong> {data?.username}</div>
            <div><strong>Name:</strong> {data?.full_name}</div>
            <div><strong>Guardian's name:</strong> {data?.guardians_name}</div>
            <div><strong>Aadhar Number:</strong> {data?.aadhar_no}</div>
            <div><strong>PAN Number:</strong> {data?.guardian_name}</div>
            <div><strong>Marrital Status:</strong> {data?.marital_status}</div>
            <div><strong>Email:</strong>{data?.email}</div>
            <div><strong>Phone number:</strong> {data?.phone_no}</div>
            <div><strong>Alternate Phone Number:</strong> {data?.alt_phone_no}</div>
            <div><strong>Date of Birth:</strong>{data?.dob} </div>
            <div><strong>Date of joining:</strong> April 29, 2021</div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <div className="grid gap-4">
            <div>
              <p className="text-sm text-gray-500">{data?.email}</p>
              <p className="text-xs">{data?.phone}</p>
            </div>
            <h4 className="font-bold">Address</h4>
            <div>
              <p className="text-sm text-gray-500"></p>
              <p className="text-xs">Used 3 hours ago</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">charlie_ro@gmail.com</p>
              <p className="text-xs text-red-500">Unverified — added 1 year ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Documents</h3>
          <Link href={data?.photo||""} target="_blank">
            <div className="p-4 rounded bg-gray-100 w-40 h-auto cursor-pointer">
              <img src={data?.photo || ""} width={200} height={200} className=" w-32 h-32 rounded" alt="docs" />
              <p className="pt-2 text-sm ">Applicant's Photo</p>
            </div>
          </Link>

        </CardContent>
      </Card>
    </div>
  );
}