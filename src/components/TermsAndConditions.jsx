import React from "react";
import HomePagetopbar from "./HomepageTopbar.jsx";
import Footer from "./Footer.jsx";

const TermsAndConditions = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-cyan-50 via-cyan-100 to-green-200">
      {/* Topbar */}
      <HomePagetopbar />

      {/* Content */}
      <div className="flex-1 px-8 py-12 mt-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-4xl font-bold mb-6 text-green-600 text-center">
            Terms and Conditions
          </h1>
          <div className="overflow-y-auto max-h-[500px] space-y-6 text-justify">
            <p>
              Welcome to Quizmis! By using our platform, you agree to comply
              with and be bound by the following terms and conditions. Please
              read them carefully.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              User Responsibilities
            </h2>
            <p>
              You agree to:
              <ul className="list-disc list-inside">
                <li>Use the platform responsibly and ethically.</li>
                <li>Provide accurate and complete information during sign-up.</li>
                <li>Not attempt to disrupt or harm the platform in any way.</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              Intellectual Property
            </h2>
            <p>
              All content, including text, graphics, logos, and software, is the
              property of Quizmis or its licensors and is protected by
              copyright.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              Limitation of Liability
            </h2>
            <p>
              Quizmis is not responsible for any loss or damage resulting from
              the use of our platform. Use the platform at your own risk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-700">
              Changes to Terms
            </h2>
            <p>
              Quizmis reserves the right to update these terms at any time.
              Continued use of the platform constitutes acceptance of the
              updated terms.
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

export default TermsAndConditions;
