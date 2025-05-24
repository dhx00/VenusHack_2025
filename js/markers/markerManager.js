import { markerStyle, popupConfig } from '../config/mapConfig.js';

export class MarkerManager {
    constructor(map) {
        this.map = map;
        this.markers = [];
    }

    createMarkerWithHoverPopup(lat, lng, time, summary) {
        const position = [parseFloat(lat), parseFloat(lng)];
        const marker = L.marker(position, markerStyle).addTo(this.map);
        const popup = L.popup(popupConfig)
            .setLatLng(position)
            .setContent(`<strong>${time}</strong><br>${summary}`);

        this._setupHoverEvents(marker, popup);
        this.markers.push(marker);
        return marker;
    }

    _setupHoverEvents(marker, popup) {
        marker.on('mouseover', () => {
            marker.bindPopup(popup).openPopup();
        });

        marker.on('mouseout', () => {
            marker.closePopup();
        });
    }

    updateMarkers(events) {
        this.clearMarkers();

        events.forEach(event => {
            if (event.lat && event.lng) {
                this.createMarkerWithHoverPopup(event.lat, event.lng, event.time, event.summary);
            }
        });
    }

    clearMarkers() {
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
    }
} 