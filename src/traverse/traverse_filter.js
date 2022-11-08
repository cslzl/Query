
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