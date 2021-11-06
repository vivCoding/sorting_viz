var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var width = canvas.width, height = canvas.height
var backgroundColor = "rgb(49, 49, 49)"

function clearCanvas() {
    ctx.beginPath()
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)
    ctx.closePath()
}
clearCanvas()


var sortingAlgoInput = document.getElementById("sortingAlgoInput")
var delayInput = document.getElementById("delayInput")
var numberOfElementsInput = document.getElementById("numberOfElementsInput")
var randomizeBtn = document.getElementById("randomizeBtn")
var startBtn = document.getElementById("startBtn")

var array = []
let lastArray = array  // for smarter rerendering
var delay = parseFloat(delayInput.value)
var numberOfElements = parseInt(numberOfElementsInput.value)
var barColor = "white"
var running = false

//#region array/core stuff

function randomizeArray() {
    array = []
    for (let i = 0; i < numberOfElements; i++) {
        array.push(i)
        swap(i, Math.floor(Math.random() * array.length))
    }
    drawArray()
}

function swap(i, j) {
    let t = array[i]
    array[i] = array[j]
    array[j] = t
}

function drawBar(index, value, color=barColor) {
    ctx.beginPath()
    ctx.fillStyle = backgroundColor
    ctx.fillRect(width / numberOfElements * index, height, width / numberOfElements, -height)
    ctx.fillStyle = color
    ctx.fillRect(width / numberOfElements * index, height, width / numberOfElements, height / numberOfElements * (value + 1) * -1)
    ctx.closePath()
}

var lastSelected = -1
function drawSelected(index) {
    drawBar(lastSelected, array[lastSelected])
    drawBar(index, array[index], color="red")
    lastSelected = index
}

function resetArray() {
    clearCanvas()
    lastArray = []
}

function drawArray() {
    for (let i = 0; i < numberOfElements; i++) {
        if (lastArray[i] != array[i]) {
            drawBar(i, array[i])
            lastArray[i] = array[i]
        }
    }
    drawBar(lastSelected, array[lastSelected])
}

async function sleep() {
    return new Promise(resolve => {
        setTimeout(() => resolve(2), delay)
    })
}

//#endregion

//#region html element stuf

numberOfElementsInput.onchange = e => {
    let n = parseInt(e.target.value)
    if (n != null && numberOfElements != n) {
        numberOfElements = n
        resetArray()
        randomizeArray()
    }
}

delayInput.onchange = e => {
    let d = parseFloat(e.target.value)
    if (d != null && delay != d) {
        delay = d
    }
}

randomizeBtn.onclick = () => randomizeArray()

startBtn.onclick = () => {
    running = !running
    if (running) {
        startBtn.textContent = "Stop"
        startBtn.style.backgroundColor = "darkred"
        switch(sortingAlgoInput.value) {
            case "bubble":
                bubbleSort()
                break
            case "insertion":
                insertionSort()
                break
            case "selection":
                selectionSort()
                break
            case "bogo":
                bogoSort()
                break
            case "merge":
                mergeSort()
                break
            case "heap":
                heapSort()
                break
            case "shell":
                shellSort()
            case "quick":
                quickSort()
                break
            default:
                console.log("bad sort")
                break
        }
    } else {
        stopRunning()
    }
}

function stopRunning() {
    console.log("stopping")
    startBtn.textContent= "Start"
    startBtn.style.backgroundColor = "darkgreen"
    running = false
}

//#endregion

randomizeArray()