export class InfoPanelManager {
    constructor() {
        this.infoPanel = document.getElementById('info-panel');
        this.infoPanelClose = document.getElementById('info-panel-close');
        
        if (!this.infoPanel || !this.infoPanelClose) {
            console.error('Info panel elements not found!');
            return;
        }
        
        this._setupInfoPanelClose();
    }

    _setupInfoPanelClose() {
        this.infoPanelClose.addEventListener('click', () => {
            console.log('Closing info panel');
            this.hidePanel();
        });
    }

    showPanel(position) {
        if (!this.infoPanel) return;
        
        this.infoPanel.style.display = 'block';
        this.infoPanel.offsetHeight;
        this.infoPanel.classList.add('show');
        console.log('Showing info panel:', position);
    }

    hidePanel() {
        if (!this.infoPanel) return;
        
        this.infoPanel.classList.remove('show');
        
        setTimeout(() => {
            if (!this.infoPanel.classList.contains('show')) {
                this.infoPanel.style.display = 'none';
            }
        }, 300); 
        
        console.log('Hiding info panel');
    }

    setPosition(position) {
        if (!this.infoPanel) return;
        
        if (position === 'right') {
            this.infoPanel.classList.remove('left');
            this.infoPanel.classList.add('right');
        } else {
            this.infoPanel.classList.remove('right');
            this.infoPanel.classList.add('left');
        }
    }
} 