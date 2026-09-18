/* =========================================================
   STUDY AI — PRACTICE ENGINE
   Frontend-only working version
   ========================================================= */

"use strict";

/* -----------------------------
   DOM
----------------------------- */

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
const scoreMessage = document.getElementById("scoreMessage");
const reviewContainer = document.getElementById("reviewContainer");

const errorMessage = document.getElementById("errorMessage");


/* -----------------------------
   STATE
----------------------------- */

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


/* -----------------------------
   STORAGE
----------------------------- */

const STORAGE_KEY = "studyAIPracticeHistoryV1";

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function cleanText(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function chapterKey(subject, chapter) {
  return `${cleanText(subject)}::${cleanText(chapter)}`;
}

function getUsedIds(subject, chapter) {
  const history = loadHistory();
  const key = chapterKey(subject, chapter);

  if (!history[key]) {
    return [];
  }

  return history[key];
}

function markQuestionsUsed(subject, chapter, ids) {
  const history = loadHistory();
  const key = chapterKey(subject, chapter);

  if (!history[key]) {
    history[key] = [];
  }

  const combined = [...history[key], ...ids];

  history[key] = [...new Set(combined)];

  saveHistory(history);
}


/* -----------------------------
   SCREEN CONTROL
----------------------------- */

function showScreen(screen) {
  setupScreen.classList.remove("active");
  practiceScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  loadingScreen.classList.remove("active");

  screen.classList.add("active");
}


/* -----------------------------
   QUESTION DATABASE
----------------------------- */

const questionBank = {

  Science: {

    "Chemical Reactions and Equations": [
      {
        id: "sci-cr-001",
        q: "Which type of reaction occurs when two or more substances combine to form a single product?",
        options: [
          "Decomposition reaction",
          "Combination reaction",
          "Displacement reaction",
          "Double displacement reaction"
        ],
        answer: 1,
        explanation: "A combination reaction forms a single product from two or more reactants."
      },
      {
        id: "sci-cr-002",
        q: "What is the process called in which a substance gains oxygen?",
        options: [
          "Reduction",
          "Oxidation",
          "Neutralisation",
          "Precipitation"
        ],
        answer: 1,
        explanation: "Gain of oxygen is described as oxidation."
      },
      {
        id: "sci-cr-003",
        q: "Which gas is generally released when a metal reacts with a dilute acid?",
        options: [
          "Oxygen",
          "Nitrogen",
          "Hydrogen",
          "Carbon dioxide"
        ],
        answer: 2,
        explanation: "Many metals react with dilute acids to produce salt and hydrogen gas."
      },
      {
        id: "sci-cr-004",
        q: "A reaction in which one element replaces another element from a compound is called:",
        options: [
          "Combination reaction",
          "Displacement reaction",
          "Decomposition reaction",
          "Neutralisation reaction"
        ],
        answer: 1,
        explanation: "In a displacement reaction, a more reactive element displaces a less reactive element."
      },
      {
        id: "sci-cr-005",
        q: "Which observation can indicate that a chemical reaction has occurred?",
        options: [
          "Formation of a gas",
          "Change in temperature",
          "Change in colour",
          "All of these"
        ],
        answer: 3,
        explanation: "Gas formation, temperature change and colour change can all indicate a chemical reaction."
      },
      {
        id: "sci-cr-006",
        q: "What happens to silver chloride in sunlight?",
        options: [
          "It turns black",
          "It turns blue",
          "It becomes green",
          "It dissolves completely"
        ],
        answer: 0,
        explanation: "Silver chloride decomposes in sunlight and forms silver, which gives a greyish-black appearance."
      }
    ]

  },

  Mathematics: {

    "Real Numbers": [
      {
        id: "math-rn-001",
        q: "Which theorem is used to find the HCF of two positive integers?",
        options: [
          "Pythagoras theorem",
          "Euclid's division lemma",
          "Basic proportionality theorem",
          "Remainder theorem"
        ],
        answer: 1,
        explanation: "Euclid's division lemma is the basis of Euclid's algorithm for finding HCF."
      },
      {
        id: "math-rn-002",
        q: "The decimal expansion of a rational number terminates when, in lowest form, its denominator has prime factors:",
        options: [
          "Only 2 and/or 5",
          "Only 3 and 7",
          "Only 2 and 3",
          "Only 5 and 7"
        ],
        answer: 0,
        explanation: "A rational number has a terminating decimal expansion when the denominator has no prime factors other than 2 and 5."
      },
      {
        id: "math-rn-003",
        q: "Which of the following is irrational?",
        options: [
          "0.25",
          "3/7",
          "√2",
          "5"
        ],
        answer: 2,
        explanation: "√2 cannot be expressed as a ratio of two integers."
      },
      {
        id: "math-rn-004",
        q: "If HCF(a,b) = 1, then a and b are called:",
        options: [
          "Prime numbers",
          "Co-prime numbers",
          "Composite numbers",
          "Even numbers"
        ],
        answer: 1,
        explanation: "Two numbers whose HCF is 1 are called co-prime numbers."
      }
    ]

  },

  "Social Science": {

    "Nationalism in India": [
      {
        id: "sst-ni-001",
        q: "Who led the Civil Disobedience Movement with the Dandi March?",
        options: [
          "Jawaharlal Nehru",
          "Mahatma Gandhi",
          "Subhas Chandra Bose",
          "Bhagat Singh"
        ],
        answer: 1,
        explanation: "Mahatma Gandhi launched the Civil Disobedience Movement with the Salt March to Dandi."
      },
      {
        id: "sst-ni-002",
        q: "The Rowlatt Act was passed in:",
        options: [
          "1915",
          "1917",
          "1919",
          "1922"
        ],
        answer: 2,
        explanation: "The Rowlatt Act was passed in 1919."
      },
      {
        id: "sst-ni-003",
        q: "The Jallianwala Bagh incident took place in:",
        options: [
          "Amritsar",
          "Delhi",
          "Lucknow",
          "Bombay"
        ],
        answer: 0,
        explanation: "The Jallianwala Bagh incident occurred in Amritsar on 13 April 1919."
      },
      {
        id: "sst-ni-004",
        q: "The Non-Cooperation Movement was launched in:",
        options: [
          "1919",
          "1920",
          "1925",
          "1930"
        ],
        answer: 1,
        explanation: "The Non-Cooperation Movement was launched in 1920."
      }
    ]

  },

  English: {

    "A Letter to God": [
      {
        id: "eng-ltg-001",
        q: "What was Lencho's main hope after the hailstorm?",
        options: [
          "A new house",
          "A good harvest",
          "A government job",
          "A trip to the city"
        ],
        answer: 1,
        explanation: "Lencho hoped for help because the hailstorm had destroyed his crop."
      },
      {
        id: "eng-ltg-002",
        q: "To whom did Lencho write a letter?",
        options: [
          "The postmaster",
          "His friend",
          "God",
          "The mayor"
        ],
        answer: 2,
        explanation: "Lencho wrote directly to God asking for money."
      },
      {
        id: "eng-ltg-003",
        q: "What destroyed Lencho's crop?",
        options: [
          "Flood",
          "Drought",
          "Hailstorm",
          "Fire"
        ],
        answer: 2,
        explanation: "A severe hailstorm destroyed Lencho's entire crop."
      }
    ]

  },

  Hindi: {

    "बड़े भाई साहब": [
      {
        id: "hin-bbs-001",
        q: "‘बड़े भाई साहब’ पाठ के लेखक कौन हैं?",
        options: [
          "प्रेमचंद",
          "रामधारी सिंह दिनकर",
          "हरिशंकर परसाई",
          "सुमित्रानंदन पंत"
        ],
        answer: 0,
        explanation: "‘बड़े भाई साहब’ के लेखक मुंशी प्रेमचंद हैं।"
      },
      {
        id: "hin-bbs-002",
        q: "बड़े भाई साहब छोटे भाई को मुख्य रूप से क्या समझाते थे?",
        options: [
          "खेल का महत्व",
          "अनुशासन और पढ़ाई का महत्व",
          "यात्रा का महत्व",
          "धन का महत्व"
        ],
        answer: 1,
        explanation: "बड़े भाई साहब पढ़ाई, अनुशासन और अनुभव के महत्व पर जोर देते थे।"
      },
      {
        id: "hin-bbs-003",
        q: "छोटे भाई को किस चीज़ में विशेष रुचि थी?",
        options: [
          "खेल-कूद",
          "चित्रकारी",
          "संगीत",
          "व्यापार"
        ],
        answer: 0,
        explanation: "छोटे भाई की रुचि पढ़ाई के साथ-साथ खेल-कूद में भी थी।"
      }
    ]

  }

};


/* -----------------------------
   FALLBACK QUESTION GENERATOR
----------------------------- */

function createFallbackQuestions(settings) {

  const chapter = settings.chapter;
  const subject = settings.subject;

  const templates = [
    {
      id: "fallback-a",
      q: `In the chapter "${chapter}", which concept is most closely connected with understanding the main topic?`,
      options: [
        "The central concept of the chapter",
        "An unrelated topic",
        "A random example",
        "None of these"
      ],
      answer: 0,
      explanation: `The central concept is the key idea students should understand from ${chapter}.`
    },
    {
      id: "fallback-b",
      q: `For Class 10 ${subject}, why is careful understanding of "${chapter}" important?`,
      options: [
        "It helps understand the chapter's concepts",
        "It removes the need for studying",
        "It is unrelated to the subject",
        "It only applies to another class"
      ],
      answer: 0,
      explanation: `Understanding the chapter concepts helps in answering basic, application and board-style questions.`
    },
    {
      id: "fallback-c",
      q: `Which approach is most useful while preparing the chapter "${chapter}"?`,
      options: [
        "Understand concepts and practise questions",
        "Memorise random answers only",
        "Skip examples",
        "Avoid revision"
      ],
      answer: 0,
      explanation: "Concept understanding followed by practice and revision is an effective study approach."
    },
    {
      id: "fallback-d",
      q: `A student is revising "${chapter}". Which step should come first?`,
      options: [
        "Understand the key concepts",
        "Skip the chapter",
        "Memorise without understanding",
        "Avoid practice"
      ],
      answer: 0,
      explanation: "Understanding the key concepts provides the foundation for further practice."
    },
    {
      id: "fallback-e",
      q: `Which type of preparation can improve performance in questions from "${chapter}"?`,
      options: [
        "Conceptual practice",
        "No revision",
        "Guessing every answer",
        "Studying unrelated chapters only"
      ],
      answer: 0,
      explanation: "Conceptual practice helps students handle different forms of questions."
    }
  ];

  return templates.map((item, index) => ({
    ...item,
    id: `${settings.subject}-${cleanText(chapter)}-${settings.practiceType}-${index}`
      .replace(/[^a-z0-9-]/gi, "-")
  }));
}


/* -----------------------------
   QUESTION POOL
----------------------------- */

function getBaseQuestions(settings) {

  const subjectData = questionBank[settings.subject];

  if (subjectData) {
    const chapterData = subjectData[settings.chapter];

    if (chapterData && chapterData.length) {
      return chapterData.map(q => ({ ...q }));
    }
  }

  return createFallbackQuestions(settings);
}


/* -----------------------------
   SHUFFLE
----------------------------- */

function shuffle(array) {

  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}


/* -----------------------------
   CREATE VARIATIONS
----------------------------- */

function createQuestionVariations(baseQuestions, settings) {

  const result = [];

  const difficultyText = settings.difficulty;

  baseQuestions.forEach((base, baseIndex) => {

    for (let variant = 0; variant < 12; variant++) {

      const variationId =
        `${base.id}-v${variant + 1}`;

      let questionText = base.q;

      if (variant > 0) {

        const prefixes = [
          "Consider the following question:",
          "Choose the correct answer:",
          "Based on the chapter, answer:",
          "Select the most appropriate option:",
          "Read carefully and answer:",
          "Identify the correct statement:",
          "From the chapter, determine:",
          "Apply the concept and answer:",
          "Recall the relevant concept:",
          "Which option correctly answers this?",
          "Which statement is correct?",
          "Choose the best answer:"
        ];

        questionText =
          `${prefixes[variant % prefixes.length]} ${base.q}`;
      }

      result.push({
        ...base,
        id: variationId,
        q: questionText,
        difficulty: difficultyText
      });
    }

  });

  return result;
}


/* -----------------------------
   GET QUESTIONS
----------------------------- */

function generateQuestions(settings) {

  let pool = getBaseQuestions(settings);

  pool = createQuestionVariations(pool, settings);

  const usedIds = getUsedIds(
    settings.subject,
    settings.chapter
  );

  let available = pool.filter(
    question => !usedIds.includes(question.id)
  );

  /*
    If the local pool is exhausted, the app starts a new
    question cycle. This keeps the website usable even
    without a backend.
  */
  if (available.length < settings.questionCount) {

    const unusedBase = pool.filter(
      question => !usedIds.includes(question.id)
    );

    if (unusedBase.length > 0) {
      available = unusedBase;
    } else {
      available = pool;
    }
  }

  available = shuffle(available);

  const selected = [];

  while (
    selected.length < settings.questionCount &&
    available.length > 0
  ) {

    const question = available.shift();

    if (!selected.some(q => q.id === question.id)) {
      selected.push(question);
    }

  }

  /*
    If the selected pool is smaller than requested count,
    recycle only for the current attempt.
  */
  while (selected.length < settings.questionCount) {

    const source = pool[
      selected.length % pool.length
    ];

    const copy = {
      ...source,
      id: `${source.id}-attempt-${selected.length}-${Date.now()}`
    };

    selected.push(copy);
  }

  return selected;
}


/* -----------------------------
   START PRACTICE
----------------------------- */

startBtn.addEventListener("click", startPractice);

function startPractice() {

  clearError();

  const chapter = chapterInput.value.trim();

  if (!chapter) {
    showError("Please enter the chapter name.");
    chapterInput.focus();
    return;
  }

  currentSettings = {
    subject: subjectSelect.value,
    chapter,
    practiceType: practiceTypeSelect.value,
    difficulty: difficultySelect.value,
    questionCount: Number(questionCountSelect.value)
  };

  showScreen(loadingScreen);

  setTimeout(() => {

    questions = generateQuestions(currentSettings);

    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);

    practiceChapterName.textContent =
      currentSettings.chapter;

    showScreen(practiceScreen);

    renderQuestion();

  }, 450);
}


