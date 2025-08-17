import React from 'react';
import { type SkillCategory } from '../types';
import * as Icons from './Icons';

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  Python: Icons.PythonIcon,
  JavaScript: Icons.JavaScriptIcon,
  Java: Icons.JavaIcon,
  TypeScript: Icons.TypeScriptIcon,
  Selenium: Icons.SeleniumIcon,
  Cypress: Icons.CypressIcon,
  Playwright: Icons.PlaywrightIcon,
  Pytest: Icons.PytestIcon,
  Docker: Icons.DockerIcon,
  Jenkins: Icons.JenkinsIcon,
  Git: Icons.GitIcon,
  AWS: Icons.AWSIcon,
  SQL: Icons.SqlIcon,
  RobotFramework: Icons.RobotFrameworkIcon,
  Appium: Icons.AppiumIcon,
  Boto3: Icons.Boto3Icon,
  JIRA: Icons.JiraIcon,
  Default: Icons.PlaceholderIcon
};

const getIcon = (name: string): React.FC<React.SVGProps<SVGSVGElement>> => {
    const normalizedName = name.replace(/\s/g, '');
    return iconMap[normalizedName] || iconMap.Default;
}

interface SkillsProps {
  categories: SkillCategory[];
}

const Skills: React.FC<SkillsProps> = ({ categories }) => {
  return (
    <div className="max-w-6xl mx-auto text-center fade-in-up">
      <h2 className="text-3xl md:text-4xl font-bold text-title-color mb-4">
        Technical Skills
      </h2>
      <div className="h-1 w-24 bg-accent mx-auto mb-12"></div>
      
      <div className="space-y-12">
        {categories.map((category, index) => (
          <div key={category.title} className="fade-in-up" style={{animationDelay: `${index * 150}ms`}}>
            <h3 className="text-2xl font-semibold text-accent mb-6">{category.title}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {category.skills.map((skill) => {
                const IconComponent = getIcon(skill.name);
                return (
                  <div key={skill.name} className="flex flex-col items-center justify-center w-32 h-32 p-4 bg-card rounded-lg transform hover:-translate-y-2 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-12 h-12 mb-2" />
                    <span className="text-primary-color font-medium">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;