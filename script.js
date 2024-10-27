const API_URL = 'http://localhost:3000/api'; // Change this to your server URL if necessary
let contacts = [];
let isSubmitting = false;

function addContact() {
    const nameInput = document.getElementById('contactName');
    const phoneInput = document.getElementById('contactPhone');
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!name || !phone) {
        showStatus('Please fill in both name and phone number', 'error');
        return;
    }

    if (!isValidPhoneNumber(phone)) {
        showStatus('Please enter a valid phone number (e.g., +1234567890)', 'error');
        return;
    }

    contacts.push({ name, phone });
    updateContactsList();
    nameInput.value = '';
    phoneInput.value = '';
    showStatus('Contact added successfully', 'success');
}

function removeContact(index) {
    contacts.splice(index, 1);
    updateContactsList();
}

function updateContactsList() {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = contacts.map((contact, index) => `
        <div class="contact-item">
            <span>${contact.name}: ${contact.phone}</span>
            <button class="remove-btn" onclick="removeContact(${index})">Remove</button>
        </div>
    `).join('');
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s-]{10,}$/; // Basic validation, consider using a library for more complex validation
    return phoneRegex.test(phone);
}

function showStatus(message, type) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.className = `status ${type}`;
    status.style.display = 'block';
    setTimeout(() => {
        status.style.display = 'none';
    }, 5000);
}

async function sendAlert() {
    if (contacts.length === 0) {
        showStatus('Please add at least one emergency contact', 'error');
        return;
    }
    if (isSubmitting) return;
    isSubmitting = true;

    const panicButton = document.getElementById('panicButton');
    const loading = document.getElementById('loading');
    panicButton.disabled = true;
    loading.style.display = 'block';

    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const location = { lat: position.coords.latitude, lng: position.coords.longitude };
                try {
                    const response = await fetch(`${API_URL}/send-alert`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ contacts, location }),
                    });
                    const data = await response.json();
                    if (data.success) {
                        showStatus(`Emergency alerts sent successfully to ${data.successes.length} contacts`, 'success');
                        if (data.errors.length > 0) {
                            console.error('Some messages failed:', data.errors);
                        }
                    } else {
                        throw new Error(data.error || 'Failed to send alerts');
                    }
                } catch (error) {
                    showStatus('Failed to send alerts: ' + error.message, 'error');
                }
            }, (error) => {
                showStatus('Could not get location. Please enable location services.', 'error');
            });
        } else {
            showStatus('Location services not supported by your browser', 'error');
        }
    } finally {
        isSubmitting = false;
        panicButton.disabled = false;
        loading.style.display = 'none';
    }
}
