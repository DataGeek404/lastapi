/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PageHeader from '../../src/components/shared/PageHeader'; // Adjusted for React
import whoWeAre from '../../src/assets/peeps.jpg';
import mission from '../../src/assets/IMG_9282.jpg';
import vision from '../../src/assets/IMG_9307.jpg';
import director1 from '../../src/assets/Ellipse 10.png';
import director2 from '../../src/assets/Ellipse 12.png';
import director3 from '../../src/assets/Ellipse 11.png';
import akidwa from '../../src/assets/Rectangle 29.png';
import wezesha from '../../src/assets/Rectangle 27.png';
import safety from '../../src/assets/Rectangle 28.png';
import zen from '../../src/assets/Rectangle 40.png';
import freedom from '../../src/assets/Logo 1.png';


const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Maryanne M. Karanja',
      position: 'left',
      bio: 'Co-Founder Africa Street Medicine Therapy. Counselling psychologist. Founder of Freedom Lounge. Musician. Marketer.',
      image: director1,
    },
    {
      name: 'Joyce Igogo',
      position: 'right',
      bio: 'John leads our program development and implementation efforts with a focus on sustainable impact.',
      image: director2,
    },
    {
      name: 'Dr. Salome Mbugua Henry',
      position: 'center',
      bio: 'Emily builds and maintains our relationships with community partners and stakeholders.',
      image: director3,
    },
    // {
    //   name: 'Michael Chen',
    //   position: 'Research Director',
    //   bio: 'Michael oversees our research initiatives and ensures our work is informed by the latest evidence.',
    //   image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    // },
  ];

  return (
    <>
      {/* <PageHeader
        title="About Us"
        subtitle="Our story, mission, and the dedicated team behind our organization"
      /> */}

      {/* WHO WE ARE */}
      <section className="py-12 bg-[#1D204B] text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-semibold">Who Are We</h2>
          <img
            src={whoWeAre}
            alt="Who we are"
            className="mx-auto mb-6 w-full max-w-3xl rounded-lg"
          />
          <div className="space-y-4 text-lg">
            <p>
              Street Medicine Africa (SMA) is a collaborative initiative tackling
              illicit alcohol and substance abuse across Kenya and beyond. Launched
              in 2024 under Wezesha, it brings together medical and mental health
              professionals, NGOs, stakeholders, and educators to promote access to
              preventive mental health and addiction care for marginalized and vulnerable communities.
            </p>
            <p>
              Throughout our journey, we've remained committed to our core values of equity
              and community engagement. These principles have guided our growth and
              impact over the years.
            </p>
            <p>
              Today, we work with partners across sectors to develop and implement solutions that create
              positive, lasting change. Our approach combines rigorous research, creative problem-solving,
              and deep community involvement to ensure our initiatives are effective and sustainable.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 space-y-16">
          {/* Vision First */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="mb-4 text-4xl font-bold text-[#31AC6E]">Our Vision</h3>
              <p className="text-lg">
                A world where all communities are resilient, inclusive, and thriving,
                with resources and opportunities accessible to everyone.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={vision}
                alt="Vision"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Mission Second */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={mission}
                alt="Mission"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
            <div>
              <h3 className="mb-4 text-4xl font-bold text-[#31AC6E]">Our Mission</h3>
              <p className="text-lg">
                To create sustainable, equitable communities through innovative solutions
                and collaborative partnerships that empower individuals and strengthen the social fabric.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-[#31AC6E]">Board of Directors</h2>

          {/* Top Row: First and Second Director */}
          <div className="flex justify-center gap-20 flex-wrap mb-12">
            {/* First Director - Left */}
            <div className="max-w-xs flex flex-col items-center text-center">
              <div className="mb-4 h-36 w-36 md:h-40 md:w-40 rounded-full border-4 border-[#31AC6E] overflow-hidden">
                <img src={teamMembers[0].image} alt={teamMembers[0].name} className="h-full w-full object-cover" />
              </div>
              <h4 className="mb-1 text-lg font-bold text-[#31AC6E]">{teamMembers[0].name}</h4>
              <p className="text-sm text-gray-600 text-justify">{teamMembers[0].bio}</p>
            </div>

            {/* Second Director - Right */}
            <div className="max-w-xs flex flex-col items-center text-center">
              <div className="mb-4 h-36 w-36 md:h-40 md:w-40 rounded-full border-4 border-[#31AC6E] overflow-hidden">
                <img src={teamMembers[1].image} alt={teamMembers[1].name} className="h-full w-full object-cover" />
              </div>
              <h4 className="mb-1 text-lg font-bold text-[#31AC6E]">{teamMembers[1].name}</h4>
              <p className="text-sm text-gray-600 text-justify">{teamMembers[1].bio}</p>
            </div>
          </div>

          {/* Bottom Row: Center Director */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="mb-4 h-36 w-36 md:h-40 md:w-40 rounded-full border-4 border-[#31AC6E] overflow-hidden">
                <img src={teamMembers[2].image} alt={teamMembers[2].name} className="h-full w-full object-cover" />
              </div>
              <h4 className="mb-1 text-lg font-bold text-[#31AC6E]">{teamMembers[2].name}</h4>
              <p className="text-sm text-gray-600 text-justify">{teamMembers[2].bio}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-[#1D204B] text-3xl md:text-4xl font-bold text-center mb-16">
            Our Partners
          </h2>
        </div>

        <div
          className="slider"
          style={{
            // These CSS variables are used in index.css for animations
            ['--width' as any]: '200px',
            ['--height' as any]: '100px',
            ['--quantity' as any]: 10, // 5 partners repeated twice
          }}
        >
          <div className="list">
            {[akidwa, wezesha, safety, zen, freedom, akidwa, wezesha, safety, zen, freedom].map((logo, index) => (
              <div
                className="item"
                key={index}
                style={{ ['--position' as any]: index + 1 }}
              >
                <img src={logo} alt={`Partner ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutUsPage;
