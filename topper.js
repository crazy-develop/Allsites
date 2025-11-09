document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Logic (Unchanged)
    const homeBtn = document.getElementById('home-btn');
    const aboutBtn = document.getElementById('about-btn');
    const homeSection = document.getElementById('home-section');
    const aboutSection = document.getElementById('about-section');

    const sections = {
        'home-btn': homeSection,
        'about-btn': aboutSection
    };

    function showSection(sectionId) {
        Object.values(sections).forEach(section => {
            if (section) section.style.display = 'none';
        });

        document.querySelectorAll('.nav-buttons button').forEach(button => {
            button.classList.remove('active');
        });

        const sectionToShow = document.getElementById(sectionId);
        const button = document.getElementById(sectionId.replace('-section', '-btn'));
        
        if (sectionToShow) {
            sectionToShow.style.display = 'block';
        }
        if (button) {
            button.classList.add('active');
        }
    }

    showSection('home-section');

    homeBtn.addEventListener('click', () => showSection('home-section'));
    aboutBtn.addEventListener('click', () => showSection('about-section'));

    // 2. Year Toggle Logic (Updated Icon Logic)
    window.toggleYear = function(element) {
        const yearSection = element.closest('.year');
        
        // Only toggle if the section is not 'coming-soon'
        if (!yearSection.classList.contains('coming-soon')) {
            yearSection.classList.toggle('collapsed');
        }
        
        // Icon logic is now fully managed by CSS, but we keep the base function
    }
    
    // Initialize: Collapse all years except the first one
    document.querySelectorAll('.year').forEach((year, index) => {
        if (index > 0) {
            year.classList.add('collapsed');
        }
    });


    // 3. Theme Toggle Logic (Unchanged)
    const themeToggle = document.querySelector('.theme-toggle');
    const themeToggleIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
    }

    window.toggleTheme = function() {
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        }
    }

    // 4. Scroll To Top Button Logic (Unchanged)
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
