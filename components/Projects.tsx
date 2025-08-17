import React from 'react';
import { type Project } from '../types';
import { GitHubIcon, ExternalLinkIcon } from './Icons';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="max-w-6xl mx-auto text-center fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-title-color mb-4">
        Featured Projects
      </h2>
      <div className="h-1 w-24 bg-accent mx-auto mb-12"></div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="bg-card rounded-lg p-6 flex flex-col justify-between shadow-lg hover:shadow-accent/10 transform hover:-translate-y-2 transition-all duration-300 fade-in-up text-left"
            style={{animationDelay: `${index * 150}ms`}}
          >
            <div>
              <h3 className="text-xl font-bold text-title-color mb-3">{project.title}</h3>
              <p className="text-secondary-color mb-4 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-card-hover text-accent text-xs font-semibold rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-secondary-color hover:text-accent transition-colors duration-300">
                  <GitHubIcon className="w-6 h-6" />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-secondary-color hover:text-accent transition-colors duration-300">
                  <ExternalLinkIcon className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;