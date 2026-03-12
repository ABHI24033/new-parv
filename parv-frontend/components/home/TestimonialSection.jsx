'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BigHeading, Heading } from "../common/Common";
// import { useEffect, useState } from "react";
// import { getAllTestimonials } from "@/lib/actions/testimonials";

const testimonials = [
    {
        name: "Amit Kumar",
        location: "Patna, Bihar",
        rating: 5,
        description: "Parv Financial Services made getting a loan hassle-free. Their quick approval process and supportive staff ensured I got the funds I needed without any stress. Highly recommended! "
    },
    {
        name: "Priya Sharma",
        location: "Muzaffarpur, Bihar",
        rating: 5,
        description: "I'm really grateful to Parv Financial Services for helping me secure a loan when I needed it the most. Their transparency and professionalism stood out, making them my go-to financial partner."
    },
    {
        name: "Rahul Verma",
        location: "Gaya, Bihar",
        rating: 4,
        description: "As someone from Bihar, finding a reliable loan provider can be challenging. Parv Financial Services exceeded my expectations with their excellent customer service and competitive rates. Thank you!"
    },
    {
        name: "Sunita Devi",
        location: "Bhagalpur, Bihar",
        rating: 5,
        description: "Parv Financial Services understands the needs of customers like us in India. They provided personalized assistance and tailored solutions that fit perfectly with my financial situation. Definitely trustworthy!"
    },
    {
        name: "Vikash Singh",
        location: "Darbhanga, Bihar",
        rating: 4,
        description: "I couldn't have asked for a better experience with Parv Financial Services. Their efficient process and clear communication made obtaining a loan a straightforward process. I'm thankful for their support."
    }
]


export function TestimonialCard({ imgSrc, name, location, rating, description }) {
    return (
        <div className="break-inside-avoid p-4 rounded-lg bg-gradient-to-bl from-blue-50 to-white relative h-80 overflow-y-auto w-full">
            <div className="flex flex-wrap items-center gap-4">
                <img
                    src={imgSrc || '/user.png'}
                    alt={name}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h4 className="text-gray-800 text-sm whitespace-nowrap font-bold">{name}</h4>
                    <p className="mt-0.5 text-xs text-gray-500">{location}</p>
                </div>
            </div>
            <div className="flex space-x-1 mt-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                        key={index}
                        className={`w-3.5 ${index < rating ? "fill-purple-600" : "fill-gray-300"}`}
                        viewBox="0 0 14 13"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                ))}
            </div>
            <div className="mt-6">
                <p className="text-gray-800 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    );
}



const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="custom-arrow hidden md:block custom-prev"
            onClick={onClick}
            style={{
                position: "absolute",
                left: "-30px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
            }}
        >
            {/* ⬅️ */}
            <ChevronLeft size={30} className="text-gray-700" />
        </div>
    );
};


const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="custom-arrow hidden md:block custom-next"
            onClick={onClick}
            style={{
                position: "absolute",
                right: "-30px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 10,
            }}
        >
            {/* ➡️ */}
            <ChevronRight size={30} className="text-gray-700" />
        </div>
    );
};

export default function TestimonialSection() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        // arrows: false,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        customPaging: (i) => (
            <button className="w-4 h-4 rounded-full transition duration-300 "></button>
        ),
        appendDots: (dots) => (
            <div
                className="bg-red-800"
                style={{
                    // backgroundColor: "#fff",
                    borderRadius: "10px",
                    paddingTop: "10px"
                }}
            >
                <ul style={{ marginTop: "20px" }}> {dots} </ul>
            </div>
        ),
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };



    // call testimonials API
    // const [testimonials, setTestimonials] = useState([]);

    // useEffect(() => {
    //     const fetchTestimonials = async () => {
    //         const res = await getAllTestimonials();

    //         if (res.success) {
    //             setTestimonials(res.testimonials);
    //         } else {
    //             setError(res.message);
    //         }
    //     };

    //     fetchTestimonials();
    // }, []);

    return (
        <div className="bg-gradient-to-br from-blue-50 via-gray-50 to-teal-100 px-4 w-full">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="w-full flex justify-center mb-5">
                    <Heading text={"Testimonial"} />
                </div>
                <BigHeading className="text-center pb-9" text={'What Our Customers Say'} />
                <Slider {...settings}
                    className=" max-w-5xl bg-transparent"
                >
                    {testimonials?.map((testimonial, index) => (
                        <div key={index} className="px-2">
                            <TestimonialCard {...testimonial} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>

    );
}
