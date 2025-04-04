document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    
   
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            
            this.classList.add('active');
            
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId + '-tab').classList.add('active');
        });
    });
    
    const modals = document.querySelectorAll('.modal');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => modal.classList.remove('active'));
        });
    });
    
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
    
    const rateButtons = document.querySelectorAll('.rate-btn');
    const ratingModal = document.getElementById('rating-modal');
    
    rateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const donationId = this.getAttribute('data-id');
            loadDonationForRating(donationId);
            ratingModal.classList.add('active');
        });
    });
    
    const ratingInputs = document.querySelectorAll('.rating-input');
    
    ratingInputs.forEach(ratingInput => {
        const stars = ratingInput.querySelectorAll('.rating');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                
                stars.forEach(s => s.classList.remove('empty'));
                
                stars.forEach(s => {
                    if (s.getAttribute('data-value') > value) {
                        s.classList.add('empty');
                    }
                });
            });
        });
    });
    
   
    const pickupForm = document.getElementById('pickup-form');
    
    pickupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success';
        successAlert.innerHTML = '<p><strong>Success!</strong> Your pickup request has been submitted. You will receive a confirmation from the restaurant shortly.</p>';
        
        pickupForm.parentNode.insertBefore(successAlert, pickupForm);
        
        pickupForm.reset();
        
        setTimeout(() => {
            successAlert.remove();
        }, 5000);
    });
    
    const submitRatingBtn = document.getElementById('submit-rating-btn');
    
    submitRatingBtn.addEventListener('click', function() {
        
        ratingModal.classList.remove('active');
        
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success';
        successAlert.innerHTML = '<p><strong>Thank you!</strong> Your feedback has been submitted successfully.</p>';
        
        const feedbackTab = document.getElementById('feedback-tab');
        feedbackTab.insertBefore(successAlert, feedbackTab.firstChild);
        
        setTimeout(() => {
            successAlert.remove();
        }, 5000);
    });
    
    const requestPickupModalBtn = document.querySelector('.request-pickup-modal-btn');
    
    requestPickupModalBtn.addEventListener('click', function() {
        foodDetailsModal.classList.remove('active');
        
       
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="request"]').classList.add('active');
        
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById('request-tab').classList.add('active');
        
        document.getElementById('pickup-form').scrollIntoView({ behavior: 'smooth' });
    });
    
    const requestButtons = document.querySelectorAll('.request-btn');
    
    requestButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodId = this.getAttribute('data-id');
            
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelector('[data-tab="request"]').classList.add('active');
            
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById('request-tab').classList.add('active');
            document.getElementById('food-item').value = foodId;
            document.getElementById('pickup-form').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    function loadFoodDetails(foodId) {
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
            3: {
                title: "Butter Chicken & Naan",
                restaurant: "Taj Spice",
                address: "123 Main St, Downtown",
                phone: "(555) 123-4567",
                description: "Butter chicken curry with 30 pieces of naan bread. Can serve approximately 10 people",
                quantity: "8 kg",
                expiry: "Today at 9:00 PM",
                allergens: "Contains gluten, dairy",
                image: "images/butter chicken2.jpeg"
            },
            4: {
                title: "Assorted Pastries & Cakes",
                restaurant: "Sweet Delights",
                address: "123 Main St, Downtown",
                phone: "(555) 123-4567",
                description: "Assortment of pastries, croissants, and cake slices. Approximately 40 pieces.",
                quantity: "4 kg",
                expiry: "Today at 9:00 PM",
                allergens: "Contains gluten, dairy",
                image: "images/pastry.jpeg"
            },
            5: {
                title: "Fried Rice & Noodles",
                restaurant: "Dragon Palace",
                address: "123 Main St, Downtown",
                phone: "(555) 123-4567",
                description: "Vegetable fried rice and hakka noodles with spring rolls. Can serve approximately 15 people.",
                quantity: "7 kg",
                expiry: "Today at 9:00 PM",
                allergens: "Contains gluten, dairy",
                image: "images/fried rice.jpeg"
            },
            6: {
                title: "Assorted Pizza Slices",
                restaurant: "Pizza House",
                address: "123 Main St, Downtown",
                phone: "(555) 123-4567",
                description: "Mix of vegetarian and non-vegetarian pizza slices. Total of 5 full pizzas (40 slices).",
                quantity: "6 kg",
                expiry: "Today at 9:00 PM",
                allergens: "Contains gluten, dairy",
                image: "images/pizza.jpeg"
            },
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
        };
        
        const details = pickupDetails[pickupId] || pickupDetails[4582]; 
        
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
        const ratingInputs = document.querySelectorAll('.rating-input');
        
        ratingInputs.forEach(ratingInput => {
            const stars = ratingInput.querySelectorAll('.rating');
            stars.forEach(s => s.classList.remove('empty'));
            
            stars.forEach(s => {
                if (s.getAttribute('data-value') > 4) {
                    s.classList.add('empty');
                }
            });
        });
        
        document.getElementById('rating-comments').value = '';
    }
});