// Main UI and Map Logic

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Map
    // Coordinates for Moncton, NB
    const monctonCoords = [46.0878, -64.7782];
    const map = L.map('map', {
        zoomControl: false // Custom placement or relying on scroll
    }).setView(monctonCoords, 11);

    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    // Use a dark-themed tile layer that matches our UI
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // 2. Data State
    let state = {
        showGeoscience: true,
        showEIA: true,
        geoChartConfig: null,
        eiaChartConfig: null,
        markers: [] // To keep track of added layers
    };

    // 3. Render Markers
    const renderMap = () => {
        // Clear existing markers
        state.markers.forEach(m => map.removeLayer(m));
        state.markers = [];

        dashboardData.features.forEach(feature => {
            const props = feature.properties;
            const isGeo = props.category === 'Geoscience';
            const isEIA = props.category === 'EIA';

            if ((isGeo && !state.showGeoscience) || (isEIA && !state.showEIA)) {
                return;
            }

            // Render Polygons (e.g. Map Outlines)
            if (feature.geometry.type === 'Polygon') {
                let color = '#6366f1'; // Indigo outline default
                let fillColor = '#818cf8';

                if (isGeo) {
                    color = '#10b981'; // Green for Geoscience boundary
                    fillColor = '#10b981';
                }

                const polygonLayer = L.geoJSON(feature, {
                    style: {
                        color: color,
                        weight: 2,
                        opacity: 0.8,
                        fillColor: fillColor,
                        fillOpacity: 0.1,
                        dashArray: '5, 5' // Dashed line for boundary
                    }
                }).bindPopup(`<div class="popup-title" style="color: ${color};">${props.name}</div>`);
                
                polygonLayer.addTo(map);
                state.markers.push(polygonLayer);
                return; // Skip point rendering logic below
            }

            // Custom Icon using divIcon
            let iconClass = 'marker-geo-default';
            if (isEIA) {
                iconClass = 'marker-eia';
            } else if (isGeo) {
                if (props.type === 'Borehole') iconClass = 'marker-geo-borehole';
                else if (props.type === 'Mineral Deposit') iconClass = 'marker-geo-mineral';
                else if (props.type === 'Bedrock Outcrop') iconClass = 'marker-geo-outcrop';
                else if (props.type === 'Salt Dome') iconClass = 'marker-geo-salt';
            }

            const customIcon = L.divIcon({
                className: `custom-marker ${iconClass}`,
                iconSize: [16, 16],
                iconAnchor: [8, 8],
                popupAnchor: [0, -10]
            });

            const marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], { icon: customIcon });

            // Build Popup Content
            let popupContent = `<div class="popup-title ${isGeo ? 'popup-geo' : 'popup-eia'}">${props.name}</div>`;
            popupContent += `<div class="popup-details">`;
            popupContent += `<div><strong>Category:</strong> ${props.category}</div>`;
            popupContent += `<div><strong>Type:</strong> ${props.type}</div>`;
            
            if (isGeo) {
                if (props.depth) popupContent += `<div><strong>Depth:</strong> ${props.depth}</div>`;
                if (props.formation) popupContent += `<div><strong>Formation:</strong> ${props.formation}</div>`;
                if (props.minerals) popupContent += `<div><strong>Minerals:</strong> ${props.minerals}</div>`;
                if (props.rockType) popupContent += `<div><strong>Rock Type:</strong> ${props.rockType}</div>`;
            } else if (isEIA) {
                popupContent += `<div><strong>Proponent:</strong> ${props.proponent}</div>`;
                popupContent += `<div><strong>Status:</strong> ${props.status}</div>`;
                popupContent += `<div><strong>Date:</strong> ${props.registrationDate}</div>`;
                popupContent += `<hr style="border-color: rgba(255,255,255,0.1); margin: 0.5rem 0;" />`;
                popupContent += `<div><em>${props.description}</em></div>`;
            }
            popupContent += `</div>`;

            marker.bindPopup(popupContent);
            marker.addTo(map);
            state.markers.push(marker);
        });
    };

    // 4. Render Charts
    const renderCharts = () => {
        // Data processing
        const geoFeatures = dashboardData.features.filter(f => f.properties.category === 'Geoscience');
        const eiaFeatures = dashboardData.features.filter(f => f.properties.category === 'EIA');

        // Geo Chart (Bar chart by Type)
        const geoTypes = {};
        geoFeatures.forEach(f => {
            geoTypes[f.properties.type] = (geoTypes[f.properties.type] || 0) + 1;
        });

        const ctxGeo = document.getElementById('geoDataChart').getContext('2d');
        if (state.geoChartConfig) state.geoChartConfig.destroy();
        
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Inter', sans-serif";

        const typeColors = {
             'Borehole': '#10b981',
             'Mineral Deposit': '#f59e0b',
             'Bedrock Outcrop': '#8b5cf6',
             'Salt Dome': '#ec4899'
        };
        const bgColors = Object.keys(geoTypes).map(type => typeColors[type] || '#3b82f6');

        state.geoChartConfig = new Chart(ctxGeo, {
            type: 'bar',
            data: {
                labels: Object.keys(geoTypes),
                datasets: [{
                    label: 'Geoscience Sites',
                    data: Object.values(geoTypes),
                    backgroundColor: bgColors,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: { display: true, text: 'Geoscience by Type', color: '#f8fafc' }
                },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
            }
        });

        // EIA Chart (Doughnut chart by Status)
        const eiaStatus = {};
        eiaFeatures.forEach(f => {
            eiaStatus[f.properties.status] = (eiaStatus[f.properties.status] || 0) + 1;
        });

        const ctxEIA = document.getElementById('eiaStatusChart').getContext('2d');
        if (state.eiaChartConfig) state.eiaChartConfig.destroy();

        state.eiaChartConfig = new Chart(ctxEIA, {
            type: 'doughnut',
            data: {
                labels: Object.keys(eiaStatus),
                datasets: [{
                    data: Object.values(eiaStatus),
                    backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 12 } },
                    title: { display: true, text: 'EIA Projects by Status', color: '#f8fafc' }
                },
                cutout: '70%'
            }
        });
    };

    // 5. Event Listeners
    document.getElementById('filter-geoscience').addEventListener('change', (e) => {
        state.showGeoscience = e.target.checked;
        renderMap();
    });

    document.getElementById('filter-eia').addEventListener('change', (e) => {
        state.showEIA = e.target.checked;
        renderMap();
    });

    // Initial Render
    renderMap();
    renderCharts();
});
