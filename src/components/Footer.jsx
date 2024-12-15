import React from "react";
import { Link } from "react-router-dom";
import Logo from "/Logo.png"; 

const footerData = [
  {
    title: "Company",
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
    <footer className="bg-gray-900 text-gray-400">
      {/* Top Section */}
      <div className="mx-auto w-full max-w-screen-xl p-4 py-8 lg:py-14">
        <div className="md:flex md:justify-between">
          {/* Logo Section */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="h-14 me-3" alt="Quizmis Logo" />
              <span className="text-2xl font-semibold text-white">
                <span className="text-green-500">
                  <span className="text-red-500">Q</span>uizmis
                </span>
              </span>
            </Link>
          </div>

          {/* Dynamic Footer Links */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {footerData.map((section, idx) => (
              <div key={idx}>
                <h2 className="mb-4 text-sm font-semibold uppercase text-white">
                  {section.title}
                </h2>
                <ul>
                  {section.links.map((link, i) => (
                    <li key={i} className="mb-3">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
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
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © {new Date().getFullYear()} Quizmis Inc. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-4">
            {/* Facebook */}
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Facebook page"
                className="hover:text-white"
            >
                <i className="fa-brands fa-facebook-f text-lg"></i>
            </a> 

            {/* Discord */}
            <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord server"
                className="hover:text-white"
            >
                <i className="fa-brands fa-discord text-lg"></i>
            </a>

            {/* Twitter */}
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our Twitter page"
                className="hover:text-white"
            >
                <i className="fa-brands fa-twitter text-lg"></i>
            </a>

            {/* GitHub */}
            <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our GitHub repository"
                className="hover:text-white"
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
