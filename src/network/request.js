import axios from 'axios'
import qs from 'qs'
export function request(config) {   //config位对应所接收的对象
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL:'http://localhost:8081',
      timeout: 50000,
      withCredentials : true,
      
      // 是否允许cookie
      // post请求处理
      method: 'get',
      
      //传值
      // parms: {
      //   type:'pop',
      //   page:'1'
      // }
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    
    // 拦截器

    // 拦截请求
    instance.interceptors.request.use(config => {
      // console.log(config);
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      // const data = config.data
      config.data = qs.stringify(config.data); //数据转化,也可以使用qs转换
      //这里进行拦截,但是拦截完成后要返回否则会执行err
      return config
    }, err => {
      console.log(err);
    });

    //拦截回复
    
    instance.interceptors.response.use((res) => {
      // console.log(res.data);
      // response.setContentType("application/json;charset=utf-8");
      return res
    },err => {
      console.log(err);
    })
    instance(config)
    .then(res => {
      resolve(res)
      // console.log(res.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

export function request2(config) {   //config位对应所接收的对象
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL:'/api',
      timeout: 50000,
      withCredentials : true,
      
      // 是否允许cookie
      // post请求处理
      method: 'get',
      
      //传值
      // parms: {
      //   type:'pop',
      //   page:'1'
      // }
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    
    // 拦截器

    // 拦截请求
    instance.interceptors.request.use(config => {
      // console.log(config);
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      // const data = config.data
      config.data = qs.stringify(config.data); //数据转化,也可以使用qs转换
      //这里进行拦截,但是拦截完成后要返回否则会执行err
      return config
    }, err => {
      console.log(err);
    });

    //拦截回复
    
    instance.interceptors.response.use((res) => {
      // console.log(res.data);
      // response.setContentType("application/json;charset=utf-8");
      return res
    },err => {
      console.log(err);
    })
    instance(config)
    .then(res => {
      resolve(res)
      // console.log(res.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

//请求后端数组的request
export function request1(config) {   //config位对应所接收的对象
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL:'/api',
      timeout: 50000,
      withCredentials : true,
      
      // 是否允许cookie
      // post请求处理
      method: 'post',
      
      //传值
      // parms: {
      //   type:'pop',
      //   page:'1'
      // }
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    
    // 拦截器

    // 拦截请求
    instance.interceptors.request.use(config => {
      // console.log(config);
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      // const data = config.data
      config.data = qs.stringify(config.data); //数据转化,也可以使用qs转换
      //这里进行拦截,但是拦截完成后要返回否则会执行err
      return config
    }, err => {
      console.log(err);
    });

    //拦截回复
    instance.interceptors.response.use((res) => {
      // console.log(res.data);
      // res.data = qs.stringify(res.data); //数据转化,也可以使用qs转换
      return res
    },err => {
      console.log(err);
    })
    instance(config)
    .then(res => {
      resolve(res)
    })
    .catch(err => {
      reject(err)
    })
  })
}

