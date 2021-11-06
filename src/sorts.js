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
            await sleep()
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
            await sleep()
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
            await sleep()
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
            await sleep()
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

async function mergeSort() {
    array = await recursiveMergeSort(array, 0)
    drawArray()
    stopRunning()
}

async function recursiveMergeSort(arr, vi) {
    if (arr.length <= 1) {
        return arr
    }
    let mid = Math.floor(arr.length / 2)
    let left = await recursiveMergeSort(arr.slice(0, mid), vi)
    let right = await recursiveMergeSort(arr.slice(mid, arr.length), vi + mid)

    let newArray = []
    while (left.length != 0 || right.length != 0) {
        if (!running) { stopRunning(); return arr; }
        if (right.length == 0 || ((left.length != 0 && left[0] < right[0]))) {
            newArray.push(left.shift())
        } else newArray.push(right.shift())
        array[vi + newArray.length - 1] = newArray[newArray.length - 1]
        drawArray()
        drawSelected(vi + newArray.length - 1)
        await sleep()
    }
    return newArray
}

async function heapSort() {
    let heap = []
    function swap(i, j) {
        let t = heap[i]
        heap[i] = heap[j]
        heap[j] = t
    }
    for (let i = 0; i < numberOfElements; i++) {
        if (!running) { stopRunning(); return; }
        heap.push(array[i])
        let index = i
        let parent = Math.floor((index - 1) / 2)
        await sleep()
        while (index != 0 && heap[parent] > heap[index]) {
            if (!running) { stopRunning(); return; }
            swap(index, parent)
            index = parent
            parent = Math.floor((index - 1) / 2)
            await sleep()
        }
        drawSelected(i)
    }
    for (let i = 0; i < numberOfElements; i++) {
        if (!running) { stopRunning(); return; }
        array[i] = heap[0]
        heap[0] = heap.pop()
        let index = 0
        await sleep()
        while (true) {
            if (!running) { stopRunning(); return; }
            let left = 2 * index + 1
            let right = 2 * index + 2
            let min = right < heap.length ? heap[left] < heap[right] ? left : right : left < heap.length ? left : -1
            await sleep()
            if (min != -1 && heap[min] < heap[index]) {
                swap(min, index)
                index = min
            } else break
        }
        drawArray()
        drawSelected(i)
    }
    stopRunning()
}

async function shellSort() {
    let gaps = [1, 4, 9, 23, 57, 138, 326, 749, 1695, 3785, 8359, 18298, 39744, 835387]
    let g
    for (let i = gaps.length - 1; i >= 0; i--) {
        if (array.length >= gaps[i]) {
            g = i
            break
        }
    }
    while (true) {
        let sorted = true
        let gap = gaps[g]
        for (let i = gap; i < numberOfElements; i++) {
            for (let j = i; j > 0; j -= gap) {
                if (!running) { stopRunning(); return; }
                drawArray()
                drawSelected(j)
                if (j - gap >= 0 && array[j] < array[j - gap]) {
                    sorted = false
                    swap(j, j - gap)
                } else break
                await sleep()
            }
        }
        g--
        if (sorted) break
    }
    stopRunning()
}

async function quickSort() {
    await recursiveQuickSort(0, numberOfElements, Math.floor(numberOfElements / 2))
    stopRunning()
}

async function recursiveQuickSort(left, right, pivot) {
    if (!running) { stopRunning(); return; }
    if (right - left <= 1) return
    let c = left
    for (let i = left; i < right; i++) {
        if (!running) { stopRunning(); return; }
        if (array[i] < pivot) {
            swap(c, i)
            c++
        }
        drawArray()
        drawSelected(i)
        await sleep()
    }
    let m = Math.floor((right - left) / 2) + left
    await recursiveQuickSort(left, m, Math.floor((m - left) / 2) + left)
    await recursiveQuickSort(m, right, Math.floor((right - m) / 2) + m)
}
