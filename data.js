// Mock Data for Moncton Basin Geoscience & EIA Dashboard
// Coordinates generally around Moncton (46.09° N, -64.77° W)

const dashboardData = {
    features: [
        // --- Basin Outline ---
        {
            type: "Feature",
            geometry: {
                type: "Polygon",
                // Generalized coordinates based on Moncton Sub-basin extents
                coordinates: [[
                    [-65.10, 45.85], // SW corner approx
                    [-65.05, 46.15], // NW
                    [-64.50, 46.22], // NE
                    [-64.35, 46.05], // E
                    [-64.55, 45.80], // SE
                    [-65.10, 45.85]  // close polygon
                ]]
            },
            properties: {
                id: "OUTLINE-001",
                category: "Boundary",
                name: "Moncton Sub-basin Approximate Extent"
            }
        },
        // --- Geoscience Boundary ---
        {
            type: "Feature",
            geometry: {
                type: "Polygon",
                // Tighter bounding box for geoscience points
                coordinates: [[
                    [-64.85, 46.00], // SW
                    [-64.85, 46.15], // NW
                    [-64.60, 46.15], // NE
                    [-64.60, 46.00], // SE
                    [-64.85, 46.00]  // close polygon
                ]]
            },
            properties: {
                id: "GEO-BND-001",
                category: "Geoscience",
                name: "Geoscience Study Area Boundary"
            }
        },
        // --- Geoscience Data Points ---
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.7782, 46.0890] },
            properties: {
                id: "GEO-001",
                category: "Geoscience",
                type: "Borehole",
                name: "Moncton Sub-basin Well #1",
                depth: "1200m",
                formation: "Albert Formation",
                date: "2015-05-12"
            }
        },
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.7210, 46.0520] },
            properties: {
                id: "GEO-002",
                category: "Geoscience",
                type: "Mineral Deposit",
                name: "Petitcodiac Copper Trace",
                minerals: "Copper, Zinc",
                status: "Exploration",
                date: "2018-08-22"
            }
        },
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.8105, 46.1205] },
            properties: {
                id: "GEO-003",
                category: "Geoscience",
                type: "Bedrock Outcrop",
                name: "Magnetic Hill Outcrop",
                rockType: "Sandstone / Conglomerate",
                age: "Carboniferous",
                date: "2010-06-15"
            }
        },
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.6500, 46.0200] },
            properties: {
                id: "GEO-004",
                category: "Geoscience",
                type: "Salt Dome",
                name: "Dorchester Salt Structure",
                depth: "800m",
                status: "Surveyed",
                date: "2019-11-04"
            }
        },
        
        // --- EIA Data ---
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.7500, 46.1000] },
            properties: {
                id: "EIA-001",
                category: "EIA",
                type: "Water Supply",
                name: "Moncton Northwest Water Expansion",
                proponent: "City of Moncton",
                status: "Approved",
                registrationDate: "2021-03-10",
                description: "Expansion of municipal water supply infrastructure."
            }
        },
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.7000, 46.0800] },
            properties: {
                id: "EIA-002",
                category: "EIA",
                type: "Industrial",
                name: "Dieppe Industrial Park Extension",
                proponent: "Dieppe Dev Corp",
                status: "Under Review",
                registrationDate: "2023-09-15",
                description: "Clearing 50 hectares for new industrial facilities."
            }
        },
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.8200, 46.0600] },
            properties: {
                id: "EIA-003",
                category: "EIA",
                type: "Mining Pipeline",
                name: "Salisbury Tailings Management",
                proponent: "NB Minerals Ltd",
                status: "Under Review",
                registrationDate: "2023-11-02",
                description: "Construction of a new tailings management facility."
            }
        },
        {
            type: "Feature",
            geometry: { type: "Point", coordinates: [-64.7400, 46.0300] },
            properties: {
                id: "EIA-004",
                category: "EIA",
                type: "Wastewater",
                name: "Riverview Treatment Upgrade",
                proponent: "Town of Riverview",
                status: "Registered",
                registrationDate: "2024-01-20",
                description: "Upgrades to existing wastewater treatment plant to meet new federal guidelines."
            }
        }
    ]
};
