/* =========================================
   SHIVA STUDY AI — PRACTICE
   FRONTEND JAVASCRIPT
========================================= */


/* =========================================
   DOM ELEMENTS
========================================= */

const setupScreen = document.getElementById("setupScreen");
const practiceScreen = document.getElementById("practiceScreen");
const resultScreen = document.getElementById("resultScreen");
const loadingScreen = document.getElementById("loadingScreen");

const subjectSelect = document.getElementById("subjectSelect");
const chapterSelect = document.getElementById("chapterSelect");
const practiceTypeSelect = document.getElementById("practiceTypeSelect");
const difficultySelect = document.getElementById("difficultySelect");
const questionCountSelect = document.getElementById("questionCountSelect");

const startPracticeBtn = document.getElementById("startPracticeBtn");
const backToSetupBtn = document.getElementById("backToSetupBtn");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

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
const loadingMessage = document.getElementById("loadingMessage");


/* =========================================
   APPLICATION STATE
========================================= */

let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let currentSettings = null;
let isAnswerLocked = false;


/* =========================================
   CHAPTER DATA
   CLASS 10 CBSE
========================================= */

const chapterData = {

    science: [
        {
            value: "chemical-reactions",
            name: "Chemical Reactions and Equations"
        },
        {
            value: "acids-bases-salts",
            name: "Acids, Bases and Salts"
        },
        {
            value: "metals-non-metals",
            name: "Metals and Non-metals"
        },
        {
            value: "carbon-compounds",
            name: "Carbon and Its Compounds"
        },
        {
            value: "life-processes",
            name: "Life Processes"
        },
        {
            value: "control-coordination",
            name: "Control and Coordination"
        },
        {
            value: "how-do-organisms-reproduce",
            name: "How Do Organisms Reproduce?"
        },
        {
            value: "heredity",
            name: "Heredity"
        },
        {
            value: "light-reflection-refraction",
            name: "Light – Reflection and Refraction"
        },
        {
            value: "human-eye-colourful-world",
            name: "The Human Eye and the Colourful World"
        },
        {
            value: "electricity",
            name: "Electricity"
        },
        {
            value: "magnetic-effects-current",
            name: "Magnetic Effects of Electric Current"
        },
        {
            value: "our-environment",
            name: "Our Environment"
        }
    ],

    mathematics: [
        {
            value: "real-numbers",
            name: "Real Numbers"
        },
        {
            value: "polynomials",
            name: "Polynomials"
        },
        {
            value: "pair-linear-equations",
            name: "Pair of Linear Equations in Two Variables"
        },
        {
            value: "quadratic-equations",
            name: "Quadratic Equations"
        },
        {
            value: "arithmetic-progressions",
            name: "Arithmetic Progressions"
        },
        {
            value: "triangles",
            name: "Triangles"
        },
        {
            value: "coordinate-geometry",
            name: "Coordinate Geometry"
        },
        {
            value: "introduction-trigonometry",
            name: "Introduction to Trigonometry"
        },
        {
            value: "applications-trigonometry",
            name: "Some Applications of Trigonometry"
        },
        {
            value: "circles",
            name: "Circles"
        },
        {
            value: "areas-related-circles",
            name: "Areas Related to Circles"
        },
        {
            value: "surface-areas-volumes",
            name: "Surface Areas and Volumes"
        },
        {
            value: "statistics",
            name: "Statistics"
        },
        {
            value: "probability",
            name: "Probability"
        }
    ],

    "social-science": [
        {
            value: "nationalism-india",
            name: "Nationalism in India"
        },
        {
            value: "european-nationalism",
            name: "The Rise of Nationalism in Europe"
        },
        {
            value: "global-world",
            name: "The Making of a Global World"
        },
        {
            value: "industrialisation",
            name: "The Age of Industrialisation"
        },
        {
            value: "print-culture",
            name: "Print Culture and the Modern World"
        },
        {
            value: "power-sharing",
            name: "Power Sharing"
        },
        {
            value: "federalism",
            name: "Federalism"
        },
        {
            value: "gender-religion-caste",
            name: "Gender, Religion and Caste"
        },
        {
            value: "political-parties",
            name: "Political Parties"
        },
        {
            value: "outcomes-democracy",
            name: "Outcomes of Democracy"
        },
        {
            value: "development",
            name: "Development"
        },
        {
            value: "sectors-economy",
            name: "Sectors of the Indian Economy"
        },
        {
            value: "money-credit",
            name: "Money and Credit"
        },
        {
            value: "globalisation",
            name: "Globalisation and the Indian Economy"
        },
        {
            value: "consumer-rights",
            name: "Consumer Rights"
        },
        {
            value: "resources-development",
            name: "Resources and Development"
        },
        {
            value: "forest-wildlife",
            name: "Forest and Wildlife Resources"
        },
        {
            value: "water-resources",
            name: "Water Resources"
        },
        {
            value: "agriculture",
            name: "Agriculture"
        },
        {
            value: "minerals-energy",
            name: "Minerals and Energy Resources"
        },
        {
            value: "manufacturing-industries",
            name: "Manufacturing Industries"
        },
        {
            value: "lifelines-economy",
            name: "Lifelines of National Economy"
        }
    ],

    english: [
        {
            value: "a-letter-to-god",
            name: "A Letter to God"
        },
        {
            value: "nelson-mandela",
            name: "Nelson Mandela: Long Walk to Freedom"
        },
        {
            value: "two-stories-flying",
            name: "Two Stories About Flying"
        },
        {
            value: "from-diary-anne-frank",
            name: "From the Diary of Anne Frank"
        },
        {
            value: "hundred-dresses",
            name: "The Hundred Dresses – I"
        },
        {
            value: "hundred-dresses-two",
            name: "The Hundred Dresses – II"
        },
        {
            value: "glimpses-india",
            name: "Glimpses of India"
        },
        {
            value: "madam-rides-bus",
            name: "Mijbil the Otter"
        },
        {
            value: "madam-rides-bus-correct",
            name: "Madam Rides the Bus"
        },
        {
            value: "sermon-benares",
            name: "The Sermon at Benares"
        },
        {
            value: "proposal",
            name: "The Proposal"
        }
    ],

    hindi: [
        {
            value: "surdas",
            name: "सूरदास"
        },
        {
            value: "ram-lakshman-parshuram",
            name: "राम-लक्ष्मण-परशुराम संवाद"
        },
        {
            value: "aatmkathya",
            name: "आत्मकथ्य"
        },
        {
            value: "utsah-at-nahi",
            name: "उत्साह और अट नहीं रही"
        },
        {
            value: "yah-danturit-muskan",
            name: "यह दंतुरित मुस्कान"
        },
        {
            value: "phasal",
            name: "फसल"
        },
        {
            value: "sangathak",
            name: "संगतकार"
        }
    ]

};


