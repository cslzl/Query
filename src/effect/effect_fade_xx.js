// 效果 - 淡入淡出
// 需要 effect_hide_show.js
function fadeInElement(ele, duration=400) {
    if (duration === 'fast') {
        duration = 200
    } else if (duration === 'slow') {
        duration = 600
    }
    ele.style.opacity = 0
    ele.style.transition = `opacity ${duration}ms`
    showElement(ele)
    setTimeout(() => {
        ele.style.opacity = 1
    }, 0)
}


function fadeOutElement(ele, duration=400) {
    if (duration === 'fast') {
        duration = 200
    } else if (duration === 'slow') {
        duration = 600
    }
    ele.style.transition = `opacity ${duration}ms`
    ele.style.opacity = 0
    setTimeout(() => {
        hideElement(ele)
    }, duration)
}


function fadeIn(duration) {
    for (let ele of this.elements) {
        fadeInElement(ele, duration)
    }
}


function fadeOut(duration) {
    for (let ele of this.elements) {
        fadeOutElement(ele, duration)
    }
}


function fadeToggle(duration) {
    for (let ele of this.elements) {
        let display = window.getComputedStyle(ele).display
        if (display === 'none') {
            fadeInElement(ele, duration)
        } else {
            fadeOutElement(ele, duration)
        }
    }
}


function fadeTo(duration, opacity) {
    for (let ele of this.elements) {
        if (duration === 'fast') {
            duration = 200
        } else if (duration === 'slow') {
            duration = 600
        }
        ele.style.transition = `opacity ${duration}ms`
        ele.style.opacity = opacity
    }
}


Query.prototype.fadeIn = fadeIn
Query.prototype.fadeOut = fadeOut
Query.prototype.fadeToggle = fadeToggle
Query.prototype.fadeTo = fadeTo