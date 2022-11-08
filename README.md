# Query
A reinvented jQuery written in JavaScript.

## Usage
Import `release/query.js` and use it like jQuery.

## Docs
### Basic Syntax
```JavaScript
$(selector).action()
```

### Document Ready Event
```JavaScript
$(document).ready(function() {
})
// or
$(function() {
})
```

### Selector
- element selector
- id selector
- class selector
- select current element (this)

### Event
When binding an event, you can use the event method directly (such as click()), or you can use the on() method.

| mouse event | keyboard event | form event |
| ----------- | -------------- | ---------- |
| click       | keypress       | submit     |
| dblclick    | keydown        | change     |
| mouseenter  | keyup          | input      |
| mouseleave  |                | focus      |
| mousedown   |                | blur       |
| mouseup     |                |            |
| hover       |                |            |

### Effect
| hide / show | toggle   | fade in and out | slide         | animation | stop animation |
| ----------- | -------- | --------------- | ------------- | --------- | -------------- |
| hide()      | toggle() | fadeIn()        | slideDown()   | animate() | stop()         |
| show()      |          | fadeOut()       | slideUp()     |           |                |
|             |          | fadeToggle()    | slideToggle() |           |                |
|             |          | fadeTo()        |               |           |                |

### HTML
| content / attribute | add element | remove element | class operation | css            | size          |
| ------------------- | ----------- | -------------- | --------------- | -------------- | ------------- |
| text()              | append()    | remove()       | hasClass()      | css()          | width()       |
| html()              | prepend()   | empty()        | addClass()      |                | height()      |
| val()               | after()     |                | removeClass()   |                | innerWidth()  |
| attr()              | before()    |                | toggleClass()   |                | innerHeight() |
|                     |             |                |                 |                | outerWidth()  |
|                     |             |                |                 |                | outerHeight() |

### Traverse
| parent         | children   | sibling     | filter  |
| -------------- | ---------- | ----------- | ------- |
| parent()       | children() | siblings()  | first() |
| parents()      | find()     | next()      | last()  |
| parentsUntil() |            | nextAll()   | eq()    |
| closest()      |            | nextUntil() | filter()|
|                |            | prev()      | not()   |
|                |            | prevAll()   |         |
|                |            | prevUntil() |         |

### AJAX
The supported properties are:
- type
- url
- async
- contentType
- success
- data
