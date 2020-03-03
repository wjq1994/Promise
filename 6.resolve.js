let Promise = require("./zf/1.promise/2.promise/promise");

Promise.resolve = function (cb) {
    if (isPromise(cb)) {
        return cb.then(data => data)
    } else {
        return new Promise((resolve, reject) => {
            resolve(cb)
        });
    }
}

const isPromise = (value) => {
    if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
        if (typeof value.then === 'function') {
            return true;
        }
    } else {
        return false;
    }
}

let cb = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(1);
        }, 4000);
    })
}

Promise.resolve(1).then(data => {
    console.log(data);
});