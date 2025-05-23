
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/shared/Button';
import {motion} from 'framer-motion';
import heroVideo from '../../src/assets/ASTM-MAIN-VIDEO-INTRO.mp4'

const HomePage = () => {
  return (
    <>
    
      {/* Hero Section */}
      <section className="hero-section relative z-10 pb-40">
        <div className="container text-center">
          <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            We support African communities in tackling harmful substance use,
          strengthening mental health, and building systems of dignity & care for all.
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg md:text-xl text-gray-200">
            Join us in our mission to make the world a better place through
            collaboration, innovation, and community engagement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/about-us">
              <Button size="lg">Learn More</Button>
            </Link>
            <Link to="/support-us">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-700">
                Support Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Animated Video */}
  <motion.div
    className="relative z-20 px-4 sm:px-8"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    viewport={{ once: true }}
  >
    <div className="relative mx-auto -mt-32 mb-[-72px] max-w-7xl rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
      <video
        controls
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto object-cover"
        src={heroVideo}
      />
    </div>
  </motion.div>


      {/* Feature Section */}
      <section className="section relative z-10 pt-32">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="mb-4">What We Do</h2>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              Our organization focuses on key areas where we can make the most significant impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Community Outreach',
                description: 'Engaging with local communities to understand their needs and provide support.',
                link: '/our-pillars',
              },
              {
                title: 'Innovation & Research',
                description: 'Developing new approaches and solutions to address complex challenges.',
                link: '/approach',
              },
              {
                title: 'Education & Advocacy',
                description: 'Raising awareness and promoting policies that support sustainable development.',
                link: '/join-us',
              },
            ].map((feature, index) => (
              <div key={index} className="group rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="mb-4 text-muted-foreground">{feature.description}</p>
                <Link 
                  to={feature.link}
                  className="text-primary font-medium inline-flex items-center group-hover:underline"
                >
                  Learn more
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" 
                    fill="none"
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-brand-100 py-16">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Get Involved?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Whether you want to volunteer, donate, or partner with us, there are many ways
            to contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/join-us">
              <Button size="lg">Join Us</Button>
            </Link>
            <Link to="/support-us">
              <Button variant="secondary" size="lg">
                Make a Donation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
