import React, { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import { type PortfolioData, type ThemeColors } from './types';

declare global {
  interface Window {
    VANTA: any;
  }
}

// Custom hook to detect when an element is in view
const useInView = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, inView];
};


const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    }
    return 'dark';
  });
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  // Fetch data and inject CSS variables from themeConfig
  useEffect(() => {
    fetch('/portfolio-data.json')
      .then(res => res.json())
      .then(jsonData => {
        setData(jsonData as PortfolioData);

        const { themeConfig } = jsonData as PortfolioData;
        
        const createCssVariables = (themeObject: ThemeColors) => {
            return Object.entries(themeObject)
                .map(([key, value]) => {
                    const cssVarName = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
                    if (key.startsWith('vanta')) return ''; // Filter out vanta-specific keys
                    return `    --${cssVarName}: ${value};`;
                })
                .filter(Boolean)
                .join('\n');
        };

        const darkVars = createCssVariables(themeConfig.dark);
        const lightVars = createCssVariables(themeConfig.light);
        
        const styleSheetContent = `
:root {
${darkVars}
}

html.light {
${lightVars}
}
        `.trim();
        
        let styleElement = document.getElementById('dynamic-theme-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'dynamic-theme-styles';
            document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = styleSheetContent;
      })
      .catch(err => console.error("Failed to load portfolio data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Manage 'light' class on html element and persist theme choice
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Manage Vanta.js background animation
  useEffect(() => {
    if (window.VANTA && data) {
      if (vantaEffect) {
        vantaEffect.destroy();
      }

      const currentThemeConfig = theme === 'light' ? data.themeConfig.light : data.themeConfig.dark;
      
      const newVantaEffect = window.VANTA.NET({
        el: "#bg-animation",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: parseInt(currentThemeConfig.vantaColor, 16),
        backgroundColor: parseInt(currentThemeConfig.vantaBgColor, 16),
        points: 10.00,
        maxDistance: 22.00,
        spacing: 16.00
      });

      setVantaEffect(newVantaEffect);
    }
    
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, data]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [aboutRef, aboutInView] = useInView({ threshold: 0.1 });
  const [expRef, expInView] = useInView({ threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1 });
  const [certsRef, certsInView] = useInView({ threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ threshold: 0.1 });

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-slate-400">Loading Portfolio...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Error: Portfolio data could not be loaded.</div>;
  }
  
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <div className="relative z-10">
        <Navbar name={data.personalInfo.name} links={navLinks} theme={theme} toggleTheme={toggleTheme} />
        <main className="container mx-auto px-6 md:px-12">
          <Hero personalInfo={data.personalInfo} />

          <section id="about" ref={aboutRef as React.RefObject<HTMLDivElement>} className={`py-20 transition-opacity duration-700 ${aboutInView ? 'opacity-100' : 'opacity-0'}`}>
            {aboutInView && <About content={data.about} />}
          </section>
          
          <section id="experience" ref={expRef as React.RefObject<HTMLDivElement>} className={`py-20 transition-opacity duration-700 ${expInView ? 'opacity-100' : 'opacity-0'}`}>
            {expInView && <Experience items={data.experience} />}
          </section>

          <section id="skills" ref={skillsRef as React.RefObject<HTMLDivElement>} className={`py-20 transition-opacity duration-700 ${skillsInView ? 'opacity-100' : 'opacity-0'}`}>
             {skillsInView && <Skills categories={data.skills} />}
          </section>

          <section id="projects" ref={projectsRef as React.RefObject<HTMLDivElement>} className={`py-20 transition-opacity duration-700 ${projectsInView ? 'opacity-100' : 'opacity-0'}`}>
             {projectsInView && <Projects projects={data.projects} />}
          </section>
          
          <section id="certifications" ref={certsRef as React.RefObject<HTMLDivElement>} className={`py-20 transition-opacity duration-700 ${certsInView ? 'opacity-100' : 'opacity-0'}`}>
             {certsInView && <Certifications items={data.certifications} />}
          </section>

          <section id="contact" ref={contactRef as React.RefObject<HTMLDivElement>} className={`py-20 transition-opacity duration-700 ${contactInView ? 'opacity-100' : 'opacity-0'}`}>
             {contactInView && <Contact contact={data.personalInfo.contact} />}
          </section>
        </main>
        <Footer contact={data.personalInfo.contact} name={data.personalInfo.name} />
      </div>
    </>
  );
};

export default App;