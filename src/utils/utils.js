function hyphen2camel(hyphen) {
    let array = hyphen.split('-')
    let camel = array[0]
    for (let i = 1; i < array.length; i++) {
        camel += array[i][0].toUpperCase() + array[i].slice(1)
    }
    return camel
}