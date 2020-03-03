// 功能调用第3次，执行函数
function after(times, fn) {
    return function() {
        if (--times == 0) {
            fn();
        };
    }
}

let fn = after(3, () => {
    console.log(1111);
})

fn();
fn();
fn();
