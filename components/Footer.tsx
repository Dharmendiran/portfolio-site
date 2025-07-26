import React from 'react';
import { GitHubIcon, LinkedInIcon } from './Icons';

interface FooterProps {
    name: string;
    contact: {
        github: string;
        linkedin: string;
    }
}

const Footer: React.FC<FooterProps> = ({ name, contact }) => {
  return (
    <footer className="bg-main border-t border-main mt-20">
      <div className="container mx-auto py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <p className="text-slate-500 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} {name}. All Rights Reserved.
        </p>
        <div className="flex items-center space-x-6">
          <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 hover:text-accent transition-colors duration-300">
            <GitHubIcon className="w-6 h-6" />
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 hover:text-accent transition-colors duration-300">
            <LinkedInIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;