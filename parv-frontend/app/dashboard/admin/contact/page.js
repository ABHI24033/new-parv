"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, User } from "lucide-react";
import { getAllContactSubmissions } from "@/lib/actions/admin";

const ContactCardList = ({ contacts }) => {
    console.log("Contacts:", contacts);
    if (!contacts || contacts.length === 0) {
        return <p className="text-gray-500 text-sm">No contact messages found.</p>;
    }


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts?.map((contact, index) => (
                <Card key={index} className="p-4 shadow-md">
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 font-semibold">
                            <User size={16} /> {contact.name}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <Phone size={14} /> {contact.phone}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <Mail size={14} /> {contact.email}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                            <MapPin size={14} /> {contact.street}, {contact.city} - {contact.postcode}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Message:</span> <br />
                            {contact.message}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};



const AdminContactPage = () => {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch contacts from API or Firestore
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await getAllContactSubmissions();
                if(res?.success) {
                    setContactData(res?.data);
                }
            } catch (error) {
                console.error("Failed to fetch contact messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

            {loading ? (
                <p className="text-gray-500">Loading messages...</p>
            ) : (
                <ContactCardList contacts={contactData} />
            )}
        </div>
    );
};
export default AdminContactPage;

