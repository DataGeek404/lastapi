
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, bgImage }) => {
  const bgStyle = bgImage 
    ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <div 
      className="hero-section" 
      style={bgStyle}
    >
      <div className="container text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-200">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
