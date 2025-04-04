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


tabItems.forEach(item => {
    item.addEventListener('click', () => {
        tabItems.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        item.classList.add('active');
        
        const tabId = item.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});


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

pickupMethodSelect.addEventListener('change', () => {
    if (pickupMethodSelect.value === 'self') {
        deliveryTimeGroup.style.display = 'block';
    } else {
        deliveryTimeGroup.style.display = 'none';
    }
});

submitDonationBtn.addEventListener('click', () => {
    if (!donationForm.checkValidity()) {
        donationForm.reportValidity();
        return;
    }

    const foodType = document.getElementById('foodType').value;
    const quantity = document.getElementById('quantity').value;
    const expiry = document.getElementById('expiry').value;
    const pickupMethod = pickupMethodSelect.value === 'self' ? 'Self-Delivery' : 'NGO Pickup';
   
    const expiryDate = new Date(expiry);
    const formattedExpiry = expiryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const newDonation = {
        id: donations.length + 1,
        foodType,
        quantity,
        expiry: formattedExpiry,
        pickupMethod,
        status: 'Active'
    };
    
    donations.push(newDonation);
    updateDonationsTable();
    addDonationModal.style.display = 'none';
    donationForm.reset();
    alert('Donation added successfully!');
});

function updateDonationsTable() {
    activeDonationsTable.innerHTML = '';
    
    donations.forEach(donation => {
        const row = document.createElement('tr');
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

window.cancelDonation = function(id) {
    if (confirm('Are you sure you want to cancel this donation?')) {
        donations = donations.filter(donation => donation.id !== id);
        updateDonationsTable();
    }
};

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
ion() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('expiry').min = today;
});