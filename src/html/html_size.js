function width() {
    // parseInt 会自动截去末尾的非数值字符('px')
    return parseInt(window.getComputedStyle(this.elements[0]).width)
}


function height() {
    return parseInt(window.getComputedStyle(this.elements[0]).height)
}


function innerWidth() {
    let paddingLeft = parseInt(window.getComputedStyle(this.elements[0]).paddingLeft)
    let paddingRight = parseInt(window.getComputedStyle(this.elements[0]).paddingLeft)
    return this.width() + paddingLeft + paddingRight
}


function innerHeight() {
    let paddingTop = parseInt(window.getComputedStyle(this.elements[0]).paddingTop)
    let paddingBottom = parseInt(window.getComputedStyle(this.elements[0]).paddingBottom)
    return this.height() + paddingTop + paddingBottom
}


function outerWidth(includeMargin) {
    let margin = 0
    if (includeMargin) {
        let marginLeft = parseInt(window.getComputedStyle(this.elements[0]).marginLeft)
        let marginRight = parseInt(window.getComputedStyle(this.elements[0]).marginRight)
        margin = marginLeft + marginRight
    }
    let borderLeft = parseInt(window.getComputedStyle(this.elements[0]).borderLeftWidth)
    let borderRight = parseInt(window.getComputedStyle(this.elements[0]).borderRightWidth)
    return this.innerWidth() + borderLeft + borderRight + margin
}


function outerHeight(includeMargin) {
    let margin = 0
    if (includeMargin) {
        let marginTop = parseInt(window.getComputedStyle(this.elements[0]).marginTop)
        let marginBottom = parseInt(window.getComputedStyle(this.elements[0]).marginBottom)
        margin = marginTop + marginBottom
    }
    let borderTop = parseInt(window.getComputedStyle(this.elements[0]).borderTopWidth)
    let borderBottom = parseInt(window.getComputedStyle(this.elements[0]).borderBottomWidth)
    return this.innerHeight() + borderTop + borderBottom + margin
}


Query.prototype.width = width
Query.prototype.height = height
Query.prototype.innerWidth = innerWidth
Query.prototype.innerHeight = innerHeight
Query.prototype.outerWidth = outerWidth
Query.prototype.outerHeight = outerHeight