interface 关键字声明显式地描述此对象的内部数据的类型 --- 接口声明
例：
interface User {
    name: string;
    in: number;
}
const user:User = {
    name: 'aa',
    id: 0,
}

接口声明与类一起使用
interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);

js已有类型：boolean,bigint,null,number,string,symbol和undefined（bigint只要在数字末尾追加n即可，或者用BigInt()构造函数，chrome 67+开始支持bigint）
ts拓展出any,unknown,never,void

构建类型有两种语法：接口（interface）和类型(type)

联合类型 |,交叉类型 & 
例如一个函数处理array或者string：
function getLength(obj: string | string[]) {
    return obj.length;
}

泛型
泛型为类型提供变量。常见例子数组：没有泛型的数组可以包含任何内容，带有泛型的数据可以描述数组包含的值
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
 
// 这一行是一个简写，可以告诉 TypeScript 有一个常量，叫做`backpack`，并且不用担心它是从哪里来的。
declare const backpack: Backpack<string>;
 
// 对象是一个字符串，因为我们在上面声明了它作为 Backpack 的变量部分。
const object = backpack.get();
 
// 因为 backpack 变量是一个字符串，不能将数字传递给 add 函数。
backpack.add('23');

显式类型：a: string

泛型示例：
原本：传入number，返回number
function identity (value: Number) : Number {
  return value;
}
identity(1)
使用泛型：将函数变为可扩展或通用的
function identity <T>(value: T) : T {
  return value;
}
identity<Number>(1)

返回两种类型的对象：
1.使用元组，即为元组设置通用类型
function identity <T, U>(value: T, message: U) : [T, U] {
  return [value, message];
}
2.使用泛型接口
interface Identities<V, M> {
  value: V,
  message: M
}
function identity<T, U> (value: T, message: U): Identities<T, U> {
  let identities: Identities<T, U> = {
    value,
    message
  };
  return identities;
}
identity(68, "Semlinker");

泛型类：在类中使用泛型只需要在类名后面使用<T, ...>，泛型类可确保在整个类中一致地使用指定的数据类型
interface GenericInterface<U> {
  value: U
  getIdentity: () => U
}

class IdentityClass<T> implements GenericInterface<T> {
  value: T

  constructor(value: T) {
    this.value = value
  }

  getIdentity(): T {
    return this.value
  }
}

const myNumberClass = new IdentityClass<Number>(68);
myNumberClass.getIdentity(); // 68

何时使用泛型：1.当函数/接口/类将处理多种数据类型时；2.当函数/接口/类在多个地方使用该数据类型

泛型约束:1.确保属性存在；2.检查对象上的键是否存在。可以使用逗号来分隔多种约束类型，比如<T extends Length, Type2, Type3>
interface Length {
  length: number;
}
function identity<T extends Length>(arg: T): T {
  console.log(arg.length); // 可以获取length属性，若未extends，arg.length报错
  return arg;
}
Array<T>和T[]等效
function identity<T>(arg: T[]): T[] {
  return arg;
}
--检查对象上的键是否存在：keyof操作符-获取指定类型所有键

function getProperty<T, K extends keyof T>(obj: T, key: K): T[k] {
  return obj[key];
} 
let tsInfo = {
  name: 'a',
  difficulty: 'b',
};
getProperty(tsInfo, 'difficulty'); // 能够正确获取到tsInfo中的difficulty

泛型参数默认类型
interface A<T=string> {
  name: T;
}
const strA: A = { name: "a" };
const numB: A = { name: 10 }; // 也成立

T extends U ? X : Y  ====>  若T能够赋值给U，那么类型是X，否则为Y。
在条件类型表达式中，通常还会结合infer关键字，实现类型抽取，如下：
interface Dictionary<T = any> {
  [key: string]: T;
}
 
type StrDict = Dictionary<string>

type DictMember<T> = T extends Dictionary<infer V> ? V : never
type StrDictMember = DictMember<StrDict> // V为string
（此处使用infer关键字声明了一个类型变量V，当类型T满足T extends Dictionary约束时，返回V类型否则never）

泛型工具类型：Partial、Required、Readonly、Record 和 ReturnType 等

new (x: number, y: number) 我们称之为构造签名

参考链接：https://juejin.cn/post/6844904184894980104

模块联邦？？？

ts基础类型：number, string, boolean, 数组类型, 元组, enum(枚举), void, null, undefined, never
null表示一个空对象的引用，typeof null返回object，undefined是一个没有设置值的变量
ts2.2引入了被称为object类型的新类型，用于表示非原始类型
string类型:a.search(), a.match()
array类型：every()遍历检查每个元素是否满足条件
map对象：
let myMap = new Map([
  ["key1", "value1"],
  ["key2", "value2"]
]);
元组：允许存储不同类型的元素，可以作为参数传递给函数，例如：var mytuple = [10,"Runoob"];
联合类型：即通过管道|连接：string | number，string[] | number[]
继承：其中多接口继承语法格式为： a extends b, c, d
类：包含以下模块-字段，构造函数，方法
ts语法：class Person {}; 
等效于js：
var Person = (function () {
    function Person() {
    }
    return Person;
}());
举例：
class Car {
  // 字段
  engine: string;
  // 构造函数
  constructor(engine: string) {
    this.engine = engine;
  }
  // 方法
  disp():void {
    console.log(this.engine);
  }
}
类的继承：ts一次只能继承一个类，不支持继承多个类。但支持多重继承。
继承类的方法重写：在子类中对父类方法重写一遍
instanceof运算符用于判断对象是否是指定的类型，如果是则true


类型断言：<类型>值 或者 值 as 类型

变量作用域
var global_num = 12          // 全局变量
class Numbers { 
   num_val = 13;             // 实例变量--类作用域
   static sval = 10;         // 静态变量--类作用域
   
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)

prototype实例
function doSomething(){}
doSomething.prototype.foo = "bar";
console.log( doSomething.prototype );

1.toLocaleString()，当数字是四位数及以上时，从右往左数，每三位用分号隔开，并且小数点后只保留三位；而toString()单纯将数字转换为字符串。
var num = new Number(1777.123488); 
console.log(num.toLocaleString());  // 输出：1,777.123
console.log(num.toString());  // 输出：1777.123488

2.toLocaleString()，当目标是标准时间格式时，输出简洁年月日，时分秒；而toString()输出国际表述字符串。
var dateStr = new Date();
console.log(dateStr.toLocaleString());  // 输出：2022/2/15 16:48:35
console.log(dateStr.toString());  // 输出：Tue Feb 15 2022 16:48:58 GMT+0800 (中国标准时间)

implements:实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能。
extends:继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可重写属性，但可重写方法。

namespace: 命名空间
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}

declare声明，声明文件以.d.ts为后缀