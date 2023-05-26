const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

/* Make btn smaller as it's clicked */

const data = [
  {
    image: 'https://images.pexels.com/photos/1446504/pexels-photo-1446504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Thirsty"
  },
  {
    image: 'https://images.pexels.com/photos/5693056/pexels-photo-5693056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Hungry"
  },
  {
    image: 'https://images.pexels.com/photos/3791136/pexels-photo-3791136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Tired"
  },
  {
    image: 'https://images.pexels.com/photos/3760275/pexels-photo-3760275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Hurt"
  },
  {
    image: 'https://images.pexels.com/photos/1912868/pexels-photo-1912868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Happy"
  },
  {
    image: 'https://images.pexels.com/photos/783941/pexels-photo-783941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Angry"
  },
  {
    image: 'https://images.pexels.com/photos/6643007/pexels-photo-6643007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Sad"
  },
  {
    image: 'https://images.pexels.com/photos/3812729/pexels-photo-3812729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: "I'm Scared"
  },
  {
    image: 'https://images.pexels.com/photos/4934745/pexels-photo-4934745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'I Want To Go Outside'
  },
  {
    image: 'https://images.pexels.com/photos/6276187/pexels-photo-6276187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'I Want To Go Home'
  },
  {
    image: 'https://images.pexels.com/photos/8926648/pexels-photo-8926648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'I Want To Go To School'
  },
  {
    image: 'https://images.pexels.com/photos/3768140/pexels-photo-3768140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    text: 'I Want To Go To Grandmas'
  }
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
  // Create an element = a box = 'div'
  const box = document.createElement('div');

  // Details in a box - Deconstruction
  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src='${image}' alt'${text}'/>
    <p class='info'>${text}</p>
  `;

  // Speek event as box is clicked
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    // Add active effect to the box
    box.classList.add('active');
    // To remove the effect
    setTimeout(() => box.classList.remove('active'), 800);
  });

  // Add boxes in <main>
  main.appendChild(box);

}

// Init speech synth
const message = new SpeechSynthesisUtterance;

// Store voices 
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');

    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
}

// Set text 
function setTextMessage(text) {
  message.text = text;
}

// Speak text 
function speakText() {
  speechSynthesis.speak(message)
}

// Set voice 
function setVoice(e) {
  // Select the parson's voice 
  message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// <-- SpeechSynthesis -->
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

// Toggle text-box 
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Close btn to bring text-box back up
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// Change voice 
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value)
  speakText();
})

getVoices();
