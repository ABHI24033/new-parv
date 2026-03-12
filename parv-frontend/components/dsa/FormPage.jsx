"use client";

import { useState } from "react";
import SignUpForm from "./DSASignUPForm";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDSAAccount } from "@/api/file_action";

export function HeaderSection() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-12 px-6">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
        Apply to Become a DSA Partner
      </h1>
      <p className="md:text-lg">
        Join our network of professionals and help others get access to
        financial solutions while you earn and grow.
      </p>
    </div>
  );
}

export function FormInstructions() {
  return (
    <div className="bg-gray-50 py-8 md:px-6 text-center">
      <h2 className="text-2xl font-bold mb-4"> Apply For DSA </h2>
      <p className="text-gray-600">
        Fill out the form below with accurate details. Once submitted, our team
        will review your application and get back to you shortly.
      </p>
    </div>
  );
}

export function BenefitsSection() {
  const benefits = [
    {
      title: "Flexible Work",
      description: "Work at your own pace and convenience.",
      icon: "💼",
    },
    {
      title: "Earn More",
      description: "Gain commissions for every successful referral.",
      icon: "💰",
    },
    {
      title: "Exclusive Support",
      description: "Get access to dedicated resources and tools.",
      icon: "🤝",
    },
    {
      title: "Professional Growth",
      description: "Expand your network and financial expertise.",
      icon: "📈",
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">
        Why Partner with Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 text-center"
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const signUpSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  mobileNo: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  whatsappNo: yup
    .string()
    .matches(/^\d{10}$/, "WhatsApp number must be 10 digits")
    .required("WhatsApp number is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  profession: yup.string().required("Profession is required"),
  companyName: yup.string().required("Company name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  landmark: yup.string().required("Landmark is required"),
  district: yup.string().required("District is required"),
  state: yup.string().required("State is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  workExperience: yup.string().required("Work experience is required"),
});

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
    whatsappNo: "",
    email: "",
    profession: "",
    companyName: "",
    address: "",
    city: "",
    landmark: "",
    district: "",
    state: "",
    pincode: "",
    workExperience: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (process.env.NEXT_PUBLIC_TEST_MODE) {
      createDSAAccount(formData);
    } else {
      try {
        // Validate the form data
        await signUpSchema.validate(formData, { abortEarly: false });
        setErrors({}); // Clear errors if validation passes

        // Submit logic here
        console.log("Form Data:", formData);
        alert(
          "Form submitted successfully! Confirmation sent to your email and WhatsApp."
        );
      } catch (validationErrors) {
        // Map Yup errors to field-specific error messages
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-12 px-6 w-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Apply to Become a DSA Partner
        </h1>
        <p className="max-w-[45ch]">
          Join our network of professionals and help others get access to
          financial solutions while you earn and grow.
        </p>
      </div>
      <div className="bg-gray-50 py-8 md:px-6 text-center w-full p-4">
        <h2 className="text-2xl font-bold mb-4"> Apply For DSA </h2>
        <p className="text-gray-600">
          Fill out the form below with accurate details. Once submitted, our
          team will review your application and get back to you shortly.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row gap-4 flex-wrap max-w-[600px] w-full p-4"
      >
        <Input
          name="name"
          value={formData?.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="flex-1 min-w-[150px]"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <Input
          name="mobileNo"
          value={formData?.mobileNo}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="flex-1 min-w-[150px]"
          type="number"
        />
        {errors.mobileNo && <p className="text-red-500">{errors.mobileNo}</p>}

        <Input
          name="whatsappNo"
          value={formData.whatsappNo}
          onChange={handleChange}
          placeholder="WhatsApp Number"
          className="flex-1 min-w-[150px]"
        />
        {errors.whatsappNo && (
          <p className="text-red-500">{errors.whatsappNo}</p>
        )}

        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ID"
          className="flex-1 min-w-[150px]"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <Select
          onValueChange={(value) => handleSelectChange("profession", value)}
          className="flex-1 min-w-[150px]"
          placeholder="Current Profession"
        >
          <SelectTrigger>
            <SelectValue
              placeholder={formData.profession || "Select Profession"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Job">Job</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Self-employed">Self-employed</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.profession && (
          <p className="text-red-500">{errors.profession}</p>
        )}

        <Input
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company/Business/Firm Name"
          className="flex-1 min-w-[150px]"
        />
        {errors.companyName && (
          <p className="text-red-500">{errors.companyName}</p>
        )}

        <Input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Road/Street Name"
          className="flex-1 min-w-[150px]"
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}

        <Input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Town/City"
          className="flex-1 min-w-[150px]"
        />
        {errors.city && <p className="text-red-500">{errors.city}</p>}

        <Input
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
          placeholder="Landmark"
          className="flex-1 min-w-[150px]"
        />
        {errors.landmark && <p className="text-red-500">{errors.landmark}</p>}

        <Input
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="District"
          className="flex-1 min-w-[150px]"
        />
        {errors.district && <p className="text-red-500">{errors.district}</p>}

        <Input
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="flex-1 min-w-[150px]"
        />
        {errors.state && <p className="text-red-500">{errors.state}</p>}

        <Input
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="flex-1 min-w-[150px]"
        />
        {errors.pincode && <p className="text-red-500">{errors.pincode}</p>}
        <Input
          name="workExperience"
          value={formData.workExperience}
          onChange={handleChange}
          placeholder="Total Work Experience"
          className="flex-1 min-w-[150px]"
        />
        {errors.workExperience && (
          <p className="text-red-500">{errors.workExperience}</p>
        )}
        <Button type="submit" className="mx-auto bg-blue-500 w-full">
          Apply for DSA
        </Button>
      </form>
    </div>
  );
}
