let arr = [4, 2, 3, 1, 0]

function swap(i, j) {
    let t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
}

function recursiveQuickSort(left, right, pivot) {
    if (right - left <= 1) return
    let c = left
    for (let i = left; i < right; i++) {
        if (arr[i] < pivot) {
            swap(c, i)
            c++
        }
    }
    let m = Math.floor((right - left) / 2) + left
    recursiveQuickSort(left, m, Math.floor((m - left) / 2) + left)
    recursiveQuickSort(m, right, Math.floor((right - m) / 2) + m)
}

recursiveQuickSort(0, arr.length, Math.floor(arr.length / 2))
console.log(arr)