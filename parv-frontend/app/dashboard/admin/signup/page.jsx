"use client";

import MultiStepAccountForm from "@/components/forms/MultiStepAccountForm";
import React from "react";

const UserCreationForm = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MultiStepAccountForm />
    </div>
  );
};

export default UserCreationForm;
