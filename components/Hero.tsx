

import React from 'react';
import { type PersonalInfo } from '../types';
import { DownloadIcon } from './Icons';

interface HeroProps {
  personalInfo: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  return (
    <section id="home" className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen text-center md:text-left">
      <div className="max-w-2xl animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-black text-title-color leading-tight tracking-tighter">
          {personalInfo.name}
          <br/>
          <span className="text-accent text-glow">{personalInfo.title}</span>
        </h1>
        <p className="mt-6 text-lg text-secondary-color">
          {personalInfo.bio}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 text-center bg-accent text-slate-50 font-semibold rounded-lg hover:bg-accent-brighter transition-all duration-300 shadow-lg shadow-accent"
          >
            View My Work
          </a>
          {personalInfo.resume && (
             <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              download="Dharmendiran_E_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-card text-primary-color font-semibold rounded-lg hover:bg-card-hover transition-all duration-300"
            >
              <DownloadIcon className="w-5 h-5 mr-2 -ml-1" />
              Download CV
            </a>
          )}
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 text-center bg-card text-primary-color font-semibold rounded-lg hover:bg-card-hover transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
      <div className="mb-10 md:mb-0 md:ml-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-card border-4 border-accent-translucent flex items-center justify-center overflow-hidden">
            {personalInfo.headshot ? (
                <img src={personalInfo.headshot} alt={personalInfo.name} className="w-full h-full object-cover" />
            ) : (
                <span className="text-secondary-color">Headshot</span>
            )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
