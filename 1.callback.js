// 功能：执行函数之前插入函数执行
/**
 * 实现 run可以传入参数 
 */
function run(name) {
    console.log(name + "执行函数");
}

Function.prototype.before = function(fn) {
    return (...args) => {
        fn();
        this(...args);
    }
}

let newFn = run.before(() => { // 插入的函数
    console.log("我先开始了");
})

newFn("lall");