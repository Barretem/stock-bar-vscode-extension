import { StatusBarAlignment, window } from 'vscode';

import { getStockDetailByIds } from '../services/sinaService';
import { showMessage } from '../utils/index';

/**
 * 1、状态栏显示隐藏
 * 1.1 快捷键显示隐藏状态栏
 * 2、定期查询股票信息
 * 2.1 节假日间接长一些事件去轮询
 * 2.2 
 * 3、定时渲染到页面
 */
export class StatusBar {
  constructor() {
  }

  // 股票代码
  stockCodes = process.env.STOCK_CODES || '';

  // 状态栏列表
  barMap = new Map();

  // 更新状态栏数据
  refresh() {
    this.refreshStockStatusBar();
  }

  // 更新股票数据
  async refreshStockStatusBar() {
  console.log('process.env.STOCK_CODES: ', process.env.STOCK_CODES);
    const resp = await getStockDetailByIds(this.stockCodes);
    showMessage(resp.data);
    resp.data.forEach(this.renderBarItem);
  }

  renderBarItem = (item: any) => {
    let stockBarItem;
    if (this.barMap.get(item.code)) {
      stockBarItem = this.barMap.get(item.code);
    } else {
      stockBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 3);
    }

    const { percent, name } = item;
    const txt = `${name.slice(0, 1)}${percent}`;
    if (stockBarItem.text !== txt) {
      stockBarItem.text = txt;
      stockBarItem.color = percent >= 0 ? 'red' : 'green';
    }
    if (stockBarItem.tooltip !== name) {
      stockBarItem.tooltip = name;
    }
    stockBarItem.show();
    this.barMap.set(item.code, stockBarItem);
  };

}