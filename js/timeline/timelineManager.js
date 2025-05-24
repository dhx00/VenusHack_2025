export class TimelineManager {
    constructor(markerManager) {
        this.markerManager = markerManager;
        this.slider = document.getElementById("year-slider");
        this.resetButton = document.getElementById("reset-to-all");
        this.allEvents = null;

        // 绑定事件监听器
        this.bindEventListeners();
    }

    bindEventListeners() {
        // 监听滑块变化
        this.slider.addEventListener('input', () => {
            this.updateMapByYear();
        });

        // 监听重置按钮
        this.resetButton.addEventListener('click', () => {
            this.showAllEvents();
        });
    }

    // 加载所有事件数据
    loadEvents() {
        fetch("events.json")
            .then(res => res.json())
            .then(data => {
                this.allEvents = data;
                this.showAllEvents();
            })
            .catch(err => console.error("JSON load error:", err));
    }

    // 显示所有事件
    showAllEvents() {
        if (this.allEvents) {
            this.markerManager.updateMarkers(this.allEvents);
        }
    }

    // 根据年份更新地图
    updateMapByYear() {
        if (!this.allEvents) return;

        const sliderYear = parseInt(this.slider.value);
        const filteredEvents = this.allEvents.filter(event => {
            const eventYear = parseInt(event.time);
            return eventYear <= sliderYear && eventYear >= sliderYear - 10;
        });

        this.markerManager.updateMarkers(filteredEvents);
    }
} 