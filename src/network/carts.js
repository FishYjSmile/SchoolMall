import {request2} from './request';
export function getcarts(num) {
  return request2({
    url: '/SelectCartTest',
    params: {
      "USERNAME":num,   //向服务器传送数据
    },
  })
}
export function insertcarts(msg1,msg2,msg3,msg4,msg5,msg6) {
  return request2({
    url: '/InsertCartTest',
    params: {
      "GOODS_ID":msg1,   //向服务器传送数据
      "PRICE":msg2,   //向服务器传送数据
      "TITLE":msg3,   //向服务器传送数据
      "IMG_URL":msg4,   //向服务器传送数据
      "USERNAME":msg5,   //向服务器传送数据
      "REPLACE_NUM":msg6,   //向服务器传送数据
    },
  })
}
export function updatecarts(REPLACE_NUM,GOODS_ID,USERNAME) {
  return request2({
    url: '/UpdateCartTest',
    params: {
      "REPLACE_NUM":REPLACE_NUM,   //向服务器传送数据
      "GOODS_ID":GOODS_ID,   //向服务器传送数据
      "USERNAME":USERNAME,   //向服务器传送数据
    },
  })
}
export function deletecarts(GOODS_ID,USERNAME) {
  return request2({
    url: '/DeleteCartTest',
    params: {
      "GOODS_ID":GOODS_ID,   //向服务器传送数据
      "USERNAME":USERNAME,   //向服务器传送数据
    },
  })
}
export function deleteAllcarts(USERNAME) {
  return request2({
    url: '/DeleteCartAllTest',
    params: {
      "USERNAME":USERNAME,   //向服务器传送数据
    },
  })
}
