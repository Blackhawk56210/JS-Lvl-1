# **📚 Lesson Plan: Building a Crypto Chart with Chart.js and Coinbase API**

---

## **🎯 Lesson Goals**

By the end of this lesson, you will:
✅ Understand the basics of **Bootstrap** for styling  
✅ Learn about **Canvas** and how it is used in Chart.js  
✅ Fetch real-time **crypto price data** from Coinbase API  
✅ Create a **live-updating line chart** using Chart.js

---

## **🛠 Prerequisites**

- Basic knowledge of **HTML, CSS, and JavaScript**
- Understanding of **APIs and Axios** (optional but helpful)
- Install **VS Code** and use **Live Server** for testing

---

## **📖 Lesson Breakdown**

### **1️⃣ Bootstrap Overview**

- Introduce **Bootstrap** as a CSS framework for quick styling
- Explain **CDN usage** for Bootstrap (no installation needed)
- **Live Demo**: Create a **Navbar** and a basic layout

#### **💻 Code: Adding Bootstrap**

```html
<head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
  />
</head>

<body>
  <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Crypto Chart</a>
    </div>
  </nav>
</body>
```

---

### **2️⃣ Introduction to Canvas & Chart.js**

- Explain **Canvas** as an HTML element for drawing graphics
- Introduce **Chart.js** as a JavaScript charting library
- Discuss the **Line Chart** type and why it's useful

#### **💻 Code: Adding a Canvas Element**

```html
<canvas id="cryptoChart"></canvas>
```

---

### **3️⃣ Fetching Crypto Data from Coinbase API (20 min)**

- Explain how **Coinbase API** provides price data
- Use **Axios** to fetch real-time prices
- Display the response in the console

#### **💻 Code: Fetching Data**

```js
const coinbaseApi = axios.create({
  baseURL: "https://www.coinbase.com/api/v2/assets/prices",
  headers: { "Content-Type": "application/json" },
});

async function getCryptoPrices(coin) {
  const response = await coinbaseApi.get(`/${coin}`);
  console.log(response.data);
}

getCryptoPrices("bitcoin");
```

---

### **4️⃣ Creating a Dynamic Line Chart**

- Extract **timestamps and prices** from the API response
- Use **Chart.js** to plot the data
- Style the chart with labels and tooltips

#### **💻 Code: Creating the Chart**

```js
const ctx = document.getElementById("cryptoChart").getContext("2d");

async function createChart() {
  const res = await coinbaseApi.get("/bitcoin");
  const prices = res.data.data.prices.hour.prices.slice(0, 24);

  const labels = prices.map(([price, timestamp]) =>
    new Date(timestamp * 1000).toLocaleTimeString()
  );

  const data = prices.map(([price, timestamp]) => price);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Bitcoin Price",
          data: data,
          borderColor: "blue",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

createChart();
```

---

### **5️⃣ Auto-Refreshing the Chart Every 10 Seconds**

- Explain **setInterval** to refresh data
- Call `createChart()` every 10 seconds

#### **💻 Code: Auto-Refresh**

```js
setInterval(() => {
  createChart();
}, 10000);
```

---

### **6️⃣ Wrap-up & Q&A**

- Recap **Bootstrap**, **Canvas**, and **Chart.js**
- Discuss how to **add more coins** dynamically
- Open floor for **questions**

---

## **📝 Homework**

1️⃣ Modify the chart to show **other crypto prices**
2️⃣ Add **Bootstrap cards** to display additional coin data
3️⃣ Change the chart type to a **bar chart**

```

```
