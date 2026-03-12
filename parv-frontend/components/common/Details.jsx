
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { StepForm } from "../StepForm";


export default function DetailsPage({ data}) {
    return (
        <div className="py-4 min-h-[80vh]">
            <div className="container flex flex-col gap-2 lg:flex-row w-full mx-auto">
                <div className=" rounded-lg w-full">
                    {/* Table Header */}
                    <div className="grid-cols-1 gap-5 p-6 space-y-6 bg-gray-50 custom-scrollbar overflow-y-auto rounded-lg w-full border">

                        <div className="flex flex-col gap-4">
                            {Object.keys(data).map((key, index) => {
                                return (
                                    <StepForm
                                        // setState={setState}
                                        step={index}
                                        key={key}
                                        state={data}
                                        readonly={true}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-6 flex justify-end w-full gap-3">
                {/* <FormModal data={data} /> */}
                <Button className="">Approve</Button>
            </div>
        </div>
    );
}



