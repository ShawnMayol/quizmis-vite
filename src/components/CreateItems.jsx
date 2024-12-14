import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../Firebase.js';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const CreateItems = () => {
    const { quizId } = useParams(); // Get quizId from URL
    const navigate = useNavigate(); // For navigation after adding a question

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addQuestion = async () => {
        if (!question || options.some(opt => opt === '') || !correctAnswer) {
            alert('Please fill out all fields correctly.');
            return;
        }

        // Construct the question object
        const newQuestion = {
            questionText: question,
            options,
            correctAnswer
        };

        try {
            const quizRef = doc(db, "quizzes", quizId);
            await updateDoc(quizRef, {
                questions: arrayUnion(newQuestion)
            });
            alert('Question added successfully!');
            // Optionally reset form or navigate
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer('');
            // navigate(`/quiz-details/${quizId}`); // Navigate to quiz details page or dashboard
        } catch (error) {
            console.error("Error adding question: ", error);
            alert('Failed to add question. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add New Question to Quiz ID: {quizId}</h2>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter question"
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                />
            ))}
            <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Correct answer"
            />
            <button onClick={addQuestion}>Add Question</button>
        </div>
    );
};

export default CreateItems;
