const modal = document.getElementById('register-modal');
const registerBtn = document.getElementById('register-btn');
const heroRegisterBtn = document.getElementById('hero-register-btn');
const closeBtn = document.querySelector('.close-btn');

registerBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

heroRegisterBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

const userTypeOptions = document.querySelectorAll('.user-type-option');

userTypeOptions.forEach(option => {
    option.addEventListener('click', () => {
        userTypeOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const selectedType = document.querySelector('.user-type-option.selected');
    if (!selectedType) {
        alert('Please select whether you are a Restaurant or an NGO.');
        return;
    }
    
    const userType = selectedType.getAttribute('data-type');
    localStorage.setItem('userEmail', document.getElementById('email').value);
    localStorage.setItem('userType', userType);
    
  
    if (userType === 'restaurant') {
        window.location.href = 'restaurant-interface.html';
    } else {
        window.location.href = 'ngo-interface.html';
    }
});