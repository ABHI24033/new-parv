import { Mail, MapPin, PhoneCall, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const contactCards = [
  {
    title: "Phone",
    value: "+91 7292800809",
    icon: PhoneCall,
    href: "tel:+917292800809",
  },
  {
    title: "Email",
    value: "parvmultiservices@gmail.com",
    icon: Mail,
    href: "mailto:parvmultiservices@gmail.com",
  },
  {
    title: "Working Hours",
    value: "Mon - Sat: 9:00 AM - 6:00 PM",
    icon: Clock,
  },
];

const addresses = [
  {
    label: "Registered Office",
    value: "Hotel New Mayur, Dumrao Road, Bikramganj, Rohtas, Bihar 802212",
  },
  {
    label: "Admin Office",
    value: "Maurya Vihar Colony, Near Ultra Tech Cement Godown, Landmark- BMP-16, Phulwarishariff, Patna 801505",
  },
];

const ContactCard = ({ title, value, icon: Icon, href }) => {
  const CardWrapper = href ? Link : "div";
  return (
    <CardWrapper
      href={href}
      className={`group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-blue-200 ${href ? "cursor-pointer" : ""}`}
    >
      <div className="mb-3 flex flex-col h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{value}</p>
      {href && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600">
          <span>Contact now</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </CardWrapper>
  );
};

const AddressCard = ({ label, value }) => (
  <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
      <MapPin className="h-5 w-5" />
    </div>
    <div>
      <h4 className="text-sm font-semibold text-slate-900">{label}</h4>
      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{value}</p>
    </div>
  </div>
);

const ContactSection = () => {
  return (
    <section className="relative" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-xs font-semibold text-blue-700 mb-4">
            <Mail className="h-3.5 w-3.5" />
            <span>Contact Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Get in Touch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-slate-600">
            Have questions about our loan services? Our team is here to help you with personalized assistance.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left Column - Contact Info */}
          <div className="space-y-4">
            {/* Contact Info - Single Horizontal Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-10">
                {/* Phone */}
                <Link href="tel:+917292800809" className="group flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase">Phone</h3>
                    <p className="text-sm font-medium text-slate-900">+91 7292800809</p>
                  </div>
                </Link>

                {/* Email */}
                <Link href="mailto:parvmultiservices@gmail.com" className="group flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase">Email</h3>
                    <p className="text-sm font-medium text-slate-900 break-all">parvmultiservices@gmail.com</p>
                  </div>
                </Link>

                {/* Working Hours */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase">Timing</h3>
                    <p className="text-sm font-medium text-slate-900">Mon - Sat: 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Cards */}
            <div className="grid gap-4">
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Our Offices</h3>
              {addresses.map((addr) => (
                <AddressCard key={addr.label} {...addr} />
              ))}
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-900">Registered Office Location</h3>
              </div>
              <p className="mt-1 text-sm text-slate-500">Bikramganj, Rohtas, Bihar</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.3928572482087!2d84.26145317483827!3d25.223689730628244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d9f4fafc4cdc3%3A0xde2573891120ae88!2sPARV%20FINANCIAL%20SERVICES!5e0!3m2!1sen!2sin!4v1752507403751!5m2!1sen!2sin"
              width="100%"
              height="100%"
              loading="lazy"
              className="min-h-[400px] lg:min-h-[500px]"
              referrerPolicy="no-referrer-when-downgrade"
              title="Parv Financial Services Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
