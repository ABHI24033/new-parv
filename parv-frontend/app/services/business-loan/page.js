import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import BusinessLoanPage from "@/components/Services/pages/BusinessLoanPage";

const BusinessLoan = () => {
    return (
        <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
            <UpperHeader />
            <NavbarNew />
            <main className="flex-1">
                <Header
                    title={"Business Loan"}
                    subTitle={'Your partner in growth: quick working capital, equipment finance, and expansion loans with transparent terms.'}
                />
                <BusinessLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default BusinessLoan;
