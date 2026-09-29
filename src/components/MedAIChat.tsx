import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  analysis?: {
    triageLevel: 'Routine' | 'Moderate' | 'Seek Immediate Care';
    suspectedConditions: string[];
    immediateAdvice: string[];
    recommendedSpecialist: string;
    clinicalDisclaimer: string;
  };
}

interface MedAIChatProps {
  onBookDoctor: (doctorName?: string) => void;
}

export const MedAIChat: React.FC<MedAIChatProps> = ({ onBookDoctor }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: 'Hello, and welcome to Hathi Health AI. I am Dr. Hathi\'s digital clinical assistant. How may I assist you with your health symptoms or wellness questions today?',
      timestamp: 'Just now',
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = [
    "I have a mild headache and sore throat for 2 days.",
    "What are normal blood pressure and heart rate targets?",
    "Lower back muscle stiffness after lifting heavy boxes.",
    "Dietary recommendations for healthy cholesterol.",
    "When should I schedule an annual health checkup?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    soundEngine.playChime();
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || 'Our clinical systems are processing your query. Please schedule a consultation with Dr. Hathi for personalized care.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: data.analysis,
      };

      setMessages((prev) => [...prev, aiMsg]);
      soundEngine.playChime();
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Our clinical network experienced a momentary interruption. Please repeat your query or consult our front desk.',
          timestamp: 'Now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl glass-panel border border-emerald-900/30 overflow-hidden flex flex-col h-[750px] shadow-2xl">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-emerald-900/30 bg-[#080D0A] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white font-display tracking-wide">
                Hathi Health AI Assistant
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono-nums">
                Clinical v2.4
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              AI-Powered Health Orientation & Triage Guidance
            </p>
          </div>
        </div>

        {/* Disclaimer Tag */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-amber-300/80 bg-amber-950/40 border border-amber-500/20 px-3 py-1 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Educational guidance · Not a replacement for an in-person physician exam</span>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="p-3 bg-[#060907] border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] text-emerald-400 font-semibold shrink-0 uppercase tracking-wider pl-1">
          Common Queries:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="text-xs px-3 py-1.5 rounded-lg bg-[#0E1410] hover:bg-emerald-950/60 text-neutral-300 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/30 whitespace-nowrap transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-[#050706] to-[#080C09]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-black'
                  : 'bg-[#121B15] text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-3">
              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-none'
                    : 'bg-[#0B100D] border border-emerald-500/20 text-neutral-200 rounded-tl-none shadow-md'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span className="block text-[10px] text-neutral-400 mt-1.5 text-right font-mono-nums">
                  {msg.timestamp}
                </span>
              </div>

              {/* AI Structured Clinical Triage Card */}
              {msg.analysis && (
                <div className="p-4 rounded-xl bg-[#080E0B] border border-emerald-500/30 text-xs space-y-3 shadow-lg">
                  <div className="flex items-center justify-between border-b border-emerald-900/30 pb-2">
                    <span className="font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-display">
                      <Sparkles className="w-3.5 h-3.5" />
                      Clinical Triage Evaluation
                    </span>
                    <span className={`px-2.5 py-0.5 rounded font-mono-nums font-bold ${
                      msg.analysis.triageLevel === 'Seek Immediate Care'
                        ? 'bg-red-950 text-red-300 border border-red-700'
                        : msg.analysis.triageLevel === 'Moderate'
                        ? 'bg-amber-950 text-amber-300 border border-amber-700'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    }`}>
                      Triage: {msg.analysis.triageLevel}
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-400 block text-[11px]">Primary Differential Considerations:</span>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {msg.analysis.suspectedConditions.join(', ')}
                    </p>
                  </div>

                  <div>
                    <span className="text-neutral-400 block text-[11px] mb-1">Recommended Practical Measures:</span>
                    <ul className="space-y-1 text-neutral-300">
                      {msg.analysis.immediateAdvice.map((rec, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">·</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-emerald-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-[11px] text-emerald-300/80">
                      Recommended Specialist: <strong className="text-white">{msg.analysis.recommendedSpecialist}</strong>
                    </span>
                    <button
                      onClick={() => onBookDoctor(msg.analysis?.recommendedSpecialist)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-[#121B15] text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-[#0B100D] border border-emerald-500/20 text-emerald-400 flex items-center gap-2 text-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing clinical symptoms...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 sm:p-4 bg-[#080D0A] border-t border-emerald-900/30 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your health symptoms (e.g. headache, fever, back ache, blood pressure inquiry)..."
          disabled={isLoading}
          className="flex-1 bg-[#040605] border border-emerald-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-bold transition-all shadow-md active:scale-95 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
