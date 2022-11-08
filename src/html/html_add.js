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