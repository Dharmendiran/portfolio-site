import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { type PortfolioData, type ChatMessage } from '../types';
import { initializeChat, sendMessageToGemini } from '../services/geminiService';
import { PaperAirplaneIcon, SparklesIcon, XMarkIcon } from './Icons';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: PortfolioData;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
);


const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, portfolioData }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (portfolioData) {
            initializeChat(portfolioData);
            setMessages([
                { role: 'model', content: "Hi! I'm Dharma's AI assistant. Ask me anything about his skills, experience, or projects." }
            ]);
        }
    }, [portfolioData]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await sendMessageToGemini(inputValue);
            const modelMessage: ChatMessage = { role: 'model', content: response };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-[calc(100%-3rem)] max-w-md h-[70vh] max-h-[600px] z-50 transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
        >
            <div className="flex flex-col h-full bg-card border border-main rounded-xl shadow-2xl">
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-main flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <SparklesIcon className="w-6 h-6 text-accent" />
                        <h2 id="chatbot-title" className="text-lg font-bold text-title-color">AI Assistant</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-secondary-color hover:bg-card-hover hover:text-primary-color transition-colors" aria-label="Close chat">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto chatbot-messages">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-accent text-slate-50 rounded-br-none' : 'bg-card-hover text-primary-color rounded-bl-none'}`}>
                                    <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-xs md:max-w-sm px-4 py-2 rounded-2xl bg-card-hover rounded-bl-none">
                                    <TypingIndicator />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <footer className="p-4 border-t border-main flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about projects..."
                            className="w-full px-4 py-2 bg-card-hover border border-main rounded-full focus:outline-none focus:ring-2 focus:ring-accent text-primary-color placeholder:text-secondary-color"
                            disabled={isLoading}
                            aria-label="Chat input"
                        />
                        <button type="submit" className="p-3 bg-accent text-white rounded-full hover:bg-accent-brighter transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default Chatbot;