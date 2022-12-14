const quote = document.getElementById("quote");
const author = document.getElementById("author");
const textWrapper = document.querySelector(".text-wrapper");
const buttonGenerator = document.getElementById("generator");
const dice = document.querySelector("#generator img");

window.onload = () => {
  initialSelection();
};

function initialSelection() {
  const apiUrl = "https://type.fit/api/quotes";

  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      quoteData = data;
      selectRandomQuote();
    });
}

function selectRandomQuote() {
  const randomQuote = quoteData[Math.floor(Math.random() * quoteData.length)];

  if (randomQuote.author === null) randomQuote.author = "Unknown";

  author.innerText = randomQuote.author;
  quote.innerText = `"${randomQuote.text}"`;
}

buttonGenerator.addEventListener("click", () => {
  dice.style.animation = "";
  textWrapper.style.animation = "";

  setTimeout(() => {
    textWrapper.style.animation = "fade 1.1s ease-in";
    dice.style.animation = "rotation 0.8s ease-out";
  }, 5);

  initialSelection();
});

// copy quote for clipboard

const clipboard = document.getElementById("clipboard");
const clipboardIcon = clipboard.children[0];

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(quote.innerHTML);

    setTimeout(() => {
      clipboardIcon.setAttribute("src", "./images/check.svg");

      if (clipboardIcon.src.includes("check")) {
        setTimeout(() => {
          clipboardIcon.setAttribute("src", "./images/clipboard.svg");
        }, 1200);
      }
    }, 250);

    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

clipboard.addEventListener("click", copyContent);
