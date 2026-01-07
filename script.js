function blowCandle() {
    const flame = document.getElementById('flame');
    if (!flame.classList.contains('out')) {
        flame.classList.add('out');
        document.querySelector('h1').innerText = "Make a Wish! ✨";
        document.querySelector('.instruction').innerText = "(點擊畫面施放煙火 / Click anywhere for fireworks!)";
        launchExplosion();
        startFireworks(); // Trigger fireworks
    } else {
        flame.classList.remove('out');
        document.querySelector('h1').innerText = "Happy Birthday!";
    }
}

// --- Fireworks Logic ---
const originalImagePaths = [
    '0364E960-B8CF-4727-8862-CFD099F27E63_1_105_c.jpeg',
    '0CDF381A-64B3-43B5-A192-F0070806314D_1_105_c.jpeg',
    '0E463471-10F8-4D51-BB28-1BB1A393E330_1_105_c.jpeg',
    '0F161EB8-D384-4835-A698-7AFA4C71A296_1_105_c.jpeg',
    '0FCE7484-2873-48D4-9013-CE0E909DFAA9_1_105_c.jpeg',
    '1117CBB3-0A63-4182-B8C0-821C50C9DB2C_1_105_c.jpeg',
    '157CC207-0BB1-4375-AADA-6E838F6FBDEB_1_105_c.jpeg',
    '1E7A55EC-B892-4DFA-98D4-B029B72EE1D6_1_105_c.jpeg',
    '2016D433-A17D-472B-B419-CE30BD164AE7_1_105_c.jpeg',
    '26D01A55-42BF-4A3B-8BDD-19442843EE57_1_105_c.jpeg',
    '284EFBDE-B50C-4EE5-87CF-F71B5320CB44_1_105_c.jpeg',
    '285DE45C-50A2-4FEB-87D0-3FC3507B00FF_1_105_c.jpeg',
    '29F5E0FB-5C45-4550-AEA6-5E2506AEB0CB_1_105_c.jpeg',
    '32CFA90D-8CCA-40F8-A043-72F611F3B1F8_1_105_c.jpeg',
    '3372375F-80C5-4D0B-AE49-0F1FCEF32948_1_105_c.jpeg',
    '33F1C84F-3F77-479E-B11A-17602929D3CE_1_105_c.jpeg',
    '3AAA37C2-74C6-43EC-8BAF-24DFD050AA8F_1_105_c.jpeg',
    '4C6056D4-FE3F-48B2-BFB8-6F2EA11FF398_1_105_c.jpeg',
    '4E79A74F-6EA0-43AA-9C49-3AD331564A20_1_105_c.jpeg',
    '4EFC4796-AF26-43D1-8E62-F7A39E29F70A_1_105_c.jpeg',
    '4FD341B8-280F-4118-8ACB-557647054677_1_105_c.jpeg',
    '512C91E7-ED79-47DE-A6F1-596900296B09_1_105_c.jpeg',
    '531FD945-8D8F-4CAC-90D5-3FC28F0A30C3_1_105_c.jpeg',
    '5E1AF5E8-DE01-4421-876D-E66CB6BF5035_1_105_c.jpeg',
    '63D96F79-A8E0-4FBD-B72C-D2CB3C8DDB02_1_105_c.jpeg',
    '6A560BA1-78C1-4729-8AFE-767168B8B8B2_1_105_c.jpeg',
    '71270034-2847-48FE-9D55-27E2776421F7_1_105_c.jpeg',
    '7751BBDC-79BA-41D7-BE80-857009D2B419_1_105_c.jpeg',
    '84E0419D-1C37-4AC0-9123-95C534043D9E_1_105_c.jpeg',
    '8C334FB9-4ECD-4975-B88A-3CA770BDDC46_1_105_c.jpeg',
    '9BA9050A-D8B6-46E8-AE90-215E2CB19617_1_105_c.jpeg',
    'B28F1920-7053-4D02-9A9F-1C676A3FEC8F_1_105_c.jpeg',
    'BA25BF1F-A1C1-430D-ABB0-E40A6E3CEC8F_1_105_c.jpeg',
    'BFB81DA3-34A9-4A1B-8D90-436E746BBAB4_1_105_c.jpeg',
    'C105456A-BA84-47B7-8B78-49BD84DCB682_1_105_c.jpeg',
    'C188E994-FDEA-49C2-9DC4-5B69818AEF95_1_105_c.jpeg',
    'C1F2CE7D-14F1-4BF8-82A2-1C7B0070D674_1_105_c.jpeg',
    'C26ACB2C-8D3E-4861-8F70-567EFCFD383E_1_105_c.jpeg',
    'C75B862F-9850-47AC-A217-FEDEBBDDE959_1_105_c.jpeg',
    'C9626F65-0717-4AA6-91D3-B587A10DB3FE_1_105_c.jpeg',
    'D2A134C8-8060-4B2D-9BF6-5D44B45981DB_1_105_c.jpeg',
    'D914BA08-6610-4FC9-9FB9-D73F2097E8F0_1_105_c.jpeg',
    'E1A84DD1-3E0F-4418-BB42-47E563D31F2E_1_105_c.jpeg',
    'E1A9C75D-468E-4322-B344-EAEF6667AA35_1_105_c.jpeg',
    'E47F2BB8-E4A5-4745-903F-AC4EAD59A610_1_105_c.jpeg',
    'E543313D-3890-4146-AC16-9BEEA036C39A_1_105_c.jpeg',
    'F24BBC20-51C3-4E85-9754-1F70D8F273B1_1_105_c.jpeg',
    'F26AC34C-393A-4E80-A705-5C8F4207F2A8_1_105_c.jpeg'
];

