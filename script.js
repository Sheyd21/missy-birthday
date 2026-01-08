/*********************************
 GLOBAL HELPERS & VARIABLES
*********************************/

// Music variable - only birthday music remains
const birthdayMusic = new Audio("music/Happy Birthday To You.mp3");
birthdayMusic.loop = false;

// Quiz variables
let quizIndex = 0;
let kisses = 0;
const quizQuestions = [
    { q: "Who said \"I love you\" first?", a: "Missy" },
    { q: "Who fell first, but tried to hide it?", a: "Both" },
    { q: "Who is more patient during difficult moments?", a: "Missy" },
    { q: "Who explains things even when tired, just to help?", a: "Missy" },
    { q: "Who cooks better?", a: "Sheyd" },
    { q: "Who eats more but pretends they don't?", a: "Both" },
    { q: "Who steals food from the other's plate?", a: "Sheyd" },
    { q: "Who farts and acts like nothing happened?", a: "Sheyd" },
    { q: "Who uses kisses to end arguments?", a: "Missy" },
    { q: "Who misses more but stays strong?", a: "Both" },
    { q: "Who is more romantic when nobody is watching?", a: "Missy" },
    { q: "Who gives the best hugs?", a: "Sheyd" },
    { q: "Who would travel anywhere just to be together?", a: "Missy" },
    { q: "Who feels safest in the other's arms?", a: "Missy" },
    { q: "Who is my forever person?", a: "Sheyd" }
];

// DOM Elements
const passwordInput = document.getElementById("password-input");
const passwordButton = document.getElementById("password-button");
const passwordError = document.getElementById("password-error");
const startJourneyBtn = document.getElementById("start-journey");
const timelineMusicBtn = document.getElementById("timeline-music-btn");

// Navigation buttons from NEW structure
const timelineNextBtn = document.querySelector(".timeline-next-btn");
const journeyNextBtn = document.querySelector(".journey-next-btn");
const galleryNextBtn = document.querySelector(".gallery-next-btn");
const secretContinueBtn = document.querySelector(".secret-continue-btn");

// Quiz elements
const quizContainer = document.querySelector(".quiz-container-modern");
const secretMessage = document.querySelector(".secret-message-modern");

// Constants
const correctPassword = "20250127";

// Global state
let isTimelineMusicPlaying = false;

/*********************************
 UTILITY FUNCTIONS
*********************************/

function showSection(sectionId) {
    console.log(`Navigating to: ${sectionId}`);

    // Hide all sections
    document.querySelectorAll("section").forEach(sec => {
        sec.classList.add("hidden");
    });

    // Show requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove("hidden");
        section.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error(`Section #${sectionId} not found!`);
    }
}

function stopAllMusic() {
    birthdayMusic.pause();
    birthdayMusic.currentTime = 0;
}

function playMusic(track) {
    stopAllMusic();
    track.play().catch(e => {
        console.log("Music play prevented by browser. User needs to interact first.");
    });
}

function typeWriter(element, text, speed = 30) {
    if (!element) return;

    element.textContent = "";
    let index = 0;

    function typing() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

/*********************************
 SECTION 0 — PASSWORD
*********************************/

function initPasswordSection() {
    // Create floating shapes
    function createFloatingShapes() {
        const container = document.querySelector('.floating-shapes-container') ||
            document.getElementById('password-section');

        if (!container) return;

        for (let i = 0; i < 8; i++) {
            const shape = document.createElement("div");
            shape.className = "floating-shape";
            shape.style.left = Math.random() * 100 + "vw";
            shape.style.top = Math.random() * 100 + "vh";
            shape.style.animationDelay = Math.random() * 5 + "s";
            container.appendChild(shape);
        }
    }

    // Create floating hearts
    function spawnHearts() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "❤";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "-20px";
        heart.style.fontSize = 14 + Math.random() * 10 + "px";
        const passwordSection = document.getElementById("password-section");
        if (passwordSection) {
            passwordSection.appendChild(heart);
            setTimeout(() => heart.remove(), 14000);
        }
    }

    // Initialize
    createFloatingShapes();
    setInterval(spawnHearts, 1200);

    if (passwordButton) {
        passwordButton.addEventListener("click", handlePasswordSubmit);
    }

    if (passwordInput) {
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handlePasswordSubmit();
        });
    }
}

