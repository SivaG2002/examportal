"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ExamContextType, ExamState, Section, Answer } from '@/lib/types';
import { DURATION_PER_SECTION } from '@/lib/questions';

const ExamContext = createContext<ExamContextType | undefined>(undefined);

const initialState: ExamState = {
  user: null,
  currentSection: null,
  completedSections: [],
  answers: {},
  currentQuestionIndex: 0,
  sectionStartTime: null,
};

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ExamState>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('examState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setState(parsedState);
      }
    } catch (error) {
      console.error("Failed to parse state from localStorage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('examState', JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save state to localStorage", error);
      }
    }
  }, [state, isInitialized]);

  const setUser = useCallback((user: { name: string; id: string }) => {
    setState((prev) => ({ ...prev, user }));
  }, []);

  const startSection = useCallback((section: Section) => {
    setState((prev) => ({
      ...prev,
      currentSection: section,
      currentQuestionIndex: 0,
      sectionStartTime: Date.now(),
    }));
    router.push('/exam');
  }, [router]);

  const selectQuestion = useCallback((index: number) => {
    setState((prev) => ({ ...prev, currentQuestionIndex: index }));
  }, []);

  const saveAnswer = useCallback((section: Section, questionIndex: number, answerData: Partial<Answer>) => {
    setState((prev) => {
      const newAnswers = { ...prev.answers };
      if (!newAnswers[section]) {
        newAnswers[section] = {};
      }
      const existingAnswer = newAnswers[section]?.[questionIndex] || { isMarkedForDoubt: false };
      newAnswers[section]![questionIndex] = { ...existingAnswer, ...answerData };
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const submitSection = useCallback(() => {
    setState((prev) => {
      if (!prev.currentSection) return prev;
      const newCompletedSections = [...prev.completedSections, prev.currentSection];
      const allSectionsDone = newCompletedSections.length === 3;
      
      if (allSectionsDone) {
        router.replace('/results');
      }

      return {
        ...prev,
        currentSection: null,
        sectionStartTime: null,
        completedSections: newCompletedSections,
      };
    });
  }, [router]);

  const resetExam = useCallback(() => {
    setState(initialState);
    localStorage.removeItem('examState');
    router.replace('/');
  }, [router]);

  const getRemainingTime = useCallback(() => {
    if (!state.sectionStartTime) return DURATION_PER_SECTION;
    const elapsedTime = Date.now() - state.sectionStartTime;
    return Math.max(0, DURATION_PER_SECTION - elapsedTime);
  }, [state.sectionStartTime]);


  const value = {
    ...state,
    setUser,
    startSection,
    selectQuestion,
    saveAnswer,
    submitSection,
    resetExam,
    getRemainingTime,
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

export const useExam = (): ExamContextType => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
