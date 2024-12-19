import React from "react";
import HomePagetopbar from "./HomepageTopbar.jsx";
import Footer from "./Footer.jsx";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-cyan-50 via-cyan-100 to-green-200">
      {/* Topbar */}
      <HomePagetopbar />

      {/* Content */}
      <div className="flex-1 px-8 py-12 mt-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-4xl font-bold mb-6 text-green-600 text-center">
            Privacy Policy
          </h1>
          <div className="overflow-y-auto max-h-[500px] space-y-6 text-justify">
            <p>
              At Quizmis, we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              Information We Collect
            </h2>
            <p>
              We collect personal information that you voluntarily provide to us
              when registering on the platform, such as your name, email
              address, and student ID. We also collect non-personal data, such
              as browser type, IP address, and website usage statistics.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              How We Use Your Information
            </h2>
            <p>
              We use your information to:
              <ul className="list-disc list-inside">
                <li>Provide and improve our services.</li>
                <li>Respond to inquiries and support requests.</li>
                <li>Send important updates and notifications.</li>
                <li>Ensure the security of our platform.</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              Third-Party Sharing
            </h2>
            <p>
              We do not sell or share your personal data with third parties
              except for necessary service providers, such as hosting platforms
              and analytics tools.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              Your Rights
            </h2>
            <p>
              You have the right to access, modify, or delete your personal
              information. If you have any concerns, please contact us at{" "}
              <a
                href="mailto:23103623@usc.edu.ph"
                className="text-green-500 underline"
              >
                23103623@usc.edu.ph
              </a>
              .
            </p>

            <p className="text-sm italic">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
