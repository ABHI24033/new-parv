import React from 'react';
import { Sparkles, ShieldCheck, Building2 } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left Text Content */}
          <div className="space-y-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                <Sparkles className="h-4 w-4" />
                Our Story
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                A catalyst for change, a beacon of hope.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p>
                Step into the vibrant world of <strong className="font-bold text-slate-900">PARV FINANCIAL SERVICES</strong>
                (a unit of PARV MULTI SERVICES), a rapidly ascending brand with a mission to weave a tapestry of positive impact
                in the lives of individuals. Our journey commenced on <strong className="font-bold text-slate-900">November 25, 2021</strong>,
                fueled by a vision to touch the lives of people and provide assistance in every possible manner.
              </p>

              <p>
                We take pride in our dynamic and youthful energy, cultivating an environment where innovation and compassion intertwine seamlessly.
                Our extensive team comprises experienced and professional individuals who bring a wealth of expertise to the table.
                Together, we form a collective powerhouse dedicated to crafting a better tomorrow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <ShieldCheck className="h-8 w-8 shrink-0 text-blue-600" />
                <div>
                  <h4 className="font-bold text-slate-900">Secure Solutions</h4>
                  <p className="mt-1 text-sm text-slate-500">Providing financial safety you can rely on.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <Building2 className="h-8 w-8 shrink-0 text-blue-600" />
                <div>
                  <h4 className="font-bold text-slate-900">Expert Team</h4>
                  <p className="mt-1 text-sm text-slate-500">A powerhouse of professional expertise.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-100 ring-1 ring-slate-200 sm:aspect-[3/4] lg:aspect-[4/5] xl:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Corporate colleagues discussing financial goals"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-slate-900/10" />
            </div>
            {/* Floating glass card */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/40 bg-white/80 p-5 shadow-2xl backdrop-blur-md sm:block lg:-left-12">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                  <span className="font-bold leading-none">2021</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Established</p>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">Rapidly Ascending Brand</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;
