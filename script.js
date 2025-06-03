// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');
    projects.forEach(function(project) {
        // Get the data-category attribute and split by whitespace for multiple categories
        const projectCategories = (project.getAttribute('data-category') || '').split(/\s+/);
        // If the selected category is 'all' or the project includes the selected category, show it
        if (category === 'all' || projectCategories.includes(category)) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Example: Attach filter to buttons
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category-filter');
    if (filterButtons.length > 0) {
        filterProjects('all'); // Show all projects initially
    }
    filterButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const category = btn.getAttribute('data-filter');
            filterProjects(category);
        });
    });
});

// Project filtering for <select> dropdown
document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('category-filter');
    if (filterSelect) {
        filterProjects(filterSelect.value); // Show all projects initially
        filterSelect.addEventListener('change', function() {
            filterProjects(this.value);
        });
    }
});

// Contact form validation and real-time feedback

document.addEventListener('DOMContentLoaded', function() {
    // Select the contact form
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    // Get the input fields
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    // Helper to show error
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('input-error')) {
            error = document.createElement('span');
            error.className = 'input-error';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
        input.classList.add('invalid');
    }
    // Helper to clear error
    function clearError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains('input-error')) {
            error.textContent = '';
        }
        input.classList.remove('invalid');
    }

    // Real-time validation
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
        } else {
            clearError(nameInput);
        }
    });
    emailInput.addEventListener('input', function() {
        const emailVal = emailInput.value.trim();
        if (emailVal === '') {
            showError(emailInput, 'Email is required.');
        } else if (!/^\S+@\S+\.\S+$/.test(emailVal)) {
            showError(emailInput, 'Please enter a valid email.');
        } else {
            clearError(emailInput);
        }
    });
    messageInput.addEventListener('input', function() {
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required.');
        } else {
            clearError(messageInput);
        }
    });

    // On submit
    contactForm.addEventListener('submit', function(e) {
        let valid = true;
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            valid = false;
        }
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email.');
            valid = false;
        }
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required.');
            valid = false;
        }
        if (!valid) {
            e.preventDefault();
        }
    });
});