function handlePasswordSubmit() {
    if (!passwordInput) return;

    if (passwordInput.value === correctPassword) {
        // Show success celebration
        const successCelebration = document.querySelector('.success-celebration');
        if (successCelebration) {
            successCelebration.classList.remove('hidden');
        }

        // Create fireworks
        createFireworks();

        // Show next section after delay
        setTimeout(() => {
            showSection("intro-section");
            if (successCelebration) {
                successCelebration.classList.add('hidden');
            }
            birthdayMusic.play().catch(e => console.log("Autoplay blocked"));
            createBirthdayDecorations();
        }, 2000);
    } else {
        if (passwordError) {
            passwordError.textContent = "Wrong password. Try again.";
        }
        passwordInput.classList.add('shake');
        setTimeout(() => passwordInput.classList.remove('shake'), 500);
    }
}

function createFireworks() {
    const successCelebration = document.querySelector('.success-celebration');
    if (!successCelebration) return;

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework-burst';
            firework.style.left = Math.random() * 100 + '%';
            successCelebration.appendChild(firework);

            setTimeout(() => {
                if (firework.parentNode) {
                    firework.remove();
                }
            }, 2000);
        }, i * 100);
    }
}

/*********************************
 SECTION 1 — INTRO + BIRTHDAY
*********************************/

function initIntroSection() {
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener("click", () => {
            stopAllMusic();
            showSection("timeline-section");
        });
    }
}

function createBirthdayDecorations() {
    // Add confetti pieces
    const confettiRain = document.querySelector('.confetti-rain');
    if (confettiRain) {
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = (Math.random() * 5) + 's';
            confettiRain.appendChild(confetti);
        }
    }

    // Launch confetti
    launchConfetti();
}

function launchConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.setProperty("--x", Math.random());
        confetti.style.setProperty("--hue", Math.random() * 360);
        document.body.appendChild(confetti);
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        }, 6000);
    }
}

/*********************************
 SECTION 2 — TIMELINE
*********************************/

function initTimelineSection() {
    // Create starry background
    createStarryBackground();

    // Add intersection observers for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item-modern');
    timelineItems.forEach(item => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    }
                });
            }, { threshold: 0.2 }
        );
        observer.observe(item);
    });

    // Music button - now plays birthday music
    if (timelineMusicBtn) {
        timelineMusicBtn.addEventListener("click", handleTimelineMusic);
        // Update button text
        timelineMusicBtn.innerHTML = '<span class="btn-sparkle">🎵</span> Play Birthday Song';
    }

    // Next button - FIXED: Now goes to journey-section (Section 3)
    if (timelineNextBtn) {
        timelineNextBtn.addEventListener("click", () => {
            stopAllMusic();
            showSection("journey-section");
        });
    }
}

function handleTimelineMusic() {
    if (birthdayMusic.paused) {
        playMusic(birthdayMusic);
        timelineMusicBtn.innerHTML = '<span class="btn-sparkle">⏸️</span> Pause Birthday Song';
        timelineMusicBtn.classList.add('playing');
    } else {
        birthdayMusic.pause();
        timelineMusicBtn.innerHTML = '<span class="btn-sparkle">🎵</span> Play Birthday Song';
        timelineMusicBtn.classList.remove('playing');
    }
}

function createStarryBackground() {
    const starryBg = document.querySelector('.starry-background');
    if (starryBg) {
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            starryBg.appendChild(star);
        }
    }
}

/*********************************
 SECTION 3 — JOURNEY SECTION (NEW)
*********************************/

function initJourneySection() {
    console.log("Initializing Journey Section...");

    // Create floating personal icons
    createFloatingPersonalIcons();

    // Add hover effects to journey items
    const journeyItems = document.querySelectorAll('.journey-item, .childhood-item, .daily-category');
    journeyItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Next button - Goes to gallery-section (Section 4)
    if (journeyNextBtn) {
        journeyNextBtn.addEventListener("click", () => {
            stopAllMusic();
            showSection("gallery-section");
        });
    } else {
        console.warn("Journey next button not found!");
    }
}

