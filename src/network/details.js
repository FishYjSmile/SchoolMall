import {request,request2} from './request';
export function getdetails() {
  return request({
    url: '/json/details.json',
    
  })
}
export function SelectImgMayjor(msg) {
  return request2({
    url: '/SelectImgMayjor',
    params: {
      GOODS_ID:msg
    }
  })
}
export function SelectImgVMayjor(msg) {
  return request2({
    url: '/SelectImgVMayjor',
    params: {
      GOODS_ID:msg
    }
  })
}
export function SelectDetailMayjor(msg) {
  return request2({
    url: '/SelectDetailMayjor',
    params: {
      GOODS_ID:msg
    }
  })
}
