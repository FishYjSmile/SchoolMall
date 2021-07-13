import {request2} from './request';
export function getorders(msg) {
  return request2({
    url: '/SelectOrderTest',
    params: {
      USERNAME:msg,   //向服务器传送数据
      // ORDER_NUM:obj.ORDER_NUM,   //向服务器传送数据
    },
  })
}
export function insertorders(obj) {
  return request2({
    url: '/InsertOrderTest',
    params: {
      GOODS_ID:obj.GOODS_ID,   //向服务器传送数据
      PRICE:obj.PRICE,   
      TITLE:obj.TITLE,   
      IMG_URL:obj.IMG_URL,   
      USERNAME:obj.USERNAME,  
      ORDER_NUM:obj.ORDER_NUM,   
      TIME:obj.TIME,   
      REPLACE_NUM:obj.REPLACE_NUM,   
    },
  })
}
export function updateorders(obj) {
  return request2({
    url: '/UpdateOrderTest',
    params: {
      REPLACE_NUM:obj.REPLACE_NUM,   //向服务器传送数据
      GOODS_ID:obj.GOODS_ID,   //向服务器传送数据
      USERNAME:obj.USERNAME,   //向服务器传送数据
    },
  })
}
export function deleteorders(obj) {
  return request2({
    url: '/DeleteOrderTest',
    params: {
      ORDER_NUM:obj.ORDER_NUM,   //向服务器传送数据
      USERNAME:obj.USERNAME,   //向服务器传送数据
    },
  })
}

export function getordersnum(obj) {
  return request2({
    url: '/SelectOrderNumTest',
    params: {
      USERNAME:obj.USERNAME,   //向服务器传送数据
    },
  })
}
export function insertordersnum(obj) {
  return request2({
    url: '/InsertOrderNumTest',
    params: {
      ORDER_NUM:obj.ORDER_NUM,   //向服务器传送数据
      USERNAME:obj.USERNAME,   //向服务器传送数据
      TIME:obj.TIME,   //向服务器传送数据
    },
  })
}
export function deleteordersnum(obj) {
  return request2({
    url: '/DeleteOrderNumTest',
    params: {
      ORDER_NUM:obj.ORDER_NUM,   //向服务器传送数据
      USERNAME:obj.USERNAME,   //向服务器传送数据
    },
  })
}