function createFloatingPersonalIcons() {
    const container = document.querySelector('.floating-personal-icons');
    if (!container) {
        console.warn("Floating personal icons container not found!");
        return;
    }

    const icons = ['👶', '🎓', '🎨', '💼', '❤️', '😊', '✨', '🌟', '💕', '🎉'];

    icons.forEach(icon => {
        const iconEl = document.createElement('span');
        iconEl.className = 'personal-icon';
        iconEl.textContent = icon;
        iconEl.style.left = `${Math.random() * 100}%`;
        iconEl.style.top = `${Math.random() * 100}%`;
        iconEl.style.animationDelay = `${Math.random() * 20}s`;
        iconEl.style.fontSize = `${20 + Math.random() * 20}px`;
        container.appendChild(iconEl);
    });
}

/*********************************
 SECTION 4 — GALLERY SECTION (NEW)
*********************************/

function initGallerySection() {
    console.log("Initializing Gallery Section...");

    // Create floating love symbols
    createFloatingGallerySymbols();

    // Add hover effects to gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const caption = item.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(0)';
                caption.style.opacity = '1';
            }
        });

        item.addEventListener('mouseleave', () => {
            const caption = item.querySelector('.gallery-caption');
            if (caption) {
                caption.style.transform = 'translateY(100%)';
                caption.style.opacity = '0';
            }
        });
    });

    // Gallery category filter
    initGalleryFilters();

    // Next button - Goes to quiz
    if (galleryNextBtn) {
        galleryNextBtn.addEventListener("click", () => {
            stopAllMusic();
            showSection("surprise-section");
            startQuiz();
        });
    } else {
        console.warn("Gallery next button not found!");
    }
}

function createFloatingGallerySymbols() {
    const container = document.querySelector('.floating-love-symbols');
    if (!container) {
        console.warn("Floating love symbols container not found!");
        return;
    }

    const symbols = ['💝', '🎁', '🌹', '💍', '😊', '❤️', '✨', '🥰', '🌟', '💕'];

    symbols.forEach(symbol => {
        const symbolEl = document.createElement('span');
        symbolEl.className = 'love-symbol';
        symbolEl.textContent = symbol;
        symbolEl.style.left = `${Math.random() * 100}%`;
        symbolEl.style.top = `${Math.random() * 100}%`;
        symbolEl.style.animationDelay = `${Math.random() * 20}s`;
        symbolEl.style.fontSize = `${20 + Math.random() * 20}px`;
        container.appendChild(symbolEl);
    });
}

