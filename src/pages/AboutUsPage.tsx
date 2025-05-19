
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: 'Jane Doe',
      position: 'Executive Director',
      bio: 'Jane has over 15 years of experience in nonprofit leadership and community development.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    
    {
      name: 'John Smith',
      position: 'Program Director',
      bio: 'John leads our program development and implementation efforts with a focus on sustainable impact.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Emily Johnson',
      position: 'Community Outreach Manager',
      bio: 'Emily builds and maintains our relationships with community partners and stakeholders.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Michael Chen',
      position: 'Research Director',
      bio: 'Michael oversees our research initiatives and ensures our work is informed by the latest evidence.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <>
      <PageHeader 
        title="About Us" 
        subtitle="Our story, mission, and the dedicated team behind our organization"
      />

      <section className="section container-narrow">
        <div className="mb-16">
          <h2 className="mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-lg">
            <p>
              Founded in 2010, our organization began with a simple idea: that collective action and
              innovative thinking could address some of the most pressing challenges facing our communities.
              What started as a small group of passionate individuals has grown into a dynamic organization
              with a global reach.
            </p>
            <p>
              Throughout our journey, we've remained committed to our core values of sustainability,
              innovation, equity, and community engagement. These principles have guided our growth and
              impact over the years.
            </p>
            <p>
              Today, we work with partners across sectors to develop and implement solutions that create
              positive, lasting change. Our approach combines rigorous research, creative problem-solving,
              and deep community involvement to ensure our initiatives are effective and sustainable.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-50 p-6 rounded-lg">
              <h3 className="mb-4 text-center">Mission</h3>
              <p className="text-center">
                To create sustainable, equitable communities through innovative solutions
                and collaborative partnerships that empower individuals and strengthen social fabric.
              </p>
            </div>
            <div className="bg-brand-50 p-6 rounded-lg">
              <h3 className="mb-4 text-center">Vision</h3>
              <p className="text-center">
                A world where all communities are resilient, inclusive, and thriving,
                with resources and opportunities accessible to everyone.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="mb-1">{member.name}</h4>
                <p className="mb-2 text-sm font-medium text-brand-600">{member.position}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-800 text-white">
        <div className="container-narrow text-center">
          <h2 className="mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="mb-2 text-4xl font-bold">50+</p>
              <p className="text-lg">Community Projects</p>
            </div>
            <div>
              <p className="mb-2 text-4xl font-bold">10,000+</p>
              <p className="text-lg">People Reached</p>
            </div>
            <div>
              <p className="mb-2 text-4xl font-bold">25+</p>
              <p className="text-lg">Partner Organizations</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
