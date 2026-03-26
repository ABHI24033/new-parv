import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";

export default function useFormPersistence(key, data, enabled = true) {
  const [isRestored, setIsRestored] = useState(false);

  // Load saved data from IndexedDB
  useEffect(() => {
    if (!enabled) {
      setIsRestored(true);
      return;
    }
    (async () => {
      try {
        const savedData = await get(key);
        console.log("Loaded data from IndexedDB:", savedData);
        if (savedData) {
          data.setFormData(prev => ({ ...prev, ...(savedData.formData || {}) }));
          data?.setLoanHistory && data?.setLoanHistory(savedData.loanHistory || [{}]);
          data?.setStep(savedData.step || 0);
        }
      } catch (err) {
        console.error("Error loading from IndexedDB:", err);
      } finally {
        setIsRestored(true);
      }
    })();
  }, []);

  // Save data after restoration completes
  useEffect(() => {
    if (!enabled) return;
    if (!isRestored) return;
    const payload = {
      formData: data.formData,
      loanHistory: data?.loanHistory || null,
      step: data.step,
    };
    console.log("Saving data to IndexedDB:", payload);
    set(key, payload);
  }, [enabled, isRestored, data.formData, data.loanHistory, data.step]);

  return { isRestored };
}