// Initialize available images with a copy of the original list
let availableImages = [...originalImagePaths];

function showRandomPhoto(x, y) {
    if (availableImages.length === 0) {
        // Replenish the pool if all images have been shown
        availableImages = [...originalImagePaths];
    }

    // Pick a random index from the available images
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    // Remove the chosen image from the available list so it won't be picked again immediately
    const chosenImage = availableImages.splice(randomIndex, 1)[0];

    const randomPath = 'images/' + chosenImage;
    const img = document.createElement('img');
    img.src = randomPath;
    img.classList.add('firework-photo');
    img.style.left = x + 'px';
    img.style.top = y + 'px';

    document.body.appendChild(img);

    // Remove element after animation
    setTimeout(() => {
        img.remove();
    }, 3000); // Matches animation duration
}

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let fireworks = [];
let particles = [];
let animationRequested = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Firework {
    constructor(sx, sy, tx, ty) {
        this.x = sx;
        this.y = sy;
        this.sx = sx;
        this.sy = sy;
        this.tx = tx;
        this.ty = ty;
        this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
        this.distanceTraveled = 0;
        this.coordinates = [];
        this.coordinateCount = 3;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.atan2(ty - sy, tx - sx);
        this.speed = 2;
        this.acceleration = 1.05;
        this.brightness = Math.random() * 50 + 50;
        this.targetRadius = 1;
    }

    update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);

        this.speed *= this.acceleration;
        const vx = Math.cos(this.angle) * this.speed;
        const vy = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);

        if (this.distanceTraveled >= this.distanceToTarget) {
            createParticles(this.tx, this.ty);
            showRandomPhoto(this.tx, this.ty); // Show photo at explosion
            fireworks.splice(index, 1);
        } else {
            this.x += vx;
            this.y += vy;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsl(' + Math.random() * 360 + ', 100%, ' + this.brightness + '%)';
        ctx.stroke();
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.coordinates = [];
        this.coordinateCount = 5;
        while (this.coordinateCount--) {
            this.coordinates.push([this.x, this.y]);
        }
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 10 + 1;
        this.friction = 0.95;
        this.gravity = 1;
        this.hue = Math.random() * 360;
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
    }

    update(index) {
        this.coordinates.pop();
        this.coordinates.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= this.decay) {
            particles.splice(index, 1);
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
        ctx.stroke();
    }
}

function createParticles(x, y) {
    let particleCount = 30;
    while (particleCount--) {
        particles.push(new Particle(x, y));
    }
}

function calculateDistance(p1x, p1y, p2x, p2y) {
    const xDistance = p1x - p2x;
    const yDistance = p1y - p2y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function loop() {
    if (!animationRequested) return;

    requestAnimationFrame(loop);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';

    let i = fireworks.length;
    while (i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
    }

    let j = particles.length;
    while (j--) {
        particles[j].draw();
        particles[j].update(j);
    }

    /* Random auto-launch removed for interactive mode */
}

function startFireworks() {
    if (!animationRequested) {
        animationRequested = true;
        loop();
        // Launch a few initial ones
        for (let k = 0; k < 5; k++) {
            setTimeout(() => {
                const startX = window.innerWidth / 2;
                const startY = window.innerHeight;
                const targetX = Math.random() * window.innerWidth;
                const targetY = Math.random() * window.innerHeight * 0.4;
                fireworks.push(new Firework(startX, startY, targetX, targetY));
            }, k * 300);
        }
    }
}

// Interactive Fireworks
document.addEventListener('mousedown', (e) => {
    if (!animationRequested) return; // Only allow after candle is blown (active animation)

    // Avoid double triggering if clicking the flame initially (though flame is gone/out)
    // but just in case, we can rely on animationRequested being set in blowCandle

    const targetX = e.clientX;
    const targetY = e.clientY;
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight;
    fireworks.push(new Firework(startX, startY, targetX, targetY));
});

// --- Original Confetti Logic ---
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];

    setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('confetti');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDuration = Math.random() * 2 + 3 + 's';
        el.style.width = Math.random() * 8 + 4 + 'px';
        el.style.height = Math.random() * 8 + 4 + 'px';

        container.appendChild(el);

        // Cleanup
        setTimeout(() => el.remove(), 5000);
    }, 200);
}

function launchExplosion() {
    const container = document.getElementById('confetti-container');
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];

    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.classList.add('confetti');
        el.style.left = '50%';
        el.style.top = '50%';
        el.style.transition = 'all 1s ease-out';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random explosion direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 50;

        // Custom animation for explosion
        // Since this is a simple script, we stick to the falling one but maybe inject a burst?
        // Let's just spawn more falling confetti for now to keep it simple but "rich"
    }
    // Increase confetti intensity temporarily
    const originalInterval = setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('confetti');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-10px';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDuration = Math.random() * 1 + 2 + 's'; // Faster fall
        container.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }, 50);

    setTimeout(() => clearInterval(originalInterval), 2000);
}

// Start background confetti
createConfetti();
