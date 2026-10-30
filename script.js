document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Dynamic Typewriter Effect for Hero Section ---
    const typewriterElement = document.getElementById("typewriter");
    const textToType = "Yizellia David";
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < textToType.length) {
            if (typewriterElement) {
                typewriterElement.textContent += textToType.charAt(charIndex);
            }
            charIndex++;
            setTimeout(typeWriter, 120);
        }
    }
    typeWriter();

    // --- 2. Dark / Light Mode Toggle with localStorage ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Light Mode";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                themeToggleBtn.textContent = "☀️ Light Mode";
            } else {
                themeToggleBtn.textContent = "🌙 Dark Mode";
            }
            localStorage.setItem("theme", theme);
        });
    }

    // --- 3. Scroll-driven Active Nav Highlighting ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 120) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active-nav");
            }
        });
    });

    // --- 4. Back-to-Top Floating Button ---
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            if (backToTopBtn) backToTopBtn.style.display = "block";
        } else {
            if (backToTopBtn) backToTopBtn.style.display = "none";
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- 5. Collapsible Screenshot Gallery Toggle ---
    const toggleBtns = document.querySelectorAll(".toggle-gallery-btn");

    toggleBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".project-card");
            const gallery = card.querySelector(".project-gallery");

            if (gallery) {
                gallery.classList.toggle("hidden-gallery");

                if (gallery.classList.contains("hidden-gallery")) {
                    btn.textContent = "📷 View Screenshots";
                } else {
                    btn.textContent = "✖ Hide Screenshots";
                }
            }
        });
    });

    // --- 6. Image Popup Modal Lightbox Functionality ---
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.querySelector(".modal-close");

    // Open lightbox when any gallery image is clicked
    document.querySelectorAll(".project-gallery img").forEach(img => {
        img.addEventListener("click", (e) => {
            e.stopPropagation();
            if (modal && modalImg) {
                modal.style.display = "flex";
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            }
        });
    });

    // Close modal on close button
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking outside the image background
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

});