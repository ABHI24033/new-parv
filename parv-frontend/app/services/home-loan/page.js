import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import NavbarNew from "@/components/common/Navbar";
import UpperHeader from "@/components/common/UpperHeader";
import HomeLoanPage from "@/components/Services/pages/HomeLoanPage";


const Page= () => {
    return (
        <div className="flex min-h-screen flex-col bg-[linear-gradient(180deg,#eff6ff_0%,#f8fafc_28%,#ffffff_100%)]">
            <UpperHeader />
            <NavbarNew />
            <main className="mx-auto flex-1 w-full">
                <Header
                    title={'Home Loans'}
                    subTitle={'Get financing for the home you love with transparent rates, quick processing, and end-to-end guidance.'}
                />
                <HomeLoanPage />
            </main>
            <Footer />
        </div>
    )
};

export default Page;
