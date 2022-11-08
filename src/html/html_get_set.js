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