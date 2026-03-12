import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

// Initial data - in production, this would come from API/server actions
const initialKpiData = {
  clientCount: 128,
  activeLoans: 56,
  portfolioValue: 4_250_000,
  meetingsToday: 6,
};

const initialRevenueSeries = [
  { month: "Jan", revenue: 300000 },
  { month: "Feb", revenue: 280000 },
  { month: "Mar", revenue: 350000 },
  { month: "Apr", revenue: 370000 },
  { month: "May", revenue: 420000 },
  { month: "Jun", revenue: 450000 },
  { month: "Jul", revenue: 480000 },
  { month: "Aug", revenue: 520000 },
  { month: "Sep", revenue: 500000 },
  { month: "Oct", revenue: 540000 },
  { month: "Nov", revenue: 560000 },
  { month: "Dec", revenue: 600000 },
];

const initialClients = [
  { id: "C-1001", name: "Ramesh Kumar", phone: "+91 98765 43210", status: "Active", loan: "Gold Loan", outstanding: 120000, nextMeeting: "2025-11-18 10:00" },
  { id: "C-1002", name: "Sita Sharma", phone: "+91 91234 56789", status: "Prospect", loan: "Personal Loan", outstanding: 0, nextMeeting: "2025-11-19 14:00" },
  { id: "C-1003", name: "Amit Singh", phone: "+91 99887 77665", status: "Active", loan: "Gold Loan", outstanding: 450000, nextMeeting: "2025-11-17 16:30" },
  { id: "C-1004", name: "Neha Verma", phone: "+91 90123 45678", status: "NPA", loan: "Business Loan", outstanding: 0, nextMeeting: "TBD" },
];

const initialActivities = [
  { id: 1, time: "09:10", text: "Called Ramesh about KYC docs", type: "call" },
  { id: 2, time: "10:00", text: "Scheduled meeting with Amit for loan review", type: "meeting" },
  { id: 3, time: "11:20", text: "Uploaded documents for Sita", type: "upload" },
  { id: 4, time: "14:30", text: "Escalated late payment for Neha", type: "escalation" },
];

export function useRMDashboard() {
  const router = useRouter();
  
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [kpiData, setKpiData] = useState(initialKpiData);
  const [clients, setClients] = useState(initialClients);
  const [activities, setActivities] = useState(initialActivities);
  const [notificationCount, setNotificationCount] = useState(3);

  // Load saved notes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("rm_dashboard_notes");
    if (saved) {
      try {
        setSavedNotes(JSON.parse(saved));
      } catch (error) {
        console.error("Error loading saved notes:", error);
      }
    }
  }, []);

  // Filter clients based on search query
  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) {
      return clients;
    }
    
    const query = searchQuery.toLowerCase();
    return clients.filter((client) => {
      return (
        client.name.toLowerCase().includes(query) ||
        client.phone.includes(query) ||
        client.id.toLowerCase().includes(query) ||
        client.loan.toLowerCase().includes(query) ||
        client.status.toLowerCase().includes(query)
      );
    });
  }, [clients, searchQuery]);

  // Get today's meetings
  const todaysMeetings = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return clients
      .filter((client) => {
        if (client.nextMeeting === "TBD") return false;
        const meetingDate = client.nextMeeting.split(" ")[0];
        return meetingDate === today;
      })
      .map((client) => ({
        time: client.nextMeeting.split(" ")[1] || "TBD",
        name: client.name,
        purpose: client.loan,
      }))
      .sort((a, b) => {
        if (a.time === "TBD" || b.time === "TBD") return 0;
        return a.time.localeCompare(b.time);
      });
  }, [clients]);

  // Search handler
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Note handlers
  const handleNoteChange = useCallback((e) => {
    setNote(e.target.value);
  }, []);

  const handleSaveNote = useCallback(() => {
    if (!note.trim()) return;
    
    const newNote = {
      id: Date.now(),
      text: note,
      timestamp: new Date().toISOString(),
    };
    
    const updatedNotes = [newNote, ...savedNotes].slice(0, 10); // Keep last 10 notes
    setSavedNotes(updatedNotes);
    localStorage.setItem("rm_dashboard_notes", JSON.stringify(updatedNotes));
    setNote("");
    
    // Add activity
    setActivities((prev) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
        text: "Saved a quick note",
        type: "note",
      },
      ...prev,
    ].slice(0, 10));
  }, [note, savedNotes]);

  // Navigation handlers
  const handleViewSchedule = useCallback(() => {
    // Navigate to schedule page - adjust route as needed
    router.push("/dashboard/rm/schedule");
  }, [router]);

  const handleNewClient = useCallback(() => {
    router.push("/dashboard/rm/clients/new");
  }, [router]);

  const handleLogPayment = useCallback(() => {
    router.push("/dashboard/rm/payments/log");
  }, [router]);

  const handleRaiseEscalation = useCallback(() => {
    router.push("/dashboard/rm/escalations/new");
  }, [router]);

  const handleNewLead = useCallback(() => {
    router.push("/dashboard/rm/leads/new");
  }, [router]);

  const handlePayment = useCallback(() => {
    router.push("/dashboard/rm/payments");
  }, [router]);

  const handleDocuments = useCallback(() => {
    router.push("/dashboard/rm/documents");
  }, [router]);

  const handleReports = useCallback(() => {
    router.push("/dashboard/rm/reports");
  }, [router]);

  const handleNotifications = useCallback(() => {
    router.push("/dashboard/rm/notifications");
    setNotificationCount(0);
  }, [router]);

  const handleClientClick = useCallback((clientId) => {
    router.push(`/dashboard/rm/clients/${clientId}`);
  }, [router]);

  return {
    // Data
    kpiData,
    revenueSeries: initialRevenueSeries,
    clients: filteredClients,
    activities,
    todaysMeetings,
    savedNotes,
    notificationCount,
    
    // Search
    searchQuery,
    handleSearchChange,
    
    // Notes
    note,
    handleNoteChange,
    handleSaveNote,
    
    // Navigation handlers
    handleViewSchedule,
    handleNewClient,
    handleLogPayment,
    handleRaiseEscalation,
    handleNewLead,
    handlePayment,
    handleDocuments,
    handleReports,
    handleNotifications,
    handleClientClick,
  };
}
