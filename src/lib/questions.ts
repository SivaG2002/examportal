import type { Question, Section } from './types';

export const DURATION_PER_SECTION = 30 * 60 * 1000; // 30 minutes in milliseconds
export const TOTAL_QUESTIONS_PER_SECTION = 25;

const generateMathQuestions = (): Question[] => {
    return Array.from({ length: TOTAL_QUESTIONS_PER_SECTION }, (_, i) => {
        const num1 = Math.floor(Math.random() * 20) + i + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const correctAnswer = num1 + num2;
        const options = new Set<string>();
        options.add(correctAnswer.toString());
        while (options.size < 5) {
            const wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5)
            if(wrongAnswer !== correctAnswer) options.add(wrongAnswer.toString());
        }
        return {
            question: `What is ${num1} + ${num2}? (Question ${i + 1})`,
            options: Array.from(options).sort(() => Math.random() - 0.5),
            correctAnswer: correctAnswer.toString(),
        };
    });
};

const generateEnglishQuestions = (): Question[] => {
    const synonyms: [string, string][] = [
        ['Happy', 'Joyful'], ['Brave', 'Courageous'], ['Bright', 'Luminous'], ['Calm', 'Peaceful'], ['Eager', 'Keen'],
        ['Fair', 'Just'], ['Gloomy', 'Morose'], ['Huge', 'Enormous'], ['Kind', 'Benevolent'], ['Lazy', 'Indolent'],
        ['Merry', 'Cheerful'], ['Neat', 'Tidy'], ['Old', 'Ancient'], ['Polite', 'Courteous'], ['Quick', 'Rapid'],
        ['Rich', 'Wealthy'], ['Sad', 'Sorrowful'], ['Shy', 'Timid'], ['Strong', 'Powerful'], ['True', 'Factual'],
        ['Ugly', 'Hideous'], ['Vacant', 'Empty'], ['Weak', 'Feeble'], ['Wise', 'Sagacious'], ['Wonderful', 'Marvelous']
    ];
    const allOptions = synonyms.map(s => s[1]);

    return Array.from({ length: TOTAL_QUESTIONS_PER_SECTION }, (_, i) => {
        const [word, correctAnswer] = synonyms[i];
        const options = new Set<string>();
        options.add(correctAnswer);
        while (options.size < 5) {
            const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
            options.add(randomOption);
        }
        return {
            question: `What is a synonym for "${word}"? (Question ${i + 1})`,
            options: Array.from(options).sort(() => Math.random() - 0.5),
            correctAnswer,
        };
    });
};

const generateAnalyticsQuestions = (): Question[] => {
    return Array.from({ length: TOTAL_QUESTIONS_PER_SECTION }, (_, i) => {
        const speed = Math.floor(Math.random() * 41) + 60; // 60-100 km/h
        const time = (Math.floor(Math.random() * 5) + 2) * 30; // 60-180 minutes
        const distance = (speed * time) / 60;
        const correctAnswer = Math.round(distance);

        const options = new Set<string>();
        options.add(`${correctAnswer} km`);
        while (options.size < 5) {
            const wrongAnswer = Math.round(correctAnswer + (Math.floor(Math.random() * 20) - 10));
            if(wrongAnswer !== correctAnswer) options.add(`${wrongAnswer} km`);
        }
        return {
            question: `A car travels at ${speed} km/h. How far will it travel in ${time} minutes? (Question ${i + 1})`,
            options: Array.from(options).sort(() => Math.random() - 0.5),
            correctAnswer: `${correctAnswer} km`,
        };
    });
};

export const questions: { [key in Section]: Question[] } = {
  math: generateMathQuestions(),
  english: generateEnglishQuestions(),
  analytics: generateAnalyticsQuestions(),
};
