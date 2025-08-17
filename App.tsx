
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
import { type PortfolioData, type ThemeColors, type ThemeConfig, type VantaEffect } from './types';
import ThemeCustomizer from './components/ThemeCustomizer';
import Chatbot from './components/Chatbot';
import { SparklesIcon } from './components/Icons';
import BackgroundAnimation from './components/BackgroundAnimation';

// --- Helper functions for color manipulation ---
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const shadeColor = (color: string, percent: number): string => {
  const f = hexToRgb(color);
  if (!f) return color;
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  const R = Math.round(f.r + (t - f.r) * p);
  const G = Math.round(f.g + (t - f.g) * p);
  const B = Math.round(f.b + (t - f.b) * p);
  return rgbToHex(R, G, B);
};

const hexToRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

const generateDerivedColors = (mode: 'light' | 'dark', baseColors: ThemeColors): ThemeColors => {
    const { bgColor, textPrimary, accentColor } = baseColors;
    const rgbAccent = hexToRgb(accentColor);
    const accentRgbString = rgbAccent ? `${rgbAccent.r}, ${rgbAccent.g}, ${rgbAccent.b}` : '100, 255, 218';
    
    if (mode === 'dark') {
        return {
            ...baseColors,
            textSecondary: shadeColor(textPrimary, -0.3),
            textTitle: shadeColor(textPrimary, -0.1),
            borderColor: shadeColor(bgColor, 0.4),
            cardBg: hexToRgba(shadeColor(bgColor, 0.15), 0.75),
            cardBgHover: hexToRgba(shadeColor(bgColor, 0.3), 0.75),
            accentColorTranslucent: hexToRgba(accentColor, 0.5),
            accentGlow: `0 0 12px rgba(${accentRgbString}, 0.4), 0 0 28px rgba(${accentRgbString}, 0.2)`,
            accentShadow: `0 4px 14px 0 rgba(${accentRgbString}, 0.15)`,
            accentHoverBg: hexToRgba(accentColor, 0.1),
            scrollbarTrack: bgColor,
            scrollbarThumb: shadeColor(bgColor, 0.4),
            scrollbarThumbHover: shadeColor(textPrimary, -0.4),
            headerBg: hexToRgba(bgColor, 0.85),
        };
    } else { // light mode
        return {
            ...baseColors,
            textSecondary: shadeColor(textPrimary, 0.2), 
            textTitle: shadeColor(textPrimary, -0.3),
            borderColor: shadeColor(bgColor, -0.1),
            cardBg: shadeColor(bgColor, 1),
            cardBgHover: shadeColor(bgColor, -0.05),
            accentColorTranslucent: hexToRgba(accentColor, 0.5),
            accentGlow: `0 0 12px rgba(${accentRgbString}, 0.2)`,
            accentShadow: `0 4px 14px 0 rgba(${accentRgbString}, 0.15)`,
            accentHoverBg: hexToRgba(accentColor, 0.1),
            scrollbarTrack: shadeColor(bgColor, -0.1),
            scrollbarThumb: shadeColor(bgColor, -0.2),
            scrollbarThumbHover: shadeColor(bgColor, -0.4),
            headerBg: hexToRgba(bgColor, 0.85),
        };
    }
};

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
      return storedTheme === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [isThemeCustomizerOpen, setIsThemeCustomizerOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const [vantaEffect, setVantaEffect] = useState<VantaEffect>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return (localStorage.getItem('vantaEffect') as VantaEffect) || 'FOG';
    }
    return 'FOG';
  });

  useEffect(() => {
    fetch('/portfolio-data.json')
      .then(res => res.json())
      .then(jsonData => {
        const portfolioData = jsonData as PortfolioData;
        setData(portfolioData);

        const savedThemeConfigStr = localStorage.getItem('portfolio_theme_config');
        
        setThemeConfig(savedThemeConfigStr ? JSON.parse(savedThemeConfigStr) : portfolioData.themeConfig);
      })
      .catch(err => console.error("Failed to load portfolio data:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!themeConfig) return;

    const createCssVariables = (themeObject: ThemeColors) => {
      return Object.entries(themeObject)
        .map(([key, value]) => {
          const cssVarName = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
          return `    --${cssVarName}: ${value};`;
        })
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
  }, [themeConfig]);


  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('vantaEffect', vantaEffect);
  }, [vantaEffect]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleThemeChange = (mode: 'light' | 'dark', key: keyof ThemeColors, value: string) => {
    setThemeConfig(currentConfig => {
        if (!currentConfig) return null;

        const oldModeColors = currentConfig[mode];
        const newModeColors = { ...oldModeColors, [key]: value };

        let finalModeColors: ThemeColors;
        const isBaseColorChange = key === 'bgColor' || key === 'textPrimary' || key === 'accentColor';

        if (isBaseColorChange) {
            const derived = generateDerivedColors(mode, newModeColors);
            if (oldModeColors.vantaBgColor === oldModeColors.bgColor) {
                derived.vantaBgColor = derived.bgColor;
            }
            if (oldModeColors.vantaColor === oldModeColors.accentColor) {
                derived.vantaColor = derived.accentColor;
            }
            finalModeColors = derived;
        } else {
            finalModeColors = newModeColors;
        }

        const newConfig = { ...currentConfig, [mode]: finalModeColors };
        localStorage.setItem('portfolio_theme_config', JSON.stringify(newConfig));
        return newConfig;
    });
  };

  const handleResetTheme = () => {
    if (!data) return;
    setThemeConfig(data.themeConfig);
    localStorage.removeItem('portfolio_theme_config');
  };

  const [aboutRef, aboutInView] = useInView({ threshold: 0.1 });
  const [expRef, expInView] = useInView({ threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.1 });
  const [certsRef, certsInView] = useInView({ threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ threshold: 0.1 });

  if (loading || !data || !themeConfig) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-slate-400 bg-main">Loading Portfolio...</div>;
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
      <BackgroundAnimation 
        theme={theme}
        themeConfig={themeConfig}
        vantaEffect={vantaEffect}
      />
      <ThemeCustomizer 
        isOpen={isThemeCustomizerOpen}
        onClose={() => setIsThemeCustomizerOpen(false)}
        themeConfig={themeConfig}
        onThemeChange={handleThemeChange}
        onReset={handleResetTheme}
        currentVantaEffect={vantaEffect}
        onVantaEffectChange={setVantaEffect}
      />
       <Chatbot 
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          portfolioData={data}
        />
      <div className="relative z-10">
        <Navbar 
          name={data.personalInfo.name} 
          links={navLinks} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          onToggleThemeCustomizer={() => setIsThemeCustomizerOpen(true)}
        />
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
      <button
          onClick={() => setIsChatbotOpen(true)}
          className={`fixed bottom-6 right-6 bg-accent text-white p-4 rounded-full shadow-lg hover:bg-accent-brighter transition-all transform duration-300 z-50 ${isChatbotOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
          aria-label="Open AI assistant"
      >
          <SparklesIcon className="w-6 h-6" />
      </button>
    </>
  );
};

export default App;