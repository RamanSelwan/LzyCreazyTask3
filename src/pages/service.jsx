import React from "react";
import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaSearch,
  FaPaintBrush,
  FaBullhorn,
  FaPencilRuler,
  FaPenFancy,
  FaCloud,
} from "react-icons/fa";

const services = [
  { icon: <FaLaptopCode />, title: "Web Dev", link: "/web-development" },
  { icon: <FaMobileAlt />, title: "Mobile", link: "/mobile-apps" },
  { icon: <FaSearch />, title: "SEO", link: "/seo-services" },
  { icon: <FaPaintBrush />, title: "Design", link: "/design" },
  { icon: <FaBullhorn />, title: "Marketing", link: "/marketing" },
  { icon: <FaPencilRuler />, title: "Branding", link: "/branding" },
  { icon: <FaPenFancy />, title: "Writing", link: "/content-writing" },
  { icon: <FaCloud />, title: "Cloud", link: "/cloud-solutions" },
];

export default function Services() {
  const radius = 200;
  const count = services.length;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className=" bg-white text-orange-600 text-xl font-bold px-4 py-2 rounded shadow-lg">
        Our Services
      </div>
      {/* Circular container with rotation that pauses on hover */}
      <div className="relative w-[600px] h-[600px] rounded-full group">
        {/* Center Heading */}
        <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2  text-orange-600 text-xl font-bold px-4 py-2 rounded ">
          Our Services
        </div>

        {/* Rotating icons */}
        <div className="absolute inset-0 animate-spin-slow group-hover:animate-none">
          {services.map((service, index) => {
            const angle = (360 / count) * index;
            const x = radius * Math.cos((angle * Math.PI) / 180);
            const y = radius * Math.sin((angle * Math.PI) / 180);

            return (
              <div
                key={index}
                className="absolute flex flex-col items-center"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Link
                  to={service.link}
                  className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition duration-300 shadow-lg"
                >
                  {service.icon}
                </Link>
                <div className="mt-2 text-xs bg-white px-2 py-1 rounded shadow text-black">
                  {service.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
