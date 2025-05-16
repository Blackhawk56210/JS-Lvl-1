
const api = axios.create( {
  baseURL: "https://coinbase.com/api/v2/assets/prices"
});

const sideCoins = ["trx", "usdc", "link"];
const coins = ["bitcoin", "ethereum", "xrp", "doge"];

function createChart(container, chartId, labels, data, label) {
  // changed Chart to container so it doesn't clash with chart.js
  const canvas = document.createElement("canvas");
  canvas.id = chartId;
  container.appendChild(canvas);

  new window.Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: `${label}, price`,
        data,
        borderColor: "rgb(2, 114, 2)",
        backgroundColor: "rgba(6, 126, 32, 0.48)",
        borderWidth: 2,
        radius: 0,
        fill: true,
      }],
    },
    options: { responsive: true },
  });
}

function createSideChart(container, chartId, labels, data, label) {
  const canvas = document.createElement("canvas");
  canvas.id = chartId;
  container.appendChild(canvas);

  new window.Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: `${label}, price`,
          data: data,
          borderColor: "rgb(2, 114, 2)",
          backgroundColor: "rgba(6, 126, 32, 0.48)",
          borderWidth: 2,
          radius: 0,
          fill: true,
        },
      ],
    },
    options: { responsive: true },
  });
}

async function makeCharts() {
  const resultsDiv = document.getElementById("results");
  const chartSection = document.getElementById("chartSection");
  const sideChart = document.getElementById("sideChart");
  const loader = document.createElement("div");
  loader.id = "loader";
  loader.textContent = "Loading...";
  try {
    resultsDiv.innerHTML = "";
    resultsDiv.appendChild(loader);

    const responses = await Promise.all(
      coins.map(async (coin) => {
      const d = (await api.get(`/${coin}`)).data.data;
      const res = {
        coin: coin,
        symbol: d.base,
        prices: d.prices.day.prices.slice(0, 24),
        latest: {
          price: d.prices.latest,
          currency: d.currency,
        },
      };

      const labels = [];
      const data = [];

      for (let i = 0; i < res.prices.length; i++) {
        let [price, timestamp] = res.prices[i];
        timestamp = new Date(timestamp).toString().split(" ")[4];
        labels.push(timestamp);
        data.push(Number(price));
      }

      return { res, labels, data };
    })
  );

  const sideResponses = await Promise.all(
    sideCoins.map(async (coin) => {
      const d = (await api.get(`/${coin}`)).data.data;
      const res = {
        coin: coin,
        symbol: d.base,
        prices: d.prices.day.prices.slice(0, 24),
        latest: {
          price: d.prices.latest,
          currency: d.currency,
        },
      };

      const labels = [];
      const data = [];

      for (let i = 0; i < res.prices.length; i++) {
        let [price, timestamp] = res.prices[i];
        timestamp = new Date(timestamp).toString().split(" ")[4];
        labels.push(timestamp);
        data.push(Number(price));
      }

      return { res, labels, data };
    })
  );

  chartSection.innerHTML = "";
  sideChart.innerHTML = "";

  responses.forEach((res) => {
    createChart(chartSection, res.res.coin, res.labels, res.data, res.res.symbol);
  });
  } catch (e) {
    console.log("error:", e);
  } finally {
    document.getElementById("loader").remove();
  }
}

makeCharts();
setInterval(makeCharts, 10000);