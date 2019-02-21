import axios from 'axios'
import { URL, defaultLimit } from '../common/config'


//获取排行榜（完整版）
export function getTopListDetail() {
  const url = `${URL}/toplist/detail`;
  // console.log(url)
  return axios.get(url)
}

//获取歌单详情
export function getPlaylistDetail(id) {
  const url = `${URL}/playlist/detail`;
  return axios.get(url, {
    params: {
      id
    }
  })
}

// 搜索
export function search(keywords) {
  const url = `${URL}/search`;
  return axios.get(url, {
    params: {
      // offset: page * limit,
      // type,
      // limit,
      keywords
    }
  })
}

//搜索图片
export function searchPic(id) {
  const url = `${URL}/song/detail?ids=` + id;
  return axios.get(url, {
    params: {
      id
    }
  })
}

//热搜
export function searchHot() {
  const url = `${URL}/search/hot`;
  return axios.get(url)
}

export function getTopPlaylist(page = 0, limit = defaultLimit, order = 'hot') {
  const url = `${URL}/top/playlist`;
  return axios.get(url, {
    params: {
      offset: page * limit,
      order,
      limit
    }
  })
}
export function playlist(id) {
  const url = `${URL}/playlist/detail?id=` + id;
  return fetch(url)
}
