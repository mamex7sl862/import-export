import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      image:
        "https://importexportfederation.com/wp-content/uploads/2023/11/19964835_6184552.jpg",
      title: "Global Import & Export Solutions",
      subtitle:
        "Streamline your international trade with our comprehensive logistics platform",
    },
    {
      image:
        "https://thumbs.dreamstime.com/b/logistics-import-export-background-transport-industry-container-cargo-freight-ship-sunset-sky-137520342.jpg",
      title: "Efficient Customs Clearance",
      subtitle:
        "Navigate complex regulations with our expert customs specialists",
    },
    {
      image:
        "https://www.liveabout.com/thmb/BYh6KTfgBsD9J4r9VlhW5fO8-bs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/143920491-56a50e453df78cf7728621bc.jpg",
      title: "Secure Storage & Handling",
      subtitle: "State-of-the-art facilities for your valuable goods",
    },
  ];

  const navigate = useNavigate();

  // Preload all images to prevent white flash
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full h-[60dvh] md:h-[80dvh] overflow-hidden bg-background">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative h-full flex flex-col items-center justify-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: index === currentSlide ? 0 : 20,
                opacity: index === currentSlide ? 1 : 0,
              }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center max-w-2xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-balance">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty">
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => {
                  navigate("/services");
                }}
              >
                Explore Services
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setAutoPlay(false);
            }}
            className={`h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
