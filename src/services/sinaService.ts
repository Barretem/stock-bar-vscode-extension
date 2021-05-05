import { decode } from 'iconv-lite';
import Axios from 'axios';

import { GET } from '../utils/request';
import { SINA_SERVICE_URL } from '../config/index';
import { randHeader, showMessage } from '../utils/index';

const PREFIX = `${SINA_SERVICE_URL}/frontend-node-plugin`;

/**
 * 根据股票id列表获取股票详情
 * @param ids 
 * @returns 
 */
export const getStockDetailByIds = (ids: string): Promise<any> => {
  const url = `${PREFIX}/stock/getRealTimeData?codesStr=${ids}`;
  return Axios.get(url).then(res => res.data);
};

export const getHolidayDataByDate = async (date: string) => {
  // 使用 http://timor.tech/api/holiday 的API
  // http://timor.tech/api/holiday/info/2020-09-18
  const url = `https://timor.tech/api/holiday/info/${date}`;
  console.log('url: ', url);
  try {
    const response = await Axios.get(url);
    const data = response.data;
    showMessage(data);
    // 返回的结构体如下：
    // 实例： {"code":0,"type":{"type":0,"name":"周五","week":5},"holiday":null}
    // 解释：
    // {
    //     "code": 0,              // 0服务正常。-1服务出错
    //     "type": {
    //       "type": enum(0, 1, 2, 3), // 节假日类型，分别表示 工作日、周末、节日、调休。
    //       "name": "周六",         // 节假日类型中文名，可能值为 周一 至 周日、假期的名字、某某调休。
    //       "week": enum(1 - 7)    // 一周中的第几天。值为 1 - 7，分别表示 周一 至 周日。
    //     },
    //     "holiday": { // 非节日节点为null
    //       "holiday": false,     // true表示是节假日，false表示是调休
    //       "name": "国庆前调休",  // 节假日的中文名。如果是调休，则是调休的中文名，例如'国庆前调休'
    //       "wage": 1,            // 薪资倍数，1表示是1倍工资
    //       "after": false,       // 只在调休下有该字段。true表示放完假后调休，false表示先调休再放假
    //       "target": '国庆节'     // 只在调休下有该字段。表示调休的节假日
    //     }
    //   }
    if (!data || data.code !== 0) {
      throw new Error('date节假日服务器返回-1，服务出错！');
    }

    return data;
  } catch (err) {
    showMessage(err);
    return null;
  }
};