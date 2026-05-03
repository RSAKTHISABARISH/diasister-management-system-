// Map Initialization using Leaflet
window.initMap = function(elementId, lat, lng, zoomLevel = 13) {
    const mapElement = document.getElementById(elementId);
    if (!mapElement) return null;

    // Check if map already initialized on this element
    if (mapElement._leaflet_id) {
        mapElement._leaflet_id = null;
        mapElement.innerHTML = '';
    }

    const map = L.map(elementId, {
        zoomControl: false,
        attributionControl: false
    }).setView([lat, lng], zoomLevel);

    // Dark theme tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
    }).addTo(map);

    // Custom Marker
    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div style="position: relative; display: flex; justify-content: center; align-items: center;">
                <div style="width: 24px; height: 24px; background: rgba(59, 130, 246, 0.2); border-radius: 50%; position: absolute; animation: pulse 2s infinite;"></div>
                <div style="width: 12px; height: 12px; background: #3b82f6; border: 2px solid white; border-radius: 50%; z-index: 1;"></div>
            </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    L.marker([lat, lng], { icon: customIcon }).addTo(map);

    return map;
};

window.addMarker = function(map, lat, lng, type, popupText) {
    if (!map) return;
    
    let color = '#3b82f6';
    let iconHtml = '';
    
    if (type === 'hospital') {
        color = '#ef4444';
        iconHtml = '<span style="font-size: 16px;">🏥</span>';
    } else if (type === 'weather') {
        color = '#f59e0b';
        iconHtml = '<span style="font-size: 16px;">⚡</span>';
    } else {
        color = '#3b82f6';
        iconHtml = '<span style="font-size: 16px;">📍</span>';
    }

    const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
            <div style="background: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                ${iconHtml}
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    if (popupText) marker.bindPopup(popupText);
    
    return marker;
};
