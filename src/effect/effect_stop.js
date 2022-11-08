function stopElement(ele) {
    let cssText = window.getComputedStyle(ele).cssText.split('; ')
    ele.style.transition = 'none'
    // 停在当前状态, 否则将会直接跳到 transition 后的最终状态
    for (let item of cssText) {
        let [property, value] = item.split(': ')
        property = hyphen2camel(property)
        ele.style[property] = value
    }
}


function stop() {
    for (let ele of this.elements) {
        stopElement(ele)
    }
}


Query.prototype.stop = stop