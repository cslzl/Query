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