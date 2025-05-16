/**
 * @defintion - creates chart to be put on html in DOM
 * @param {String} chartId - going to be id of canvas on html
 * @param {Array} labels - array of timestamps as strings on the x axis
 * @param {Array} data - array of numbers to plot of line chart
 * @param {String} label - symbol of coin being passed
 */

const api = axios.create( {
  baseURL: "https://coinbase.com/api/v2/assets/prices"
});
const sideCoins = ["tron", "usdc", "chainlink"]; // Ensure "chainlink" is a valid coin name
const coins = ["bitcoin", "ethereum", "xrp", "doge"];


function createChart(container, chartId, labels, data, label) {
  const canvas = document.createElement("canvas");
  canvas.id = chartId;
  container.appendChild(canvas);

  new Chart(canvas, {
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

function createSideChart(sideChart, chartId, labels, data, label) {
  const canvas = document.createElement("canvas");
  canvas.id = chartId;
  sideChart.appendChild(canvas);

  new Chart(canvas, {
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
      ]
    },
    options: { responsive: true },
  });
}

async function makeCharts() {
  const chartSection = document.getElementById("chartSection");
  const sideChart = document.getElementById("sideChart");

  if (!chartSection || !sideChart) {
    console.error("Missing chartSection or sideChart container in the DOM");
    return;
  }

  chartSection.innerHTML = `<div class="loader"></div>`;
  sideChart.innerHTML = `<div class="loader"></div>`;

  const responses = await Promise.all(
    coins.map(async (coin) => {
      const response = await api.get(`/${coin}`);
      const prices = response.data.data.prices.hour.prices.slice(0, 24);
      const labels = prices.map(([_, timestamp]) =>
        new Date(timestamp * 1000).toLocaleTimeString()
      );
      const data = prices.map(([price]) => Number(price));
      return {
        coinId: coin,
        labels,
        data,
        symbol: response.data.data.base,
      };
    })
  );

  const sideData = await Promise.all(
    sideCoins.map(async (coin) => {
      const response = await api.get(`/${coin}`);
      const prices = response.data.data.prices.hour.prices.slice(0, 24);
      const labels = prices.map(([_, timestamp]) =>
        new Date(timestamp * 1000).toLocaleTimeString()
      );
      const data = prices.map(([price]) => Number(price));
      return {
        coinId: coin,
        labels,
        data,
        symbol: response.data.data.base,
      };
    })
  );

  chartSection.innerHTML = "";
  sideChart.innerHTML = "";

  responses.forEach((res) => {
    createChart(chartSection, res.coinId, res.labels, res.data, res.symbol);
  });

  sideData.forEach((res) => {
    createSideChart(sideChart, `side-${res.coinId}`, res.labels, res.data, res.symbol);
  });
}

makeCharts();
setInterval(makeCharts, 10000);