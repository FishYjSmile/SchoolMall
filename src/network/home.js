import {request,request2} from './request';
export function getHomeMultidata() {
  return request2({
    url: '/SelectSwiperTest',
    params: {
      "GOODS_ID":9,   //向服务器传送数据
    },
  })
}
export function getHomeRecomend() {
  return request2({
    url: '/SelectRecomendTest',
    params: {
      "GOODS_ID":4,   //向服务器传送数据
    },
  })
}
export function getHomepopular() {
  return request2({
    // url: '/json/populargoods.json'
    url: '/SelectPopularTest',
    // params: {
    //   "GOODS_ID":25,   //向服务器传送数据
    // }
  })
}
export function getHomesiderbar() {
  return request({
    url: '/json/siderbar.json'
  })
}
export function getHomefooter() {
  return request({
    url: '/json/footer.json'
  })
}
