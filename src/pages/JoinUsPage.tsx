
import React, { useState } from 'react';
import PageHeader from '@/components/shared/PageHeader';
import Button from '@/components/shared/Button';
import { joinUsApi } from '@/services/api';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const JoinUsPage = () => {
  const { isLoading, setIsLoading } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'volunteer',
    skills: '',
    experience: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real application, this would send data to the backend
      // await joinUsApi.submitApplication(formData);
      console.log('Application submitted:', formData);
      
      // For now, simulating a successful submission
      setTimeout(() => {
        toast.success('Your application has been submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          interest: 'volunteer',
          skills: '',
          experience: '',
          message: '',
        });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('There was an error submitting your application. Please try again.');
      setIsLoading(false);
    }
  };

  const opportunities = [
    {
      title: 'Volunteer',
      description: 'Contribute your time and skills to help with events, programs, and daily operations.',
      commitment: 'Flexible, from a few hours per month to regular weekly involvement.',
      requirements: 'Enthusiasm, reliability, and a commitment to our mission.',
    },
    {
      title: 'Intern',
      description: 'Gain valuable experience working directly with our team on specific projects and initiatives.',
      commitment: 'Part-time or full-time positions available, typically 3-6 months.',
      requirements: 'Currently enrolled in or recently graduated from a relevant academic program.',
    },
    {
      title: 'Staff',
      description: 'Join our team in a professional capacity to help drive our mission forward.',
      commitment: 'Full-time and part-time positions based on organizational needs.',
      requirements: 'Relevant experience and qualifications for the specific role.',
    },
    {
      title: 'Partner',
      description: 'Collaborate with us as an organization to create greater impact through combined efforts.',
      commitment: 'Project-based or ongoing partnerships depending on goals and alignment.',
      requirements: 'Shared values and complementary mission and resources.',
    },
  ];

  return (
    <>
      <PageHeader 
        title="Join Our Team" 
        subtitle="Explore opportunities to contribute your talents and passion to our mission"
      />

      <section className="section container-narrow">
        <div className="mb-16">
          <h2 className="mb-6 text-center">Opportunities to Get Involved</h2>
          <p className="mb-10 text-center text-lg text-muted-foreground">
            We offer various ways to contribute to our mission, from volunteering to full-time roles.
            Find the opportunity that best fits your interests, skills, and availability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                <h3 className="mb-3">{opportunity.title}</h3>
                <p className="mb-4 text-muted-foreground">{opportunity.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Time Commitment:</span>{' '}
                    <span className="text-muted-foreground">{opportunity.commitment}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Requirements:</span>{' '}
                    <span className="text-muted-foreground">{opportunity.requirements}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-6 text-center">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg bg-brand-50 p-6 text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mb-2">Meaningful Work</h3>
              <p className="text-muted-foreground">
                Contribute to initiatives that create real, positive change in communities.
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 p-6 text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="mb-2">Professional Growth</h3>
              <p className="text-muted-foreground">
                Develop new skills and gain valuable experience in a supportive environment.
              </p>
            </div>
            <div className="rounded-lg bg-brand-50 p-6 text-center">
              <svg className="mx-auto mb-4 h-12 w-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mb-2">Diverse Community</h3>
              <p className="text-muted-foreground">
                Connect with passionate individuals from diverse backgrounds and perspectives.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-center">Apply to Join Us</h2>
          <form onSubmit={handleSubmit} className="mx-auto max-w-2xl rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="interest" className="mb-1 block text-sm font-medium">
                I'm Interested In*
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="volunteer">Volunteering</option>
                <option value="intern">Internship</option>
                <option value="staff">Staff Position</option>
                <option value="partner">Partnership</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="skills" className="mb-1 block text-sm font-medium">
                Skills & Expertise
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="e.g., Project Management, Graphic Design, Data Analysis"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="mb-1 block text-sm font-medium">
                Relevant Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Briefly describe any relevant experience or qualifications"
              ></textarea>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Why do you want to join us?*
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Tell us why you're interested in joining our organization and what you hope to contribute and gain"
              ></textarea>
            </div>

            <div className="text-center">
              <Button type="submit" size="lg" isLoading={isLoading}>
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default JoinUsPage;
