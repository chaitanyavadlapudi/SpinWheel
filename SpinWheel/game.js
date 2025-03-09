const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const wheelRadius = 200;

// Prize names
const prizes = ["3000 Credits", "35% Off", "Nothing", "70% OFF", "Swagpack", "100% OFF", 
                "Netflix", "50% Off", "Amazon Voucher", "2 Extra Spins", "CB T-shirt", "CB Book"];
const prizeSlice = 360 / prizes.length;

// Load images
const backgroundImg = new Image();
backgroundImg.src = '../Assets/back.jpg';

const wheelImg = new Image();
wheelImg.src = '../Assets/wheel.png';

const pinImg = new Image();
pinImg.src = '../Assets/pin.png';

const standImg = new Image();
standImg.src = '../Assets/stand.png';

// Spin variables
let rotationAngle = 0; // Current angle of the wheel
let spinning = false;  // Whether the wheel is spinning

// Draw the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

    // Draw stand
    ctx.drawImage(standImg, centerX - 75, centerY + 150, 150, 150);

    // Draw wheel
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(wheelImg, centerX - wheelRadius, centerY - wheelRadius, wheelRadius * 2, wheelRadius * 2);
    ctx.restore();

    // Draw pin
    ctx.drawImage(pinImg, centerX - 25, centerY - wheelRadius - 30, 50, 50);
}

// Spin the wheel
function spin() {
    if (spinning) return; // Prevent multiple spins at once
    spinning = true;

    const rounds = Math.floor(Math.random() * 3) + 3; // Random rounds (3 to 5)
    const randomAngle = Math.random() * 360; // Random stopping angle
    const targetAngle = rounds * 360 + randomAngle;

    const spinDuration = 5000; // 5 seconds
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        if (elapsed >= spinDuration) {
            rotationAngle = targetAngle % 360; // Final angle
            spinning = false;

            // Determine the winning prize
            const winningIndex = Math.floor((prizes.length - rotationAngle / prizeSlice) % prizes.length);
            document.getElementById('result').textContent = `You Won: ${prizes[winningIndex]}`;
            return;
        }

        const progress = elapsed / spinDuration;
        rotationAngle = (progress * targetAngle) % 360;

        draw();
        requestAnimationFrame(animate);
    }

    animate();
}

// Draw the initial game setup once images are loaded
backgroundImg.onload = function() {
    draw();
};
