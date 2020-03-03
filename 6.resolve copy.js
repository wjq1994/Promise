// new Promise() 异步

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1111);
    }, 3000)
})

promise1 = promise.then((data) => {
    console.log(data)
});

promise2 = promise.then((data) => {
    console.log(data)
});


promise3 = promise.then((data) => {
    console.log(data)
});


promise4 = promise.then((data) => {
    console.log(data)
});