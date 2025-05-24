export const mapConfig = {
    center: [30, -90],
    zoom: 3,
    // 设置地图边界
    maxBounds: [
        [-90, -180], // 南西边界
        [90, 180]    // 北东边界
    ],
    minZoom: 2,
    maxZoom: 18,
    // 防止拖动到边界之外
    maxBoundsViscosity: 1.0,  // 完全限制在边界内
    bounceAtZoomLimits: true, // 到达缩放限制时反弹
    worldCopyJump: false      // 禁止世界地图复制
};

export const markerStyle = {
    icon: L.divIcon({
        className: 'custom-marker',
        html: '<div></div>',
        iconSize: [12, 12]
    })
};

export const popupConfig = {
    className: 'custom-popup',
    closeButton: false,
    offset: [0, -10]
}; 