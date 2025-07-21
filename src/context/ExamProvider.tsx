"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ExamContextType, ExamState, Section, Answer, ExamData } from '@/lib/types';
import { getExamData } from '@/ai/flows/getExamData';
import { DURATION_PER_SECTION } from '@/lib/questions';

const ExamContext = createContext<ExamContextType | undefined>(undefined);

const getInitialState = (): ExamState => ({
  user: null,
  currentSection: null,
  completedSections: [],
  answers: {},
  currentQuestionIndex: 0,
  sectionStartTime: null,
  examData: null,
});


export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ExamState>(getInitialState());
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // Effect for fetching exam data from the backend flow
  useEffect(() => {
    const fetchExamData = async () => {
        try {
            const data = await getExamData();
            setState(prev => ({ ...prev, examData: data }));
        } catch (error) {
            console.error("Failed to fetch exam data", error);
        }
    };
    fetchExamData();
  }, []);

  // Effect for loading state from localStorage
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('examState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // We keep the fetched examData and don't overwrite it with the potentially stale one from localStorage
        setState(prev => ({ ...prev, ...parsedState, examData: prev.examData }));
      }
    } catch (error) {
      console.error("Failed to parse state from localStorage", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Effect for saving state to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        const stateToSave = { ...state, examData: null }; // Avoid saving large exam data to localStorage
        localStorage.setItem('examState', JSON.stringify(stateToSave));
      } catch (error) {
        console.error("Failed to save state to localStorage", error);
      }
    }
  }, [state, isInitialized]);

  const setUser = useCallback((user: { name: string; id: string }) => {
    setState((prev) => ({ ...prev, user }));
  }, []);

  const startSection = useCallback((section: Section) => {
    setState((prev) => {
      if (!prev.examData) return prev; // Don't start if data isn't loaded
      const sectionExists = prev.examData.sections.some(s => s.name.toLowerCase().replace(' ', '') === section);
      if (!sectionExists) {
        console.error(`Section "${section}" not found in exam data.`);
        return prev;
      }
      return {
        ...prev,
        currentSection: section,
        currentQuestionIndex: 0,
        sectionStartTime: Date.now(),
      }
    });
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
      if (!prev.currentSection || !prev.examData) return prev;
      const newCompletedSections = [...prev.completedSections, prev.currentSection];
      const allSectionsDone = newCompletedSections.length === prev.examData.sections.length;
      
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
    const initialState = getInitialState();
    // Re-fetch exam data on reset, but keep user info if present
    setState(prev => ({ ...initialState, user: prev.user, examData: prev.examData }));
    
    try {
      const stateToSave = { ...initialState, examData: null, user: state.user };
      localStorage.setItem('examState', JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Failed to clear state in localStorage", error);
    }
    router.replace('/');
  }, [router, state.user]);

  const getRemainingTime = useCallback(() => {
    if (!state.sectionStartTime || !isInitialized) return DURATION_PER_SECTION;
    const elapsedTime = Date.now() - state.sectionStartTime;
    return Math.max(0, DURATION_PER_SECTION - elapsedTime);
  }, [state.sectionStartTime, isInitialized]);


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
    return null;
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
