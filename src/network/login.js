import {request1,request2} from './request';
export function getLogin(username, password) {
  return request1({    //这里传给request一个对象
    url:'/LoginTest',
    params: {
      username,   //向服务器传送数据
      password
    },
  })
}
export function getfile(formDatas) {
  return request1({    //这里传给request一个对象
    url:'/FileImg',
    params: {
      formDatas,   //向服务器传送数据
    },
  })
}