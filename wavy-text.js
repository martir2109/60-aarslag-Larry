function updateText(text) {
  let delay = 300;

  let p = document.getElementById("animated-text");

  p.innerHTML = text
    .split("")
    .map((letter) => {
      console.log(letter);
      return `<span>` + letter + `</span>`;
    })
    .join("");

  Array.from(p.children).forEach((span, index) => {
    setTimeout(() => {
      span.classList.add("wavy");
    }, index * 80 + delay);
  });
}
updateText("Vi gleder oss til å se deg! 🥳");
