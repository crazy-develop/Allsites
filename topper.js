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

// Functions to show Home/About sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.container');
    sections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        setTimeout(() => {
            targetSection.classList.add('active');
        }, 10);

        document.querySelectorAll('.nav-buttons button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(sectionId === 'home-section' ? 'home-btn' : 'about-btn').classList.add('active');
    }
}

function showHome() {
    showSection('home-section');
}

function showAbout() {
    showSection('about-section');
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

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('home-btn').classList.add('active');
});

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
