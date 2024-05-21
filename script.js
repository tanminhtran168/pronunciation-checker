// document.addEventListener('DOMContentLoaded', function() {
//     loadGuidanceText();
// });
  

// Placeholder for actual audio recording functionality
let recording = false;
let attempts = 0;
const guidanceAudio = document.getElementById("guidanceAudio");
const resultElement = document.getElementById('result');
const guidanceElement = document.getElementById('guidance');
const gif = document.getElementById('gif');
let streak = 0;

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
    resultElement.innerText = '';
    // Hide the guidance text
    guidanceElement.style.display = 'none';
    // Hide the reset button itself
    this.style.display = 'none';
    document.getElementById('audioPlayer').style.display = 'none';
    document.getElementById('fileName').style.display = 'none';
    document.getElementById('fileUpload').value = '';
});

function displayWord(element, words) {
  element.innerText = '';
  words = words.split(' ');
  let i = 0; // Initialize a counter inside the function to keep it self-contained

  function showNextWord() {
      if (i < words.length) {
        element.innerText += (element.innerText.length > 0 ? " " : "") + words[i]; // Append the next word with a space if not the first word
        i++; // Increment the counter
          setTimeout(showNextWord, 150); // Set the timeout for the next word
      }
  }

  showNextWord(); // Start displaying words
}

document.getElementById('customFileUpload').addEventListener('click', function() {
  document.getElementById('fileUpload').click(); // Trigger the hidden file input click
});

document.getElementById('fileUpload').addEventListener('change', function() {
  const fileInput = this;
  const fileNameDisplay = document.getElementById('fileName');
  guidanceElement.style.display = 'none';
  resultElement.innerText = "";
  
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
    if (file.name.includes("correct")) {
      resultElement.innerText = "";
      guidanceElement.style.display = 'none';
      let gif = document.getElementById('gif');
      setTimeout(() => {
        gif.src = 'https://giphy.com/embed/tf9jjMcO77YzV4YPwE';
        gif.style.display = 'block';
      }, 2000)
      setTimeout(() => {
        gif.style.display = 'none';
        gif.src = '';
        if (streak >= 3) {
          resultString = "Bạn đã đọc đúng ba lần liên tiếp! Bạn có thể luyện âm mới 👍";
          resultElement.classList.add('result-correct');
          resultElement.classList.remove('result-incorrect'); 
        } else {
          hintString = "Bạn hãy nghe âm đọc mẫu và đọc lại";
          guidanceElement.style.display = 'block';
          displayWord(guidanceElement, hintString);
          setTimeout(() => {
            guidanceAudio.src = "resources/input_sounds/standard.wav";
            guidanceAudio.load();
            guidanceAudio.play();
          }, 150 * hintString.split(' ').length);
        }
        document.getElementById('resetButton').style.display = 'block';
      }, 5000)
      streak++;
    } else {
      resultElement.classList.add('result-incorrect');
      resultElement.classList.remove('result-correct');
      let resultString = "";
      let hintString = "";
      setTimeout(() => {
        switch (file.name[file.name.length - 5]) {
          case "1":
            resultString = "Bạn đang đọc âm /jū/";
            hintString = "Gợi ý: với âm “qū”, ta cần bật hơi mạnh hơn!\nBạn hãy nghe âm đọc mẫu và đọc lại";
            displayWord(resultElement, resultString);
            setTimeout(() => {
              guidanceElement.style.display = 'block';
              displayWord(guidanceElement, hintString);
            }, 150 * resultString.split(' ').length + 200);
            break;
          case "2":
            resultString = "Bạn đang đọc âm /jū/";
            hintString = "Bạn hãy nghe âm đọc mẫu và đọc lại";
            displayWord(resultElement, resultString);
            setTimeout(() => {
              guidanceElement.style.display = 'block';
              displayWord(guidanceElement, hintString);
            }, 150 * resultString.split(' ').length + 200);
            break;
          case "3":
            resultString = "Bạn đang đọc âm /qu/";
            hintString = "Bạn hãy nghe âm đọc mẫu và đọc lại";
            displayWord(resultElement, resultString);
            setTimeout(() => {
              guidanceElement.style.display = 'block';
              displayWord(guidanceElement, hintString);
            }, 150 * resultString.split(' ').length + 200);
            break;
          default:
            break;
        }
        setTimeout(() => {
          guidanceAudio.src = "resources/input_sounds/standard.wav";
          guidanceAudio.load();
          guidanceAudio.play();
        }, 150 * (resultString.split(' ').length + hintString.split(' ').length));
      }, 3000);
      streak = 0;
    }
    document.getElementById('resetButton').style.display = 'block';
  } else {
    fileNameDisplay.textContent = 'Chưa có tệp được chọn';
  }
});
