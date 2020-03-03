# 知识点

## 一、高阶函数

1、如果函数的参数是一个函数

```javascript
function (cb) {
    cb();
}
```

2、如果一个函数返回了一个函数 (返回函数就是高阶函数)
```javascript
function () {
    return () => {

    }
}
```

## 二、AOP面向切片编程

### 应用场景

重写一些原生方法

## 三、观察者模式(观察者和被观察者) 发布/订阅模式


## 四、promise
[promise链接](https://promisesaplus.com/)

promise就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。存在着实现库(如bluebird)，可以自己封装。

```javascript
/**
 * 功能：
 * 1. 三个状态 PENDING RESOLVED REJECTED
 * 2. new Promise((resolve, reject) => {
 *      resolve()
 *    })
 * 3. then 
 * 1) 两个参数 onfulfilled, onrejected
 * 2）返回值是Promise
 * 3）如果一个promise的then方法中的函数(成功和失败) 返回的结果是一个promise的话，会自动将这个promise执行,并且采用它的状态，如果成功会将成功的结果向外层的下一个then传递
 * 4）如果返回的是一个普通值 那么会将这个普通值作为下一次的成功的结果
 * 5）终止promise 可以返回一个pending的promise
 * 6）只有两种情况会失败 返回一个失败的promise 、 或者就是抛出异常
 * 7）每次执行promise的时候 都会返还一个新的promise实例
 */
```

## 五、generator + co

### 特点

1. 可以暂停，

2. \*   yield 产出

3. iterator 迭代器