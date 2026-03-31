import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import VehicleLoanPage from "@/components/Services/pages/VehicleLoanPage";

const VehicleLoan = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
            <UpperHeader />
            <NavbarNew />
            <main className="flex-1 w-full">
                <Header
                    title={"Vehicle Loan"}
                    subTitle={'Drive your next vehicle with high LTV, low down payments, and quick approvals.'}
                />
                <VehicleLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default VehicleLoan;
