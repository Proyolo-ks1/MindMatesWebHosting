document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container'); // Your main container for the page
    const numberOfApples = 24; // Total number of apples to spawn
    const apples = [];

    // Function to create an apple element and its shadow
    function createApple() {
        const apple = document.createElement('img');
        apple.src = 'assets/MindMates-Apple.svg'; // Path to your apple icon
        apple.classList.add('apple');
        apple.style.position = 'absolute';
        container.appendChild(apple);

        // Create shadow (duplicate apple with black color and offset)
        const shadow = document.createElement('img');
        shadow.src = 'assets/MindMates-Apple.svg'; // Path to your apple icon (same as apple)
        shadow.classList.add('apple-shadow');
        shadow.style.position = 'absolute';
        shadow.style.filter = 'brightness(0)'; // Turn the shadow to black by removing all color
        container.appendChild(shadow);

        // Randomize initial position, speed, and rotation speed
        const size = 50; // Size of the apple (adjust as necessary)
        const initialX = Math.random() * (window.innerWidth - size);
        const initialY = Math.random() * (window.innerHeight - size);
        const speedX = (Math.random() - 0.5) * 5; // Random speed in X direction
        const speedY = (Math.random() - 0.5) * 5; // Random speed in Y direction
        const rotationSpeed = (Math.random() - 0.5) * 5; // Random rotation speed

        apple.style.left = `${initialX}px`;
        apple.style.top = `${initialY}px`;
        apple.style.width = `${size}px`;
        apple.style.height = `${size}px`;
        apple.style.transformOrigin = 'center'; // Ensures the rotation is around the center of the apple

        // Position the shadow slightly below and with a darker color
        shadow.style.left = `${initialX + 5}px`;  // 5px horizontal offset
        shadow.style.top = `${initialY + 5}px`;  // 5px vertical offset
        shadow.style.width = `${size}px`;
        shadow.style.height = `${size}px`;
        shadow.style.opacity = 0.5; // Make the shadow semi-transparent

        // Store the apple's details (including radius for collision detection)
        apples.push({ apple, shadow, speedX, speedY, rotationSpeed, currentRotation: 0, centerX: initialX + size / 2, centerY: initialY + size / 2, radius: size / 2 });
    }

    // Function to update the positions and make apples bounce off edges
    function updateApples() {
        apples.forEach(appleData => {
            const { apple, shadow, speedX, speedY, rotationSpeed, currentRotation, radius } = appleData;
            let left = parseFloat(apple.style.left);
            let top = parseFloat(apple.style.top);

            // Update position based on speed
            left += speedX;
            top += speedY;

            // Update the apple's center for collision detection
            appleData.centerX = left + radius;
            appleData.centerY = top + radius;

            // If apple hits the left or right edge, reverse X speed and change rotation speed
            if (left <= 0 || left >= window.innerWidth - 50) {
                appleData.speedX = -speedX;
                appleData.rotationSpeed = (Math.random() - 0.5) * 5; // Change rotation speed on bounce
            }

            // If apple hits the top or bottom edge, reverse Y speed and change rotation speed
            if (top <= 0 || top >= window.innerHeight - 50) {
                appleData.speedY = -speedY;
                appleData.rotationSpeed = (Math.random() - 0.5) * 5; // Change rotation speed on bounce
            }

            // Update the position of the apple and shadow
            apple.style.left = `${left}px`;
            apple.style.top = `${top}px`;

            shadow.style.left = `${left + 5}px`; // Update shadow position with the same offset
            shadow.style.top = `${top + 5}px`; // Update shadow position with the same offset

            // Update the rotation
            appleData.currentRotation += rotationSpeed; // Increase rotation
            apple.style.transform = `rotate(${appleData.currentRotation}deg)`; // Apply rotation
            shadow.style.transform = `rotate(${appleData.currentRotation}deg)`; // Apply same rotation to shadow

            // Check for collisions with other apples
            apples.forEach(otherAppleData => {
                if (otherAppleData !== appleData) { // Avoid self-collision
                    const dx = appleData.centerX - otherAppleData.centerX;
                    const dy = appleData.centerY - otherAppleData.centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < radius + otherAppleData.radius) {
                        // Simple collision response (bounce off each other)
                        appleData.speedX = -appleData.speedX;
                        appleData.speedY = -appleData.speedY;
                        otherAppleData.speedX = -otherAppleData.speedX;
                        otherAppleData.speedY = -otherAppleData.speedY;
                    }
                }
            });
        });
    }

    // Create apples
    for (let i = 0; i < numberOfApples; i++) {
        createApple();
    }

    // Update the position of apples every 16 milliseconds (~60 FPS)
    setInterval(updateApples, 16);
});
