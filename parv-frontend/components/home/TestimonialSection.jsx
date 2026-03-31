'use client'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amit Kumar",
    location: "Patna, Bihar",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    description: "Parv Financial Services made getting a loan hassle-free. Their quick approval process and supportive staff ensured I got the funds I needed without any stress. Highly recommended! "
  },
  {
    name: "Priya Sharma",
    location: "Muzaffarpur, Bihar",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    description: "I'm really grateful to Parv Financial Services for helping me secure a loan when I needed it the most. Their transparency and professionalism stood out, making them my go-to financial partner."
  },
  {
    name: "Rahul Verma",
    location: "Gaya, Bihar",
    rating: 4,
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    description: "As someone from Bihar, finding a reliable loan provider can be challenging. Parv Financial Services exceeded my expectations with their excellent customer service and competitive rates. Thank you!"
  },
  {
    name: "Sunita Devi",
    location: "Bhagalpur, Bihar",
    rating: 5,
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    description: "Parv Financial Services understands the needs of customers like us in India. They provided personalized assistance and tailored solutions that fit perfectly with my financial situation. Definitely trustworthy!"
  },
  {
    name: "Vikash Singh",
    location: "Darbhanga, Bihar",
    rating: 4,
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    description: "I couldn't have asked for a better experience with Parv Financial Services. Their efficient process and clear communication made obtaining a loan a straightforward process. I'm thankful for their support."
  }
]

export function TestimonialCard({ imgSrc, name, location, rating, description }) {
  return (
    <div className="h-full px-2">
      <div className="flex h-full min-h-[320px] flex-col rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={imgSrc || "/user.png"}
              alt={name}
              className="h-14 w-14 rounded-2xl object-cover ring-2 ring-blue-100"
            />
            <div>
              <h4 className="text-base font-black tracking-tight text-slate-900">{name}</h4>
              <p className="mt-1 text-sm text-slate-500">{location}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
            <Quote className="h-5 w-5" />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${index < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
            />
          ))}
        </div>

        <p className="flex-1 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

const ArrowButton = ({ direction = "left", onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-700 lg:flex ${
      direction === "left" ? "-left-5" : "-right-5"
    }`}
  >
    {direction === "left" ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
  </button>
);

export default function TestimonialSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <ArrowButton direction="left" />,
    nextArrow: <ArrowButton direction="right" />,
    customPaging: () => (
      <span className="block h-2.5 w-2.5 rounded-full bg-slate-300 transition-all" />
    ),
    appendDots: (dots) => (
      <div className="mt-8">
        <ul className="flex items-center justify-center gap-2">{dots}</ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 sm:p-6">
      <div className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-blue-100 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_28%),linear-gradient(135deg,#eff6ff_0%,#ffffff_100%)] p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Client Stories</p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            What Our Customers Say
          </h3>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          Discover how we've helped thousands of individuals and businesses across India secure their financial future with tailored loan options and dedicated customer support.
        </p>
      </div>

      <div className="relative">
        <Slider {...settings} className="testimonial-slider">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
