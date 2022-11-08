function animateElement(ele, properties, duration=400, callback) {
    if (duration === 'fast') {
        duration = 200
    } else if (duration === 'slow') {
        duration = 600
    }
    //
    let transitions = []
    for (let property in properties) {
        // 显式设置变化前的样式并设置动画时间
        ele.style[property] = window.getComputedStyle(ele)[property]
        transitions.push(`${property} ${duration}ms`)
    }
    ele.style.transition = transitions.join(', ')
    // 设置变化后的样式
    for (let [property, value] of Object.entries(properties)) {
        ele.style[property] = value
    }
    setTimeout(() => {
        callback && callback()
    }, duration)
}


function animate(properties, duration, callback) {
    for (let ele of this.elements) {
        animateElement(ele, properties, duration, callback)
    }
}


Query.prototype.animate = animate