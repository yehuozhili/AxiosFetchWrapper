import *as api from './api'
api.login().then((res)=>console.log(res))
api.test().then((res)=>console.log(res))
api.axiosget().then((res)=>console.log(res))
api.fetchpost().then((res)=>console.log(res))
