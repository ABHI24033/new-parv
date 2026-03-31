import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import GroupLoanPage from "@/components/Services/pages/GroupLoanPage";


const GroupLoan = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
            <UpperHeader />
            <NavbarNew />
            <main className="flex-1">
                <Header 
                    title={"Group Loan"} 
                    subTitle={"Empower your community with transparent, doorstep group loans and continuous support."}
                />
                <GroupLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default GroupLoan;
