```javascript
// SHIVA STUDY AI PRACTICE
// Frontend JavaScript

// ===============================
// DOM ELEMENTS
// ===============================

const setupScreen = document.getElementById("setupScreen");
const practiceScreen = document.getElementById("practiceScreen");
const resultScreen = document.getElementById("resultScreen");
const loadingScreen = document.getElementById("loadingScreen");

const subjectSelect = document.getElementById("subjectSelect");
const chapterInput = document.getElementById("chapterInput");
const practiceTypeSelect = document.getElementById("practiceTypeSelect");
const difficultySelect = document.getElementById("difficultySelect");
const questionCountSelect = document.getElementById("questionCountSelect");

const startBtn = document.getElementById("startBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const newPracticeBtn = document.getElementById("newPracticeBtn");
const retestBtn = document.getElementById("retestBtn");

const practiceChapterName = document.getElementById("practiceChapterName");
const questionProgress = document.getElementById("questionProgress");
const progressBar = document.getElementById("progressBar");

const questionContainer = document.getElementById("questionContainer");

const scoreValue = document.getElementById("scoreValue");
const correctValue = document.getElementById("correctValue");
const wrongValue = document.getElementById("wrongValue");
const accuracyValue = document.getElementById("accuracyValue");

const reviewContainer = document.getElementById("reviewContainer");
const errorMessage = document.getElementById("errorMessage");


// ===============================
// STATE
// ===============================

let currentQuestionIndex = 0;
let questions = [];
let userAnswers = [];

let currentSettings = {
    subject: "",
    chapter: "",
    practiceType: "",
    difficulty: "",
    questionCount: 25
};


// ===============================
// DEMO QUESTION BANK
// TEMPORARY FRONTEND TEST DATA
// ===============================

const demoQuestionBank = {

    Science: {

        "Chemical Reactions and Equations": [
            {
                question: "Which type of reaction occurs when two or more substances combine to form a single product?",
                options: [
                    "Decomposition reaction",
                    "Combination reaction",
                    "Displacement reaction",
                    "Double displacement reaction"
                ],
                answer: 1,
                explanation: "A combination reaction is a reaction in which two or more substances combine to form a single product."
            },
            {
                question: "Which gas is generally released when a metal reacts with a dilute acid?",
                options: [
                    "Oxygen",
                    "Nitrogen",
                    "Hydrogen",
                    "Carbon dioxide"
                ],
                answer: 2,
                explanation: "Many metals react with dilute acids to produce a salt and hydrogen gas."
            },
            {
                question: "A reaction in which a substance breaks down into simpler substances is called:",
                options: [
                    "Combination reaction",
                    "Decomposition reaction",
                    "Displacement reaction",
                    "Neutralisation reaction"
                ],
                answer: 1,
                explanation: "A decomposition reaction involves the breakdown of one compound into simpler substances."
            }
        ]

    },

    Mathematics: {

        "Real Numbers": [
            {
                question: "Which of the following is an irrational number?",
                options: [
                    "2",
                    "0.5",
                    "√2",
                    "4"
                ],
                answer: 2,
                explanation: "√2 cannot be expressed as a rational number and is therefore irrational."
            },
            {
                question: "The HCF of two positive integers can be found using:",
                options: [
                    "Euclid's division algorithm",
                    "Only factorisation",
                    "Only multiplication",
                    "Only subtraction"
                ],
                answer: 0,
                explanation: "Euclid's division algorithm is used to find the HCF of two positive integers."
            },
            {
                question: "A rational number has a terminating decimal expansion when the denominator in lowest form has prime factors:",
                options: [
                    "Only 2 and/or 5",
                    "Only 3",
                    "Only 7",
                    "Any prime number"
                ],
                answer: 0,
                explanation: "A rational number has a terminating decimal expansion when its denominator in lowest form has no prime factors other than 2 and/or 5."
            }
        ]

    },

    "Social Science": {

        "Nationalism in India": [
            {
                question: "Who launched the Non-Cooperation Movement in India?",
                options: [
                    "Subhas Chandra Bose",
                    "Mahatma Gandhi",
                    "Jawaharlal Nehru",
                    "Bhagat Singh"
                ],
                answer: 1,
                explanation: "Mahatma Gandhi launched the Non-Cooperation Movement in 1920."
            },
            {
                question: "The Rowlatt Act was passed in:",
                options: [
                    "1917",
                    "1918",
                    "1919",
                    "1920"
                ],
                answer: 2,
                explanation: "The Rowlatt Act was passed by the British government in 1919."
            },
            {
                question: "The Jallianwala Bagh massacre took place in:",
                options: [
                    "Delhi",
                    "Amritsar",
                    "Lahore",
                    "Mumbai"
                ],
                answer: 1,
                explanation: "The Jallianwala Bagh massacre took place in Amritsar on 13 April 1919."
            }
        ]

    },

    English: {

        "A Letter to God": [
            {
                question: "Who is the main character in 'A Letter to God'?",
                options: [
                    "Lencho",
                    "Postmaster",
                    "The priest",
                    "Pedro"
                ],
                answer: 0,
                explanation: "Lencho is the main character of the story."
            },
            {
                question: "What destroyed Lencho's crop?",
                options: [
                    "Drought",
                    "Hailstorm",
                    "Flood",
                    "Fire"
```
