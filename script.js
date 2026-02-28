document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Enhancements ---
    const sparklesContainer = document.getElementById('sparkles');
    if (sparklesContainer) {
        function createSparkle() {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');

            // Randomize size, position, and duration
            const size = Math.random() * 8 + 4;
            sparkle.style.width = `${size}px`;
            sparkle.style.height = `${size}px`;
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDuration = `${Math.random() * 2 + 1.5}s`;

            sparklesContainer.appendChild(sparkle);

            // Cleanup
            setTimeout(() => {
                sparkle.remove();
            }, 3500);
        }

        // Spawn sparkles continuously
        setInterval(createSparkle, 300);
    }


    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    const fadeLines = document.querySelectorAll('.fade-line');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                if (entry.target.classList.contains('pin-card')) {
                    entry.target.style.opacity = '1';
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- Typewriter Effect for Love Letter ---
    let typewriterStarted = false;
    const letterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typewriterStarted) {
                typewriterStarted = true;
                startTypewriter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const letterContainer = document.querySelector('.letter-content');
    if (letterContainer) {
        letterObserver.observe(letterContainer);
    }

    function startTypewriter() {
        const lines = Array.from(document.querySelectorAll('.fade-line'));

        // Store original text and clear elements
        const textData = lines.map(el => {
            const text = el.innerText;
            el.innerText = '';
            el.style.opacity = 1; // Ensure container is visible
            return text;
        });

        // Add a global cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';

        let currentLine = 0;
        let currentChar = 0;
        const typingSpeed = 30; // ms per char

        function typeChar() {
            if (currentLine >= textData.length) {
                // Done - remove cursor
                cursor.remove();
                return;
            }

            const element = lines[currentLine];
            const text = textData[currentLine];

            // Wait, then append cursor to current line
            if (currentChar === 0) {
                element.appendChild(cursor);
            }

            if (currentChar < text.length) {
                // Insert character before cursor
                element.insertBefore(document.createTextNode(text.charAt(currentChar)), cursor);
                currentChar++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Move to next line
                currentLine++;
                currentChar = 0;
                setTimeout(typeChar, 300); // 300ms pause between paragraphs
            }
        }

        // Start typing first line
        typeChar();
    }

    // --- Gift Box & Interactive Cake ---
    const giftBoxBtn = document.getElementById('gift-box');
    const cakeContent = document.getElementById('cake-content');
    const boxAnim = document.querySelector('.box');

    if (giftBoxBtn) {
        giftBoxBtn.addEventListener('click', () => {
            boxAnim.classList.add('open');
            giftBoxBtn.querySelector('.subtitle').innerText = "SURPRISE!";

            setTimeout(() => {
                giftBoxBtn.classList.add('hidden');
                cakeContent.classList.remove('hidden');
            }, 1000); // Wait for open animation to finish
        });
    }

    // --- Elegant Spin the Wheel ---
    const spinBtn = document.getElementById('elegant-spin-btn');
    const wheel = document.getElementById('wheel-elegant');
    const spinResult = document.getElementById('elegant-spin-result');
    const prizeText = document.getElementById('elegant-prize-text');
    let currentRotation = 0;
    let isSpinning = false;

    const wheelRim = document.getElementById('wheel-rim');
    if (wheelRim) {
        // Create 24 bulbs around the rim
        for (let i = 0; i < 24; i++) {
            const bulb = document.createElement('div');
            bulb.className = 'bulb';
            // 450px rim width/height. translateY half of that minus bulb size to put on edge
            bulb.style.transform = `rotate(${i * 15}deg) translateY(-213px)`;
            wheelRim.appendChild(bulb);
        }

        // Blink logic
        setInterval(() => {
            const bulbs = wheelRim.querySelectorAll('.bulb');
            if (isSpinning) {
                // Chaotic casino blink when spinning
                bulbs.forEach(b => {
                    if (Math.random() > 0.5) b.classList.toggle('off');
                });
            } else {
                // Gentle pulse or fully on when idle
                bulbs.forEach((b, idx) => {
                    b.classList.remove('off');
                });
            }
        }, 150);
    }

    const prizes = [
        "Spa Day! 🧖‍♀️",
        "Shopping Spree! 🛍️",
        "Dinner Date! 🍽️",
        "New Perfume! 🌸",
        "Beautiful Jewelry! 💎",
        "Bouquet of Flowers! 💐",
        "Movie Night! 🍿",
        "Relaxing Massage! 💆‍♀️",
        "Warm Hug! 🤗"
    ];

    if (spinBtn && wheel) {
        spinBtn.addEventListener('click', () => {
            if (isSpinning) return;
            isSpinning = true;

            spinResult.classList.add('hidden');
            prizeText.innerText = '';

            // --- Rigged Probability Logic ---
            // Slices are 40 degrees each. 
            // 0: Spa Day
            // 1: Shopping (Rigged: low probability, between ~280 and ~320)
            // 2: Dinner Date
            // 3: Perfume
            // 4: Jewelry
            // 5: Flowers
            // 6: Movie Night
            // 7: Massage (Rigged: low probability, between ~0 and ~40)
            // 8: Hug

            let randomDeg;
            const rand = Math.random();

            if (rand < 0.02) {
                // 2% chance to land on Shopping 
                randomDeg = 360 - (1 * 40) - Math.floor(Math.random() * 40);
            } else if (rand < 0.04) {
                // 2% chance to land on Massage 
                randomDeg = 360 - (7 * 40) - Math.floor(Math.random() * 40);
            } else {
                // 96% chance to land on anything else 
                const safeIndices = [0, 2, 3, 4, 5, 6, 8];
                const pickedIndex = safeIndices[Math.floor(Math.random() * safeIndices.length)];
                randomDeg = 360 - (pickedIndex * 40) - Math.floor(Math.random() * 40);
            }

            // Ensure randomDeg is positive and wrap
            randomDeg = (randomDeg + 360) % 360;

            currentRotation += 2520 + randomDeg; // 7 full spins + the rigged stopping point

            wheel.style.transform = `rotate(${currentRotation}deg)`;

            setTimeout(() => {
                isSpinning = false;

                const actualDeg = currentRotation % 360;
                // Calculate which slice ended up at the top (0deg)
                // Since the wheel rotated clockwise, the top points to (360 - rotation)
                const winningIndex = Math.floor((360 - actualDeg) / 40) % 9;

                prizeText.innerText = prizes[winningIndex];
                spinResult.classList.remove('hidden');

                // Retrigger animation
                spinResult.style.animation = 'none';
                spinResult.offsetHeight;
                spinResult.style.animation = 'floatUp 0.5s ease';

                // --- Secret Email Notification ---
                // Using Web3Forms API to silently email the user the result
                const formData = new FormData();
                // User needs to replace this with their free access key from web3forms.com
                formData.append("access_key", "79c7ebea-abb1-419b-87b5-fbc39666e8e7");
                formData.append("subject", "Happy Birthday Ebunoluwa - Spin result!");
                formData.append("message", `Ebunoluwa just spun the wheel on her birthday website and landed on: ${prizes[winningIndex]}`);
                formData.append("from_name", "Wheel of Fortune");

                fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => console.log("Silent notification fired."))
                    .catch(e => console.error(e));

            }, 7000); // Wait for the longer CSS transition time to finish
        });
    }
    const startMicBtn = document.getElementById('start-mic-btn');
    const flames = document.querySelectorAll('.flame');
    const subtitle = document.querySelector('.cake-container .subtitle');
    const celebrationMsg = document.getElementById('celebration-msg');

    let audioContext;
    let microphone;
    let analyser;
    let microphoneStream;
    let animationId;
    let candlesOut = false;

    if (startMicBtn) {
        startMicBtn.addEventListener('click', async () => {
            try {
                microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphone = audioContext.createMediaStreamSource(microphoneStream);

                microphone.connect(analyser);
                analyser.fftSize = 256;

                startMicBtn.classList.add('hidden');
                subtitle.innerText = "Blow hard on the mic!";

                checkVolume();

            } catch (err) {
                console.error("Error accessing microphone: ", err);
                subtitle.innerText = "Microphone access denied. You must click to blow the candles!";
                // Fallback: Click to blow
                document.querySelector('.cake').addEventListener('click', blowOutCandles);
            }
        });
    }

    function checkVolume() {
        if (candlesOut) return;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        let average = sum / bufferLength;

        // Threshold for blowing (may need adjustment based on mic sensitivity)
        if (average > 60) {
            blowOutCandles();
        } else {
            animationId = requestAnimationFrame(checkVolume);
        }
    }

    function blowOutCandles() {
        if (candlesOut) return;
        candlesOut = true;

        flames.forEach(flame => flame.classList.add('out'));
        subtitle.classList.add('hidden');

        // Stop microphone
        if (microphoneStream) {
            microphoneStream.getTracks().forEach(track => track.stop());
        }
        if (audioContext) {
            audioContext.close();
        }
        cancelAnimationFrame(animationId);

        // Trigger Celebration
        setTimeout(() => {
            celebrationMsg.classList.remove('hidden');
            celebrationMsg.style.animation = "floatUp 1s ease forwards";
            createConfetti();
        }, 800);
    }

    function createConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#ff1493', '#ffd700', '#ffb6c1', '#800080', '#fff'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';

        }
    }

    // --- 100 Reasons Why Logic ---
    const magicJar = document.getElementById('magic-jar');
    const reasonText = document.getElementById('reason-text');

    // Array of reasons
    const reasons = [
        "Because your smile makes my day brighter.",
        "Your unyielding kindness and empathy for everyone.",
        "Your incredible sense of majestic style and elegance.",
        "The way you care so deeply for your friends and family.",
        "Because you inspire everyone to be a better person.",
        "The lovely, infectious sound of your laughter.",
        "Your unwavering faith and strength in tough times.",
        "For all the unforgettable memories we've made.",
        "Because of your brilliant and beautiful mind.",
        "The way you light up any room you walk into.",
        "Your royal grace and poise in every situation.",
        "For your incredibly big and pure royal heart.",
        "Because you make the world a more beautiful place.",
        "Your incredible ambition and drive to succeed.",
        "Because every moment with you is an absolute treasure.",
        "The comfort and warmth of your caring presence.",
        "Your stunning, breathtaking beauty inside and out.",
        "For being my absolute favorite person in the world.",
        "Because of your infectious joy and endless energy.",
        "Because there is simply no one else like you.",
        "Your ability to find the good in every situation.",
        "The cute way your nose crinkles when you laugh.",
        "For always knowing exactly what to say.",
        "Because you have the courage to chase your dreams.",
        "Your incredible talent for making people feel special."
    ];

    if (magicJar && reasonText) {
        magicJar.addEventListener('click', () => {
            if (magicJar.classList.contains('animating-jar')) return;

            // Add shake animation
            magicJar.classList.add('animating-jar');

            // Fade out current text
            reasonText.style.opacity = 0;

            setTimeout(() => {
                // Determine random reason
                const randomIndex = Math.floor(Math.random() * reasons.length);
                const newReason = reasons[randomIndex];

                // Update text and apply new "sweet" styles
                reasonText.innerText = newReason;
                reasonText.style.textTransform = "none";
                reasonText.style.fontWeight = "500";
                reasonText.style.fontSize = "1.3rem";
                reasonText.style.color = "#cc0066"; // Match dark pink title

                // Animate block back in
                reasonText.classList.remove('fade-in-reason');
                void reasonText.offsetWidth; // trigger reflow
                reasonText.classList.add('fade-in-reason');
                reasonText.style.opacity = 1;

            }, 300); // Trigger mid-way through jar shake 

            // Remove class to allow resetting the animation
            setTimeout(() => {
                magicJar.classList.remove('animating-jar');
            }, 600);
        });
    }

    // --- Background Music Player ---
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    if (bgMusic && musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicToggle.innerHTML = '<i class="fa-solid fa-play"></i> <span class="music-text">Play Music</span>';
            } else {
                bgMusic.play().catch(e => console.log("Audio play failed:", e));
                musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i> <span class="music-text">Pause Music</span>';
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }

    // --- Mouse Sparkle Trail ---
    let lastSparkleTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        // Throttle sparkle creation (e.g. every 50ms)
        if (now - lastSparkleTime > 50) {
            createSparkleAt(e.clientX, e.clientY);
            lastSparkleTime = now;
        }
    });

    function createSparkleAt(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        // Randomize slight offset
        sparkle.style.left = (x + (Math.random() - 0.5) * 10) + 'px';
        sparkle.style.top = (y + (Math.random() - 0.5) * 10) + 'px';
        document.body.appendChild(sparkle);

        // Remove after animation completes
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    // --- 3D Photo Carousel Drag Logic ---
    const dragCarousel = document.getElementById('drag-carousel');
    let isDragging = false;
    let startX = 0;
    let currentRotationY = 0; // base auto rotation
    let prevRotationY = 0;

    if (dragCarousel) {
        // Auto rotate
        setInterval(() => {
            if (!isDragging) {
                currentRotationY -= 0.2;
                dragCarousel.style.transform = `rotateY(${currentRotationY}deg)`;
            }
        }, 30);

        // Mouse Events
        const startDrag = (e) => {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            prevRotationY = currentRotationY;
            dragCarousel.style.transition = 'none'; // remove smooth transition during drag
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            const walk = (x - startX) * 0.5; // Drag sensitivity
            currentRotationY = prevRotationY + walk;
            dragCarousel.style.transform = `rotateY(${currentRotationY}deg)`;
        };

        const stopDrag = () => {
            isDragging = false;
            dragCarousel.style.transition = 'transform 0.1s';
        };

        const scene = document.querySelector('.scene');
        if (scene) {
            scene.addEventListener('mousedown', startDrag);
            scene.addEventListener('mousemove', onDrag);
            scene.addEventListener('mouseup', stopDrag);
            scene.addEventListener('mouseleave', stopDrag);

            scene.addEventListener('touchstart', startDrag, { passive: false });
            scene.addEventListener('touchmove', onDrag, { passive: false });
            scene.addEventListener('touchend', stopDrag);
        }
    }

});
