"use client";

import { useEffect } from "react";

// Revoke blob URL on unmount to avoid memory leaks
const RevokeObjectURL = ({ url }) => {
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [url]);
  return null;
};

export const renderDialogFieldTable = (key, value) => {
  // Skip members here; we'll render them separately at the bottom
  if (key === "members") return null;

  // Skip complex objects/functions (except File)
  if (
    typeof value === "function" ||
    (typeof value === "object" && value !== null && !(value instanceof File))
  ) {
    return null;
  }

  const label = key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  // Handle file
  if (value instanceof File) {
    const fileUrl = URL.createObjectURL(value);
    return (
      <tr key={key} className="border-b">
        <td className="font-medium py-2 pr-4 align-top">{label}</td>
        <td className="py-2">
          <RevokeObjectURL url={fileUrl} />
          <p className="text-sm text-gray-600">
            File: {value.name} ({value.type})
          </p>
        </td>
      </tr>
    );
  }

  // Handle boolean display
  let displayValue = value;
  if (typeof value === "boolean") {
    displayValue = value ? "Yes" : "No";
  }

  return (
    <tr key={key} className="border-b">
      <td className="font-medium py-2 pr-4">{label}</td>
      <td className="py-2">{displayValue || <span className="text-gray-400">—</span>}</td>
    </tr>
  );
};


export const renderMembersCards = (members) => {
  if (!Array.isArray(members) || members.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold text-lg mb-4">Members</h3>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Render normal member fields */}
            {Object.entries(member).map(([key, val]) => {
              // Skip documents object here
              if (key === "documents" && typeof val === "object" && val !== null) {
                return null;
              }

              const label = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

              return (
                <div key={key} className="flex justify-between mb-1">
                  <span className="font-medium text-sm">{label}:</span>
                  <span className="text-sm text-gray-700">
                    {val?.toString() || <span className="text-gray-400">—</span>}
                  </span>
                </div>
              );
            })}

            {/* Render documents as buttons */}
            {member.documents && typeof member.documents === "object" && (
              <div className="mt-2">
                <h4 className="font-medium text-sm mb-1">Documents:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(member.documents).map(([docName, docUrl]) => (
                    docUrl && (
                    <a
                      key={docName}
                      href={docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                    >
                      {docName.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
                    </a>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
