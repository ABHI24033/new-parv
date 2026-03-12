import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import GroupLoanPage from "@/components/Services/pages/GroupLoanPage";


const GoldLoan = () => {
    return (
        <div>
             <UpperHeader/>
            <NavbarNew />
            <main className=" bg-gray-50">
                {/* <Header
                    title={"Gold Loan"}
                    subTitle={'Your Partner in Success: Customized Business Loans Designed to Meet Your Unique Needs, Helping You Scale New Heights and Achieve Long-Term Stability.'}
                    img={'/services/gold-loan.png'}
                /> */}
                <GroupLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default GoldLoan;