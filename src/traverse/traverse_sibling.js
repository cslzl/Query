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