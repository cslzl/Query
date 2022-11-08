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
