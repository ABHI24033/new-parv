export default function WhyChooseUs() {
  return (
    <div className="overflow-hidden relative rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 shadow-[0_18px_50px_rgba(37,99,235,0.20)] group">
      {/* Background image overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />

      <div className="relative z-10 p-8 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-100">Why Choose Parv Financial Services</p>
        <h3 className="mt-3 text-3xl font-black tracking-tight">Your trusted partner in financial growth.</h3>
        <p className="mt-4 text-sm leading-7 text-blue-50/80">
          We believe in empowering individuals and businesses with fast, transparent, and structured lending solutions.
        </p>
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p className="text-sm font-bold">Fast Approvals</p>
            <p className="mt-1 text-sm text-blue-50/75">Minimal documentation and swift processing times for all loan types.</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p className="text-sm font-bold">Transparent Rates</p>
            <p className="mt-1 text-sm text-blue-50/75">No hidden charges or surprise fees. Clear terms from start to finish.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
