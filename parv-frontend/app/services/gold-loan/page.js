import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import GoldLoanPage from "@/components/Services/pages/GoldLoanPage";


const GoldLoan = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
            <UpperHeader />
            <NavbarNew />
            <main className="flex-1">
                <Header
                    title={"Gold Loan"}
                    subTitle={'Instant funds against your gold with high LTV, secure vaulting, and transparent charges.'}
                />
                <GoldLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default GoldLoan;
