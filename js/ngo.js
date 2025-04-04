document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });
    
    // Food Details Modal
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const foodDetailsModal = document.getElementById('food-details-modal');
    const foodDetailsContent = document.getElementById('food-details-content');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodId = this.getAttribute('data-id');
            loadFoodDetails(foodId);
            foodDetailsModal.classList.add('active');
        });
    });
    
    // Pickup Details Modal
    const viewPickupButtons = document.querySelectorAll('.view-pickup-btn');
    const pickupDetailsModal = document.getElementById('pickup-details-modal');
    const pickupDetailsContent = document.getElementById('pickup-details-content');
    
    viewPickupButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pickupId = this.getAttribute('data-id');
            loadPickupDetails(pickupId);
            pickupDetailsModal.classList.add('active');
        });
    });
    
    // Rating Modal
    const rateButtons = document.querySelectorAll('.rate-btn');
    const ratingModal = document.getElementById('rating-modal');
    
    rateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const donationId = this.getAttribute('data-id');
            loadDonationForRating(donationId);
            ratingModal.classList.add('active');
        });
    });
    
    // Star Rating Functionality
    const ratingInputs = document.querySelectorAll('.rating-input');
    
    ratingInputs.forEach(ratingInput => {
        const stars = ratingInput.querySelectorAll('.rating');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                
                // Reset all stars
                stars.forEach(s => s.classList.remove('empty'));
                
                // Fill stars up to the selected one
                stars.forEach(s => {
                    if (s.getAttribute('data-value') > value) {
                        s.classList.add('empty');
                    }
                });
            });
        });
    });
    
    // Form submissions
    const pickupForm = document.getElementById('pickup-form');
    
    pickupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success';
        successAlert.innerHTML = '<p><strong>Success!</strong> Your pickup request has been submitted. You will receive a confirmation from the restaurant shortly.</p>';
        
        pickupForm.parentNode.insertBefore(successAlert, pickupForm);
        
        // Reset form
        pickupForm.reset();
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            successAlert.remove();
        }, 5000);
    });
    
    const submitRatingBtn = document.getElementById('submit-rating-btn');
    
    submitRatingBtn.addEventListener('click', function() {
        // Close modal
        ratingModal.classList.remove('active');
        
        // Show success message in the feedback tab
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success';
        successAlert.innerHTML = '<p><strong>Thank you!</strong> Your feedback has been submitted successfully.</p>';
        
        const feedbackTab = document.getElementById('feedback-tab');
        feedbackTab.insertBefore(successAlert, feedbackTab.firstChild);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            successAlert.remove();
        }, 5000);
    });
    
    // Request Pickup from Modal
    const requestPickupModalBtn = document.querySelector('.request-pickup-modal-btn');
    
    requestPickupModalBtn.addEventListener('click', function() {
        // Close details modal
        foodDetailsModal.classList.remove('active');
        
        // Switch to request tab
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="request"]').classList.add('active');
        
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById('request-tab').classList.add('active');
        
        // Scroll to form
        document.getElementById('pickup-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Direct Request Pickup buttons
    const requestButtons = document.querySelectorAll('.request-btn');
    
    requestButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodId = this.getAttribute('data-id');
            
            // Switch to request tab
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector('[data-tab="request"]').classList.add('active');
            
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById('request-tab').classList.add('active');
            
            // Set the food item in the dropdown
            document.getElementById('food-item').value = foodId;
            
            // Scroll to form
            document.getElementById('pickup-form').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Mock data loading functions
    function loadFoodDetails(foodId) {
        // In a real application, this would fetch data from an API
        const foodDetails = {
            1: {
                title: "Italian Pasta & Garlic Bread",
                restaurant: "La Trattoria",
                address: "123 Main St, Downtown",
                phone: "(555) 123-4567",
                description: "Freshly made pasta with tomato sauce and 20 pieces of garlic bread. Enough for 10-15 people.",
                quantity: "5 kg",
                expiry: "Today at 9:00 PM",
                instructions: "Please bring your own containers for the pasta sauce.",
                allergens: "Contains gluten, dairy",
                image: "images/pasta.jpeg"
            },
            2: {
                title: "Mixed Sandwich Platter",
                restaurant: "Sandwich Corner",
                address: "123 Main St, Downtown",
                phone: "(555) 123-4567",
                description: "Assorted sandwich platter with vegetarian and non-vegetarian options. 25 sandwich halves.",
                quantity: "3 kg",
                expiry: "Today at 9:00 PM",
                allergens: "Contains gluten, dairy",
                image: "images/sandwich-4638226_1280.jpg"
            },
            // Additional food items would be defined here
        };
        
        const details = foodDetails[foodId] || foodDetails[1]; // Default to the first item if not found
        
        foodDetailsContent.innerHTML = `
            <img src="${details.image}" alt="${details.title}" style="width:100%; border-radius:8px; margin-bottom:15px;">
            <h3>${details.title}</h3>
            <p><strong>Restaurant:</strong> ${details.restaurant}</p>
            <p><strong>Address:</strong> ${details.address}</p>
            <p><strong>Phone:</strong> ${details.phone}</p>
            <p><strong>Description:</strong> ${details.description}</p>
            <p><strong>Quantity:</strong> ${details.quantity}</p>
            <p><strong>Available Until:</strong> ${details.expiry}</p>
            <p><strong>Special Instructions:</strong> ${details.instructions}</p>
            <p><strong>Allergens:</strong> ${details.allergens}</p>
            
            <div class="alert alert-info" style="margin-top:15px;">
                <p>This food can serve approximately 10-15 people and needs to be picked up before the expiry time.</p>
            </div>
        `;
    }
    
    function loadPickupDetails(pickupId) {
        // In a real application, this would fetch data from an API
        const pickupDetails = {
            4582: {
                id: "#4582",
                food: "Vegetable Biryani & Raita",
                restaurant: "Spice Garden",
                address: "456 Spice Ave, Midtown",
                phone: "(555) 987-6543",
                requestDate: "Apr 3, 2025",
                pickupTime: "Apr 3, 2025, 4:00 PM",
                status: "Confirmed",
                statusClass: "status-confirmed",
                beneficiaries: "20",
                notes: "Please have someone available to help with loading.",
                image: "/api/placeholder/400/250"
            },
            // Additional pickup items would be defined here
        };
        
        const details = pickupDetails[pickupId] || pickupDetails[4582]; // Default to the first item if not found
        
        pickupDetailsContent.innerHTML = `
            <img src="${details.image}" alt="${details.food}" style="width:100%; border-radius:8px; margin-bottom:15px;">
            <h3>${details.food}</h3>
            <p><strong>Pickup ID:</strong> ${details.id}</p>
            <p><strong>Restaurant:</strong> ${details.restaurant}</p>
            <p><strong>Address:</strong> ${details.address}</p>
            <p><strong>Phone:</strong> ${details.phone}</p>
            <p><strong>Request Date:</strong> ${details.requestDate}</p>
            <p><strong>Pickup Time:</strong> ${details.pickupTime}</p>
            <p><strong>Status:</strong> <span class="status ${details.statusClass}">${details.status}</span></p>
            <p><strong>Beneficiaries:</strong> ~${details.beneficiaries} people</p>
            <p><strong>Notes:</strong> ${details.notes}</p>
            
            <div class="alert alert-info" style="margin-top:15px;">
                <p>Restaurant confirmation has been received. Please arrive on time for pickup.</p>
            </div>
        `;
    }
    
    function loadDonationForRating(donationId) {
        // This function would pre-fill the rating modal based on existing ratings
        // In a real application, this would fetch data from an API
        
        // For this demo, we'll just reset the form
        const ratingInputs = document.querySelectorAll('.rating-input');
        
        ratingInputs.forEach(ratingInput => {
            const stars = ratingInput.querySelectorAll('.rating');
            
            // Reset all stars (remove 'empty' class)
            stars.forEach(s => s.classList.remove('empty'));
            
            // Set a default rating (e.g., 4 stars)
            stars.forEach(s => {
                if (s.getAttribute('data-value') > 4) {
                    s.classList.add('empty');
                }
            });
        });
        
        document.getElementById('rating-comments').value = '';
    }
});