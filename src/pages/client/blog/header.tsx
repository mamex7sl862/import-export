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
          Our Blogs
        </h2>
        <p className="text-lg text-white/80 md:w-[40%] mx-auto mt-4">
          Stay updated with the latest insights, trends, and tips in global
          trade and logistics. Our blog covers everything from import/export
          regulations to industry news, helping your business stay informed and
          competitive in the world of international commerce
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
