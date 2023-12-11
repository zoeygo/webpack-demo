es5中有5种基本类型，分别是：字符串，数字，布尔，null，undefined。es6中引入新的基本类型symbol，表示独一无二的值。常用于模拟创建对象的私有属性。
用 Symbol 作为对象的属性无法在 Object.keys 和Object.getOwnPropertyNames 方法返回，es6提供一个Object.getOwnPropertySymbols 方法来返回对象所有的 Symbol 属性。

循环：for...of, forEach, every, some
es6引入for...of以代替for...in和forEach()，并支持新的迭代协议
some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。