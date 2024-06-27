import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-white lg:mb-10 md:mb-4 mb-4 underline underline-offset-8">
          About Us
        </h1>
        <p className="text-lg text-white leading-relaxed">
          <Link href='/' className="cursor-pointer">G7cars Private Limited</Link> is a premier car rental service dedicated to providing customers with convenient and reliable transportation solutions. With a diverse fleet of vehicles, competitive pricing, and exceptional customer service, we strive to meet the needs of every traveler.
        </p>
        <p className="text-lg text-white leading-relaxed mt-4">
          Our mission is to make car rental easy and hassle-free. Whether you're traveling for business or leisure, we offer a seamless booking experience and flexible rental options to suit your needs. Our team is committed to ensuring your satisfaction every step of the way.
        </p>
        <p className="text-lg text-white leading-relaxed mt-4">
          At  <Link href='/' className="cursor-pointer">G7cars Private Limited</Link>, we prioritize safety and reliability. Our vehicles undergo regular maintenance and inspections to ensure they meet the highest standards of quality and safety. Additionally, our friendly and knowledgeable staff are always available to assist you with any questions or concerns.
        </p>
        <p className="text-lg text-white leading-relaxed mt-4">
          Thank you for choosing  <Link href='/' className="cursor-pointer">G7cars Private Limited</Link> for your car rental needs. We look forward to serving you and making your journey a memorable one.
        </p>
      </div>

      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">

      <h1 className="text-3xl font-semibold text-white lg:mb-10 md:mb-4 mb-4 underline underline-offset-8">
          Contact Us
        </h1>
        <p className="text-lg text-white leading-relaxed">
        If you have any questions or concerns regarding our refund policy, please contact us at 9133300025/9133300026 or email us on support@g7cars.com
        </p>
        </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
