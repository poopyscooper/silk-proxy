// Cool Silk Animation
function createSilkAnimation() {
    console.log("createSilkAnimation called");
    
    const home = document.getElementById("home");
    const logo = document.getElementById("svg-logo");
    
    console.log("Home element found:", home);
    console.log("SVG logo found:", logo);
    
    // Show the SVG logo first, centered
    if (logo) {
        console.log("Adding visible class to SVG logo");
        logo.style.display = 'block'; // Show the logo
        logo.classList.add('visible');
        
        // Wait a moment for the logo to be visible, then start the transition
        setTimeout(() => {
            console.log("Removing SVG logo and creating animated logo");
            // Remove the old SVG logo
            logo.remove();
            
            // Create new animated logo container
            const logoContainer = document.createElement("div");
            logoContainer.className = "silk-logo-container";
            logoContainer.innerHTML = `
                <div class="silk-logo">
                    <span class="silk-letter" data-letter="S">S</span>
                    <span class="silk-letter" data-letter="i">i</span>
                    <span class="silk-letter" data-letter="l">l</span>
                    <span class="silk-letter" data-letter="k">k</span>
                </div>
                <div class="silk-subtitle">Access the web freely and securely</div>
            `;
            
            // Insert before home content
            home.parentNode.insertBefore(logoContainer, home);
            
            // Start the cool animation sequence
            setTimeout(() => {
                animateSilkLogo();
            }, 500);
        }, 1000);
    } else {
        console.log("No SVG logo found, creating animated logo immediately");
        // If no SVG logo, start animation immediately
        const logoContainer = document.createElement("div");
        logoContainer.className = "silk-logo-container";
        logoContainer.innerHTML = `
            <div class="silk-logo">
                <span class="silk-letter" data-letter="S">S</span>
                <span class="silk-letter" data-letter="i">i</span>
                <span class="silk-letter" data-letter="l">l</span>
                <span class="silk-letter" data-letter="k">k</span>
            </div>
            <div class="silk-subtitle">Access the web freely and securely</div>
        `;
        
        // Insert before home content
        home.parentNode.insertBefore(logoContainer, home);
        
        // Start the cool animation sequence
        setTimeout(() => {
            animateSilkLogo();
        }, 500);
    }
}

function animateSilkLogo() {
    const letters = document.querySelectorAll('.silk-letter');
    const subtitle = document.querySelector('.silk-subtitle');
    
    // Animate each letter with staggered timing
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.animation = 'silkLetterAppear 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
        }, index * 200);
    });
    
    // Animate subtitle after letters
    setTimeout(() => {
        subtitle.style.animation = 'silkSubtitleAppear 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
    }, letters.length * 200 + 300);
    
    // Start floating particles
    setTimeout(() => {
        createFloatingParticles();
    }, 1000);
    
    // Transition to main interface after animation
    setTimeout(() => {
        transitionToMain();
    }, 3000);
}

function createFloatingParticles() {
    const container = document.querySelector('.silk-logo-container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'silk-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(particle);
    }
}

function transitionToMain() {
    const logoContainer = document.querySelector('.silk-logo-container');
    const home = document.getElementById("home");
    
    // Fade out logo container
    logoContainer.style.animation = 'silkFadeOut 1s ease forwards';
    
    setTimeout(() => {
        logoContainer.remove();
        
        // Show home section with cool entrance
        home.style.display = 'flex';
        home.style.animation = 'homeSlideIn 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
        
        // Animate home elements
        const homeElements = home.querySelectorAll('*');
        homeElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'elementFadeIn 0.6s ease forwards';
            }, index * 100);
        });
    }, 1000);
}

// Initialize animation on page load
window.addEventListener("load", () => {
    console.log("Window load event fired");
    
    // Prevent any initial scroll jumping
    window.scrollTo(0, 0);
    
    // Check if animation should be skipped
    const params = new URL(document.location).searchParams;
    const showAnim = params.get("loadAnimation");
    
    console.log("Animation parameter:", showAnim);
    
    if (showAnim !== null && showAnim.toLowerCase() == "false") {
        console.log("Skipping animation, showing home directly");
        // Skip animation, show home directly
        document.getElementById("home").style.display = "flex";
        return;
    }
    
    console.log("Starting Silk animation");
    // Start the cool Silk animation
    createSilkAnimation();
});
