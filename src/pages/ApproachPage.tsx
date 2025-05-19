
import React from 'react';
import PageHeader from '@/components/shared/PageHeader';

const ApproachPage = () => {
  const methodologies = [
    {
      title: 'Research & Analysis',
      description: 'We conduct thorough research to understand the root causes of challenges and identify effective solutions.',
      steps: [
        'Problem identification and scoping',
        'Literature review and best practice analysis',
        'Data collection and analysis',
        'Synthesis of findings and recommendations',
      ],
    },
    {
      title: 'Collaborative Design',
      description: 'We work closely with communities and stakeholders to co-create solutions that meet real needs.',
      steps: [
        'Stakeholder mapping and engagement',
        'Participatory workshops and design sessions',
        'Prototype development and testing',
        'Iterative refinement based on feedback',
      ],
    },
    {
      title: 'Implementation & Support',
      description: 'We provide resources, training, and ongoing support to ensure successful implementation.',
      steps: [
        'Resource mobilization and allocation',
        'Capacity building and skills training',
        'Phased implementation with regular check-ins',
        'Troubleshooting and adaptive management',
      ],
    },
    {
      title: 'Monitoring & Evaluation',
      description: 'We continuously monitor progress and evaluate outcomes to measure impact and inform improvements.',
      steps: [
        'Development of performance indicators',
        'Data collection systems and protocols',
        'Regular performance reviews',
        'Impact assessment and reporting',
      ],
    },
  ];

  return (
    <>
      <PageHeader 
        title="Our Approach" 
        subtitle="How we work to create sustainable, community-centered solutions"
      />

      <section className="section container-narrow">
        <div className="mb-16">
          <h2 className="mb-6 text-center">Our Methodology</h2>
          <p className="mb-8 text-center text-lg text-muted-foreground">
            We employ a systematic, evidence-based approach that empowers communities and
            ensures sustainable outcomes. Our methodology combines rigorous research with
            collaborative processes that center the voices and experiences of those we serve.
          </p>

          <div className="space-y-12">
            {methodologies.map((method, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-2">{method.title}</h3>
                <p className="mb-4 text-muted-foreground">{method.description}</p>
                <div className="ml-4 border-l-2 border-brand-200 pl-4">
                  <h4 className="mb-2 text-sm font-semibold text-muted-foreground">Key Steps:</h4>
                  <ul className="space-y-1 text-sm">
                    {method.steps.map((step, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500"></span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center">Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-2">Community-Centered</h3>
              <p className="text-muted-foreground">
                We believe that effective solutions must be rooted in the knowledge, needs, and
                aspirations of the communities we serve. We prioritize local leadership and ensure
                that community members are active participants in all phases of our work.
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-2">Evidence-Based</h3>
              <p className="text-muted-foreground">
                Our initiatives are informed by rigorous research and data analysis. We continually
                evaluate our work to measure impact and refine our approaches based on evidence
                of what works.
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-2">Systems-Focused</h3>
              <p className="text-muted-foreground">
                We recognize that social challenges are often the result of complex, interconnected
                systems. Our approach addresses root causes and works to transform the underlying
                structures that perpetuate problems.
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 p-6">
              <h3 className="mb-2">Adaptive & Iterative</h3>
              <p className="text-muted-foreground">
                We embrace flexibility and continuous learning. Our approach allows for
                experimentation, feedback, and adjustment as we implement solutions in
                dynamic and evolving contexts.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-center">Our Theory of Change</h2>
          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
            <p className="mb-6 text-muted-foreground">
              Our theory of change maps out how our activities lead to our desired outcomes and
              long-term impact. It serves as a roadmap for our work and a framework for measuring
              our progress.
            </p>
            
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-16 sm:left-24 border-l-2 border-dashed border-brand-300"></div>
              
              <div className="mb-8 ml-24 sm:ml-32">
                <div className="absolute left-12 sm:left-20 -mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">1</div>
                <h4 className="mb-2">Inputs</h4>
                <p className="text-sm text-muted-foreground">
                  Resources, expertise, partnerships, and community engagement that fuel our work.
                </p>
              </div>
              
              <div className="mb-8 ml-24 sm:ml-32">
                <div className="absolute left-12 sm:left-20 -mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">2</div>
                <h4 className="mb-2">Activities</h4>
                <p className="text-sm text-muted-foreground">
                  Research, collaborative design, capacity building, and implementation support.
                </p>
              </div>
              
              <div className="mb-8 ml-24 sm:ml-32">
                <div className="absolute left-12 sm:left-20 -mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">3</div>
                <h4 className="mb-2">Outputs</h4>
                <p className="text-sm text-muted-foreground">
                  Trained individuals, implemented programs, developed resources, and established systems.
                </p>
              </div>
              
              <div className="mb-8 ml-24 sm:ml-32">
                <div className="absolute left-12 sm:left-20 -mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">4</div>
                <h4 className="mb-2">Outcomes</h4>
                <p className="text-sm text-muted-foreground">
                  Changes in knowledge, attitudes, behaviors, and practices among individuals and communities.
                </p>
              </div>
              
              <div className="ml-24 sm:ml-32">
                <div className="absolute left-12 sm:left-20 -mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white">5</div>
                <h4 className="mb-2">Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Long-term, sustainable improvements in community well-being, resilience, and equity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApproachPage;
