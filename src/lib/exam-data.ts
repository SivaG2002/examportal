
import type { ExamData } from './types';

export const examData: ExamData = {
  exam: "ExPortal Sample Exam",
  year: 2024,
  sections: [
    {
      name: "Math",
      questions: Array.from({ length: 25 }, (_, i) => {
        const num1 = Math.floor(Math.random() * 20) + i + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const correctAnswer = num1 + num2;
        const optionsSet = new Set<number>();
        optionsSet.add(correctAnswer);
        while (optionsSet.size < 4) {
            const wrongAnswer = correctAnswer + (Math.floor(Math.random() * 10) - 5)
            if(wrongAnswer !== correctAnswer) optionsSet.add(wrongAnswer);
        }
        const optionsArray = Array.from(optionsSet).sort(() => Math.random() - 0.5);
        
        return {
            id: i + 1,
            question: `What is ${num1} + ${num2}?`,
            options: {
                "A": optionsArray[0].toString(),
                "B": optionsArray[1].toString(),
                "C": optionsArray[2].toString(),
                "D": optionsArray[3].toString()
            },
            answer: optionsArray.findIndex(opt => opt === correctAnswer) === 0 ? "A" :
                    optionsArray.findIndex(opt => opt === correctAnswer) === 1 ? "B" :
                    optionsArray.findIndex(opt => opt === correctAnswer) === 2 ? "C" : "D",
        }
      })
    },
    {
      name: "English",
       questions: [
        { id: 1, question: "What is a synonym for 'Happy'?", options: { "A": "Sorrowful", "B": "Joyful", "C": "Angry", "D": "Tired" }, answer: "B" },
        { id: 2, question: "What is a synonym for 'Brave'?", options: { "A": "Courageous", "B": "Scared", "C": "Weak", "D": "Timid" }, answer: "A" },
        { id: 3, question: "What is a synonym for 'Bright'?", options: { "A": "Dark", "B": "Dull", "C": "Luminous", "D": "Gloomy" }, answer: "C" },
        { id: 4, question: "What is a synonym for 'Calm'?", options: { "A": "Agitated", "B": "Peaceful", "C": "Excited", "D": "Loud" }, answer: "B" },
        { id: 5, question: "What is a synonym for 'Eager'?", options: { "A": "Indifferent", "B": "Apathetic", "C": "Keen", "D": "Bored" }, answer: "C" },
        { id: 6, question: "What is a synonym for 'Fair'?", options: { "A": "Unjust", "B": "Biased", "C": "Partial", "D": "Just" }, answer: "D" },
        { id: 7, question: "What is a synonym for 'Gloomy'?", options: { "A": "Cheerful", "B": "Bright", "C": "Morose", "D": "Happy" }, answer: "C" },
        { id: 8, question: "What is a synonym for 'Huge'?", options: { "A": "Tiny", "B": "Small", "C": "Enormous", "D": "Minute" }, answer: "C" },
        { id: 9, question: "What is a synonym for 'Kind'?", options: { "A": "Cruel", "B": "Benevolent", "C": "Harsh", "D": "Mean" }, answer: "B" },
        { id: 10, question: "What is a synonym for 'Lazy'?", options: { "A": "Active", "B": "Energetic", "C": "Diligent", "D": "Indolent" }, answer: "D" },
        { id: 11, question: "What is a synonym for 'Merry'?", options: { "A": "Cheerful", "B": "Sad", "C": "Miserable", "D": "Gloomy" }, answer: "A" },
        { id: 12, question: "What is a synonym for 'Neat'?", options: { "A": "Messy", "B": "Sloppy", "C": "Tidy", "D": "Disorganized" }, answer: "C" },
        { id: 13, question: "What is a synonym for 'Old'?", options: { "A": "New", "B": "Young", "C": "Ancient", "D": "Modern" }, answer: "C" },
        { id: 14, question: "What is a synonym for 'Polite'?", options: { "A": "Rude", "B": "Courteous", "C": "Impolite", "D": "Insolent" }, answer: "B" },
        { id: 15, question: "What is a synonym for 'Quick'?", options: { "A": "Slow", "B": "Rapid", "C": "Leisurely", "D": "Sluggish" }, answer: "B" },
        { id: 16, question: "What is a synonym for 'Rich'?", options: { "A": "Poor", "B": "Wealthy", "C": "Destitute", "D": "Needy" }, answer: "B" },
        { id: 17, question: "What is a synonym for 'Sad'?", options: { "A": "Happy", "B": "Sorrowful", "C": "Joyful", "D": "Cheerful" }, answer: "B" },
        { id: 18, question: "What is a synonym for 'Shy'?", options: { "A": "Timid", "B": "Outgoing", "C": "Bold", "D": "Confident" }, answer: "A" },
        { id: 19, question: "What is a synonym for 'Strong'?", options: { "A": "Weak", "B": "Feeble", "C": "Powerful", "D": "Frail" }, answer: "C" },
        { id: 20, question: "What is a synonym for 'True'?", options: { "A": "False", "B": "Factual", "C": "Incorrect", "D": "Inaccurate" }, answer: "B" },
        { id: 21, question: "What is a synonym for 'Ugly'?", options: { "A": "Beautiful", "B": "Hideous", "C": "Attractive", "D": "Pretty" }, answer: "B" },
        { id: 22, question: "What is a synonym for 'Vacant'?", options: { "A": "Occupied", "B": "Full", "C": "Empty", "D": "Crowded" }, answer: "C" },
        { id: 23, question: "What is a synonym for 'Weak'?", options: { "A": "Strong", "B": "Feeble", "C": "Powerful", "D": "Mighty" }, answer: "B" },
        { id: 24, question: "What is a synonym for 'Wise'?", options: { "A": "Foolish", "B": "Sagacious", "C": "Stupid", "D": "Ignorant" }, answer: "B" },
        { id: 25, question: "What is a synonym for 'Wonderful'?", options: { "A": "Terrible", "B": "Awful", "C": "Marvelous", "D": "Horrible" }, answer: "C" }
      ]
    },
    {
      name: "Analytics",
      questions: Array.from({ length: 25 }, (_, i) => {
        const speed = Math.floor(Math.random() * 41) + 60; // 60-100 km/h
        const time = (Math.floor(Math.random() * 5) + 2) * 30; // 60-180 minutes
        const distance = (speed * time) / 60;
        const correctAnswer = Math.round(distance);

        const optionsSet = new Set<string>();
        optionsSet.add(`${correctAnswer} km`);
        while (optionsSet.size < 4) {
            const wrongAnswer = Math.round(correctAnswer + (Math.floor(Math.random() * 20) - 10));
            if(wrongAnswer !== correctAnswer) optionsSet.add(`${wrongAnswer} km`);
        }
        const optionsArray = Array.from(optionsSet).sort(() => Math.random() - 0.5);
        
        return {
            id: i + 1,
            question: `A car travels at ${speed} km/h. How far will it travel in ${time} minutes?`,
            options: {
                "A": optionsArray[0],
                "B": optionsArray[1],
                "C": optionsArray[2],
                "D": optionsArray[3]
            },
            answer: optionsArray.findIndex(opt => opt === `${correctAnswer} km`) === 0 ? "A" :
                    optionsArray.findIndex(opt => opt === `${correctAnswer} km`) === 1 ? "B" :
                    optionsArray.findIndex(opt => opt === `${correctAnswer} km`) === 2 ? "C" : "D",
        }
      })
    }
  ]
}
