import React, { useState } from "react";
import { db } from "../Firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import emailjs from "@emailjs/browser";
import HomePagetopbar from "./HomepageTopbar.jsx";
import Footer from "./Footer.jsx";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    address: "",
    concern: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace these with your EmailJS credentials
    const serviceID = "Quizmis_id";
    const templateID = "template_g8x9j5u";
    const publicKey = "2nXvTplIybebk5X59";

    try {
      // Send email using EmailJS
      await emailjs.send(
        serviceID,
        templateID,
        {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          concern: formData.concern,
        },
        publicKey
      );

      // Store data into Firestore under "Contact_Us"
      await addDoc(collection(db, "Contact_Us"), formData);

      // Reset form and show success message
      setSuccessMessage("Form submitted successfully!");
      setErrorMessage("");
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        address: "",
        concern: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to submit form. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-100 to-green-100 text-gray-800">
      {/* Topbar */}
      <HomePagetopbar />

      {/* Content Section */}
      <div className="flex-1 container mx-auto px-6 py-12 mt-16">
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-green-600 mb-8 text-center">
          Get In <span className="text-gray-800">Touch</span>
        </h1>
        <p className="text-lg text-center mb-12 text-gray-600">
          Have questions? Reach out to us through the form or the details below!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Contact Information
            </h2>
            <p className="mb-2">
              <strong className="text-green-600">Address:</strong>{" "}
              <span className="text-gray-600">
                9W27+R8R, Sitio Nasipit, Brgy, Cebu City
              </span>
            </p>
            <p className="mb-2">
              <strong className="text-green-600">Phone:</strong>{" "}
              <span className="text-gray-600">(032) 230 0100</span>
            </p>
            <p className="mb-2">
              <strong className="text-green-600">Email:</strong>{" "}
              <a
                href="mailto:23103623@usc.edu.ph"
                className="text-green-500 hover:underline"
              >
                23103623@usc.edu.ph
              </a>
            </p>
            <p>
              <strong className="text-green-600">Hours:</strong>{" "}
              <span className="text-gray-600">Mon - Fri, 8:00 AM - 5:00 PM</span>
            </p>
          </div>

          {/* Form Section */}
          <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                {/* Middle Name */}
                <div>
                  <label className="block text-gray-700 mb-1">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="D."
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@usc.edu.ph"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your Address"
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Concern */}
              <div>
                <label className="block text-gray-700 mb-1">Your Concern</label>
                <textarea
                  name="concern"
                  value={formData.concern}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe your concern..."
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              {/* Success or Error Message */}
              {successMessage && (
                <p className="text-green-500 text-center">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
              )}

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactUs;