/* -----------------------------
   RENDER QUESTION
----------------------------- */

function renderQuestion() {

  const question = questions[currentQuestionIndex];

  if (!question) {
    return;
  }

  questionProgress.textContent =
    `${currentQuestionIndex + 1} / ${questions.length}`;

  const percentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  progressBar.style.width = `${percentage}%`;

  const selectedAnswer =
    userAnswers[currentQuestionIndex];

  questionContainer.innerHTML = "";

  const card = document.createElement("div");
  card.className = "question-card";

  const meta = document.createElement("div");
  meta.className = "question-meta";

  const number = document.createElement("div");
  number.className = "question-number";
  number.textContent =
    `QUESTION ${currentQuestionIndex + 1}`;

  const difficulty = document.createElement("div");
  difficulty.className = "difficulty-tag";
  difficulty.textContent =
    question.difficulty || currentSettings.difficulty;

  meta.appendChild(number);
  meta.appendChild(difficulty);

  const text = document.createElement("div");
  text.className = "question-text";
  text.textContent = question.q;

  card.appendChild(meta);
  card.appendChild(text);

  if (
    currentSettings.practiceType === "Very Short Answer" ||
    currentSettings.practiceType === "Short Answer" ||
    currentSettings.practiceType === "Long Answer" ||
    currentSettings.practiceType === "One-Word"
  ) {

    const instruction = document.createElement("div");
    instruction.className = "question-instruction";

    if (currentSettings.practiceType === "One-Word") {
      instruction.textContent =
        "Write your answer in one word.";
    } else if (
      currentSettings.practiceType === "Very Short Answer"
    ) {
      instruction.textContent =
        "Answer briefly in one or two sentences.";
    } else if (
      currentSettings.practiceType === "Short Answer"
    ) {
      instruction.textContent =
        "Write a concise answer.";
    } else {
      instruction.
