// DOM Elements
const tabItems = document.querySelectorAll('.tab-item');
const tabContents = document.querySelectorAll('.tab-content');
const addDonationBtn = document.getElementById('addDonationBtn');
const addDonationModal = document.getElementById('addDonationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitDonationBtn = document.getElementById('submitDonationBtn');
const pickupMethodSelect = document.getElementById('pickupMethod');
const deliveryTimeGroup = document.getElementById('deliveryTimeGroup');
const donationForm = document.getElementById('donationForm');
const activeDonationsTable = document.getElementById('activeDonationsTable');

// Sample data for donations
let donations = [
    {
        id: 1,
        foodType: 'Pasta',
        quantity: '5 kg',
        expiry: 'Apr 5, 2025',
        pickupMethod: 'Self-Delivery',
        status: 'Active'
    },
    {
        id: 2,
        foodType: 'Pizza',
        quantity: '8 boxes',
        expiry: 'Apr 4, 2025',
        pickupMethod: 'NGO Pickup',
        status: 'Pending Pickup'
    }
];

// Tab switching functionality
tabItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all tabs
        tabItems.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        item.classList.add('active');
        
        // Show corresponding content
        const tabId = item.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Modal functionality
addDonationBtn.addEventListener('click', () => {
    addDonationModal.style.display = 'flex';
    document.getElementById('expiry').valueAsDate = new Date();
});

closeModalBtn.addEventListener('click', () => {
    addDonationModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === addDonationModal) {
        addDonationModal.style.display = 'none';
    }
});

// Show/hide delivery time based on pickup method
pickupMethodSelect.addEventListener('change', () => {
    if (pickupMethodSelect.value === 'self') {
        deliveryTimeGroup.style.display = 'block';
    } else {
        deliveryTimeGroup.style.display = 'none';
    }
});

// Handle donation submission
submitDonationBtn.addEventListener('click', () => {
    // Form validation
    if (!donationForm.checkValidity()) {
        donationForm.reportValidity();
        return;
    }

    // Get form values
    const foodType = document.getElementById('foodType').value;
    const quantity = document.getElementById('quantity').value;
    const expiry = document.getElementById('expiry').value;
    const pickupMethod = pickupMethodSelect.value === 'self' ? 'Self-Delivery' : 'NGO Pickup';
    
    // Format date for display
    const expiryDate = new Date(expiry);
    const formattedExpiry = expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Create new donation object
    const newDonation = {
        id: donations.length + 1,
        foodType,
        quantity,
        expiry: formattedExpiry,
        pickupMethod,
        status: 'Active'
    };
    
    // Add to donations array
    donations.push(newDonation);
    
    // Update UI
    updateDonationsTable();
    
    // Close modal and reset form
    addDonationModal.style.display = 'none';
    donationForm.reset();
    
    // Show success message
    alert('Donation added successfully!');
});

// Update donations table
function updateDonationsTable() {
    activeDonationsTable.innerHTML = '';
    
    donations.forEach(donation => {
        const row = document.createElement('tr');
        
        // Create badge based on status
        let badgeClass = 'badge-success';
        if (donation.status === 'Pending Pickup') {
            badgeClass = 'badge-warning';
        }
        
        row.innerHTML = `
            <td>${donation.foodType}</td>
            <td>${donation.quantity}</td>
            <td>${donation.expiry}</td>
            <td>${donation.pickupMethod}</td>
            <td><span class="badge ${badgeClass}">${donation.status}</span></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="cancelDonation(${donation.id})">Cancel</button>
            </td>
        `;
        
        activeDonationsTable.appendChild(row);
    });
}

// Cancel donation
window.cancelDonation = function(id) {
    if (confirm('Are you sure you want to cancel this donation?')) {
        donations = donations.filter(donation => donation.id !== id);
        updateDonationsTable();
    }
};

// Initialize Chart
const ctx = document.getElementById('donationChart').getContext('2d');
const donationChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
            label: 'Food Donated (kg)',
            data: [35, 42, 55, 20],
            backgroundColor: 'rgba(46, 139, 87, 0.7)',
            borderColor: 'rgba(46, 139, 87, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Quantity (kg)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Set current date as default min date for expiry
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expiry').min = today;
});