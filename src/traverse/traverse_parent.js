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