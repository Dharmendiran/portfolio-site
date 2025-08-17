import React, { useEffect, useRef } from 'react';
import { type ThemeConfig, type VantaEffect } from '../types';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

interface BackgroundAnimationProps {
  theme: 'light' | 'dark';
  themeConfig: ThemeConfig;
  vantaEffect: VantaEffect;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ theme, themeConfig, vantaEffect }) => {
  const vantaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect hook handles the lifecycle of the Vanta.js instance.
    // It creates an instance when dependencies change and cleans it up
    // via the returned cleanup function.

    let vantaInstance: any = null;
    // If an effect is selected (and not 'NONE'), we create the animation.
    if (vantaEffect !== 'NONE' && window.VANTA && vantaContainerRef.current) {
      const VantaConstructor = window.VANTA[vantaEffect];
      if (typeof VantaConstructor === 'function') {
        const currentThemeColors = themeConfig[theme];
        // Vanta expects colors as hex numbers, not strings.
        const color = parseInt(currentThemeColors.vantaColor.replace(/^#/, '0x'));
        const backgroundColor = parseInt(currentThemeColors.vantaBgColor.replace(/^#/, '0x'));
        const accentColor = parseInt(currentThemeColors.accentColor.replace(/^#/, '0x'));

        // Base configuration for all Vanta effects
        const baseConfig = {
          el: vantaContainerRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
        };

        // Effect-specific configurations
        let effectConfig = {};

        switch(vantaEffect) {
          case 'NET':
            effectConfig = { color, backgroundColor, points: 10.00, maxDistance: 22.00, spacing: 16.00 };
            break;
          case 'WAVES':
            effectConfig = { color, backgroundColor, shininess: 30.00, waveHeight: 15.00, waveSpeed: 0.75, zoom: 0.85 };
            break;
          case 'DOTS':
            effectConfig = { color, color2: accentColor, backgroundColor, size: 3, spacing: 30.00 };
            break;
          case 'FOG':
            effectConfig = { highlightColor: accentColor, lowlightColor: color, baseColor: backgroundColor, blurFactor: 0.6, speed: 1.2, zoom: 0.8 };
            break;
          case 'CLOUDS':
            effectConfig = { skyColor: backgroundColor, cloudColor: color, cloudShadowColor: accentColor, sunColor: 0xffffff, sunGlareColor: 0xffffff, sunLightColor: 0xffffff, speed: 1.0 };
            break;
          case 'CLOUDS2':
            effectConfig = { backgroundColor, color1: color, color2: accentColor, speed: 1.0 };
            break;
          case 'GLOBE':
             effectConfig = { color, color2: accentColor, backgroundColor, size: 1.0 };
             break;
          case 'BIRDS':
            effectConfig = { color1: color, color2: accentColor, backgroundColor, birdSize: 1.00, wingSpan: 20.00, speedLimit: 4.00, separation: 20.00, alignment: 20.00, cohesion: 20.00 };
            break;
          case 'CELLS':
            effectConfig = { color1: color, color2: accentColor, backgroundColor, size: 2.0, speed: 1.0 };
            break;
          case 'TRUNK':
            effectConfig = { color, backgroundColor, spacingX: 20.00, spacingY: 20.00, chaos: 2.0 };
            break;
          case 'TOPOLOGY':
            effectConfig = { color, backgroundColor };
            break;
          case 'HALO':
            effectConfig = { baseColor: accentColor, backgroundColor, amplitudeFactor: 1.5, size: 1.2 };
            break;
          case 'RINGS':
            effectConfig = { color: accentColor, backgroundColor };
            break;
          case 'RIPPLE':
            effectConfig = { color1: color, color2: accentColor, backgroundColor, frequency: 3.00, scale: 1.0 };
            break;
          default:
             break; // Do nothing for invalid effects
        }

        try {
          vantaInstance = VantaConstructor({ ...baseConfig, ...effectConfig });
        } catch (e) {
          console.error(`Vanta.js effect "${vantaEffect}" initialization failed:`, e);
        }
      } else {
        console.error(`Vanta.js effect "${vantaEffect}" not found or is not a function.`);
      }
    }

    // The cleanup function is crucial. It's called by React on component unmount
    // or before the effect runs again due to a dependency change.
    // This prevents memory leaks and ensures only one Vanta instance is active.
    return () => {
      if (vantaInstance) {
        vantaInstance.destroy();
      }
    };
  }, [theme, themeConfig, vantaEffect]); // Re-run the effect if theme or effect type changes

  const bgStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  };

  return <div style={bgStyle} ref={vantaContainerRef} />;
};

export default BackgroundAnimation;