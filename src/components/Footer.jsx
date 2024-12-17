import React from "react";
import { Link } from "react-router-dom";
import Logo from "/assets/QuizmisBrand.svg"; 

const footerData = [
  {
    title: "Team",
    links: [
      { name: "About Us", url: "/about" },
      { name: "Contact Us", url: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Terms and Conditions", url: "/terms-and-conditions" },
      { name: "Privacy Policy", url: "/privacypolicy" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#FFFFF0] text-gray-400 border-t">
      {/* Top Section */}
      <div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-14">
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="h-14 me-3" alt="Quizmis Logo" />
            </Link>
          </div>

          {/* Dynamic Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 text-center">
            {footerData.map((section, idx) => (
              <div key={idx}>
                <h2 className="mb-4 text-md font-bold uppercase text-[#02A850]">
                  {section.title}
                </h2>
                <ul>
                  {section.links.map((link, i) => (
                    <li key={i} className="mb-3">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-[#46b87b]"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 sm:mx-auto border-[#62d899] lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center text-[#02A850]">
            © {new Date().getFullYear()} Quizmis Team. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-4">
            {/* Facebook */}
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="hover:text-[#6cbb91] text-[#02A850]"
            >
                <i className="fa-brands fa-facebook-f text-lg"></i>
            </a> 

            {/* Discord */}
            <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord server"
                className="hover:text-[#6cbb91] text-[#02A850]"
            >
                <i className="fa-brands fa-discord text-lg"></i>
            </a>

            {/* Twitter */}
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page"
                className="hover:text-[#6cbb91] text-[#02A850]"
            >
                <i className="fa-brands fa-twitter text-lg"></i>
            </a>

            {/* GitHub */}
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub repository"
                className="hover:text-[#6cbb91] text-[#02A850]"
            >
                <i className="fa-brands fa-github text-lg"></i>
            </a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
