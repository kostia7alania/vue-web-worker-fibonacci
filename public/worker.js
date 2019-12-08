'use strict'

let curFib = 0

// self.postMessage('HI FROM web-WORKER to VUE')
self.onmessage = onMessage
    // *************
function onMessage(e) {
    //console.log('Получил в воркере = ', e)
    getNextFib()
}

function getNextFib() {
    self.postMessage({ idx: curFib, fib: fib(curFib) })
    curFib++
    setTimeout(getNextFib, 0)
}

function fib(n) {
    if (n < 2) return n
    return fib(n - 1) + fib(n - 2)
}