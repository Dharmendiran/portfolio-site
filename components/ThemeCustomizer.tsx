
import React, { useState } from 'react';
import { type ThemeConfig, type VantaEffect } from '../types';

interface ThemeCustomizerProps {
    isOpen: boolean;
    onClose: () => void;
    themeConfig: ThemeConfig;
    onThemeChange: (mode: 'light' | 'dark', key: 'bgColor' | 'textPrimary' | 'accentColor' | 'vantaColor' | 'vantaBgColor', value: string) => void;
    onReset: () => void;
    currentVantaEffect: VantaEffect;
    onVantaEffectChange: (effect: VantaEffect) => void;
}

const baseColorKeys: ('bgColor' | 'textPrimary' | 'accentColor')[] = ['bgColor', 'textPrimary', 'accentColor'];
const baseColorLabels: Record<typeof baseColorKeys[number], string> = {
    bgColor: 'Background',
    textPrimary: 'Text',
    accentColor: 'Accent',
};

const animationColorKeys: ('vantaColor' | 'vantaBgColor')[] = ['vantaColor', 'vantaBgColor'];
const animationColorLabels: Record<typeof animationColorKeys[number], string> = {
    vantaColor: 'Primary Color',
    vantaBgColor: 'Background Color',
};

const VANTA_EFFECTS: VantaEffect[] = [
    'NONE', 'FOG', 'NET', 'WAVES', 'DOTS'
];

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
    isOpen, onClose, themeConfig, onThemeChange, onReset, currentVantaEffect, onVantaEffectChange
}) => {
    const [activeTab, setActiveTab] = useState<'light' | 'dark'>('dark');

    return (
        <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-card border-l border-main z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-main">
                    <h3 className="text-lg font-bold text-title-color">Customize</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-card-hover text-secondary-color hover:text-primary-color transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto theme-customizer-content p-4">
                    {/* Theme Tabs */}
                    <div className="flex border-b border-main mb-4">
                        <button
                            onClick={() => setActiveTab('dark')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'dark' ? 'border-b-2 border-accent text-accent' : 'text-secondary-color hover:text-primary-color'}`}
                        >
                            Dark
                        </button>
                        <button
                            onClick={() => setActiveTab('light')}
                            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'light' ? 'border-b-2 border-accent text-accent' : 'text-secondary-color hover:text-primary-color'}`}
                        >
                            Light
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Core Palette */}
                        <div>
                            <h4 className="text-md font-semibold text-title-color mb-3 border-b border-main pb-2">Core Palette</h4>
                            <div className="space-y-4 pt-2">
                                {baseColorKeys.map(key => (
                                    <div key={key} className="flex items-center justify-between">
                                        <label htmlFor={`${key}-${activeTab}`} className="text-sm text-secondary-color">{baseColorLabels[key]}</label>
                                        <div className="relative">
                                            <input
                                                type="color"
                                                id={`${key}-${activeTab}`}
                                                value={themeConfig[activeTab][key]}
                                                onChange={(e) => onThemeChange(activeTab, key, e.target.value)}
                                                className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer appearance-none"
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                            <div 
                                                className="absolute inset-0 w-8 h-8 rounded-md border border-main pointer-events-none" 
                                                style={{ backgroundColor: themeConfig[activeTab][key] }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Background Animation */}
                        <div>
                            <h4 className="text-md font-semibold text-title-color mb-3 border-b border-main pb-2">Background Animation</h4>
                            <div className="space-y-4 pt-2">
                                {animationColorKeys.map(key => (
                                    <div key={key} className="flex items-center justify-between">
                                        <label htmlFor={`${key}-${activeTab}`} className="text-sm text-secondary-color">{animationColorLabels[key]}</label>
                                        <div className="relative">
                                            <input
                                                type="color"
                                                id={`${key}-${activeTab}`}
                                                value={themeConfig[activeTab][key]}
                                                onChange={(e) => onThemeChange(activeTab, key, e.target.value)}
                                                className="w-8 h-8 p-0 border-0 rounded-md cursor-pointer appearance-none"
                                                style={{ backgroundColor: 'transparent' }}
                                            />
                                            <div 
                                                className="absolute inset-0 w-8 h-8 rounded-md border border-main pointer-events-none" 
                                                style={{ backgroundColor: themeConfig[activeTab][key] }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Background Effect Selector */}
                        <div className="pt-4 border-t border-main">
                            <h4 className="text-sm font-medium text-title-color mb-3">Background Effect</h4>
                            <div className="relative">
                                <select
                                    id="vantaEffect"
                                    value={currentVantaEffect}
                                    onChange={(e) => onVantaEffectChange(e.target.value as VantaEffect)}
                                    className="w-full px-3 py-2 bg-card-hover border border-main rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-accent text-primary-color"
                                >
                                    {VANTA_EFFECTS.map(effect => (
                                        <option key={effect} value={effect}>{effect}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary-color">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 mt-auto border-t border-main">
                    <button
                        onClick={onReset}
                        className="w-full px-4 py-2 text-accent border border-accent rounded-md hover:bg-accent-hover transition-all duration-300"
                    >
                        Reset to Default
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThemeCustomizer;