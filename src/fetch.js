import qs from 'qs'

let baseURL = ''
//配置url
switch(process.env.NODE_ENV){
    case "production"://生产自己配
        baseURL = "http://127.0.0.1:8080";
        break;
    case "development":
        baseURL = "http://127.0.0.1:8080";
        break; 
    default:
        baseURL = "http://127.0.0.1:8080"
}

export default function  request(url,option={}) {
    url = baseURL+url;
    !option.method?option.method='get':null
    if(option.hasOwnProperty('params')){//i表示不区分大小写，参数有可能写配置项而不是url
        if(/^(GET|DELETE|HEAD|OPTIONS)$/i.test(option.method)){
            //如果url有问号，说明这些参数是另加，用&连接，如果没有，就上问号连接
            const ask =url.includes('?')?'&':'?';
            url +=`${ask}${qs.stringify(option.params)}`
        }
        delete option.params
    }
    //合并配置
    option = Object.assign({
        crendentials:"include",//same-origin同源才可以，omit拒绝携带资源凭证
        headers:{}
    },option)
    
    const token = localStorage.getItem('token')
    token && (option.headers.Authorization=token)

    //post
    if(/^(POST|PUT)$/i.test(option.method)){
        !option.type?option.type='urlencoded':null
        //判断类型加上请求头
        if(option.type==='urlencoded'){
            option.headers['Content-Type']='application/x-www-form-urlencoded'
            option.body = qs.stringify(option.body)
        }
        if(option.type==='json'){
            option.headers['Content-Type']='application/json'
            option.body = JSON.stringify(option.body)
        }
    }
    return fetch(url,option).then(res=>{
        if(!/^(2|3)\d{2}$/.test(res.status)){
            switch(res.status){
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
        }
        return res.json()
    }).catch(err=>{
        if(!window.navigator.onLine){
            //断网
            return
        }else{
            return Promise.reject(err)
        }
    })
}