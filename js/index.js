const mario = document.querySelector('.mario');

const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
}

const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

const scoreElement = document.createElement('div');
scoreElement.className = 'score';
document.body.appendChild(scoreElement);

const updateScore = () => {
  scoreElement.textContent = `Score: ${score}`;
}

const updateHighScore = () => {
  const highScoreElement = document.querySelector('.high-score');
  highScoreElement.textContent = `High Score: ${highScore}`;
}

const increaseAnimationSpeed = () => {
  var pipes = document.getElementsByClassName('pipe');
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].classList.add('fast-animation');
    pipes[i].style.animationDuration = '1s';
  }
}

setInterval(increaseAnimationSpeed, 8000);

const loop = setInterval(() => {
  console.log('loop');

 const pipePosition = pipe.offsetLeft;
 const cloudsPosition = clouds.offsetLeft;
 const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');

 console.log(marioPosition)

 if(pipe && pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

  pipe.style.animation = 'none';
  pipe.style.left = `${pipePosition}px`;

  clouds.style.animation = 'none';
  clouds.style.left = `${cloudsPosition}px`;

  mario.style.animation = 'none';
  mario.style.bottom = `${marioPosition}px`;

  mario.src = './image/game-over.png';
  mario.style.width = '75px'
  mario.style.marginLeft = '50px'

  clearInterval(loop);

  if(score > highScore){
    highScore = score;
    localStorage.setItem('highScore', highScore);
    updateHighScore();
  }
 }

 score++;
 console.log('Score;', score);
 updateScore();

}, 10);

document.addEventListener('keydown', jump); 

updateHighScore();