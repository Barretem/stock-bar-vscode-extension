# stock-bar（股票状态栏）

**股票状态栏**——VScode里面可以在底部看股票信息的插件。

## Table of contents

- [leek-fund（韭菜盒子）](#leek-fund韭菜盒子)
  - [Table of contents](#table-of-contents)
  - [功能特性](#功能特性)
  - [安装使用](#安装使用)

> 投资其实就是一次心态修炼，稳住心态长期投资都会有收益的！！

## 功能特性

本插件具有以下特点：

- 股票实时涨跌，支持 A 股、港股、美股

## 安装使用
### 1. 安装项目依赖
```shell
yarn
```

### 2. 下载这个项目后，在本地添加.env文件，其.env的格式如下
可以通过http://suggest3.sinajs.cn/suggest/type=2&key=三一重工 获取股票代码
```js
STOCK_CODES=sz000034,sz000036
```

说明：STOCK_CODES为股票代码，多个股票代码用','隔开

### 3. 生成.vsix文件
在项目根目录中执行以下命令
```
yarn vsix
```

### 4. 在vscode中导入.vsix
在vscode中导入生成的.vsix插件即可使用
