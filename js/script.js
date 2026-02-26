const textToType = "coding";
const typingOutput = document.getElementById("typing-logo");
let index = 0;

function typeWriter() {
  if (index < textToType.length) {
    if (index === 0) typingOutput.textContent = ""; 
    typingOutput.textContent += textToType.charAt(index);
    index++;
    setTimeout(typeWriter, 200);
  } else if (index === textToType.length) {
    setTimeout(() => {
      index = 0;
      typeWriter();
    }, 2500);
    index++; 
  }
}

typeWriter();
