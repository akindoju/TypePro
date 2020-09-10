const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const pregame = document.getElementById('pregame');
const pregameBtn = document.getElementById('pregame-btn');

function startGame() {
  const words = [
    'unknotted',
    'nonprofessional',
    'lawfulness',
    'wagtails',
    'usableness',
    'reprovisions',
    'douce',
    'crowdedly',
    'domestications',
    'nature',
    'sprigtail',
    'quaaludes',
    'mittimuses',
    'vinedressers',
    'reefers',
    'smart',
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlord',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'malfunction',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'pseudocode',
    'typepro',
    'antelope',
    'kitten',
    'mouse',
    'elephant',
    'monkey',
    'goat',
    'python',
    'zebra',
    'lizard',
    'rhinoceros',
    'cat',
    'dog',
    'cockroach',
    'tiger',
    'lion',
    'dragonfly',
    'grasshopper',
    'wolf',
    'scorpion',
    'hyena',
    'jaguar',
    'panther',
    'giraffe',
    'porcupine',
    'sardine',
    'tilapia',
    'goldfish',
    'cheetah',
    'eel',
    'olusola',
    'akindoju',
    'frontline',
  ];

  let randomWord;

  let difficulty =
    localStorage.getItem('difficulty') !== null
      ? localStorage.getItem('difficulty')
      : 'easy';

  difficultySelect.value =
    localStorage.getItem('difficulty') !== null
      ? localStorage.getItem('difficulty')
      : 'easy';

  let time = 10;

  let score = 0;

  text.focus();

  const timeInterval = setInterval(updateTime, 1000);

  function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }

  function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }

  function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
      clearInterval(timeInterval);

      gameOver();
    }
  }

  addWordToDOM();

  text.addEventListener('input', (e) => {
    const insertedText = e.target.value.toLocaleLowerCase();

    if (insertedText === randomWord) {
      addWordToDOM();
      updateScore();
      e.target.value = '';

      if (difficulty === 'hard') {
        time += 2;
      } else if (difficulty === 'medium') {
        time += 3;
      } else if (difficulty === 'easy') {
        time += 5;
      }

      updateTime();
    }
  });

  settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('show');
  });

  settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
  });

  function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button class = "gameOver-btn" onclick = "location.reload()">Play Again?</button>
    `;

    endgameEl.style.display = 'flex';
  }
}

pregameBtn.addEventListener('click', () => {
  settingsBtn.classList.add('show');
  pregame.classList.add('remove');

  startGame();
});
