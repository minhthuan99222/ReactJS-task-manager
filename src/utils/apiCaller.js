import axios from 'axios';
import * as Configs from '../contants/Config'

export default function callApi(endpoint, method, body){
    return axios({
        method: method,
        url: `${Configs.API_URL}/${endpoint}`,
        data: body
    }).catch(err=>{
        console.log(err)
    })
}