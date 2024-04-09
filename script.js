document.addEventListener('DOMContentLoaded', function() {
    loadGuidanceText();
});
  

// Placeholder for actual audio recording functionality
let recording = false;
let attempts = 0;
const guidanceAudio = document.getElementById("guidanceAudio");

const mouthImageSrc = 'resources/correct_mouth_position.jpg'; // Replace with actual path to the mouth position image

function loadGuidanceText() {
    fetch('resources/guidance.txt')
        .then(response => response.text())
        .then(text => {
            document.getElementById('guidance').innerText = text;
        })
        .catch(error => {
            console.error('Error loading the guidance text: ', error);
            document.getElementById('guidance').innerText = 'Chưa tải được hướng dẫn. Vui lòng thử lại.';
        });
}

document.getElementById('resetButton').addEventListener('click', function() {
    // Reset the result text
    document.getElementById('result').innerText = '';
    // Hide the mouth position image
    document.getElementById('mouthPosition').style.display = 'none';
    // Hide the guidance text
    document.getElementById('guidance').style.display = 'none';
    // Reset the number of attempts
    attempts = 0;
    // Hide the reset button itself
    this.style.display = 'none';
    document.getElementById('audioPlayer').style.display = 'none';
    document.getElementById('fileName').style.display = 'none';
    document.getElementById('fileUpload').value = '';
});
  

function playModelPronunciation() {
  // Code to play the model pronunciation
  console.log("Playing model pronunciation");
  // ... actual code to play the pronunciation model goes here
}

document.getElementById('customFileUpload').addEventListener('click', function() {
  document.getElementById('fileUpload').click(); // Trigger the hidden file input click
});

document.getElementById('fileUpload').addEventListener('change', function() {
  const fileInput = this;
  const fileNameDisplay = document.getElementById('fileName');
  
  if (fileInput.files.length > 0) {
    file = fileInput.files[0];
    fileNameDisplay.textContent = file.name; // Update the display with the file name
    if (file.type.startsWith('audio/')) {
      const audioPlayer = document.getElementById('audioPlayer');
      audioPlayer.style.display = 'block';
      fileNameDisplay.style.display = 'block';
      const fileURL = URL.createObjectURL(file); // Create an object URL for the file
      audioPlayer.src = fileURL; // Set the audio player source to the uploaded file
      audioPlayer.load(); // Load the audio file
      audioPlayer.play();
    }
    let resultElement = document.getElementById('result');
    if (file.name.includes("correct")) {
      resultElement.innerText = "";
      attempts = 0;
      document.getElementById('mouthPosition').style.display = 'none';
      document.getElementById('guidance').style.display = 'none';
      let gif = document.getElementById('gif');
      setTimeout(() => {
        guidanceAudio.src = "resources/guidance_sounds/pass.mp3";
        guidanceAudio.load();
        guidanceAudio.play();
        gif.src = 'https://giphy.com/embed/tf9jjMcO77YzV4YPwE';
        gif.style.display = 'block';
      }, 4000)
      setTimeout(() => {
        gif.style.display = 'none';
        gif.src = '';
        resultElement.innerText = "Phát âm đúng";
        resultElement.classList.add('result-correct');
        resultElement.classList.remove('result-incorrect'); 
        document.getElementById('resetButton').style.display = 'block';
      }, 7000)
    } else {
      attempts++;
      resultElement.innerText = "";
      let gif = document.getElementById('gif');
      setTimeout(() => {
        guidanceAudio.src = "resources/guidance_sounds/fail.mp3";
        guidanceAudio.load();
        guidanceAudio.play();
        gif.src = 'https://giphy.com/embed/JT7Td5xRqkvHQvTdEu';
        gif.style.display = 'block';
      }, 2000)
      setTimeout(() => {
        gif.style.display = 'none';
        gif.src = '';
        resultElement.innerText = "Phát âm sai";
        resultElement.classList.add('result-incorrect');
        resultElement.classList.remove('result-correct');
        document.getElementById('guidance').style.display = 'block';
        document.getElementById('mouthPosition').src = mouthImageSrc;
        document.getElementById('mouthPosition').style.display = 'block';
        document.getElementById('resetButton').style.display = 'block';
      }, 5000)
    }
  } else {
    fileNameDisplay.textContent = 'Chưa có tệp được chọn';
  }
});
