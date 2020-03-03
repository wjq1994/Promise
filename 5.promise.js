/**
 * 功能：
 * 1. 三个状态 PENDING RESOLVED REJECTED
 * 2. new Promise((resolve, reject) => {
 *      resolve()
 * })
 * 3. then 
 * 1) 两个参数 onfulfilled, onrejected
 * 2）返回值是Promise
 * 3）如果一个promise的then方法中的函数(成功和失败) 返回的结果是一个promise的话，会自动将这个promise执行,并且采用它的状态，如果成功会将成功的结果向外层的下一个then传递
 * 4）如果返回的是一个普通值 那么会将这个普通值作为下一次的成功的结果
 * 5）终止promise 可以返回一个pending的promise
 * 6）只有两种情况会失败 返回一个失败的promise 、 或者就是抛出异常
 * 7）每次执行promise的时候 都会返还一个新的promise实例
 */

const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";

function resolvePromise(promise2, x, resolve, reject) {
    // 1. promise2和x 不能相等，造成死锁 没有resolve和reject
    // let p = new Promise((resolve, reject) => {
    //     resolve();
    // })
    // let promise2 = p.then(() => {
    //     return promise2
    // })
    // 判断 x 的值 和promise2 是不是同一个 如果是同一个 就不要在等待了 直接出错即可
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    // 2. 类型校验
    // 判断数据类型 typeof  constructor   instanceof   toString
    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        try {
            let then = x.then; // 没有then函数 就是非Promise
            if (typeof then === 'function') {
                then.call(x, y => {
                    resolvePromise(promise2, y, resolve, reject); // 采用promise的成功结果将值向下传递
                }, z => {
                    reject(z);
                });
            } else {
                resolve(x);
            }
        } catch (error) {
            resolve(error);
        }
    } else {
        // x 是一个普通值 
        resolve(x); // 直接让promise2成功即可 
    }

}

class Promise {
    constructor(excute) {
        this.state = PENDING;

        this.value = "";
        this.reason = "";

        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (success) => {
            if (this.state === PENDING) {
                this.state = RESOLVED;
                this.value = success;
                this.onResolvedCallbacks.forEach(item => {
                    item()
                })
            }
        }
        let reject = (reason) => {
            if (this.state === PENDING) {
                this.state = REJECTED;
                this.reason = reason;
                this.onRejectedCallbacks.forEach(item => {
                    item()
                })
            }
        }
        try {
            excute(resolve, reject);
        } catch (error) {
            reject(error);
        }

    }
    then(onfulfilled, onrejected) {
        // onfulfilled  onrejected 是可选参数
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val //默认往下一层传输

        onrejected = typeof onrejected === 'function' ? onrejected : err => {
            throw err
        }
        let promise2 = new Promise((resolve, reject) => {
            // 解决同步问题
            if (this.state === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                }, 0)
            }
            //解决异步
            if (this.state === PENDING) {
                // 如果是异步就先订阅好
                this.onResolvedCallbacks.push(() => { // 重写push方法的时候
                    // todo...
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);

                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onrejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                })
            }
        })
        return promise2;
    }
}