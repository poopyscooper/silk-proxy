const searchInput = document.getElementById("search-input");
const searchContainer = document.querySelector(".search-container");

// Add focus effects
searchInput.addEventListener("focus", () => {
    searchContainer.style.transform = "scale(1.02)";
});

searchInput.addEventListener("blur", () => {
    searchContainer.style.transform = "scale(1)";
});

// Add loading state and smooth transitions
searchInput.addEventListener("keyup", async(event) => {
    if (event.key !== "Enter") {
        return;
    }
    event.preventDefault();
    
    // Add loading state
    searchInput.style.opacity = "0.7";
    searchInput.style.pointerEvents = "none";
    searchInput.placeholder = "Loading...";
    
    try {
        await registerSW();
        
        // Smooth transition before redirect
        document.body.style.opacity = "0";
        document.body.style.transform = "scale(0.95)";
        document.body.style.transition = "all 0.3s ease";
        
        setTimeout(() => {
            window.location.href = __uv$config.prefix + __uv$config.encodeUrl(
                new URL(searchInput.value).toString()
            );
        }, 300);
        
    } catch (error) {
        // Reset on error
        searchInput.style.opacity = "1";
        searchInput.style.pointerEvents = "auto";
        searchInput.placeholder = "Enter URL (e.g., https://google.com)";
        console.error("Error registering service worker:", error);
    }
});

// Add subtle hover effects
searchInput.addEventListener("mouseenter", () => {
    if (document.activeElement !== searchInput) {
        searchContainer.style.transform = "translateY(-2px)";
    }
});

searchInput.addEventListener("mouseleave", () => {
    if (document.activeElement !== searchInput) {
        searchContainer.style.transform = "translateY(0)";
    }
});
