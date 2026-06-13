import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { visorVoice } from './voice';
import { simulatedGestures } from './gestures';
import { visorThink, visorGreeting } from './brain';
import { navigateTo } from '../navigation/navigationRef';
import { useAuth } from '../auth/AuthContext';
import type { VisorExpression } from './types';

interface VisorContextValue {
  visible: boolean;
  expression: VisorExpression;
  panelOpen: boolean;
  followMode: boolean;
  message: string;
  isLoading: boolean;
  providerUsed?: string;
  openPanel: () => void;
  closePanel: () => void;
  ask: (text: string) => Promise<void>;
  startListening: () => void;
  toggleFollow: () => void;
}

const VisorContext = createContext<VisorContextValue | null>(null);

export function VisorProvider({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useAuth();
  const [expression, setExpression] = useState<VisorExpression>('idle');
  const [panelOpen, setPanelOpen] = useState(false);
  const [followMode, setFollowMode] = useState(false);
  const [message, setMessage] = useState('Tap me. I am Visor, your living guide.');
  const [isLoading, setIsLoading] = useState(false);
  const [providerUsed, setProviderUsed] = useState<string | undefined>(undefined);
  const greetedRef = useRef(false);
  const historyRef = useRef<{ role: string; content: string }[]>([]);
  const history = historyRef.current ?? [];

  const speak = useCallback((text: string) => {
    setExpression('speaking');
    visorVoice.speak(text, () => setExpression('idle'));
  }, []);

  const ask = useCallback(
    async (text: string) => {
      setExpression('thinking');
      setIsLoading(true);
      setMessage('...');

      const reply = await visorThink(text, history);
      setIsLoading(false);
      setMessage(reply.text);
      setProviderUsed(reply.providerUsed);
      speak(reply.text);

      // Keep conversation history for context
      history.push({ role: 'user', content: text });
      history.push({ role: 'assistant', content: reply.text });
      if (history.length > 20) {
        historyRef.current = history.slice(-20);
      }

      if (reply.navigateTo) navigateTo(reply.navigateTo);
    },
    [speak],
  );

  const startListening = useCallback(() => {
    setExpression('listening');
    setMessage('Listening...');
    visorVoice.listen((transcript) => {
      setMessage(`\u201c${transcript}\u201d`);
      ask(transcript);
    });
  }, [ask]);

  const toggleFollow = useCallback(() => {
    setFollowMode((prev) => {
      const next = !prev;
      setMessage(next ? 'Follow mode on. Drag anywhere, I move with your touch.' : 'Follow mode off.');
      return next;
    });
  }, []);

  // Greet the user once after sign-in.
  useEffect(() => {
    if (isSignedIn && !greetedRef.current) {
      greetedRef.current = true;
      const greeting = visorGreeting(user?.displayName);
      setMessage(greeting);
      speak(greeting);
    }
    if (!isSignedIn) greetedRef.current = false;
  }, [isSignedIn, user, speak]);

  // Gesture awareness (simulation-first, MediaPipe-ready).
  useEffect(() => {
    if (!isSignedIn) return;
    simulatedGestures.start((event) => {
      setMessage(`Nice ${event.kind.toLowerCase().replace('_', ' ')}! I see you moving.`);
    });
    return () => simulatedGestures.stop();
  }, [isSignedIn]);

  const value = useMemo(
    () => ({
      visible: isSignedIn,
      expression,
      panelOpen,
      followMode,
      message,
      isLoading,
      providerUsed,
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
      ask,
      startListening,
      toggleFollow,
    }),
    [isSignedIn, expression, panelOpen, followMode, message, isLoading, providerUsed, ask, startListening, toggleFollow],
  );

  return <VisorContext.Provider value={value}>{children}</VisorContext.Provider>;
}

export function useVisor(): VisorContextValue {
  const ctx = useContext(VisorContext);
  if (!ctx) throw new Error('useVisor must be used within VisorProvider');
  return ctx;
}
