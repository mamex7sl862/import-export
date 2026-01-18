import React from "react";

const Location = () => {
  return (
    <section className="my-8 mx-auto max-w-4xl px-4">
      <h2 className="mb-4 text-2xl font-bold text-center">Our Location</h2>
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md">
        <iframe
          title="Ethiopian Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.304185416782!2d38.7469643!3d9.0301872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8530b1f5c7b1%3A0x4b7b63e0718f6a6f!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1701532145678!5m2!1sen!2sus"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Location;
