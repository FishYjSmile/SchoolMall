import {request,request2} from './request';
export function getwholemessage() {
  return request2({
    // url: '/json/whole.json'
    url: '/SelectWholeTest',
    params: {
      "GOODS_ID":116,   //向服务器传送数据
    },
  })
}
export function searchwholemessage(msg) {
  return request2({
    url: '/SearchWholeTest',
    params: {
      'TITLE':msg
    },
  })
}