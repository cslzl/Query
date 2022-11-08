// 效果 - 切换
// 需要 effect_hide_show.js
function toggle() {
    for (let ele of this.elements) {
        let display = window.getComputedStyle(ele).display
        if (display === 'none') {
            showElement(ele)
        } else {
            hideElement(ele)
        }
    }
}


Query.prototype.toggle = toggle