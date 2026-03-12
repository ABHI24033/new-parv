import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import BusinessLoanPage from "@/components/Services/pages/BusinessLoanPage";

const BusinessLoan = () => {
    return (
        <div className="">
             <UpperHeader/>
            <NavbarNew />
            <main className="bg-gray-50">
                <Header
                    title={"Business Loan"}
                    subTitle={'Your Partner in Success: Customized Business Loans Designed to Meet Your Unique Needs, Helping You Scale New Heights and Achieve Long-Term Stability.'}
                    img={'/services/business-loan.png'}
                />
                <BusinessLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default BusinessLoan;