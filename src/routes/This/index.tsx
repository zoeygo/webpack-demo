/**
 * 改变this指向
 * a.call(thisArg, ...args)
 * a.apply(thisArg, [...args])
 * 执行a，a的this更改为thisArg
 */

// call(this, ...args)
Function.prototype.call = function (...args) {
    // 参数检查
    if (typeof this !== "function") {
        throw new Error("must call with a function");
    }
    const realThis = args[0] || window;
    const realArgs = args.slice(1);
    const funcSymbol = Symbol('func');
    // 此处this是原方法，保存到传入的第一个参数上
    realThis[funcSymbol] = this;
    // 用传入的参数来调方法，方法里的this就是传入的参数
    const res = realThis[funcSymbol](...realArgs);
    // 删除掉临时存储的原方法
    delete realThis[funcSymbol];
    // 将执行的返回值返回
    return res;
}

// apply(this, [...args])
Function.prototype.apply = function (...args) {
    if (typeof this !== "function") {
        throw new Error('must call with a function');
    }
    const realThis = args[0] || window;
    // 直接取第二个参数，是一个数组
    const realArgs = args[1];
    const funcSymbol = Symbol('func');
    realThis[funcSymbol] = this;
    const res = realThis[funcSymbol](...realArgs);
    delete realThis[funcSymbol];
    return res;
}

// bind
Function.prototype.bind = function (...args) {
    if (typeof this !== "function") {
        throw new Error('must call with a function');
    }
    // 原方法
    const _func = this;
    // 绑定的this
    const realThis = args[0] || window;
    // 取出后面的参数作为新函数的默认参数
    const otherArgs = args.slice(1);
    // 返回一个方法
    return function (...args2) {
        // 拼接存储参数和新参数，然后用apply执行
        return _func.apply(realThis, [...otherArgs, ...args2]);
    }
}