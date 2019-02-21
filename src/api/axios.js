import axios from "axios"

// 网络请求地址
const URL = 'http://106.13.61.111:3000';

// 默认分页数量
const defaultLimit = 20;

// 请求成功状态码
const HTTP_OK = 200;



export function getBanner() {
    const url = `${URL}/banner`;
    return (
        axios.get(url)
    )
}

export function getMusicList(){
    const url = `${URL}/personalized`
    return (
        axios.get(url)
    )
}

export function getPlayList(id){
    const url=`${URL}/playlist/detail?id=`+id
    return (
        axios.get(url)
    )
}
export function getMusicId(id){
    const url=`${URL}/song/url?id=`+id
    return (
        axios.get(url)
    )
}