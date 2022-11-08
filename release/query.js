class Query {
    constructor(selector) {
        if (selector instanceof HTMLDocument) {
            // 文档就绪事件
            this.target = 'ready'
        } else if (typeof(selector) === 'function') {
            // 简写的文档就绪事件
            this.target = 'ready'
            this.ready(selector)
        } else if (Array.isArray(selector)) {
            // 链式调用, 用法是在各个方法的实现中使用 new Query([e1, e2...])
            this.elements = selector
        } else {
            // 选择元素
            try {
                this.elements = document.querySelectorAll(selector)
            } catch(error) {
                // 暂且认为此时是在调用 $(this)
                this.elements = [selector]
            }
        }
    }
}

function $(selector) {
    return new Query(selector)
}




/**
 * 工具函数
 */
function hyphen2camel(hyphen) {
    let array = hyphen.split('-')
    let camel = array[0]
    for (let i = 1; i < array.length; i++) {
        camel += array[i][0].toUpperCase() + array[i].slice(1)
    }
    return camel
}




/**
 * 文档就绪事件
 */
function ready(code) {
    if (this.target === 'ready') {
        document.addEventListener('DOMContentLoaded', () => {
            eval(code)()
        })
    }
}

Query.prototype.ready = ready




/**
 * 事件
 */
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




/**
 * 效果
 */
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




/**
 * HTML
 */
function append(...contents) {
    for (let ele of this.elements) {
        for (let content of contents) {
            ele.insertAdjacentHTML('beforeend', content)
        }
    }
}

function prepend(...contents) {
    for (let ele of this.elements) {
        for (let content of contents) {
            ele.insertAdjacentHTML('afterbegin', content)
        }
    }
}

function after(...contents) {
    for (let ele of this.elements) {
        for (let content of contents) {
            ele.insertAdjacentHTML('afterend', content)
        }
    }
}

function before(...contents) {
    for (let ele of this.elements) {
        for (let content of contents) {
            ele.insertAdjacentHTML('beforebegin', content)
        }
    }
}

Query.prototype.append = append
Query.prototype.prepend = prepend
Query.prototype.after = after
Query.prototype.before = before


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


function css(propertyName, value) {
    if (typeof(propertyName) === 'object') {
        // 设置多个 css 属性
        for (let [property, value] of Object.entries(propertyName)) {
            property = hyphen2camel(property)
            for (let ele of this.elements) {
                ele.style[property] = value
            }
        }
    } else {
        let property = hyphen2camel(propertyName)
        if (value) {
            // 设置单个 css 属性
            for (let ele of this.elements) {
                ele.style[property] = value
            }
        } else {
            // 返回 css 属性
            return this.elements[0].style[property]
        }
    }
}

Query.prototype.css = css


function text(value) {
    if (value) {
        this.elements[0].innerText = value
    } else {
        return this.elements[0].innerText
    }
}

function html(value) {
    if (value) {
        this.elements[0].innerHTML = value
    } else {
        return this.elements[0].innerHTML
    }
}

function val(value) {
    if (value) {
        this.elements[0].value = value
    } else {
        return this.elements[0].value
    }
}

function attr(name, value) {
    if (typeof(name) === 'string' && (!value)) {
        return this.elements[0].getAttribute(name)
    } else if (typeof(name) === 'string' && typeof(value) === 'string') {
        this.elements[0].setAttribute(name, value)
    } else if (typeof(name) === 'object' && (!value)) {
        for (let [key, value] of name) {
            this.elements[0].setAttribute(key, value)
        }
    }
}

Query.prototype.text = text
Query.prototype.html = html
Query.prototype.val = val
Query.prototype.attr = attr


function remove() {
    for (let ele of this.elements) {
        ele.remove()
    }
}

function empty() {
    for (let ele of this.elements) {
        ele.innerHTML = ''
    }
}

Query.prototype.remove = remove
Query.prototype.empty = empty


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




/**
 * 遍历
 */
function children(selector) {
    let c = []
    for (let ele of this.elements) {
        let validNodes = selector && ele.querySelectorAll(selector)
        let validArray = validNodes ? [...validNodes] : []
        for (let child of ele.children) {
            if (!selector) {
                c.push(child)
            } else if (validArray.includes(child)) {
                c.push(child)
            }
        }
    }
    return new Query(c)
}

function find(selector) {
    let c = []
    for (let ele of this.elements) {
        let nodes = ele.querySelectorAll(selector)
        c.push(...nodes)
    }
    return new Query(c)
}

Query.prototype.children = children
Query.prototype.find = find


