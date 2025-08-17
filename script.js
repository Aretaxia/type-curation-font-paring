const levels = [
  {
    headingFont: "Playfair Display",
    bodyOptions: ["Roboto", "Comic Sans MS", "Papyrus"],
    correct: "Roboto",
    descriptions: {
      "Roboto": "Clean and modern, pairs well with elegant headings.",
      "Comic Sans MS": "Casual and unprofessional, poor pairing for Playfair.",
      "Papyrus": "Overused and decorative, clashes with refined Playfair."
    }
  },
  {
    headingFont: "Montserrat",
    bodyOptions: ["Lato", "Courier New", "Impact"],
    correct: "Lato",
    descriptions: {
      "Lato": "Friendly and versatile, balances Montserrat’s bold style.",
      "Courier New": "Monospaced, feels mechanical, mismatched with Montserrat.",
      "Impact": "Heavy and loud, competes instead of complementing."
    }
  },
  {
    headingFont: "Merriweather",
    bodyOptions: ["Open Sans", "Comic Sans MS", "Arial Black"],
    correct: "Open Sans",
    descriptions: {
      "Open Sans": "Readable and modern, matches Merriweather’s classic style.",
      "Comic Sans MS": "Childish tone, clashes with professional serif.",
      "Arial Black": "Too bold, steals attention from Merriweather."
    }
  },
  {
    headingFont: "Oswald",
    bodyOptions: ["Roboto", "Papyrus", "Verdana"],
    correct: "Roboto",
    descriptions: {
      "Roboto": "Neutral, flexible, works well with Oswald’s condensed headings.",
      "Papyrus": "Distracting and decorative, doesn’t align with Oswald.",
      "Verdana": "Readable but uninspired, lacks harmony with Oswald."
    }
  },
  {
    headingFont: "Raleway",
    bodyOptions: ["Lora", "Courier New", "Impact"],
    correct: "Lora",
    descriptions: {
      "Lora": "Elegant serif, contrasts nicely with modern Raleway.",
      "Courier New": "Rigid monospaced type, doesn’t fit well with Raleway.",
      "Impact": "Too aggressive, overpowers delicate Raleway."
    }
  }
];

let currentLevel = 0;

const levelContainer = document.getElementById("level-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const congratulations = document.getElementById("congratulations");

function loadLevel(levelIndex) {
  const level = levels[levelIndex];
  levelContainer.innerHTML = `
    <h2>Level ${levelIndex + 1}</h2>
    <div class="font-example" style="font-family: '${level.headingFont}', serif;">
      ${level.headingFont} Example
    </div>
    <p>Select the best body font to pair with <strong>${level.headingFont}</strong>:</p>
    <div class="options">
      ${level.bodyOptions.map(font => `
        <div class="option" style="font-family: '${font}', sans-serif;" onclick="checkAnswer('${font}')">
          ${font}
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">${level.descriptions[font]}</p>
        </div>
      `).join('')}
    </div>
  `;
  feedback.innerHTML = "";
  nextBtn.classList.add("hidden");
}

function checkAnswer(selectedFont) {
  const level = levels[currentLevel];
  const options = document.querySelectorAll(".option");

  options.forEach(opt => {
    opt.classList.remove("correct", "wrong");
    if (opt.textContent.includes(level.correct)) {
      opt.classList.add("correct");
    }
    if (opt.textContent.includes(selectedFont) && selectedFont !== level.correct) {
      opt.classList.add("wrong");
    }
  });

  if (selectedFont === level.correct) {
    feedback.textContent = "✅ Correct! " + level.descriptions[selectedFont];
    feedback.style.color = "#4caf50";
    nextBtn.classList.remove("hidden");
  } else {
    feedback.textContent = "❌ Wrong choice. " + level.descriptions[selectedFont];
    feedback.style.color = "#f44336";
  }
}

nextBtn.addEventListener("click", () => {
  currentLevel++;
  if (currentLevel < levels.length) {
    loadLevel(currentLevel);
  } else {
    levelContainer.innerHTML = "";
    feedback.innerHTML = "";
    nextBtn.classList.add("hidden");
    congratulations.classList.remove("hidden");
  }
});

loadLevel(currentLevel);
