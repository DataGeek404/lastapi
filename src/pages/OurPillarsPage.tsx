
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';

const OurPillarsPage = () => {
  const pillars = [
    {
      title: 'Sustainability',
      description: 'Promoting practices that ensure environmental, social, and economic sustainability for future generations.',
      icon: (
        <svg className="h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      description: 'Developing and implementing creative solutions to address complex challenges facing our communities.',
      icon: (
        <svg className="h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
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

      <section className="section bg-brand-50">
        <div className="container-narrow">
          <h2 className="mb-6 text-center">How Our Pillars Drive Impact</h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="mb-4">Integrated Approach</h3>
              <p className="text-muted-foreground">
                Our pillars don't work in isolation. They form an integrated approach that allows us to address
                complex challenges from multiple angles. By combining sustainability with innovation, and ensuring
                equity within community-centered solutions, we create more effective and lasting impact.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="mb-4">Measurable Outcomes</h3>
              <p className="text-muted-foreground">
                Each pillar has associated metrics and goals that help us track our progress and ensure
                accountability. We regularly evaluate our work against these benchmarks to refine our
                approach and maximize our impact.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="mb-4">Collaborative Implementation</h3>
              <p className="text-muted-foreground">
                We bring our pillars to life through partnerships with community organizations, government
                agencies, businesses, and individuals who share our vision. By working together, we leverage
                diverse perspectives and resources to create more comprehensive solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurPillarsPage;
