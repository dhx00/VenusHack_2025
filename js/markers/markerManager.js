import { markerStyle, popupConfig } from '../config/mapConfig.js';
import { InfoPanelManager } from '../panel/infoPanelManager.js';

export class MarkerManager {
    constructor(map) {
        this.map = map;
        this.markers = [];
        this.infoPanelManager = new InfoPanelManager();
    }

    createMarkerWithHoverPopup(lat, lng, time, summary) {
        const position = [parseFloat(lat), parseFloat(lng)];
        const marker = L.marker(position, markerStyle).addTo(this.map);
        const popup = L.popup(popupConfig)
            .setLatLng(position)
            .setContent(`<strong>${time}</strong><br>${summary}`);

        this._setupHoverEvents(marker, popup);
        this._setupClickEvent(marker);
        this.markers.push(marker);
        return marker;
    }

    _setupHoverEvents(marker, popup) {
        marker.on('mouseover', () => {
            const infoPanel = document.getElementById('info-panel');
            if (!infoPanel || infoPanel.style.display !== 'block') {
                marker.bindPopup(popup).openPopup();
            }
        });

        marker.on('mouseout', () => {
            const infoPanel = document.getElementById('info-panel');
            if (!infoPanel || infoPanel.style.display !== 'block') {
                marker.closePopup();
            }
        });
    }

    _setupClickEvent(marker) {
        marker.on('click', () => {
            console.log('Marker clicked');
            const markerPos = marker.getLatLng();
            const mapBounds = this.map.getBounds();
            const mapCenter = this.map.getCenter();

            const isMarkerOnRight = markerPos.lng > mapCenter.lng;
            const mapWidth = mapBounds.getEast() - mapBounds.getWest();
            const quarterWidth = mapWidth / 4;
            
            let newCenter;
            if (isMarkerOnRight) {
                newCenter = L.latLng(
                    markerPos.lat,
                    markerPos.lng - quarterWidth
                );
                this.infoPanelManager.setPosition('right');
                console.log('Positioning panel on right');
            } else {
                newCenter = L.latLng(
                    markerPos.lat,
                    markerPos.lng + quarterWidth
                );
                this.infoPanelManager.setPosition('left');
                console.log('Positioning panel on left');
            }

            // 先移动地图
            this.map.once('moveend', () => {
                console.log('Map move completed');
                this.infoPanelManager.showPanel(isMarkerOnRight ? 'right' : 'left');
            });

            this.map.panTo(newCenter, { 
                animate: true,
                duration: 0.5
            });
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