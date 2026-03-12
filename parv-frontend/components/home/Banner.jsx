import { CheckCircle } from "lucide-react";

const Banner = () => {
  return (
    <section className=" min-h-[90vh] bg-gradient-to-br from-blue-50 to-teal-50 py-10">
      <div className="container px-2 md:px-0 max-w-7xl mx-auto">
        <div className="grid mt-2 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-royal-blue-900 leading-tight font-poppins">
                Finance That{" "}
                <span className="text-[#f59e0b]">Empowers</span>{" "}
                You
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Affordable Home Loans, Vehicle Loans, and Gold Loans – All in One Place. Fast Approvals, Flexible EMI Plans, and Low Interest Rates.
              </p>
            </div>

            <div className="flex flex-col flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Quick Approval</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Minimal Documentation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Competitive Rates</span>
              </div>
            </div>
          </div>

          <div className="lg:justify-self-end animate-scale-in">
            <div className="relative">
              <img 
                // src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                // src={'/About/shopkeeper.webp'} 
                src={'/home.png'} 
                alt="Happy customer using financial services" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-royal-blue-600">₹50L+</div>
                <div className="text-sm text-gray-600">Loans Disbursed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
