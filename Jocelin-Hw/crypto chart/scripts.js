const mainSection = document.getElementById("mainSection"); // main section selector

// coinbase axios instance to make api calls look cleaner in the code
const coinbaseApi = axios.create({
  baseURL: "https://www.coinbase.com/api/v2/assets/prices",
  headers: {
    "Content-Type": "application/json",
  },
});

// change this array to get different charts
// array to run loop to get prices and display
const coins = ["ethereum", "doge", "bitcoin", ""];

// function to paint charts onto DOM
async function makeCharts() {
  // when function first gets called show loading ( maybe try to find cool loading indicator )
  mainSection.innerHTML = "<h3>loading...</h3>";

  // where request to coinbase is happening and getting resolved with Promise.all
  const resolve = await Promise.all(
    // HOC - high order fu
    coins.map(async (coin) => (await coinbaseApi.get(`/${coin}`)).data)
  );

  // after resolved empty mainSection ( getting rid of loading indicatgor )
  mainSection.innerHTML = "";

  // where putting canvase and charts on DOM
  resolve.forEach((r) => {
    console.log(r);
    // r has too much data we not using so just picking off data that we need atm
    r = {
      coin: r.data.base,
      currentPrice: r.data.prices.latest,
      prices: r.data.prices.hour.prices.slice(0, 24),
    };

    // create labels from the timstamps
    const labels = r.prices.map(([price, timestamp]) => {
      return new Date(timestamp * 1000).toString().split(" ")[4];
    });

    // get the prices by timestamp
    const data = r.prices.map(([price, timestamp]) => {
      return price;
    });

    // create canvas
    const coinChart = document.createElement("canvas");
    // append coin chart ( canvas to section )
    mainSection.appendChild(coinChart);

    // chart options
    new Chart(coinChart, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `${r.coin} price`,
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        // scales: {
        //   y: {
        //     beginAtZero: true,
        //   },
        // },
      },
    });
  });
}

// calling makeCHarts on load
makeCharts();

// setting intercval to run every 10 seconds
setInterval(() => {
  makeCharts();
}, 10000);
