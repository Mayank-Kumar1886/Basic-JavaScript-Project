const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const quoteBtn = document.querySelector(".quoteBtn");

const getQuote = async () => {
  try {
    const res = await fetch("https://api.api-ninjas.com/v1/quotes");
    const result = await res.json();
    const data = JSON.parse(result.contents);

    quote.textContent = `"${data[0].quote}"`;
    author.textContent = `— ${data[0].author}`;
  } catch (err) {
    quote.textContent = "Failed to fetch quote.";
    author.textContent = "";
    console.error("Error fetching quote:", err);
  }
};

quoteBtn.addEventListener("click",getQuote)

getQuote();
