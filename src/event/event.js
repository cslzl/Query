// 事件
let events = [
    // 鼠标事件
    'click', 'dblclick', 'mouseenter', 'mouseleave', 'mousedown', 'mouseup',
    // 键盘事件
    'keypress', 'keydown', 'keyup',
    // 表单事件 (jQuery 原本没有 input, 但原生 DOM 有)
    'submit', 'change', 'input', 'focus', 'blur',
]
for (let event of events) {
    eval(`
        function ${event}(callback) {
            for (let ele of this.elements) {
                ele.addEventListener('${event}', callback)
            }
        }
    `)
}


function hover(callback1, callback2) {
    for (let ele of this.elements) {
        ele.addEventListener('mouseenter', callback1)
        ele.addEventListener('mouseleave', callback2)
    }
}


function on(eventName, callback) {
    for (let ele of this.elements) {
        ele.addEventListener(eventName, callback)
    }
}


// 鼠标事件
Query.prototype.click = click
Query.prototype.dblclick = dblclick
Query.prototype.mouseenter = mouseenter
Query.prototype.mouseleave = mouseleave
Query.prototype.mousedown = mousedown
Query.prototype.mouseup = mouseup
Query.prototype.hover = hover
// 键盘事件
Query.prototype.keypress = keypress
Query.prototype.keydown = keydown
Query.prototype.keyup = keyup
// 表单事件
Query.prototype.submit = submit
Query.prototype.change = change
Query.prototype.input = input
Query.prototype.focus = focus
Query.prototype.blur = blur
// on
Query.prototype.on = on