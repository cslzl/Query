function css(propertyName, value) {
    if (typeof(propertyName) === 'object') {
        // 设置多个 css 属性
        for (let [property, value] of Object.entries(propertyName)) {
            property = hyphen2camel(property)
            for (let ele of this.elements) {
                ele.style[property] = value
            }
        }
    } else {
        let property = hyphen2camel(propertyName)
        if (value) {
            // 设置单个 css 属性
            for (let ele of this.elements) {
                ele.style[property] = value
            }
        } else {
            // 返回 css 属性
            return this.elements[0].style[property]
        }
    }
}


Query.prototype.css = css