function first() {
    return new Query([this.elements[0]])
}

function last() {
    let len = this.elements.length
    return new Query([this.elements[len-1]])
}

function eq(index) {
    return new Query([this.elements[index]])
}

function filter(selector) {
    let validArray = [...document.querySelectorAll(selector)]
    let arr = []
    for (let ele of this.elements) {
        if (validArray.includes(ele)) {
            arr.push(ele)
        }
    }
    return new Query(arr)
}

function not(selector) {
    let validArray = [...document.querySelectorAll(selector)]
    let arr = []
    for (let ele of this.elements) {
        if (!validArray.includes(ele)) {
            arr.push(ele)
        }
    }
    return new Query(arr)
}

Query.prototype.first = first
Query.prototype.last = last
Query.prototype.eq = eq
Query.prototype.filter = filter
Query.prototype.not = not


function parent() {
    let p = []
    for (let ele of this.elements) {
        p.push(ele.parentElement)
    }
    return new Query(p)
}

function parents() {
    let p = []
    for (let ele of this.elements) {
        while (ele.parentElement) {
            p.push(ele.parentElement)
            ele = ele.parentElement
        }
    }
    return new Query(p)
}

function parentsUntil(selector) {
    let p = []
    for (let ele of this.elements) {
        let until = ele.closest(selector)
        while (ele.parentElement) {
            if (ele.parentElement === until) {
                break
            }
            p.push(ele.parentElement)
            ele = ele.parentElement
        }
    }
    return new Query(p)
}

function closest(selector) {
    let arr = []
    for (let ele of this.elements) {
        arr.push(ele.closest(selector))
    }
    return new Query(arr)
}

Query.prototype.parent = parent
Query.prototype.parents = parents
Query.prototype.parentsUntil = parentsUntil
Query.prototype.closest = closest


function siblings(selector) {
    let siblings = []
    for (let ele of this.elements) {
        let validNodes = selector && ele.parentElement.querySelectorAll(selector)
        let validArray = validNodes ? [...validNodes] : []
        let current = ele.parentElement.firstElementChild
        while (current) {
            if (current !== ele) {
                if (!selector) {
                    siblings.push(current)
                } else if (validArray.includes(current)) {
                    siblings.push(current)
                }
            }
            current = current.nextElementSibling
        }
    }
    return new Query(siblings)
}

function next() {
    let arr = []
    for (let ele of this.elements) {
        arr.push(ele.nextElementSibling)        
    }
    return new Query(arr)
}

function nextAll() {
    let arr = []
    for (let ele of this.elements) {
        let n = ele.nextElementSibling
        while (n) {
            arr.push(n)
            n = n.nextElementSibling
        }
    }
    return new Query(arr)
}

function nextUntil(selector) {
    let arr = []
    for (let ele of this.elements) {
        let end = ele.parentElement.querySelector(selector)
        let n = ele.nextElementSibling
        while (n) {
            if (n === end) {
                break
            }
            arr.push(n)
            n = n.nextElementSibling
        }
    }
    return new Query(arr)
}

function prev() {
    let arr = []
    for (let ele of this.elements) {
        arr.push(ele.previousElementSibling)        
    }
    return new Query(arr)
}

function prevAll() {
    let arr = []
    for (let ele of this.elements) {
        let n = ele.previousElementSibling
        while (n) {
            arr.push(n)
            n = n.previousElementSibling
        }
    }
    return new Query(arr)
}

function prevUntil(selector) {
    let arr = []
    for (let ele of this.elements) {
        let start = ele.parentElement.querySelector(selector)
        let n = ele.previousElementSibling
        while (n) {
            if (n === start) {
                break
            }
            arr.push(n)
            n = n.previousElementSibling
        }
    }
    return new Query(arr)
}

Query.prototype.siblings = siblings
Query.prototype.next = next
Query.prototype.nextAll = nextAll
Query.prototype.nextUntil = nextUntil
Query.prototype.prev = prev
Query.prototype.prevAll = prevAll
Query.prototype.prevUntil = prevUntil




/**
 * AJAX
 */
// 原生 ajax 请求, 支持设置的属性有:
// 请求方法type, 路径url, 是否异步async, 发送数据的格式contentType,
// 请求成功的回调函数success, 要发送的数据data
function ajax(request) {
    let r = new XMLHttpRequest()
    request.type = request.type || 'get'
    request.async = request.async || true
    r.open(request.type, request.url, request.async)
    r.setRequestHeader('Content-Type', request.contentType)
    r.onload = () => {
        request.success(r.response)
    }
    r.send(request.data)
}

$.ajax = ajax
