// "use client";

// import React, { useState } from "react";
// import { BigHeading, Heading } from "../common/Common";
// import { createContactSubmission } from "@/lib/actions/admin";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     street: "",
//     city: "",
//     postcode: "",
//     phone: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     const res = await createContactSubmission(formData);
//     if (res.success) {
//       setSubmitted(true);
//       setFormData({
//         name: "",
//         street: "",
//         city: "",
//         postcode: "",
//         phone: "",
//         email: "",
//         message: "",
//       });
//     } else {
//       alert(res.message || "Something went wrong.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full bg-white py-5 md:px-16 px-4 lg:px-20">
//       <div className="mx-auto max-w-7xl bg-white md:p-4 font-[sans-serif]">
//         <div className="flex justify-start md:justify-center flex-col w-full">
//           <div className="mx-auto my-4">
//             <Heading text={"Contact us"} />
//           </div>
//           <div className="mx-auto w-full md:max-w-[80%]">
//             <BigHeading className="text-center" text={"Get In Touch"} />
//             <p className="text-sm text-gray-500 mt-4 leading-relaxed text-start md:text-center">
//               Have a question about our loan services, or need assistance with your application? We’re here to help. Reach out and our team will get back to you promptly.
//             </p>
//           </div>
//         </div>

//         <div className="grid max-w-[80vw] w-full md:grid-cols-2 gap-16 items-center relative">
//           <div className="w-full">
//             <form className="max-w-[80vw] w-full" onSubmit={(e) => e.preventDefault()}>
//               <div className="space-y-4 w-full mt-8">
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Full Name"
//                   className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
//                 />
//                 <input
//                   name="street"
//                   value={formData.street}
//                   onChange={handleChange}
//                   placeholder="Street"
//                   className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
//                 />
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <input
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     placeholder="City"
//                     className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
//                   />
//                   <input
//                     name="postcode"
//                     value={formData.postcode}
//                     onChange={handleChange}
//                     placeholder="Postcode"
//                     className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
//                   />
//                 </div>
//                 <input
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="Phone No."
//                   type="number"
//                   className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
//                 />
//                 <input
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email"
//                   type="email"
//                   className="px-2 py-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
//                 />
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Write Message"
//                   className="px-2 pt-3 bg-white w-full text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 outline-none"
//                 />
//               </div>

//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="mt-8 flex items-center justify-center text-sm w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </button>

//               {submitted && (
//                 <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
//               )}
//             </form>
//           </div>

//           <div className="z-10 relative">
//             <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3696018.429574582!2d84.264028!3d25.223685!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d9f4fafc4cdc3%3A0xde2573891120ae88!2sPARV%20FINANCIAL%20SERVICES!5e0!3m2!1sen!2sin!4v1738207167113!5m2!1sen!2sin"
//               width="600"
//               height="450"
//               allowFullScreen=""
//               loading="lazy"
//               className="w-[80vw] md:w-full mx-auto"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;



// components/ContactSection.tsx

import { Mail, MapPin, PhoneCall, Clock } from "lucide-react";
import React from "react";
import { BigHeading, Heading } from "../common/Common";

const ContactSection = () => {
  return (
    <section className="bg-gradient-to-tl from-teal-100 via-gray-50 to-blue-200 py-12 px-6 sm:px-10 lg:px-20" id="contact">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-start md:justify-center flex-col w-full">
          <div className="mx-auto my-4">
            <Heading text={"Contact us"} />
          </div>
          <div className="mx-auto w-full md:max-w-[80%]">
            <BigHeading className="text-center" text={"Get In Touch"} />
            <p className="text-sm text-gray-500 mt-4 leading-relaxed text-start md:text-center">
              Have a question about our loan services, or need assistance with your application? We’re here to help. Reach out and our team will get back to you promptly.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {/* Phone */}
          <div className="flex flex-col items-start space-y-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-start space-x-1">
              <div className="p-2 bg-blue-100 rounded-full">
                <PhoneCall className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-md text-slate-800">Phone</h3>
                <p className="text-gray-600 text-sm">+91 7292800809</p>
              </div>
            </div>
            <div className="flex items-start space-x-1 mt-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Mail className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-md text-slate-800">Email</h3>
                <p className="text-gray-600 text-sm">parvmultiservices@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="p-2 bg-blue-100 rounded-full">
              <MapPin className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-800">Address Branch-1</h3>
              <p className="text-gray-600 lowercase">REGD. OFFICE-HOTEL NEW MAYUR, DUMRAO ROAD, BIKRAMGANJ, ROHTAS BIHAR 802212.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="p-2 bg-blue-100 rounded-full">
              <MapPin className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-800">Address Branch-2</h3>
              <p className="text-gray-600 lowercase">Admin office-Maurya Vihar colony, Near Ultra tech cement godown, Landmark- BMP-16, Phulwarishariff Patna 801505.</p>
            </div>
          </div>

          {/* Timing */}
          {/* <div className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <div className="p-2 bg-blue-100 rounded-full">
              <Clock className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-slate-800">Working Hours</h3>
              <p className="text-gray-600">Mon - Sat: 10:00 AM – 6:00 PM</p>
            </div>
          </div> */}
        </div>

        {/* Optional: Map Embed */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3928572482087!2d84.26145317483827!3d25.223689730628244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d9f4fafc4cdc3%3A0xde2573891120ae88!2sPARV%20FINANCIAL%20SERVICES!5e0!3m2!1sen!2sin!4v1752507403751!5m2!1sen!2sin"
            width="100%"
            height="350"
            // allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