function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.category-nav-btn');
    const galleryCategories = document.querySelectorAll('.gallery-category[data-category]');

    // Set default: show all categories
    galleryCategories.forEach(cat => {
        cat.style.display = 'block';
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;

            // Show/hide categories
            galleryCategories.forEach(cat => {
                if (category === 'all' || cat.dataset.category === category) {
                    cat.style.display = 'block';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
}

/*********************************
 SECTION 5 — QUIZ
*********************************/

function initQuizSection() {
    // Create sparkle background
    createSparkleBackground();

    // Secret continue button
    if (secretContinueBtn) {
        secretContinueBtn.addEventListener("click", () => {
            stopAllMusic();
            showSection("letter-section");
        });
    }
}

function createSparkleBackground() {
    const sparkleBg = document.querySelector('.sparkle-bg');
    if (!sparkleBg) return;

    for (let i = 0; i < 40; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 3}s`;
        sparkle.innerHTML = '✨';
        sparkle.style.fontSize = `${10 + Math.random() * 15}px`;
        sparkleBg.appendChild(sparkle);
    }
}

function startQuiz() {
    quizIndex = 0;
    kisses = 0;
    if (quizContainer) quizContainer.classList.remove("hidden");
    if (secretMessage) secretMessage.classList.add("hidden");
    showQuizQuestion();
}

function showQuizQuestion() {
    if (!quizContainer) return;

    quizContainer.innerHTML = "";

    if (quizIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }

    const q = quizQuestions[quizIndex];

    // Create question element
    const questionEl = document.createElement("div");
    questionEl.className = "quiz-question";
    questionEl.textContent = q.q;
    quizContainer.appendChild(questionEl);

    // Create options
    ["Missy", "Sheyd", "Both"].forEach(option => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = option;
        btn.addEventListener("click", () => {
            handleAnswer(option, q.a);
        });
        quizContainer.appendChild(btn);
    });

    // Create score display
    const score = document.createElement("div");
    score.className = "kiss-score";
    score.textContent = `💋 Kisses: ${kisses}`;
    quizContainer.appendChild(score);
}

function handleAnswer(selected, correct) {
    const options = document.querySelectorAll('.quiz-option');

    options.forEach(option => {
        if (option.textContent === selected) {
            if (selected === correct) {
                option.classList.add('correct');
                kisses += 10;
                spawnKisses(6);
                createCelebrationEffect(option);
            } else {
                option.classList.add('incorrect');
                kisses = Math.max(0, kisses - 10);
                spawnKisses(3, true);
                createSadEffect(option);
            }
            option.disabled = true;
        }
    });

    setTimeout(() => {
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
        });
        quizIndex++;
        showQuizQuestion();
    }, 1000);
}

function createCelebrationEffect(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';
        sparkle.style.fontSize = '20px';
        sparkle.style.animation = 'sparklePop 1s ease-out forwards';
        element.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
            }
        }, 1000);
    }
}

function createSadEffect(element) {
    const sad = document.createElement('div');
    sad.innerHTML = '💔';
    sad.style.position = 'absolute';
    sad.style.left = '50%';
    sad.style.top = '50%';
    sad.style.fontSize = '24px';
    sad.style.transform = 'translate(-50%, -50%)';
    sad.style.animation = 'fadeOut 1s ease-out forwards';
    element.appendChild(sad);

    setTimeout(() => {
        if (sad.parentNode) {
            sad.remove();
        }
    }, 1000);
}

function endQuiz() {
    if (quizContainer) quizContainer.classList.add("hidden");
    if (secretMessage) secretMessage.classList.remove("hidden");

    const secretText = document.getElementById("secret-text");
    if (secretText) {
        const fullText = secretText.textContent;
        typeWriter(secretText, fullText, 28);
    }

    // Add kiss score to secret message
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'final-score';
    scoreDisplay.innerHTML = `<h3>Final Score: ${kisses} Kisses! 💋</h3>`;
    const secretContent = secretMessage.querySelector('.secret-content');
    if (secretContent) {
        secretContent.appendChild(scoreDisplay);
    }
}

function spawnKisses(amount, negative = false) {
    for (let i = 0; i < amount; i++) {
        const kiss = document.createElement("div");
        kiss.className = "kiss";
        kiss.textContent = negative ? "💔" : "💋";
        kiss.style.left = Math.random() * window.innerWidth + "px";
        kiss.style.bottom = "20px";
        document.body.appendChild(kiss);

        setTimeout(() => {
            if (kiss.parentNode) {
                kiss.remove();
            }
        }, 2500);
    }
}

/*********************************
 SECTION 6 — FINAL LETTER
*********************************/

function initLetterSection() {
    // Add animation to signature
    const signatures = document.querySelectorAll('.handwritten-signature');
    signatures.forEach((signature, index) => {
        setTimeout(() => {
            signature.style.opacity = '1';
        }, 1000 + (index * 500));
    });

    // Add final heart animation
    const finalHeart = document.querySelector('.final-heart');
    if (finalHeart) {
        setInterval(() => {
            finalHeart.style.transform = 'scale(1.2)';
            setTimeout(() => {
                finalHeart.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }
}

/*********************************
 INITIALIZE ALL SECTIONS
*********************************/

document.addEventListener('DOMContentLoaded', () => {
    console.log("🎉 Initializing Birthday Website...");

    // Initialize each section in order
    initPasswordSection();
    initIntroSection();
    initTimelineSection();
    initJourneySection(); // NEW: Section 3
    initGallerySection(); // NEW: Section 4
    initQuizSection();
    initLetterSection();

    console.log("✅ Website initialized successfully!");

    // Debug: Show all sections found
    console.log("📋 Sections found:", Array.from(document.querySelectorAll('section')).map(s => s.id));
});

// Add missing CSS animation (only once)
if (!document.querySelector('#dynamic-animations')) {
    const style = document.createElement('style');
    style.id = 'dynamic-animations';
    style.textContent = `
    @keyframes sparklePop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1) translateY(-50px);
        }
    }

    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    }

    .sparkle {
        position: absolute;
        pointer-events: none;
        animation: floatAround 15s linear infinite;
    }

    .final-score {
        margin-top: 20px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        text-align: center;
    }

    .final-score h3 {
        color: var(--text-accent);
        margin: 0;
    }
    
    /* Gallery caption animations */
    .gallery-caption {
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    `;
    document.head.appendChild(style);
}