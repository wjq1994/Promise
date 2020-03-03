// 被观察者需要绑定
// 被观察者里注册观察者，执行观察者的更新方法
class Subject {
    constructor() {
        this._arrs = [];
        this.state = "good";
    }
    attach(o) {
        this._arrs.push(o);
    }
    emit(newState) {
        this.state = newState;
        this._arrs.forEach(fn => {
            fn.update(state);
        }) 
    }
}

// 观察者
class Observe {
    constructor(name) {
        this.name = name;
    }
    update(state) {
        console.log(this.name + '    ' + state);
    }
}

let s = new Subject();
let o1 = new Observe("O1");
let o2 = new Observe("O2");

s.attach(o1);
s.attach(o2);

s.emit("bad");
s.emit("good");