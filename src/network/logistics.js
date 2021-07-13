import {request2} from './request';
export function InsertLogisticsTest(obj,username,id) {
  return request2({    //这里传给request一个对象
    url:'/InsertLogisticsTest',
    params: {
      PHONE : obj.PHONE,
      ADDRESS : obj.ADDRESS,
      NAME : obj.NAME,
      USERNAME : username,
      ZIP_CODE : obj.ZIP_CODE,
      ID : id+1,
    },
  })
}
export function UpdateLogisticsTest(obj,username,id) {
  return request2({    //这里传给request一个对象
    url:'/UpdateLogisticsTest',
    params: {
      PHONE : obj.PHONE,
      ADDRESS : obj.ADDRESS,
      NAME : obj.NAME,
      USERNAME : username,
      ZIP_CODE : obj.ZIP_CODE,
      ID : id+1,
    },
  })
}
export function SelectLogisticsTest(msg1) {
  return request2({    //这里传给request一个对象
    url:'/SelectLogisticsTest',
    params: {
      USERNAME : msg1,
    },
  })
}
export function DeleteLogisticsTest(msg1,msg2) {
  return request2({    //这里传给request一个对象
    url:'/DeleteLogisticsTest',
    params: {
      USERNAME : msg1,
      ID : msg2,
    },
  })
}