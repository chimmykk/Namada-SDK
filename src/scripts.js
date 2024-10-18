
document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    if (newPassword.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    // Generate a random phrase of 10 words
    const randomWords = generateRandomWords(10);
    alert('Your random phrase: ' + randomWords.join(' '));
});

// Function to generate random words
function generateRandomWords(wordCount) {
    const words = 'abcdefghijklmnopqrstuvwxyz';
    const randomWords = [];

    for (let i = 0; i < wordCount; i++) {
        let word = '';
        for (let j = 0; j < 5; j++) { // each word can be 5 letters long
            const randomIndex = Math.floor(Math.random() * words.length);
            word += words[randomIndex];
        }
        randomWords.push(word);
    }
    return randomWords;
}

// Function to toggle password visibility
function togglePasswordVisibility(inputId, element) {
    const input = document.getElementById(inputId);
    const isVisible = input.type === 'text';

    input.type = isVisible ? 'password' : 'text';
    element.textContent = isVisible ? 'Show' : 'Hide';
}

