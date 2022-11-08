// 文档就绪事件
function ready(code) {
    if (this.target === 'ready') {
        document.addEventListener('DOMContentLoaded', () => {
            eval(code)()
        })
    }
}


Query.prototype.ready = ready