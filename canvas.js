var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

var colors = [
    '#30D5C8',
    '#39054D',
    '#DB004C',
    '#F56E00',
    '#FFCA01'
];

var gravity = 1;
var friction = 0.85;

addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

addEventListener('click', function() {
    init();
})

//utility functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
           this.dy += gravity;
        }

        if (this.x + this.dx + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx * friction;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}

var ball;
var ballArray;

function init() {
    ballArray = [];
    for (var i = 0; i < 100; i++) {
        this.radius = randomIntFromRange(15, 35)
        var x = randomIntFromRange(radius, canvas.width -radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors);
        ballArray.push(new Ball(x, y, dx, dy, radius, color));
    }
    console.log(ballArray) 

}



function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}

init();
animate();