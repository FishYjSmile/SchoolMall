import {request1} from './request';
export function getRegister(username, password ,name) {
  return request1({    //这里传给request一个对象
    url:'/RegisterTest',
    params: {
      username,   //向服务器传送数据
      password,
      name
    },
  })
}