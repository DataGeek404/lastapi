import React, { useState } from "react";
import { ProfileCard } from "../../components/shared/ProfileCard";
import { panelists } from '../../data/panelists'

export function LivedExperiencesPanel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((oldIndex) =>
      oldIndex === 0 ? panelists.length - 1 : oldIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((oldIndex) =>
      oldIndex === panelists.length - 1 ? 0 : oldIndex + 1
    );
  };

  return (
    <div className="w-full bg-[#31AC6E] py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Lived experiences panel
        </h2>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {panelists.map((panelist, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full px-4"
                style={{ minWidth: "100%" }}
              >
                <ProfileCard
                  name={panelist.name}
                  roles={panelist.roles}
                  points={panelist.points}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {/* <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 m-2 z-20"
          aria-label="Previous Slide"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 m-2 z-20"
          aria-label="Next Slide"
        >
          &#8594;
        </button> */}

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#31AC6E] to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#31AC6E] to-transparent z-10"></div>
      </div>
    </div>
  );
}