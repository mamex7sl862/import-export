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
          Get in Touch
        </h2>
        <p className="text-lg text-white/80 md:w-[40%] mx-auto mt-4">
          We're here to help with your import and export needs. Reach out to our
          team and we'll get back to you within 24 hours.{" "}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
