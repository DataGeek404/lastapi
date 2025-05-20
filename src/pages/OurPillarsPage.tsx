
import React from 'react';
import PageHeader from '../../src/components/shared/PageHeader';
import themeImage1 from '../../src/assets/Rectangle 9.png';
import themeImage2 from '../../src/assets/Rectangle 11.png';
import themeImage3 from '../../src/assets/Rectangle 13.png';
import { motion } from 'framer-motion';


const OurPillarsPage = () => {
  const pillars = [
    // {
    //   title: 'Sustainability',
    //   description: 'Promoting practices that ensure environmental, social, and economic sustainability for future generations.',
    //   icon: (
    //     <svg className="h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    //     </svg>
    //   ),
    // },
    // {
    //   title: 'Innovation',
    //   description: 'Developing and implementing creative solutions to address complex challenges facing our communities.',
    //   icon: (
    //     <svg className="h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    //     </svg>
    //   ),
    // },
    {
      title: 'Equity',
      description: 'Ensuring fair treatment, access, opportunity, and advancement for all people in our programs and initiatives.',
      icon: (
        <svg className="h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: 'Community',
      description: 'Building strong, resilient communities through collaboration, participation, and shared responsibility.',
      icon: (
        <svg className="h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <PageHeader 
        title="Our Pillars" 
        subtitle="The core principles that guide our work and drive our mission forward"
      />

      <section className="section container-narrow">
        <div className="mb-12 text-center">
          <p className="text-lg text-muted-foreground">
            Our organization is built on a foundation of key principles that inform everything we do.
            These pillars represent our values and guide our approach to creating positive change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-brand-100 p-4">
                {pillar.icon}
              </div>
              <h3 className="mb-2">{pillar.title}</h3>
              <p className="text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-[#40B4E7]">
        <div className="container-narrow">
          <h2 className="mb-12 text-center text-[#1D204B]">How Our Pillars Drive Impact</h2>

          <div className="space-y-12">
            {/* Theme 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-2 h-48 rounded-xl overflow-hidden">
                <img src={themeImage1} alt="Healing on the Margins" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl text-[#1D204B]">
                <h3 className="text-xl font-bold mb-3">
                  1. Healing on the Margins: Community-Led Solutions to Substance Use
                </h3>
                <p className="text-sm">
                  Focus: Centering the voices and expertise of those working directly with 
                  vulnerable populations, including street-connected individuals, to address 
                  substance abuse through practical, localized interventions.
                </p>
              </div>
            </motion.div>

            {/* Theme 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl text-[#1D204B]">
                <h3 className="text-xl font-bold mb-3">
                  2. Bridging Gaps: Collaboration, Care, & Change in Street Medicine
                </h3>
                <p className="text-sm">
                  Focus: Encouraging cross-sector collaboration among healthcare providers, 
                  social workers, and grassroots organizations to build integrated, holistic 
                  approaches to families and communities affected by alcohol addiction and drug abuse. 
                </p>
              </div>
              <div className="md:col-span-2 h-48 rounded-xl overflow-hidden">
                <img src={themeImage2} alt="Bridging Gaps" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Theme 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
            >
              <div className="md:col-span-2 h-48 rounded-xl overflow-hidden">
                <img src={themeImage3} alt="Resilience and Recovery" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-3 bg-[#FFFFFF47] p-6 rounded-xl text-[#1D204B]">
                <h3 className="text-xl font-bold mb-3">
                  3. Resilience and Recovery: Reimagining Health for Vulnerable Communities
                </h3>
                <p className="text-sm">
                  Focus: Highlighting the strength and potential of marginalized groups 
                  while exploring innovative, culturally rooted recovery and mental health 
                  strategies in African contexts.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
};

export default OurPillarsPage;
