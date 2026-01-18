import React from "react";

const bgImage =
  "https://importexportfederation.com/wp-content/uploads/2023/11/19964835_6184552.jpg";

const PageHeader = () => {
  return (
    <div
      className="relative h-[300px] w-full flex justify-center items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* content */}
      <div className="relative flex flex-col text-center px-4 sm:px-8 md:px-16">
        <h2 className="text-4xl md:text-6xl font-semibold text-white">
          Our Servives & Products
        </h2>
        <p className="text-lg text-white/80 md:w-[40%] mx-auto mt-4">
          At our, we provide comprehensive import and export solutions tailored
          to your business needs. From seamless international shipping to
          customs clearance, we ensure your goods reach their destination safely
          and on time. Trust us to simplify global trade and help your business
          grow worldwide
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
