import React from "react";
import Marquee from "@/components/ui/marquee";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Dummy testimonials
// Dummy testimonials
const testimonials = [
  {
    name: "Abebe Bekele",
    feedback:
      "Excellent import/export service! Timely delivery and professional team.",
  },
  {
    name: "Saba Desta",
    feedback:
      "Smooth process and great communication. Highly recommend their services.",
  },
  {
    name: "Kebede Alemu",
    feedback:
      "Reliable and trustworthy import/export partner. Will work with them again.",
  },
  {
    name: "Hana Tadesse",
    feedback: "Amazing support and prompt delivery. Very satisfied!",
  },
];

const TestimonialMarquee = () => {
  return (
    <section className="mt-14 w-full px-4 sm:px-6 lg:px-8">
      <header className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Our Client Testimonials
        </h2>
      </header>

      <Marquee className="[--duration:25s]" pauseOnHover>
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="w-[250px] md:w-[300px] mx-3 p-4 shadow-md hover:shadow-xl transition-shadow rounded-xl bg-white dark:bg-muted"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {testimonial.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {testimonial.feedback}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </Marquee>
    </section>
  );
};

export default TestimonialMarquee;
