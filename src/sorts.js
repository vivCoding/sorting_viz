async function bubbleSort() {
    while (true) {
        let sorted = true
        for (let i = 0; i < numberOfElements - 1; i++) {
            if (!running) { stopRunning(); return; }
            if (array[i] > array[i + 1]) {
                sorted = false
                swap(i, i + 1)
            }
            drawArray()
            drawSelected(i)
            await runDelay()
        }
        if (sorted) break
    }
    stopRunning()
}

async function insertionSort() {
    for (let i = 1; i < numberOfElements; i++) {
        for (let j = i; j > 0; j--) {
            if (!running) { stopRunning(); return; }
            drawArray()
            drawSelected(j)
            if (array[j] < array[j - 1]) {
                swap(j, j - 1)
            } else break
            await runDelay()
        }
    }
    stopRunning()
}

async function selectionSort() {
    for (let i = 0; i < numberOfElements - 1; i++) {
        let min = i;
        for (let j = i + 1; j < numberOfElements; j++) {
            if (!running) { stopRunning(); return; }
            drawSelected(j)
            if (array[j] < array[min]) {
                min = j
            }
            await runDelay()
        }
        swap(i, min)
        drawArray()
    }
    stopRunning()
}

async function bogoSort() {
    while (true) {
        for (let i = 0; i < numberOfElements; i++) {
            if (!running) { stopRunning(); return; }
            let r = Math.floor(Math.random() * array.length) 
            let r2 = Math.floor(Math.random() * array.length) 
            swap(r, r2)
            drawArray()
            drawSelected(r)
            await runDelay()
        }
        let sorted = true
        for (let i = 0; i < numberOfElements - 1; i++) {
            if (!running) { stopRunning(); return; }
            if (array[i] > array[i + 1]) {
                sorted = false
                break
            }
        }
        if (sorted) break
    }
    stopRunning()
}