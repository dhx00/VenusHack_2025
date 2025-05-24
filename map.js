  // 初始化地图
  const map = L.map('map').setView([30, -90], 3);  // 中心偏向北美洲，全景显示

  // 加载底图
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
//   const marker = L.marker([37.7749, -122.4194]).addTo(map); // San Francisco
//   marker.bindPopup("示例事件：1905年女性选举集会");
  // 加载 JSON 数据

  const slider = document.getElementById("year-slider");
  let markers = [];
  function load_all(){
    fetch("events.json")
    .then(res => res.json())
    .then(data => {
        clear_marker();
        console.log("Loaded:", data);  // ✅ 看是否读取成功
        data.forEach(event => {
        console.log("LAT/LNG:", event.lat, event.lng);  // 🔍 检查坐标值
        if (event.lat && event.lng) {
            const marker = L.marker([parseFloat(event.lat), parseFloat(event.lng)]).addTo(map);
            marker.bindPopup(`<strong>${event.time}</strong><br>${event.summary}`);
            markers.push(marker);
        }
        });
    })

    .catch(err => console.error("JSON load error:", err));
  }
  function updateMap(){
    fetch("events.json")
    .then(res => res.json())
    .then(data => {
        clear_marker();
        console.log("Loaded:", data);  // ✅ 看是否读取成功
        data.forEach(event => {
        console.log("LAT/LNG:", event.lat, event.lng);  // 🔍 检查坐标值
        const event_year = parseInt(event.time);
        const slider_year = parseInt(document.getElementById("year-slider").value);
        if (event.lat && event.lng) {
            if(event_year<=slider_year&& event_year>= slider_year-10){
            const marker = L.marker([parseFloat(event.lat), parseFloat(event.lng)]).addTo(map);
            marker.bindPopup(`<strong>${event.time}</strong><br>${event.summary}`);
            markers.push(marker);
            }
        }
        });
    })

  }
  function clear_marker(){
    markers.forEach(marker=> map.removeLayer(marker));
    markers = [];
  }



load_all();
const button = document.getElementById("reset-to-all")
slider.addEventListener('input',function(){
    updateMap();
  })
button.addEventListener('click',function(){
    load_all();
  }
  )
  