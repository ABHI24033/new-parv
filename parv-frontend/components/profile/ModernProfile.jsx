"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   User,
   Mail,
   Phone,
   MapPin,
   Calendar,
   Briefcase,
   CreditCard,
   FileText,
   ShieldCheck,
   Edit,
   ChevronRight,
   Home
} from "lucide-react";
import DocumentViewer from "@/components/common/DocumentsViewer";

const InfoItem = ({ icon: Icon, label, value }) => (
   <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
      <div className="p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
         <Icon size={18} />
      </div>
      <div className="flex flex-col">
         <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 leading-none mb-1">{label}</span>
         <span className="text-sm font-semibold text-slate-700">{value || "Not Provided"}</span>
      </div>
   </div>
);

export default function ModernProfile({ data, isOwnProfile = false, headerActions = null }) {
   if (!data) return <div className="p-10 text-center text-slate-500 font-bold">No Profile Data Found</div>;

   const initials = data.full_name?.split(" ").slice(0, 2).map(n => n[0]).join("") || "U";

   return (
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
         {/* Profile Header Card */}
         <Card className="border-none shadow-xl shadow-slate-100/50 bg-white overflow-hidden rounded-3xl">
            <CardContent className="p-6 relative">
               <div className="flex flex-col md:flex-row items-end gap-6 md:gap-8">
                  <div className="relative group mx-auto md:mx-0">
                     <Avatar className="w-28 h-28 md:w-32 md:h-32 border-8 border-white shadow-2xl shadow-blue-200/50 rounded-[2.5rem] overflow-hidden rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500">
                        <AvatarImage src={data.photo} className="object-cover" />
                        <AvatarFallback className="bg-slate-100 text-blue-600 text-3xl font-black uppercase tracking-tighter">{initials}</AvatarFallback>
                     </Avatar>
                     {isOwnProfile && (
                        <button className="absolute bottom-2 right-2 p-2.5 bg-white shadow-lg rounded-xl border border-slate-100 text-blue-600 hover:scale-110 transition-all cursor-pointer">
                           <Edit size={16} />
                        </button>
                     )}
                  </div>

                  <div className="flex-1 text-center md:text-left pb-2 w-full md:w-auto">
                     <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">{data.full_name}</h1>
                        <Badge className={`${data.status === 'Active' ? 'bg-green-500/10 text-green-600 border-green-200' : 'bg-blue-500/10 text-blue-600 border-blue-200'} h-fit self-center px-4 rounded-full font-bold text-[10px] uppercase border`}>
                           {data.role || 'Member'} • {data.status || 'Verified'}
                        </Badge>
                     </div>
                     <div className="flex flex-wrap justify-center md:justify-start items-center gap-y-2 gap-x-6 text-slate-500 font-medium text-sm">
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> {data.work_location || "Head Office, Delhi"}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-purple-500" /> Joined {data.date_of_joining || "March 2024"}</span>
                        <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-green-500" /> Verified Agent</span>
                     </div>
                  </div>
                  {headerActions}
                  {(isOwnProfile || headerActions) && (
                     <div className="flex w-full flex-col gap-3 pb-2 md:w-auto md:flex-row md:items-center md:justify-end">

                        {isOwnProfile && (
                           <>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 h-11 rounded-xl shadow-lg shadow-blue-200">
                                 Edit Profile
                              </Button>
                              <Button variant="outline" className="border-slate-200 font-bold px-6 h-11 rounded-xl hover:bg-slate-50">
                                 Share Profile
                              </Button>
                           </>
                        )}
                     </div>
                  )}
               </div>
            </CardContent>
         </Card>

         {/* Main Content Tabs */}
         <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-white p-1 h-14 rounded-2xl shadow-sm shadow-slate-100/50 border border-slate-50 w-full md:w-fit overflow-x-auto justify-start">
               <TabsTrigger value="overview" className="h-full rounded-xl px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">Overview</TabsTrigger>
               <TabsTrigger value="personal" className="h-full rounded-xl px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">Personal Info</TabsTrigger>
               <TabsTrigger value="documents" className="h-full rounded-xl px-6 font-bold data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">Documents</TabsTrigger>
            </TabsList>

            <Card className="mt-6 border-none shadow-xl shadow-slate-100/30 bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden">
               <CardContent className="p-6 md:p-10">
                  <TabsContent value="overview" className="mt-0 focus-visible:ring-0">
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-8">
                           <section>
                              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                 <Briefcase className="text-indigo-600 size-5" /> Professional Summary
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <InfoItem label="Designation" value={data.role || "Relationship Manager"} icon={Briefcase} />
                                 <InfoItem label="Employee ID" value={data.username || "PF-90021"} icon={ShieldCheck} />
                                 <InfoItem label="Date of Joining" value={data.date_of_joining} icon={Calendar} />
                                 <InfoItem label="Work Location" value={data.work_location} icon={MapPin} />
                              </div>
                           </section>
                        </div>

                        <div className="space-y-6">
                           <Card className="bg-slate-900 text-white rounded-[2rem] p-6 border-none shadow-2xl">
                              <h4 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-6">Contact Quick-links</h4>
                              <div className="space-y-4">
                                 <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
                                       <Phone size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider">Mobile</span>
                                       <span className="font-bold">{data.phone_no}</span>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
                                       <Mail size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-[10px] opacity-60 font-bold uppercase tracking-wider">Email Address</span>
                                       <span className="font-bold truncate max-w-[150px]">{data.email}</span>
                                    </div>
                                 </div>
                              </div>
                           </Card>
                        </div>
                     </div>
                  </TabsContent>

                  <TabsContent value="personal" className="mt-0 focus-visible:ring-0">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        <div className="space-y-2">
                           <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4 pl-1">Personal Identity</h4>
                           <InfoItem label="Full Name" value={data.full_name} icon={User} />
                           <InfoItem label="Guardian Name" value={data.guardian_name} icon={User} />
                           <InfoItem label="Date of Birth" value={data.dob} icon={Calendar} />
                           <InfoItem label="Gender" value={data.gender} icon={User} />
                           <InfoItem label="Marital Status" value={data.marital_status} icon={User} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-4 pl-1">ID & Banking</h4>
                           <InfoItem label="Aadhar Number" value={data.aadhar_no} icon={CreditCard} />
                           <InfoItem label="PAN Number" value={data.pan_no} icon={CreditCard} />
                           <InfoItem label="Bank Account" value={data.bank_account_no} icon={CreditCard} />
                           <InfoItem label="Bank Branch" value={data.bank_branch} icon={MapPin} />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-600 mb-4 pl-1">Residential Data</h4>
                           <InfoItem label="Current City" value={data.work_location} icon={MapPin} />
                           <InfoItem label="Email Contact" value={data.email} icon={Mail} />
                           <InfoItem label="Present Address" value={data.present_address} icon={Home} />
                           <InfoItem label="Permanent Address" value={data.permanent_address} icon={Home} />
                        </div>
                     </div>
                  </TabsContent>

                  <TabsContent value="documents" className="mt-0 focus-visible:ring-0">
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data.photo && (
                           <Card className="rounded-[2.5rem] border-none shadow-lg overflow-hidden group">
                              <div className="aspect-[4/5] relative">
                                 <img src={data.photo} alt="Profile" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-5">
                                    <span className="text-white font-black text-xs uppercase tracking-widest mb-1">Official Photograph</span>
                                    <DocumentViewer src={data.photo} name="View Full Resolution" className="text-white/80 text-[10px] hover:text-white transition-colors" />
                                 </div>
                              </div>
                           </Card>
                        )}

                        <div className="sm:col-span-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <CreditCard size={20} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-black text-slate-900">Aadhar Card</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{data.aadhar_no ? 'Verified' : 'Missing'}</span>
                                 </div>
                              </div>
                              {data.aadhar && <DocumentViewer src={data.aadhar} name={<ChevronRight size={18} />} />}
                           </div>

                           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-indigo-200 transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    <CreditCard size={20} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-black text-slate-900">PAN Card</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{data.pan_no ? 'Verified' : 'Missing'}</span>
                                 </div>
                              </div>
                              {data.pan && <DocumentViewer src={data.pan} name={<ChevronRight size={18} />} />}
                           </div>

                           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-purple-200 transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <FileText size={20} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-black text-slate-900">Bank Statement</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Financial Record</span>
                                 </div>
                              </div>
                              {data.bank_doc && <DocumentViewer src={data.bank_doc} name={<ChevronRight size={18} />} />}
                           </div>

                           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-amber-200 transition-colors">
                              <div className="flex items-center gap-4">
                                 <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-600 group-hover:text-white transition-all">
                                    <FileText size={20} />
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-sm font-black text-slate-900">Education Cert.</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verification Complete</span>
                                 </div>
                              </div>
                              {data.education_certificate && <DocumentViewer src={data.education_certificate} name={<ChevronRight size={18} />} />}
                           </div>
                        </div>
                     </div>
                  </TabsContent>
               </CardContent>
            </Card>
         </Tabs>
      </div>
   );
}
