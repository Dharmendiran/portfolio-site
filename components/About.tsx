
import React from 'react';

interface AboutProps {
  content: string[];
}

const About: React.FC<AboutProps> = ({ content }) => {
  return (
    <div className="max-w-4xl mx-auto text-center fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-title-color mb-4">
        About Me
      </h2>
      <div className="h-1 w-24 bg-accent mx-auto mb-8"></div>
      {content.map((paragraph, index) => (
        <p key={index} className="text-lg text-secondary-color leading-relaxed mt-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default About;