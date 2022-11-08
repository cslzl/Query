// 效果 - 滑动
// 标记滑动状态, 用以 toggle, down表示滑动到底, up表示收缩到顶
Query.slide = {
    down: false,
    up: false,
}


function slideDownElement(ele, duration=400) {
    if (window.getComputedStyle(ele).display !== 'none') {
        return
    }
    // 开始 slideDown 就表示不在顶了
    Query.slide.up = false
    //
    if (duration === 'fast') {
        duration = 200
    } else if (duration === 'slow') {
        duration = 600
    }
    // 为了拿到具体的值而不是 'auto', 因为如果 height 是 'auto', 内容区就不会有渐变效果
    ele.style.display = 'block'
    let marginTop = window.getComputedStyle(ele).marginTop
    let marginBottom = window.getComputedStyle(ele).marginBottom
    let borderTopWidth = window.getComputedStyle(ele).borderTopWidth
    let borderBottomWidth = window.getComputedStyle(ele).borderBottomWidth
    let paddingTop = window.getComputedStyle(ele).paddingTop
    let paddingBottom = window.getComputedStyle(ele).paddingBottom
    let height = window.getComputedStyle(ele).height
    ele.style.display = 'none'
    //
    setTimeout(() => {
        ele.style.marginTop
        = ele.style.marginBottom
        = ele.style.borderTopWidth
        = ele.style.borderBottomWidth
        = ele.style.paddingTop
        = ele.style.paddingBottom
        = ele.style.height
        = 0
        ele.style.transition = `${duration}ms`
        ele.style.display = 'block'
        ele.style.overflow = 'hidden'
    }, 0)
    //
    setTimeout(() => {
        ele.style.marginTop = marginTop
        ele.style.marginBottom = marginBottom
        ele.style.borderTopWidth = borderTopWidth
        ele.style.borderBottomWidth = borderBottomWidth
        ele.style.paddingTop = paddingTop
        ele.style.paddingBottom = paddingBottom
        ele.style.height = height
    }, 100)
    setTimeout(() => {
        Query.slide.down = true
    }, 100+duration)
}


function slideUpElement(ele, duration=400) {
    if (window.getComputedStyle(ele).display === 'none') {
        return
    }
    // 开始 slideUp 就表示不在底了
    Query.slide.down = false
    //
    if (duration === 'fast') {
        duration = 200
    } else if (duration === 'slow') {
        duration = 600
    }
    // 保存原始尺寸, 在最后 display 设为 'none' 之后设置, 否则 slideToggle 就无法使用了
    let marginTop = window.getComputedStyle(ele).marginTop
    let marginBottom = window.getComputedStyle(ele).marginBottom
    let borderTopWidth = window.getComputedStyle(ele).borderTopWidth
    let borderBottomWidth = window.getComputedStyle(ele).borderBottomWidth
    let paddingTop = window.getComputedStyle(ele).paddingTop
    let paddingBottom = window.getComputedStyle(ele).paddingBottom
    let height = window.getComputedStyle(ele).height
    // 将 getComputedStyle 的值赋给 style, 使得 transition 生效 (否则因为 height 拿不到原始值, 会有跳跃效果)
    setTimeout(() => {
        ele.style.marginTop = marginTop
        ele.style.marginBottom = marginBottom
        ele.style.borderTopWidth = borderTopWidth
        ele.style.borderBottomWidth = borderBottomWidth
        ele.style.paddingTop = paddingTop
        ele.style.paddingBottom = paddingBottom
        ele.style.height = height
        ele.style.transition = `${duration}ms`
        ele.style.display = 'block'
        ele.style.overflow = 'hidden'
    }, 0)
    // transition
    setTimeout(() => {
        ele.style.marginTop
        = ele.style.marginBottom
        = ele.style.borderTopWidth
        = ele.style.borderBottomWidth
        = ele.style.paddingTop
        = ele.style.paddingBottom
        = ele.style.height
        = 0
    }, 100)
    // 重新修改 style 的值, 以便后续 toggle
    setTimeout(() => {
        ele.style.display = 'none'
        ele.style.marginTop = marginTop
        ele.style.marginBottom = marginBottom
        ele.style.borderTopWidth = borderTopWidth
        ele.style.borderBottomWidth = borderBottomWidth
        ele.style.paddingTop = paddingTop
        ele.style.paddingBottom = paddingBottom
        ele.style.height = height
        //
        Query.slide.up = true
    }, duration)
}


function slideToggleElement(ele, duration=400) {
    if (window.getComputedStyle(ele).display === 'none') {
        slideDownElement(ele, duration)
    } else {
        slideUpElement(ele, duration)
    }
}


function slideDown(duration) {
    for (let ele of this.elements) {
        slideDownElement(ele, duration)
    }
}


function slideUp(duration) {
    for (let ele of this.elements) {
        slideUpElement(ele, duration)
    }
}


function slideToggle(duration) {
    for (let ele of this.elements) {
        slideToggleElement(ele, duration)
    }
}


Query.prototype.slideDown = slideDown
Query.prototype.slideUp = slideUp
Query.prototype.slideToggle = slideToggle