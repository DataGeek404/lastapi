
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/shared/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="lg">Return to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
