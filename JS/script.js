document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiElements = [];

    function Confetti() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.radius = Math.random() * 10 + 5;
        this.color =
            "rgb(" +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            "," +
            Math.floor(Math.random() * 255) +
            ")";
        this.velocity = {
            x: Math.random() * 4 - 2,
            y: Math.random() * 3 + 2,
        };
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = Math.random() * 0.1 - 0.05;

        this.update = function () {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.angle += this.angleSpeed;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.radius / 2, -this.radius / 2, this.radius, this.radius);
            ctx.restore();

            if (this.y > canvas.height) {
                this.y = -10;
            }
        };
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < confettiElements.length; i++) {
            confettiElements[i].update();
        }
    }

    function spawnConfetti() {
        const confetti = new Confetti();
        confettiElements.push(confetti);
    }

    setInterval(spawnConfetti, 100);

    animate();
});
