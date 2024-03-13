// 实现call
Function.prototype.call = function(context, ...args) {
    context = context || window;
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;
    const result = context[fnSymbol](...args);
    delete context[fnSymbol];
    return result;
};

// 实现apply
Function.prototype.apply = function(context, argsArray) {
    context = context || window;
    const fnSymbol = Symbol('fn');
    context[fnSymbol] = this;
    const result = context[fnSymbol](...argsArray);
    delete context[fnSymbol];
    return result;
};

// 实现bind
Function.prototype.bind = function(context, ...args) {
    const fn = this;
    return function(...innerArgs) {
        return fn.call(context, ...args.concat(innerArgs));
    };
};

// 示例
const obj = {
    name: 'John'
};

function greet(message) {
    console.log(`${message}, ${this.name}!`);
}

greet.call(obj, 'Hello'); // 输出: Hello, John!
greet.apply(obj, ['Hello']); // 输出: Hello, John!
const greetBound = greet.bind(obj, 'Hello');
greetBound(); // 输出: Hello, John!
