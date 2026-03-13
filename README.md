# Moncton Basin Geoscience & EIA Dashboard 🗺️⛏️

**An interactive geospatial dashboard mapping the intersection of geological resources and regulatory frameworks in the Moncton Sub-basin, New Brunswick.**

![Dashboard Preview](https://via.placeholder.com/800x450.png?text=Moncton+Basin+Dashboard+Preview) *(Replace with actual screenshot)*

## 📖 Overview

The Moncton Basin Geoscience Dashboard is a dynamic web tool designed to visualize publicly available geoscience data alongside active Environmental Impact Assessments (EIAs). By providing a comprehensive, location-based overview of regional development, this tool bridges the gap between natural geological features and ongoing environmental regulatory projects in New Brunswick.

## ✨ Features

- **Interactive Leaflet Map**: Explore the Moncton Sub-basin with a responsive, dark-themed Carto map layer.
- **Geoscience Data Visualization**: View precisely categorized geographical data including:
  - 🟢 Boreholes
  - 🟠 Mineral Deposits
  - 🟣 Bedrock Outcrops
  - 🩷 Salt Domes
- **EIA Overlay**: Track active Environmental Impact Assessment projects across the region based on their status (Approved, Under Review, Registered).
- **Dynamic Charting**: Real-time analytical charts built with Chart.js summarizing data distribution.
- **Custom Filtering**: Toggle data layers on and off to focus specifically on Geoscience points, EIA projects, or specific Study Area boundaries.
- **Premium Glassmorphic UI**: A visually striking, modern interface combining translucent glass elements with deep, rich colors.

## 🛠️ Technology Stack

This project is built using high-performance, vanilla web technologies to ensure it runs anywhere with zero build-step requirements:

- **HTML5 & CSS3**: Structured semantic layout with modern CSS variables, Flexbox, and backdrop filters for the glassmorphism aesthetic.
- **Vanilla JavaScript (ES6)**: No framework required. Pure, fast DOM manipulation and application state handling.
- **[Leaflet.js](https://leafletjs.com/)**: The leading open-source JavaScript library for mobile-friendly interactive maps.
- **[Chart.js](https://www.chartjs.org/)**: Simple yet flexible JavaScript charting for designers & developers.

## 🚀 How to Run Locally

Because this project uses vanilla HTML, CSS, and JS, **no installation or `npm` commands are required.**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/moncton-dashboard.git
   ```
2. Navigate into the folder:
   ```bash
   cd moncton-dashboard
   ```
3. Open `index.html` directly in any modern web browser.

*Alternatively, if you prefer using a local development server to avoid CORS issues with future external data fetching, you can run:*
```bash
npx live-server
# or
python -m http.server
```

## 📂 Project Structure

```text
moncton-dashboard/
├── index.html      # Main application structure and layout
├── style.css       # Premium custom styling and glassmorphism UI
├── main.js         # Core application logic, map rendering, and chart initialization
└── data.js         # Curated GeoJSON dataset for the Moncton Basin
```

## 📊 Data Formatting (GeoJSON)

The core spatial data resides in `data.js` formatted as standard GeoJSON features. Here is an example of importing a new Geoscience point:

```json
{
    "type": "Feature",
    "geometry": { "type": "Point", "coordinates": [-64.7782, 46.0890] },
    "properties": {
        "id": "GEO-001",
        "category": "Geoscience",
        "type": "Borehole",
        "name": "Moncton Sub-basin Well #1",
        "depth": "1200m",
        "formation": "Albert Formation",
        "date": "2015-05-12"
    }
}
```

## 🤝 Contributing

Contributions are welcome! If you have updated provincial data or features you'd like to add:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🤖 Acknowledgements

This project was built with the assistance of the **Antigravity Agent**, an advanced AI coding assistant developed by Google DeepMind.

## 📬 Contact & Sources

- **Data Sources:** New Brunswick Department of Natural Resources and Energy Development, GeoNB Open Data Portal.
- **Project Link:** [https://github.com/yourusername/moncton-dashboard](https://github.com/yourusername/moncton-dashboard)
