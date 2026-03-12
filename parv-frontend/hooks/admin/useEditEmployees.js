"use client";

import { useEffect, useState } from "react";
import api from "@/api/api";

export default function useAdminEditProfile(userId) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  /* ───────── Fetch Existing Data ───────── */
  useEffect(() => {
    if (!userId) return;

    api.get(`/users/${userId}`).then((res) => {
      setForm(res.data.data);
    });
  }, [userId]);

  /* ───────── Handlers ───────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    setForm((p) => ({ ...p, [field]: e.target.files[0] }));
  };

  /* ───────── Submit Update ───────── */
  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      await api.put(`/users/${userId}`, form);
      setOpenSuccess(true);
    } catch (err) {
      setErrors(err?.response?.data?.errors || {});
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    openSuccess,
    setOpenSuccess,
    handleChange,
    handleSelectChange,
    handleFileChange,
    submitForm,
  };
}
