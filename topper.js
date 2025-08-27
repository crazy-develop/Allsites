// Function to toggle year sections (accordion behavior)
function toggleYear(heading) {
    const subjects = heading.nextElementSibling;
    const yearContainer = heading.parentElement;
    const chevronIcon = heading.querySelector('i');

    if (yearContainer.classList.contains('coming-soon')) {
        return; // Do nothing for "Coming Soon" sections
    }

    if (subjects.style.display === 'block') {
        subjects.style.animation = 'none'; // Reset animation
        subjects.style.display = 'none';
        yearContainer.classList.remove('active');
        chevronIcon.classList.remove('fa-chevron-up');
        chevronIcon.classList.add('fa-chevron-down');
    } else {
        // Close all other open sections
        document.querySelectorAll('.year.active .subjects').forEach(s => {
            s.style.display = 'none';
            s.parentElement.classList.remove('active');
            s.parentElement.querySelector('h2 i').classList.remove('fa-chevron-up');
            s.parentElement.querySelector('h2 i').classList.add('fa-chevron-down');
        });
        
        subjects.style.display = 'block';
        subjects.style.animation = 'slideDown 0.6s ease forwards';
        yearContainer.classList.add('active');
        chevronIcon.classList.remove('fa-chevron-down');
        chevronIcon.classList.add('fa-chevron-up');
    }
}

// Function to handle showing/hiding different sections
function showSection(sectionId) {
    const homeSection = document.getElementById('home-section');
    const aboutSection = document.getElementById('about-section');
    const homeBtn = document.getElementById('home-btn');
    const aboutBtn = document.getElementById('about-btn');

    if (sectionId === 'home-section') {
        homeSection.style.display = 'block';
        aboutSection.style.display = 'none';
        homeBtn.classList.add('active');
        aboutBtn.classList.remove('active');
    } else if (sectionId === 'about-section') {
        homeSection.style.display = 'none';
        aboutSection.style.display = 'block';
        aboutBtn.classList.add('active');
        homeBtn.classList.remove('active');
    }
}

// Theme Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    body.classList.toggle('light-theme');
    themeToggle.classList.toggle('light-active');

    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Scroll to Top Button Functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Event Listeners for Nav Buttons
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.classList.add('light-active');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('light-theme');
        themeToggle.classList.remove('light-active');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }

    // Set initial active section
    showSection('home-section');

    // Add click listeners to buttons
    document.getElementById('home-btn').addEventListener('click', () => showSection('home-section'));
    document.getElementById('about-btn').addEventListener('click', () => showSection('about-section'));
    document.getElementById('back-btn').addEventListener('click', () => showSection('home-section'));
});
