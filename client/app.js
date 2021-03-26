const form = document.querySelector("#form");
const graphContainer = document.querySelector(".graph-container");

const getData = async (input) => {
  const params = input ? input : "";
  const response = await axios.get("http://localhost:5000/data", {
    params: { params },
  });

  return response.data.data;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const symbols = form.symbols.value;

  //sets loading
  const h4 = document.createElement("h4");
  h4.innerText = "Getting posts...";
  document.body.appendChild(h4);

  try {
    //get data from link
    const data = await getData(symbols);
    displayData(data);
  } catch (err) {
    console.log(err);
  } finally {
    //removes loading screen
    document.body.removeChild(h4);
  }
});

const displayData = (data) => {
  data.splice(0, 10).forEach((coinData) => {
    postSummary(coinData);
  });
};

const postSummary = (coinData) => {
  const {
    price,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    percent_change_30d,
    percent_change_60d,
    percent_change_90d,
  } = coinData.quote.USD;
  const graph = document.createElement("div");
  const symbol = document.createElement("p");
  symbol.innerText = coinData.symbol;
  graph.className = "graph";
  graph.id = coinData.symbol;

  const changePerHour = generateColumn(
    periceCalculator(price, percent_change_1h),
    "blue",
    "1 h"
  );
  const changePerDay = generateColumn(
    periceCalculator(price, percent_change_24h),
    "green",
    "24h"
  );
  const changePerWeek = generateColumn(
    periceCalculator(price, percent_change_7d),
    "yellow",
    "7d"
  );
  const changePerMonth = generateColumn(
    getColumnHeight(price, percent_change_30d),
    "red",
    "30d"
  );
  const changePerBiMonth = generateColumn(
    getColumnHeight(price, percent_change_60d),
    "orange",
    "60d"
  );
  const changePerTriMonth = generateColumn(
    getColumnHeight(price, percent_change_90d),
    "violet",
    "90d"
  );

  graph.appendChild(changePerHour);
  graph.appendChild(changePerDay);
  graph.appendChild(changePerWeek);
  graph.appendChild(changePerMonth);
  graph.appendChild(changePerBiMonth);
  graph.appendChild(changePerTriMonth);

  graphContainer.appendChild(symbol);
  graphContainer.appendChild(graph);
};

const generateColumn = (height, color, label) => {
  const div = document.createElement("div");
  div.className = "column";
  const column = document.createElement("div");
  const name = document.createElement("span");
  column.style.height = `${height}px`;
  column.style.width = "50px";
  column.style.backgroundColor = color;
  name.innerText = label;
  div.appendChild(column);
  div.appendChild(name);

  return div;
};

const periceCalculator = (price, percentChange) =>
  (price * 100) / (100 + percentChange);

const getColumnHeight = (price, percentChange) => {
  //max height=400px;
  const pixelPerPrice = 400 / (5 * price);
  return periceCalculator(price, percentChange) * pixelPerPrice;
};
