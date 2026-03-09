/* ---------- REGISTRATION & LEARNING PAGE SAFETY ---------- */
document.addEventListener("DOMContentLoaded", function() {

    /* ---------- LEARNING MODULE TOPIC SELECT ---------- */
    // Ensure this script only runs on the learning page, where these elements exist
    const topicSelect = document.getElementById("topicSelect");
    const videoFrame = document.getElementById("topicVideo");

    if (topicSelect && videoFrame) {
        topicSelect.addEventListener("change", function() {
            const topic = this.value;
            // You can add logic here to fetch video based on selection for learning.html if needed.
        });
    }
});

/* ---------- ASSESSMENT & QUIZ LOGIC ---------- */

// Database featuring exactly 10 questions per quiz
const quizData = {
    1: [ // Lesson 1: The Solar System
        { q: "What is at the center of our Solar System?", options: ["The Earth", "The Moon", "The Sun", "Jupiter"], answer: 2 },
        { q: "How many planets are currently recognized in our Solar System?", options: ["7", "8", "9", "10"], answer: 1 },
        { q: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: 2 },
        { q: "Which is the largest planet in our Solar System?", options: ["Saturn", "Jupiter", "Neptune", "Uranus"], answer: 1 },
        { q: "What shape are planetary orbits?", options: ["Perfectly Circular", "Elliptical", "Square", "Triangular"], answer: 1 },
        { q: "What fundamental force keeps planets in orbit?", options: ["Magnetism", "Friction", "Gravity", "Tension"], answer: 2 },
        { q: "What region lies between Mars and Jupiter?", options: ["Kuiper Belt", "Oort Cloud", "Asteroid Belt", "Event Horizon"], answer: 2 },
        { q: "Which of these is classified as a dwarf planet?", options: ["Pluto", "Europa", "Titan", "Ganymede"], answer: 0 },
        { q: "Approximately how old is the Solar System?", options: ["4.6 billion years", "1 million years", "14 billion years", "6000 years"], answer: 0 },
        { q: "What is the boundary of the solar system called?", options: ["Heliopause", "Event Horizon", "Terminator", "Ozone layer"], answer: 0 }
    ],
    2: [ // Lesson 2: The Sun
        { q: "What two elements primarily make up the Sun?", options: ["Oxygen & Carbon", "Hydrogen & Helium", "Nitrogen & Iron", "Rock & Ice"], answer: 1 },
        { q: "What is the outermost layer of the Sun's atmosphere?", options: ["Photosphere", "Chromosphere", "Core", "Corona"], answer: 3 },
        { q: "What type of star is our Sun?", options: ["Red Giant", "White Dwarf", "Yellow Dwarf", "Neutron Star"], answer: 2 },
        { q: "What is the dark, cooler region on the Sun's surface called?", options: ["Solar Flare", "Sunspot", "Prominence", "Coronal Hole"], answer: 1 },
        { q: "How does the Sun generate its energy?", options: ["Nuclear Fission", "Combustion", "Nuclear Fusion", "Geothermal"], answer: 2 },
        { q: "About how long does it take for sunlight to reach Earth?", options: ["1 minute", "8 minutes", "1 hour", "24 hours"], answer: 1 },
        { q: "What is the visible surface of the Sun called?", options: ["Corona", "Core", "Photosphere", "Radiative Zone"], answer: 2 },
        { q: "How hot is the Sun's core approximately?", options: ["15 Million °C", "5,500 °C", "100,000 °C", "1 Billion °C"], answer: 0 },
        { q: "What phenomenon causes auroras on Earth?", options: ["Lunar Eclipses", "Solar Wind/Flares", "Comet Dust", "Asteroids"], answer: 1 },
        { q: "Will the Sun ever become a Black Hole?", options: ["Yes", "No, it is not massive enough", "Only in 1 billion years", "It already is one"], answer: 1 }
    ],
    // A default 10-question set that safely loads for lessons 3-16 until they are filled out.
    "default": [ 
        { q: "Which planet is known as the Earth's 'Twin' due to its size?", options: ["Mars", "Venus", "Neptune", "Uranus"], answer: 1 },
        { q: "What is the primary component of the Martian atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], answer: 2 },
        { q: "Which planet has the most prominent ring system?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], answer: 1 },
        { q: "What is the name of the largest volcano in the solar system?", options: ["Mount Everest", "Mauna Kea", "Olympus Mons", "Krakatoa"], answer: 2 },
        { q: "Which planet rotates on its side?", options: ["Uranus", "Venus", "Mercury", "Earth"], answer: 0 },
        { q: "What are comets primarily made of?", options: ["Solid Iron", "Ice, dust, and rocky material", "Liquid Water", "Dense Gases"], answer: 1 },
        { q: "What do we call a meteoroid that survives its passage through the atmosphere and hits the ground?", options: ["Meteor", "Asteroid", "Comet", "Meteorite"], answer: 3 },
        { q: "Which moon of Jupiter is thought to have a subsurface ocean?", options: ["Io", "Callisto", "Europa", "Ganymede"], answer: 2 },
        { q: "What defines a black hole's boundary from which nothing can escape?", options: ["Singularity", "Event Horizon", "Photon Sphere", "Accretion Disk"], answer: 1 },
        { q: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], answer: 2 }
    ]
};

const lessonTitles = [
    "The Solar System", "The Sun", "Mercury", "Venus", "Earth", "The Moon", 
    "Mars", "Asteroid Belt", "Jupiter", "Saturn", "Uranus", "Neptune", 
    "Pluto & Dwarf Planets", "Comets", "Meteors & Meteorites", "Black Holes"
];

// Logic for assessment.html (List generation)
const quizListContainer = document.getElementById("quizListContainer");
if (quizListContainer) {
    for (let i = 1; i <= 16; i++) {
        const isCompleted = localStorage.getItem(`quiz_completed_${i}`) === "true";
        const badgeClass = isCompleted ? "status-badge completed" : "status-badge pending";
        const badgeText = isCompleted ? "Completed" : "Not Completed";
        const title = lessonTitles[i-1];

        const card = document.createElement("a");
        card.href = `quiz.html?lesson=${i}`;
        card.className = "quiz-card";
        card.innerHTML = `
            <div class="quiz-info">
                <div class="quiz-title">Lesson ${i}: ${title} Quiz</div>
            </div>
            <div class="${badgeClass}">${badgeText}</div>
        `;
        quizListContainer.appendChild(card);
    }
}

// Logic for quiz.html (Dynamic Quiz Generation & Scoring)
const quizForm = document.getElementById("quizForm");
if (quizForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const lessonNum = urlParams.get('lesson') || 1; // Default to 1 if no param
    const questionsContainer = document.getElementById("questionsContainer");
    const quizTitle = document.getElementById("quizTitle");
    
    // Set Title
    quizTitle.innerText = `Lesson ${lessonNum}: ${lessonTitles[lessonNum-1]} Quiz`;

    // Fetch the 10 questions (specific lesson data, or default if not yet written)
    const questions = quizData[lessonNum] || quizData["default"];

    // Render questions dynamically
    questions.forEach((qObj, index) => {
        const qBlock = document.createElement("div");
        qBlock.className = "question-block";
        
        let optionsHTML = "";
        qObj.options.forEach((opt, optIdx) => {
            optionsHTML += `
                <label class="option-label">
                    <input type="radio" name="q${index}" value="${optIdx}" required>
                    ${opt}
                </label>
            `;
        });

        qBlock.innerHTML = `
            <div class="question-text">${index + 1}. ${qObj.q}</div>
            <div class="options-grid">
                ${optionsHTML}
            </div>
        `;
        questionsContainer.appendChild(qBlock);
    });

    // Handle Quiz Form Submission
    quizForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        let score = 0;
        const formData = new FormData(quizForm);

        // Calculate score
        questions.forEach((qObj, index) => {
            const userAnswer = parseInt(formData.get(`q${index}`));
            if (userAnswer === qObj.answer) {
                score++;
            }
        });

        // Display Score Result
        const resultDiv = document.getElementById("quizResult");
        resultDiv.style.display = "block";
        const percentage = Math.round((score / questions.length) * 100);
        resultDiv.innerHTML = `You scored ${score} out of ${questions.length} (${percentage}%)`;

        // Pass mark: 70% or higher
        if (percentage >= 70) {
            resultDiv.style.background = "rgba(46, 204, 113, 0.2)";
            resultDiv.style.borderColor = "#2ecc71";
            
            // Mark as completed in localStorage
            localStorage.setItem(`quiz_completed_${lessonNum}`, "true");
        } else {
            resultDiv.style.background = "rgba(255, 77, 77, 0.2)";
            resultDiv.style.borderColor = "#ff4d4d";
            resultDiv.innerHTML += `<br><span style="font-size:0.9rem;">You need 70% to pass. Review the lesson and try again!</span>`;
        }

        // Hide submit button, show return button
        document.getElementById("submitQuizBtn").style.display = "none";
        document.getElementById("backToAssessmentsBtn").style.display = "block";
        
        // Disable all radio buttons to lock answers
        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => radio.disabled = true);
        
        // Scroll to result smoothly
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}