/* =========================================
   DEMO QUESTION BANK
   TEMPORARY FRONTEND TEST DATA
========================================= */

const demoQuestionBank = {

    "chemical-reactions": [
        {
            type: "mcq",
            question: "Which gas is generally released when a metal reacts with a dilute acid?",
            options: [
                "Oxygen",
                "Hydrogen",
                "Carbon dioxide",
                "Nitrogen"
            ],
            answer: 1,
            explanation: "Many metals react with dilute acids to produce a salt and hydrogen gas."
        },
        {
            type: "mcq",
            question: "A reaction in which two or more substances combine to form a single product is called:",
            options: [
                "Decomposition reaction",
                "Displacement reaction",
                "Combination reaction",
                "Double displacement reaction"
            ],
            answer: 2,
            explanation: "A combination reaction produces one product from two or more reactants."
        },
        {
            type: "mcq",
            question: "What is the colour of copper sulphate solution?",
            options: [
                "Green",
                "Blue",
                "Yellow",
                "Colourless"
            ],
            answer: 1,
            explanation: "Copper sulphate solution is generally blue because of hydrated copper ions."
        }
    ],

    "acids-bases-salts": [
        {
            type: "mcq",
            question: "Which acid is present in lemon juice?",
            options: [
                "Acetic acid",
                "Citric acid",
                "Lactic acid",
                "Hydrochloric acid"
            ],
            answer: 1,
            explanation: "Lemon juice contains citric acid."
        },
        {
            type: "mcq",
            question: "A base that dissolves in water is called:",
            options: [
                "Salt",
                "Acid",
                "Alkali",
                "Indicator"
            ],
            answer: 2,
            explanation: "An alkali is a base that dissolves in water."
        },
        {
            type: "mcq",
            question: "What is the approximate pH of a neutral solution at room temperature?",
            options: [
                "0",
                "5",
                "7",
                "14"
            ],
            answer: 2,
            explanation: "A neutral solution has a pH of approximately 7 at room temperature."
        }
    ],

    "quadratic-equations": [
        {
            type: "mcq",
            question: "The standard form of a quadratic equation is:",
            options: [
                "ax + b = 0",
                "ax² + bx + c = 0, where a ≠ 0",
                "ax³ + bx² + c = 0",
                "a/x + b = 0"
            ],
            answer: 1,
            explanation: "A quadratic equation has the standard form ax² + bx + c = 0, where a is not zero."
        },
        {
            type: "mcq",
            question: "If the discriminant of a quadratic equation is zero, the equation has:",
            options: [
                "Two distinct real roots",
                "No real roots",
                "Two equal real roots",
                "Three real roots"
            ],
            answer: 2,
            explanation: "When the discriminant is zero, the quadratic equation has two equal real roots."
        },
        {
            type: "mcq",
            question: "The degree of a quadratic polynomial is:",
            options: [
                "1",
                "2",
                "3",
                "0"
            ],
            answer: 1,
            explanation: "The highest power of the variable in a quadratic polynomial is 2."
        }
    ]

};


/* =========================================
   SCREEN MANAGEMENT
========================================= */

