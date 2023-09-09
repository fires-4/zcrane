<p align="center">
  <img src="https://img1.imgtp.com/2023/08/28/p4LKhCJj.svg" width="300" height="300" alt="zcrane">
</p>



# zcrane

> 一个简单实现**发布订阅**模式的工具库

## 目录

-   [安装](#安装)
-   [使用](#使用)
-   [API](#API)
-   [License](#License)

## 安装

npm

```sh
$ npm install zcrane
```
yarn

```sh
$ yarn add zcrane
```

## 使用

### JavaScript

```javascript
// bus.js
import {ZCrane} from "zcrane"

export const zCrane = new ZCrane()
```
**发布**  
```javascript
// publisher
import zCrane from "./bus"

zCrane.emit("click")
// 传递参数
zCrane.emit("click", {})
```
**订阅**
```javascript
// subscriber
import zCrane from "./bus"

zCrane.on(EventsEnum.LOGIN,(option)=>{
    console.log(option)
})
```

### TypeScript

Crane需接受一个接口，用于定义不同事件发布的参数类型

```typescript
import {ZCrane} from "zcrane"

// 事件枚举
enum EventsEnum {
    LOGIN = "login",
    LOGOUT = "logout"
}
// 事件类型
interface Events{
    // 例如：login事件发布时传递的参数类型为string | number
    [EventsEnum.LOGIN]: string | number
    [EventsEnum.LOGOUT]: string | number
}
export const zCrane = new ZCrane<Events>()

// publisher
zCrane.emit(EventsEnum.LOGIN, "login")

// subscriber
zCrane.on(EventsEnum.LOGIN,(option)=>{
    console.log(option)
})
```

## API

-   [on](#on)
-   [emit](#emit)
-   [off](#off)
-   [offAll](#offAll)
-   [clear](#clear)

### on
订阅事件

| 参数        | 描述     | 类型                   | 备注 |
|-----------|--------|----------------------|----|
| EventName | 事件名称   | string/number/symbol | 必选 |
| Handler   | 事件处理函数 | Function             | 可选 |

```typescript
const handler = () => {}
zCrane.on("click", handler)
```
### emit
发布事件

```typescript
zCrane.emit("click")
```
### off
取消某个订阅
```typescript
// on 方法返回一个key，用于取消订阅
const key = crane.on("click")

zCrane.off(key)
```
### offAll
取消某事件全部订阅
```typescript
// 取消所有关于点击事件的订阅
zCrane.offAll("click")
```
### clear
取消全部订阅
```typescript
zCrane.clear()
```

## License

[MIT License](https://opensource.org/licenses/MIT) © [jiuyi](https://blog.zhaojiuyi.top/)

