var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}} // Happy Holidays!

// Tweak this integer. The lower it is, more snow you'll create:
var amount = 20;

function rndIntBtwn(min, max) {
return Math.floor(Math.random() * (max - min + 1) + min);
}
function rndFloatBtwn(min, max) {
return Math.random() * (max - min) + min;
}var

Snowfall = function () {

function Snowfall(element) {_classCallCheck(this, Snowfall);
var canvas = document.createElement('canvas');
canvas.setAttribute('id', 'snow_light');
this.ctx = canvas.getContext('2d');
this.counter = 0;
this.particles = [];
this.running = true;
this.width = this.ctx.canvas.width;
this.height = this.ctx.canvas.height;
this.id = 'snow_light';
this.maxDiameter = 7;
this.startY = -this.maxDiameter * 0.5;
this.endY = this.height + this.maxDiameter * 0.5;
this.showPaths = false;

element.appendChild(canvas);

window.addEventListener('resize', this.handleResize.bind(this));
window.addEventListener('click', this.handleClick.bind(this));

this.handleResize();
}_createClass(Snowfall, [{ key: 'addParticle', value: function addParticle()

{
  var x = rndIntBtwn(0, this.width);
  var y = this.startY;
  var diameter = rndIntBtwn(1, this.maxDiameter);
  // let color = `rgb(${rndFloatBtwn(0, 255)}, ${rndFloatBtwn(0, 255)}, ${rndFloatBtwn(0, 255)})`;
  var color = 'rgba(255, 255, 255, ' + rndFloatBtwn(0.8, 1) + ')';
  var particle = new Particle(this.ctx, x, y, diameter, color);
  this.particles.push(particle);
} }, { key: 'handleClick', value: function handleClick(

e) {
  var btn = e.target.closest('button');
  if (btn) {
    if (this.running) {
      this.running = false;
      btn.textContent = 'play';
    } else {
      this.running = true;
      btn.textContent = 'pause';
    }
    this.render();
  }
} }, { key: 'handleResize', value: function handleResize()

{
  this.ctx.canvas.width = this.width = window.innerWidth;
  this.ctx.canvas.height = this.height = window.innerHeight;
  this.endY = this.height + this.maxDiameter * 0.5;
} }, { key: 'render', value: function render(

time) {var _this = this;
  if (this.running) {
    // delta will be undefined on first run, so I'm setting it to zero, below. This wouldn't really make a difference, but the play/pause button would reset the animation on click of "play" if an undefined value were added to the mix.
    var delta = time ? time : 0;

    // throttle the amount of particles being added:
    if (this.counter > amount) {
      this.addParticle();
      this.counter = 0;
    }
    if (!this.showPaths) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
    this.particles.forEach(function (p, i) {
      p.x += Math.sin(delta * p.freqFactor) * p.ampFactor;
      p.y += p.speed;
      p.draw();
    });
    // remove particles that are beyond the vertical bounds of the canvas:
    this.particles = this.particles.filter(function (p) {return p.y <= _this.height;});
    this.counter++;
    window.requestAnimationFrame(this.render.bind(this));
  }
} }]);return Snowfall;}();var



Particle = function () {

function Particle(context, x, y, diameter, color, speed) {_classCallCheck(this, Particle);
this.color = color;
this.ctx = context;
this.glow = rndIntBtwn(2, 10);
this.radius = diameter * 0.5;
this.x = x;
this.y = y;
this.speed = diameter * 0.1; // smaller particles will be slower
this.freqFactor = rndFloatBtwn(5, 9) * .0001;
this.ampFactor = rndFloatBtwn(2, 5) * .1;
}_createClass(Particle, [{ key: 'draw', value: function draw()

{
  this.ctx.shadowBlur = this.glow;
  this.ctx.shadowOffset = 0;
  this.ctx.shadowColor = this.color;
  this.ctx.fillStyle = this.color;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  this.ctx.closePath();
  this.ctx.fill();
} }]);return Particle;}();



new Snowfall(document.documentElement).render();