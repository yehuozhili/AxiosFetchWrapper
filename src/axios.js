import axios from 'axios'
import qs from 'qs'

//配置url
switch(process.env.NODE_ENV){
    case "production"://生产自己配
        axios.defaults.baseURL = "http://127.0.0.1:8080";
        break;
    case "development":
        axios.defaults.baseURL = "http://127.0.0.1:8080";
        break; 
    default:
        axios.defaults.baseURL = "http://127.0.0.1:8080"
}

//设置超时时间
axios.defaults.timeout=10000

//设置是否允许跨域携带资源凭证
axios.defaults.withCredentials = true

//设置post请求头，告知服务器请求主体的数据格式  //很多老后台都是此格式，json也比较多。此格式跟get传参格式一样。
axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"
//不使用上面格式，data自行处理。
axios.defaults.transformRequest = data => qs.stringify(data)

//配置请求拦截器 config就是发请求的配置
axios.interceptors.request.use((config)=>{
    //查找token并带上请求
    let token = localStorage.getItem('token')
    token&&(config.headers.Authorization =token)
    return config
},err=>Promise.reject(err))


//自定义响应成功http状态码
axios.defaults.validateStatus=status=>{
    return /^(2|3)\d{2}$/.test(status)
}


//配置相应拦截器
axios.interceptors.response.use((res)=>{
    //一般只要把返回数据拿出来即可。避免每次都取数据要点data
    return res.data
},err=>{
    let {response}=err
    if(response){//有结果
        switch(response.status){
            case 401://请求需要验证
                break;
            case 403://一般为token session过期，服务器拒绝
                localStorage.removeItem(token)
                break;
            case 404:   //找不到页面
                break;
            default:
                return
        }

    }else{//服务器没返回
        if(!window.navigator.onLine){
            //断网处理  配置断网页面
            return
        }
        return Promise.reject(err)
    }
})

export default axios