function showScreen(screenToShow) {

    const screens = [
        setupScreen,
        practiceScreen,
        resultScreen,
        loadingScreen
    ];

    screens.forEach((screen) => {
        screen.classList.remove("active");
    });

    screenToShow.classList.add("active");

    clearError();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   ERROR HANDLING
========================================= */

function showError(message) {

    errorMessage.textContent = message;
    errorMessage.classList.add("show");
}

function clearError() {

    errorMessage.textContent = "";
    errorMessage.classList.remove("show");
}


/* =========================================
   SUBJECT → CHAPTER
========================================= */

subjectSelect.addEventListener("change", () => {

    const selectedSubject = subjectSelect.value;

    chapterSelect.innerHTML = `
        <option value="">Select Chapter</option>
    `;

    chapterSelect.disabled = true;

    if (!selectedSubject || !chapterData[selectedSubject]) {
        return;
    }

    chapterData[selectedSubject].forEach((chapter) => {

        const option = document.createElement("option");

        option.value = chapter.value;
        option.textContent = chapter.name;

        chapterSelect.appendChild(option);
    });

    chapterSelect.disabled = false;
});


/* =========================================
   VALIDATE SETUP
========================================= */

function validateSetup() {

    if (!subjectSelect.value) {
        showError("Please select a subject.");
        return false;
    }

    if (!chapterSelect.value) {
        showError("Please select a chapter.");
        return false;
    }

    if (!practiceTypeSelect.value) {
        showError("Please select a practice type.");
        return false;
    }

    if (!difficultySelect.value) {
        showError("Please select a difficulty.");
        return false;
    }

    if (!questionCountSelect.value) {
        showError("Please select the number of questions.");
        return false;
    }

    return true;
}


/* =========================================
   GET CHAPTER NAME
========================================= */

function getSelectedChapterName() {

    const selectedSubject = subjectSelect.value;
    const selectedChapter = chapterSelect.value;

    const chapters = chapterData[selectedSubject] || [];

    const chapter = chapters.find((item) => {
        return item.value === selectedChapter;
    });

    return chapter ? chapter.name : "Selected Chapter";
}


/* =========================================
   CREATE TEMPORARY QUESTIONS
========================================= */

function createTemporaryQuestions(settings) {

    const chapterQuestions =
        demoQuestionBank[settings.chapter] || [];

    let questions = [...chapterQuestions];

    if (questions.length === 0) {

        questions = [
            {
                type: "mcq",
                question:
                    "This is a temporary practice question. AI-generated questions will be connected in the backend phase.",
                options: [
                    "Option A",
                    "Option B",
                    "Option C",
                    "Option D"
                ],
                answer: 0,
                explanation:
                    "This is temporary demo data. The final website will use chapter-specific AI-generated questions."
            }
        ];
    }

    const requiredCount = Number(settings.questionCount);

    const generatedQuestions = [];

    for (let index = 0; index < requiredCount; index++) {

        const originalQuestion =
            questions[index % questions.length];

        generatedQuestions.push({
            ...originalQuestion,
            uniqueTemporaryId: `${settings.chapter}-${index + 1}`
        });
    }

    return generatedQuestions;
}


/* =========================================
   START PRACTICE
========================================= */

startPracticeBtn.addEventListener("click", () => {

    if (!validateSetup()) {
        return;
    }

    currentSettings = {
        subject: subjectSelect.value,
        chapter: chapterSelect.value,
        chapterName: getSelectedChapterName(),
        practiceType: practiceTypeSelect.value,
        difficulty: difficultySelect.value,
        questionCount: Number(questionCountSelect.value)
    };

    showScreen(loadingScreen);

    loadingMessage.textContent =
        "Preparing your practice questions...";

    setTimeout(() => {

        currentQuestions =
            createTemporaryQuestions(currentSettings);

        currentQuestionIndex = 0;
        userAnswers = new Array(currentQuestions.length).fill(null);
        isAnswerLocked = false;

        practiceChapterName.textContent =
            currentSettings.chapterName;

        showScreen(practiceScreen);

        renderCurrentQuestion();

    }, 700);
});


/* =========================================
   RENDER CURRENT QUESTION
========================================= */

function renderCurrentQuestion() {

    const question =
        currentQuestions[currentQuestionIndex];

    if (!question) {
        finishPractice();
        return;
    }

    isAnswerLocked = false;

    const questionNumber = currentQuestionIndex + 1;
    const totalQuestions = currentQuestions.length;

    questionProgress.textContent =
        `Question ${questionNumber} of ${totalQuestions}`;

    progressBar.style.width =
        `${(questionNumber / totalQuestions) * 100}%`;

    const selectedAnswer =
        userAnswers[currentQuestionIndex];

    let optionsHTML = "";

    if (Array.isArray(question.options)) {

        optionsHTML = `
            <div class="options-container">
                ${question.options.map((option, index) => {

                    const isSelected =
                        selectedAnswer === index;

                    return `
                        <button
                            type="button"
                            class="option ${isSelected ? "selected" : ""}"
                            data-option-index="${index}"
                        >
                            ${String.fromCharCode(65 + index)}.
                            ${escapeHTML(option)}
                        </button>
                    `;

                }).join("")}
            </div>
        `;

    } else {

        optionsHTML = `
            <textarea
                class="answer-input"
                id="writtenAnswer"
                placeholder="Write your answer here..."
            >${selectedAnswer || ""}</textarea>
        `;

