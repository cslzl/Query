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