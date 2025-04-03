// Modal functionality
const modal = document.getElementById('register-modal');
const registerBtn = document.getElementById('register-btn');
const heroRegisterBtn = document.getElementById('hero-register-btn');
const closeBtn = document.querySelector('.close-btn');

// Open modal when register button is clicked
registerBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

heroRegisterBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// User type selection
const userTypeOptions = document.querySelectorAll('.user-type-option');

userTypeOptions.forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from all options
        userTypeOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        option.classList.add('selected');
    });
});

// Form submission
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Form validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check if user type is selected
    const selectedType = document.querySelector('.user-type-option.selected');
    if (!selectedType) {
        alert('Please select whether you are a Restaurant or an NGO.');
        return;
    }
    
    // Get the user type and redirect accordingly
    const userType = selectedType.getAttribute('data-type');
    
    // Store the email and type in localStorage for use on the next page
    localStorage.setItem('userEmail', document.getElementById('email').value);
    localStorage.setItem('userType', userType);
    
    // Redirect based on user type
    if (userType === 'restaurant') {
        window.location.href = 'restaurant-interface.html';
    } else {
        window.location.href = 'ngo-interface.html';
    }
});