import React from 'react';
import { type CertificationItem } from '../types';
import { CertificationIcon, ExternalLinkIcon } from './Icons';

interface CertificationsProps {
  items: CertificationItem[];
}

const Certifications: React.FC<CertificationsProps> = ({ items }) => {
  return (
    <div className="max-w-4xl mx-auto fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-title-color mb-4 text-center">
        Licenses & Certifications
      </h2>
      <div className="h-1 w-24 bg-accent mx-auto mb-12"></div>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="bg-card p-6 rounded-lg flex items-start space-x-6 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex-shrink-0">
                <CertificationIcon className="w-10 h-10 text-accent" />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg text-title-color">{item.name}</h3>
              <p className="text-secondary-color">{item.issuer}</p>
              <p className="text-slate-500 text-sm mt-1">{item.date}</p>
            </div>
            <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label="View Credential" className="text-secondary-color hover:text-accent transition-colors">
              <ExternalLinkIcon className="w-6 h-6" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;