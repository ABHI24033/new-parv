import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import PersonalLoanPage from "@/components/Services/pages/PersonalLoan";

const PersonalLoan = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
      <UpperHeader />
      <NavbarNew />
      <main className="flex-1">
        <Header
          title={"Personal Loan"}
          subTitle={"Fast, flexible personal loans for life's big moments—transparent rates and minimal documentation."}
        />
        <PersonalLoanPage />
      </main>
      <Footer />
    </div>
  );
};

export default PersonalLoan;
