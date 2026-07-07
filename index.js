/* ==========================================================================
   ANIME DESK INTERACTIVE PORTFOLIO LOGIC (index.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const body = document.body;
    const roomViewport = document.getElementById("room-viewport");
    const sceneryContainer = document.getElementById("scenery-container");
    const starsOverlay = document.getElementById("stars-overlay");
    const dustParticlesContainer = document.getElementById("dust-particles");
    /* ==========================================================================
   ANIME DESK INTERACTIVE PORTFOLIO LOGIC (index.js)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const body = document.body;
    const roomViewport = document.getElementById("room-viewport");
    const sceneryContainer = document.getElementById("scenery-container");
    
    const themeToggleHeader = document.getElementById("theme-toggle-header");
    const lampPullString = document.getElementById("lamp-pull-string");
    const stringLine = document.getElementById("string-line");
    const stringHandle = document.getElementById("string-handle");
    
    const deskBooks = document.querySelectorAll(".desk-book");
    const storybookOverlay = document.getElementById("storybook-overlay");
    const bookmarkClose = document.getElementById("bookmark-close");
    const pageGroups = document.querySelectorAll(".book-content-group");
    const zoneLeft = document.getElementById("zone-left");
    const zoneRight = document.getElementById("zone-right");
    
    const laptopClock = document.getElementById("laptop-clock");
    const monitorDate = document.getElementById("monitor-date");

    // State Variables
    let currentTheme = localStorage.getItem("portfolio-theme") || "dark";
    let activeBook = null;
    let currentSpreadIndex = 0;
    let isTransitioning = false;

    /* ==========================================================================
       THEME INITIALIZATION & CONTROLS
       ========================================================================== */
    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-theme");
            body.classList.remove("day-theme");
            currentTheme = "dark";
        } else {
            body.classList.add("day-theme");
            body.classList.remove("dark-theme");
            currentTheme = "day";
        }
        localStorage.setItem("portfolio-theme", currentTheme);
    }

    // Initialize Theme
    applyTheme(currentTheme);

    // Synchronized Toggle - Header Switcher Click
    themeToggleHeader.addEventListener("click", () => {
        // Trigger a spring snap animation on string to show synchronization
        stringLine.classList.add("string-snap-back");
        stringHandle.classList.add("string-snap-back");
        setTimeout(() => {
            stringLine.classList.remove("string-snap-back");
            stringHandle.classList.remove("string-snap-back");
        }, 800);

        const newTheme = currentTheme === "day" ? "dark" : "day";
        applyTheme(newTheme);
    });

    /* ==========================================================================
       TACTILE DRAG-TO-PULL STRING MECHANICS (POINTER EVENTS)
       ========================================================================== */
    let startY = 0;
    let currentDeltaY = 0;
    let isDraggingString = false;
    let hasToggledThisDrag = false;
    const maxDragDistance = 60; // Max pixels string can stretch
    const toggleThreshold = 35; // Pixels needed to trigger switch

    stringHandle.addEventListener("pointerdown", (e) => {
        isDraggingString = true;
        hasToggledThisDrag = false;
        startY = e.clientY;
        
        // Capture pointer events on this element even if cursor leaves bounds
        stringHandle.setPointerCapture(e.pointerId);
        
        // Remove snap animations during active drag
        stringLine.classList.remove("string-snap-back");
        stringHandle.classList.remove("string-snap-back");
        
        e.preventDefault();
    });

    stringHandle.addEventListener("pointermove", (e) => {
        if (!isDraggingString) return;

        const deltaY = e.clientY - startY;
        // Clamp drag downwards between 0 and maxDragDistance
        currentDeltaY = Math.max(0, Math.min(deltaY, maxDragDistance));

        // Stretches string line (scaleY) and translates handle down (translateY)
        stringLine.style.transform = `scaleY(${1 + (currentDeltaY / 75)})`;
        stringHandle.style.transform = `translateY(${currentDeltaY}px)`;

        // Tactile snap trigger when crossed threshold
        if (currentDeltaY > toggleThreshold && !hasToggledThisDrag) {
            hasToggledThisDrag = true;
            // Instantly toggle theme
            const newTheme = currentTheme === "day" ? "dark" : "day";
            applyTheme(newTheme);
            
            // Soft haptic feedback simulation (slight rumble on theme switch)
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        }
    });

    const releaseString = (e) => {
        if (!isDraggingString) return;
        isDraggingString = false;

        // Release pointer capture
        stringHandle.releasePointerCapture(e.pointerId);

        // Reset string transform values
        stringLine.style.transform = "";
        stringHandle.style.transform = "";

        // Trigger spring snap-back animation
        stringLine.classList.add("string-snap-back");
        stringHandle.classList.add("string-snap-back");

        // Clean snap class after animation finishes
        setTimeout(() => {
            stringLine.classList.remove("string-snap-back");
            stringHandle.classList.remove("string-snap-back");
        }, 800);

        // Fallback toggle if dragged fast and released without registering movement
        if (currentDeltaY > toggleThreshold && !hasToggledThisDrag) {
            const newTheme = currentTheme === "day" ? "dark" : "day";
            applyTheme(newTheme);
        }
        
        currentDeltaY = 0;
        hasToggledThisDrag = false;
    };

    stringHandle.addEventListener("pointerup", releaseString);
    stringHandle.addEventListener("pointercancel", releaseString);

    /* ==========================================================================
       PARALLAX SYSTEM (MOUSE TRACKING AS EYE SIGHT)
       ========================================================================== */
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const lerpFactor = 0.08;

    window.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        targetX = (mouseX - 0.5) * 2;
        targetY = (mouseY - 0.5) * 2;
    });

    function updateParallax() {
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;

        sceneryContainer.style.setProperty("--bg-shift-x", currentX);
        sceneryContainer.style.setProperty("--bg-shift-y", currentY);

        requestAnimationFrame(updateParallax);
    }
    updateParallax();

    /* ==========================================================================
       INTERACTIVE LAPTOP CLOCK DISPLAY
       ========================================================================== */
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        
        hours = hours % 12;
        hours = hours ? hours : 12; // convert 0 to 12
        
        if (laptopClock) {
            laptopClock.textContent = `${hours}:${minutes} ${ampm}`;
        }
        
        if (monitorDate) {
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            monitorDate.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    // Set immediate and periodic interval checks
    updateClock();
    setInterval(updateClock, 30000);

    /* ==========================================================================
       STORYBOOK INTERACTION MECHANICS
       ========================================================================== */
    deskBooks.forEach(book => {
        book.addEventListener("click", () => {
            const bookType = book.getAttribute("data-book");
            
            if (bookType === "resume") {
                triggerResumeDownload();
                return;
            }

            if (isTransitioning) return;
            isTransitioning = true;

            openStorybook(bookType);
        });
    });

    function openStorybook(bookType) {
        activeBook = bookType;
        currentSpreadIndex = 0;
        
        body.classList.add("viewing-book");

        pageGroups.forEach(group => {
            group.classList.remove("active-group");
        });
        
        const activeGroup = document.getElementById(`content-${bookType}`);
        if (activeGroup) {
            activeGroup.classList.add("active-group");
            
            const spreads = activeGroup.querySelectorAll(".book-spread");
            spreads.forEach((spread, idx) => {
                spread.className = idx === 0 ? "book-spread active" : "book-spread";
            });
        }

        updateNavigationArrows();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    bookmarkClose.addEventListener("click", () => {
        if (isTransitioning || !activeBook) return;
        isTransitioning = true;

        body.classList.remove("viewing-book");
        
        setTimeout(() => {
            pageGroups.forEach(group => {
                group.classList.remove("active-group");
            });
            activeBook = null;
            isTransitioning = false;
        }, 800);
    });

    /* ==========================================================================
       PAGE TURNING LOGIC (SPREAD SLIDING)
       ========================================================================== */
    function getSpreads() {
        if (!activeBook) return [];
        const group = document.getElementById(`content-${activeBook}`);
        return group ? group.querySelectorAll(".book-spread") : [];
    }

    function updateNavigationArrows() {
        const spreads = getSpreads();
        
        if (currentSpreadIndex === 0) {
            zoneLeft.style.display = "none";
        } else {
            zoneLeft.style.display = "flex";
        }

        if (currentSpreadIndex >= spreads.length - 1) {
            zoneRight.style.display = "none";
        } else {
            zoneRight.style.display = "flex";
        }
    }

    zoneRight.addEventListener("click", (e) => {
        e.stopPropagation();
        const spreads = getSpreads();
        if (isTransitioning || currentSpreadIndex >= spreads.length - 1) return;
        isTransitioning = true;

        const currentSpread = spreads[currentSpreadIndex];
        const nextSpread = spreads[currentSpreadIndex + 1];

        currentSpread.classList.remove("active");
        currentSpread.classList.add("exit-left");

        nextSpread.classList.add("active");
        
        currentSpreadIndex++;
        updateNavigationArrows();

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    });

    zoneLeft.addEventListener("click", (e) => {
        e.stopPropagation();
        const spreads = getSpreads();
        if (isTransitioning || currentSpreadIndex <= 0) return;
        isTransitioning = true;

        const currentSpread = spreads[currentSpreadIndex];
        const prevSpread = spreads[currentSpreadIndex - 1];

        currentSpread.classList.remove("active");

        prevSpread.classList.remove("exit-left");
        prevSpread.classList.add("active");

        currentSpreadIndex--;
        updateNavigationArrows();

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    });

    /* ==========================================================================
       RESUME DOWNLOAD TRIGGER
       ========================================================================== */
    function triggerResumeDownload() {
        const link = document.createElement("a");
        link.href = "resume.pdf";
        link.download = "Rahul_Chandra_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /* ==========================================================================
       TOOLBOX EMAIL & CONTACT UTILITIES
       ========================================================================== */
    const toolGmail = document.querySelector(".tool-gmail");
    const toolContact = document.querySelector(".tool-envelope");

    if (toolGmail) {
        toolGmail.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("rahulchandrakarupakala@gmail.com")
                .then(() => {
                    const label = toolGmail.querySelector(".tool-label");
                    const originalText = label.textContent;
                    label.textContent = "Copied Email!";
                    setTimeout(() => {
                        label.textContent = originalText;
                    }, 2000);
                });
            setTimeout(() => {
                window.location.href = "mailto:rahulchandrakarupakala@gmail.com";
            }, 300);
        });
    }

    if (toolContact) {
        toolContact.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("+91 9502568861")
                .then(() => {
                    const label = toolContact.querySelector(".tool-label");
                    const originalText = label.textContent;
                    label.textContent = "Copied Phone!";
                    setTimeout(() => {
                        label.textContent = originalText;
                    }, 2000);
                });
            setTimeout(() => {
                window.location.href = "tel:+919502568861";
            }, 300);
        });
    }
});

    const themeToggleHeader = document.getElementById("theme-toggle-header");
    const lampPullString = document.getElementById("lamp-pull-string");
    const stringLine = document.getElementById("string-line");
    const stringHandle = document.getElementById("string-handle");
    
    const deskBooks = document.querySelectorAll(".desk-book");
    const storybookOverlay = document.getElementById("storybook-overlay");
    const bookmarkClose = document.getElementById("bookmark-close");
    const pageGroups = document.querySelectorAll(".book-content-group");
    const zoneLeft = document.getElementById("zone-left");
    const zoneRight = document.getElementById("zone-right");
    
    const audioControl = document.getElementById("audio-control");
    const bgMusic = document.getElementById("bg-music");
    const laptopClock = document.getElementById("laptop-clock");
    const monitorDate = document.getElementById("monitor-date");

    // State Variables
    let currentTheme = localStorage.getItem("portfolio-theme") || "dark";
    let activeBook = null;
    let currentSpreadIndex = 0;
    let isTransitioning = false;

    /* ==========================================================================
       THEME INITIALIZATION & CONTROLS
       ========================================================================== */
    function applyTheme(theme) {
        if (theme === "dark") {
            body.classList.add("dark-theme");
            body.classList.remove("day-theme");
            currentTheme = "dark";
        } else {
            body.classList.add("day-theme");
            body.classList.remove("dark-theme");
            currentTheme = "day";
        }
        localStorage.setItem("portfolio-theme", currentTheme);
    }

    // Initialize Theme
    applyTheme(currentTheme);

    // Synchronized Toggle - Header Switcher Click
    themeToggleHeader.addEventListener("click", () => {
        // Trigger a spring snap animation on string to show synchronization
        stringLine.classList.add("string-snap-back");
        stringHandle.classList.add("string-snap-back");
        setTimeout(() => {
            stringLine.classList.remove("string-snap-back");
            stringHandle.classList.remove("string-snap-back");
        }, 800);

        const newTheme = currentTheme === "day" ? "dark" : "day";
        applyTheme(newTheme);
    });

    /* ==========================================================================
       TACTILE DRAG-TO-PULL STRING MECHANICS (POINTER EVENTS)
       ========================================================================== */
    let startY = 0;
    let currentDeltaY = 0;
    let isDraggingString = false;
    let hasToggledThisDrag = false;
    const maxDragDistance = 60; // Max pixels string can stretch
    const toggleThreshold = 35; // Pixels needed to trigger switch

    stringHandle.addEventListener("pointerdown", (e) => {
        isDraggingString = true;
        hasToggledThisDrag = false;
        startY = e.clientY;
        
        // Capture pointer events on this element even if cursor leaves bounds
        stringHandle.setPointerCapture(e.pointerId);
        
        // Remove snap animations during active drag
        stringLine.classList.remove("string-snap-back");
        stringHandle.classList.remove("string-snap-back");
        
        e.preventDefault();
    });

    stringHandle.addEventListener("pointermove", (e) => {
        if (!isDraggingString) return;

        const deltaY = e.clientY - startY;
        // Clamp drag downwards between 0 and maxDragDistance
        currentDeltaY = Math.max(0, Math.min(deltaY, maxDragDistance));

        // Stretches string line (scaleY) and translates handle down (translateY)
        stringLine.style.transform = `scaleY(${1 + (currentDeltaY / 75)})`;
        stringHandle.style.transform = `translateY(${currentDeltaY}px)`;

        // Tactile snap trigger when crossed threshold
        if (currentDeltaY > toggleThreshold && !hasToggledThisDrag) {
            hasToggledThisDrag = true;
            // Instantly toggle theme
            const newTheme = currentTheme === "day" ? "dark" : "day";
            applyTheme(newTheme);
            
            // Soft haptic feedback simulation (slight rumble on theme switch)
            if (navigator.vibrate) {
                navigator.vibrate(15);
            }
        }
    });

    const releaseString = (e) => {
        if (!isDraggingString) return;
        isDraggingString = false;

        // Release pointer capture
        stringHandle.releasePointerCapture(e.pointerId);

        // Reset string transform values
        stringLine.style.transform = "";
        stringHandle.style.transform = "";

        // Trigger spring snap-back animation
        stringLine.classList.add("string-snap-back");
        stringHandle.classList.add("string-snap-back");

        // Clean snap class after animation finishes
        setTimeout(() => {
            stringLine.classList.remove("string-snap-back");
            stringHandle.classList.remove("string-snap-back");
        }, 800);

        // Fallback toggle if dragged fast and released without registering movement
        if (currentDeltaY > toggleThreshold && !hasToggledThisDrag) {
            const newTheme = currentTheme === "day" ? "dark" : "day";
            applyTheme(newTheme);
        }
        
        currentDeltaY = 0;
        hasToggledThisDrag = false;
    };

    stringHandle.addEventListener("pointerup", releaseString);
    stringHandle.addEventListener("pointercancel", releaseString);

    /* ==========================================================================
       PARALLAX SYSTEM (MOUSE TRACKING AS EYE SIGHT)
       ========================================================================== */
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const lerpFactor = 0.08;

    window.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        targetX = (mouseX - 0.5) * 2;
        targetY = (mouseY - 0.5) * 2;
    });

    function updateParallax() {
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;

        sceneryContainer.style.setProperty("--bg-shift-x", currentX);
        sceneryContainer.style.setProperty("--bg-shift-y", currentY);

        requestAnimationFrame(updateParallax);
    }
    updateParallax();

    /* ==========================================================================
       BACKGROUND ENVIRONMENT (STARS & DUST GENERATION)
       ========================================================================== */
    function spawnStars() {
        const starCount = 50;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            
            const top = Math.random() * 80;
            const left = Math.random() * 100;
            const size = Math.random() * 2 + 1;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 3;
            
            star.style.top = `${top}%`;
            star.style.left = `${left}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.setProperty("--duration", `${duration}s`);
            star.style.animationDelay = `${delay}s`;
            star.style.opacity = Math.random() * 0.7 + 0.3;
            
            starsOverlay.appendChild(star);
        }
    }
    spawnStars();

    function spawnDustParticles() {
        const dustCount = 15;
        for (let i = 0; i < dustCount; i++) {
            const dust = document.createElement("div");
            dust.classList.add("dust");
            
            const startX = Math.random() * 100;
            const size = Math.random() * 3 + 2;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 10;
            const drift = (Math.random() * 80) - 40;
            const maxOpacity = Math.random() * 0.4 + 0.2;
            
            dust.style.left = `${startX}%`;
            dust.style.width = `${size}px`;
            dust.style.height = `${size}px`;
            dust.style.setProperty("--duration", `${duration}s`);
            dust.style.setProperty("--drift", `${drift}px`);
            dust.style.setProperty("--max-opacity", maxOpacity);
            dust.style.animationDelay = `-${delay}s`;
            
            dustParticlesContainer.appendChild(dust);
        }
    }
    spawnDustParticles();

    /* ==========================================================================
       INTERACTIVE LAPTOP CLOCK DISPLAY
       ========================================================================== */
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        
        hours = hours % 12;
        hours = hours ? hours : 12; // convert 0 to 12
        
        if (laptopClock) {
            laptopClock.textContent = `${hours}:${minutes} ${ampm}`;
        }
        
        if (monitorDate) {
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            monitorDate.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    // Set immediate and periodic interval checks
    updateClock();
    setInterval(updateClock, 30000);

    if (audioControl && bgMusic) {
        audioControl.addEventListener("click", () => {
            const volumeUpIcon = audioControl.querySelector(".volume-up");
            const volumeMuteIcon = audioControl.querySelector(".volume-mute");
            
            if (bgMusic.paused) {
                bgMusic.play()
                    .then(() => {
                        volumeUpIcon.classList.remove("hidden");
                        volumeMuteIcon.classList.add("hidden");
                        audioControl.setAttribute("title", "Mute Cozy Background Sounds");
                    })
                    .catch(err => {
                        console.log("Audio play blocked by browser policy. Interaction needed first.", err);
                    });
            } else {
                bgMusic.pause();
                volumeUpIcon.classList.add("hidden");
                volumeMuteIcon.classList.remove("hidden");
                audioControl.setAttribute("title", "Play Cozy Lofi Background Music");
            }
        });
    }

    /* ==========================================================================
       STORYBOOK INTERACTION MECHANICS
       ========================================================================== */
    deskBooks.forEach(book => {
        book.addEventListener("click", () => {
            const bookType = book.getAttribute("data-book");
            
            if (bookType === "resume") {
                triggerResumeDownload();
                return;
            }

            if (isTransitioning) return;
            isTransitioning = true;

            openStorybook(bookType);
        });
    });

    function openStorybook(bookType) {
        activeBook = bookType;
        currentSpreadIndex = 0;
        
        body.classList.add("viewing-book");

        pageGroups.forEach(group => {
            group.classList.remove("active-group");
        });
        
        const activeGroup = document.getElementById(`content-${bookType}`);
        if (activeGroup) {
            activeGroup.classList.add("active-group");
            
            const spreads = activeGroup.querySelectorAll(".book-spread");
            spreads.forEach((spread, idx) => {
                spread.className = idx === 0 ? "book-spread active" : "book-spread";
            });
        }

        updateNavigationArrows();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    bookmarkClose.addEventListener("click", () => {
        if (isTransitioning || !activeBook) return;
        isTransitioning = true;

        body.classList.remove("viewing-book");
        
        setTimeout(() => {
            pageGroups.forEach(group => {
                group.classList.remove("active-group");
            });
            activeBook = null;
            isTransitioning = false;
        }, 800);
    });

    /* ==========================================================================
       PAGE TURNING LOGIC (SPREAD SLIDING)
       ========================================================================== */
    function getSpreads() {
        if (!activeBook) return [];
        const group = document.getElementById(`content-${activeBook}`);
        return group ? group.querySelectorAll(".book-spread") : [];
    }

    function updateNavigationArrows() {
        const spreads = getSpreads();
        
        if (currentSpreadIndex === 0) {
            zoneLeft.style.display = "none";
        } else {
            zoneLeft.style.display = "flex";
        }

        if (currentSpreadIndex >= spreads.length - 1) {
            zoneRight.style.display = "none";
        } else {
            zoneRight.style.display = "flex";
        }
    }

    zoneRight.addEventListener("click", (e) => {
        e.stopPropagation();
        const spreads = getSpreads();
        if (isTransitioning || currentSpreadIndex >= spreads.length - 1) return;
        isTransitioning = true;

        const currentSpread = spreads[currentSpreadIndex];
        const nextSpread = spreads[currentSpreadIndex + 1];

        currentSpread.classList.remove("active");
        currentSpread.classList.add("exit-left");

        nextSpread.classList.add("active");
        
        currentSpreadIndex++;
        updateNavigationArrows();

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    });

    zoneLeft.addEventListener("click", (e) => {
        e.stopPropagation();
        const spreads = getSpreads();
        if (isTransitioning || currentSpreadIndex <= 0) return;
        isTransitioning = true;

        const currentSpread = spreads[currentSpreadIndex];
        const prevSpread = spreads[currentSpreadIndex - 1];

        currentSpread.classList.remove("active");

        prevSpread.classList.remove("exit-left");
        prevSpread.classList.add("active");

        currentSpreadIndex--;
        updateNavigationArrows();

        setTimeout(() => {
            isTransitioning = false;
        }, 600);
    });

    /* ==========================================================================
       RESUME DOWNLOAD TRIGGER
       ========================================================================== */
    function triggerResumeDownload() {
        const link = document.createElement("a");
        link.href = "resume.pdf";
        link.download = "Rahul_Chandra_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /* ==========================================================================
       TOOLBOX EMAIL & CONTACT UTILITIES
       ========================================================================== */
    const toolGmail = document.querySelector(".tool-gmail");
    const toolContact = document.querySelector(".tool-envelope");

    if (toolGmail) {
        toolGmail.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("rahulchandrakarupakala@gmail.com")
                .then(() => {
                    const label = toolGmail.querySelector(".tool-label");
                    const originalText = label.textContent;
                    label.textContent = "Copied Email!";
                    setTimeout(() => {
                        label.textContent = originalText;
                    }, 2000);
                });
            setTimeout(() => {
                window.location.href = "mailto:rahulchandrakarupakala@gmail.com";
            }, 300);
        });
    }

    if (toolContact) {
        toolContact.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("+91 9502568861")
                .then(() => {
                    const label = toolContact.querySelector(".tool-label");
                    const originalText = label.textContent;
                    label.textContent = "Copied Phone!";
                    setTimeout(() => {
                        label.textContent = originalText;
                    }, 2000);
                });
            setTimeout(() => {
                window.location.href = "tel:+919502568861";
            }, 300);
        });
    }
});
