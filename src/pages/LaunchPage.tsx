
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Button from '@/components/shared/Button';
import { Link } from 'react-router-dom';

const LaunchPage = () => {
  const launchSteps = [
    {
      title: 'Idea Development',
      description: 'Refine your concept and develop a clear vision for your initiative.',
      icon: (
        <svg className="h-10 w-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Feasibility Assessment',
      description: 'Evaluate the practical, financial, and logistical aspects of your project.',
      icon: (
        <svg className="h-10 w-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Strategic Planning',
      description: 'Develop a comprehensive plan with clear goals, timelines, and resource requirements.',
      icon: (
        <svg className="h-10 w-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: 'Resource Mobilization',
      description: 'Secure the necessary funding, partnerships, and support for your initiative.',
      icon: (
        <svg className="h-10 w-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Implementation',
      description: 'Launch your project with ongoing support and guidance from our team.',
      icon: (
        <svg className="h-10 w-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Monitoring & Growth',
      description: 'Track progress, evaluate impact, and scale your initiative for maximum effect.',
      icon: (
        <svg className="h-10 w-10 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  const resources = [
    {
      title: 'Project Planning Toolkit',
      description: 'A comprehensive guide to help you plan and structure your initiative.',
    },
    {
      title: 'Funding Directory',
      description: 'A curated list of potential funding sources for different types of projects.',
    },
    {
      title: 'Mentorship Program',
      description: 'Connect with experienced professionals who can guide your journey.',
    },
    {
      title: 'Technical Assistance',
      description: 'Access specialized expertise in areas such as technology, design, and evaluation.',
    },
  ];

  return (
    <>
      <PageHeader 
        title="Launch Your Initiative" 
        subtitle="Get the support you need to bring your ideas to life and create positive change"
      />

      <section className="section container-narrow">
        <div className="mb-16">
          <h2 className="mb-6 text-center">How It Works</h2>
          <p className="mb-10 text-center text-lg text-muted-foreground">
            Our launch program provides a structured pathway to help you develop, refine,
            and implement your community initiative. Here's what the process looks like:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {launchSteps.map((step, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="mb-2 text-center">{step.title}</h3>
                <p className="text-center text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center">Resources & Support</h2>
          <p className="mb-10 text-center text-lg text-muted-foreground">
            We offer a variety of resources and support services to help you at every stage of your journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="rounded-lg bg-brand-50 p-6">
                <h3 className="mb-2">{resource.title}</h3>
                <p className="text-muted-foreground">{resource.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 rounded-lg bg-brand-100 p-8">
          <h2 className="mb-4 text-center">Success Stories</h2>
          <div className="mb-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2">Community Garden Initiative</h3>
              <p className="mb-4 text-muted-foreground">
                "With the support of the Launch program, we were able to transform an abandoned lot
                into a thriving community garden that now provides fresh produce for over 100 families
                and serves as a gathering space for neighborhood events."
              </p>
              <p className="font-medium">- Maria Rodriguez, Project Leader</p>
            </div>
          </div>
          <div className="text-center">
            <Button variant="outline">Read More Success Stories</Button>
          </div>
        </div>

        <div className="rounded-lg bg-brand-700 p-8 text-center text-white">
          <h2 className="mb-4">Ready to Launch Your Initiative?</h2>
          <p className="mb-6 mx-auto max-w-2xl">
            Apply to our Launch program today and take the first step toward making your vision a reality.
            Our team is ready to support you throughout your journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/join-us">
              <Button className="bg-white text-brand-700 hover:bg-gray-100">Apply Now</Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LaunchPage;
