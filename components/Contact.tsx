import React from 'react';
import { LinkedInIcon, MailIcon } from './Icons';

interface ContactProps {
  contact: {
    email: string;
    linkedin: string;
  }
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
  return (
    <div className="max-w-3xl mx-auto text-center fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-title-color mb-4">
        Get In Touch
      </h2>
      <div className="h-1 w-24 bg-accent mx-auto mb-8"></div>
      <p className="text-lg text-secondary-color mb-10">
        I'm currently open to new opportunities and collaborations. Whether you have a question or just want to connect, feel free to reach out. I'll do my best to get back to you!
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <a 
          href={`mailto:${contact.email}`}
          className="inline-flex items-center px-6 py-3 bg-card text-primary-color font-semibold rounded-lg hover:bg-card-hover hover:text-title-color transition-all duration-300 w-full sm:w-auto justify-center"
        >
          <MailIcon className="w-6 h-6 mr-3" />
          {contact.email}
        </a>
        <a 
          href={contact.linkedin}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-accent text-slate-50 font-semibold rounded-lg hover:bg-accent-brighter transition-all duration-300 shadow-lg shadow-accent w-full sm:w-auto justify-center"
        >
          <LinkedInIcon className="w-6 h-6 mr-3" />
          Connect on LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Contact;