// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as dotenv from 'dotenv';
import * as path from 'path';
import {StatusBar} from './statusbar/statusBar';
import { getHolidayDataByDate } from './services/sinaService';
import { formatDate } from './utils/index';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let loopTimer: NodeJS.Timer | null = null;

/** 
 * 1. 获取当前的节假日，如果为节假日则不轮询
 * 2. 如果当前为非节假日，轮询
 * @param context 
 */
export function activate(context: vscode.ExtensionContext) {
	const pathUrl = path.resolve(__dirname, '../.env')
	const res = dotenv.config({ path: pathUrl });
  const statusBar = new StatusBar();
  statusBar.refresh();
	const currentDay = formatDate(new Date());
	getHolidayDataByDate(currentDay).then((res) => {
		if (!res.holiday && ![6, 7].includes(res.type.week)) {
			// 非节假日开启定时查询
			loopTimer = setInterval(() => {
				const hour = new Date().getHours();
				if ((hour >= 9 && hour < 12) || (hour >= 13 && hour < 15)) {
					statusBar.refresh();
				}
			}, 10000);
		}
	});
  let disposable = vscode.commands.registerCommand('stockbar.helloWorld', () => { // The code you place here will be executed every time your command is executed
    vscode.window.showInformationMessage('Hello World from stockBar!');
    // Display a message box to the user

  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
	if (loopTimer) {
		clearInterval(loopTimer);
	}
}
