const symbolInput = document.querySelector("#symbol-input");
const fetchButton = document.querySelector("#fetch-confirm");
const container = document.querySelector("#container");

const date = new Date();
let fetchedData = {};
let metaData = {};
let timeLine = {};
let symbol;
let isLoading = false;
let API_KEY = `I92BJLX8YB2EB8KQ`;
let URI = "";

symbolInput.addEventListener("change", (e) => {
  symbol = e.target.value;
});

fetchButton.addEventListener("click", () => {
  URI = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${API_KEY}`;
  getStockData();
});

async function fetchData() {
  try {
    await fetch(URI, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        for (let key in data) {
          fetchedData = { ...fetchedData, [key]: data[key] };
        }
        metaData = fetchedData["Meta Data"];
        timeLine = fetchedData["Time Series (1min)"];

        const latest = Object.keys(timeLine)[0]; // 장 종료시간
        const price = timeLine[latest]["1. open"]; // 종가
        attach(symbol, price);
      });
  } catch (error) {
    console.error(error);
    return error;
  }
}

function attach(symbol, price) {
  const prevContainer = document.getElementById("data-container");
  try {
    prevContainer.remove();
  } catch (error) {}
  const dataContainer = document.createElement("div");
  dataContainer.setAttribute("id", "data-container");

  const ticker = document.createElement("div");
  ticker.setAttribute("id", "symbol-text");
  ticker.innerHTML = symbol;

  const priceText = document.createElement("div");
  priceText.setAttribute("id", "symbol-price");
  priceText.innerHTML = `$${price}`;

  const updated = document.createElement("div");
  updated.setAttribute("id", "updated");
  updated.innerHTML = `업데이트 시각 : ${new Date().toLocaleString()}`;

  dataContainer.appendChild(ticker);
  dataContainer.appendChild(priceText);
  dataContainer.appendChild(updated);
  container.appendChild(dataContainer);
}

async function getStockData() {
  await fetchData(); // 최소 데이터 페치
  setInterval(fetchData, 60000);
}
