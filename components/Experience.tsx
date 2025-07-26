import React, { useState } from 'react';
import { type ExperienceItem } from '../types';
import { ChevronDownIcon } from './Icons';

interface ExperienceProps {
  items: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-title-color mb-4 text-center">
        Work Experience
      </h2>
      <div className="h-1 w-24 bg-accent mx-auto mb-12"></div>
      
      <div className="relative border-l-2 border-main ml-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="mb-6 ml-8">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-card rounded-full -left-4 ring-4 ring-main">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
              </span>
              
              <div 
                className="cursor-pointer"
                onClick={() => handleToggle(index)}
                aria-expanded={isOpen}
                aria-controls={`experience-panel-${index}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle(index)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-title-color">
                      {item.role} 
                      <span className="text-accent mx-2">@</span> 
                      {item.company}
                    </h3>
                    <time className="block mt-1 text-sm font-normal leading-none text-slate-500">{item.period}</time>
                  </div>
                  <ChevronDownIcon 
                    className={`w-6 h-6 text-secondary-color transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </div>
              </div>

              <div 
                id={`experience-panel-${index}`}
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-2 text-secondary-color list-disc list-inside">
                    {item.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;