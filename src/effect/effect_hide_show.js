// 效果 - 隐藏/显示
function hideElement(ele) {
    let oldDisplay = window.getComputedStyle(ele).display
    if (oldDisplay !== 'none') {
        ele.dataset.oldDisplay = oldDisplay
    }
    ele.style.display = 'none'
}


function showElement(ele) {
    let oldDisplay = ele.dataset.oldDisplay
    if (oldDisplay) {
        ele.style.display = oldDisplay
    } else {
        // 最开始就是隐藏的, 所以得到浏览器的默认 display 值 (block 是常用但不完全的)
        let block = ['div', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        let tagName = ele.tagName.toLowerCase()
        if (block.includes(tagName)) {
            ele.style.display = 'block'
        } else {
            ele.style.display = 'inline'
        }
    }
}


function hide() {
    for (let ele of this.elements) {
        hideElement(ele)
    }
}


function show() {
    for (let ele of this.elements) {
        showElement(ele)
    }
}


Query.prototype.hide = hide
Query.prototype.show = show