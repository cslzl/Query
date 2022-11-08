function hasClass(className) {
    let result = false
    for (let ele of this.elements) {
        if (ele.classList.contains(className)) {
            result = true
        }
    }
    return result
}


function addClass(className) {
    className = className.split(' ')
    for (let ele of this.elements) {
        ele.classList.add(...className)
    }
}


function removeClass(className) {
    for (let ele of this.elements) {
        ele.classList.remove(className)
    }
}


function toggleClass(className) {
    for (let ele of this.elements) {
        if (ele.classList.contains(className)) {
            ele.classList.remove(className)
        } else {
            ele.classList.add(className)
        }
    }
}


Query.prototype.hasClass = hasClass
Query.prototype.addClass = addClass
Query.prototype.removeClass = removeClass
Query.prototype.toggleClass = toggleClass