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