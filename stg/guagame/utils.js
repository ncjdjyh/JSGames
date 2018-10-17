var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    var o = a
    if (b.y > o.y && b.y < o.y + o.h) {
        if (b.x > o.x && b.x < o.x + o.w) {
            return true
        }
    }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start)
    return Math.floor(n + start)
}

//传入想要动态调整的属性
var bindDebugSlider = function(name, min, max) {
    var createNode = nodeName => document.createElement(nodeName)
    var debugDiv = document.getElementById('debug')
    var div = createNode('div')
    var label = createNode('label')
    var input = createNode('input')
    input.setAttribute('type', 'range')
    input.setAttribute('class', 'gua-auto-slider')
    input.setAttribute('value', '')
    input.setAttribute('max', max)
    input.setAttribute('min', min)
    input.setAttribute('data-value', `config.${name}`)
    label.innerText = name
    var span = createNode('span')
    span.setAttribute('class', 'gua-label')
    label.appendChild(input)
    label.appendChild(span)
    div.appendChild(label)
    debugDiv.appendChild(div)
}
