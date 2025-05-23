import { useState } from 'react';
import { ProfileCard } from '../shared/ProfileCard'; // Make sure this path is correct
import { speakers } from '../../data/speakersData'; // Update this path to where your speaker data is stored

export function KeynoteSpeakers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? speakers.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === speakers.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full bg-[#1D204B] py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-16">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center">
          Keynote speakers & speeches
        </h2>
      </div>
      <div className="relative max-w-4xl mx-auto">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full px-4"
                style={{ minWidth: '100%' }}
              >
                <ProfileCard
                  name={speaker.name}
                  roles={speaker.roles}
                  points={speaker.points}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 m-2 z-20"
          aria-label="Previous Speaker"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 m-2 z-20"
          aria-label="Next Speaker"
        >
          &#8594;
        </button>

        {/* Gradients */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1D204B] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1D204B] to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}