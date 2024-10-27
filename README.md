<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emergency Alert System</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
        .container { background-color: white; padding: 2rem; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #e11d48; text-align: center; margin-bottom: 2rem; }
        .contact-list { margin-bottom: 2rem; }
        .contact-form { display: flex; gap: 10px; margin-bottom: 1rem; }
        input { padding: 8px; border: 1px solid #ddd; border-radius: 4px; flex: 1; }
        button { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .add-btn { background-color: #2563eb; color: white; }
        .panic-btn { background-color: #e11d48; color: white; width: 100%; padding: 20px; font-size: 1.2rem; margin-top: 1rem; }
        .panic-btn:disabled { background-color: #666; cursor: not-allowed; }
        .contact-item { display: flex; justify-content: space-between; align-items: center; padding: 8px; background-color: #f8f8f8; margin-bottom: 8px; border-radius: 4px; }
        .remove-btn { background-color: #dc2626; color: white; padding: 4px 8px; font-size: 0.9rem; }
        .status { text-align: center; margin-top: 1rem; padding: 10px; border-radius: 4px; display: none; }
        .success { background-color: #22c55e; color: white; }
        .error { background-color: #dc2626; color: white; }
        .loading { display: none; text-align: center; margin-top: 1rem; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Emergency Alert System</h1>
        <div class="contact-list" id="contactsList"></div>
        <div class="contact-form">
            <input type="text" id="contactName" placeholder="Contact Name" required>
            <input type="text" id="contactPhone" placeholder="Phone Number (e.g., +1234567890)" required>
            <button class="add-btn" onclick="addContact()">Add Contact</button>
        </div>
        <button class="panic-btn" id="panicButton" onclick="sendAlert()">PANIC BUTTON</button>
        <div class="loading" id="loading">Sending alerts...</div>
        <div class="status" id="status"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
