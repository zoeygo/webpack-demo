// 手写new操作符
function myNew(Func, ...args) {
  // 1.创建一个新对象
  const obj = {}
  // 2.新对象原型指向构造函数原型对象
  obj.__proto__ = Func.prototype
  // 3.将构建函数的this指向新对象
  let result = Func.apply(obj, args)
  // 4.根据返回值判断
  return result instanceof Object ? result : obj
}

// 测试
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.say = function () {
  console.log(this.name)
}

let p = myNew(Person, 'huihui', 123)
console.log(p) // Person {name: "huihui", age: 123}
p.say() // huihui

// 实际使用中
const myFoo = new Person("Bar 1", 2021);
