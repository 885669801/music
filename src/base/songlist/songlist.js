import React from 'react'
// import PropTypes from 'prop-types'
import classNames from "classnames"
// import { searchPic } from "../../api/index"
import store from "../../components/redux/store"

// 歌曲基础列表组件

const BaseSongList = (props) => {
  const { list } = props;
  return (
    <div className="song-wrapper">
      {
       list.map((item, index) => {
          return (
            <div
              className={classNames('song-item')}
              onClick={() => {
                const currentMusic = {
                  id: list[index].id,
                  value: "0",
                  name: list[index].name,
                  image: list[index].al.picUrl,
                  singer: list[index].ar[0].name,
                  url: "https://music.163.com/song/media/outer/url?id=" + list[index].id + ".mp3"
                }
                store.dispatch({
                  type: 'OTHER_MUSIC',
                  payload: { currentMusic: currentMusic }
                })
                props.props.history.push("/player")
              }}
              key={item.id}
            > 
              <div className="song-num">{index + 1}</div>
              <div className="song-info">
                <h2>{item.name}</h2>
                <p><span>{(item.ar)[0].name}</span>&nbsp;-&nbsp;{item.al.name}</p>
              </div>
              <div className="play"></div>
            </div>
          )
        })
      }
    </div>
  )
};


export default BaseSongList
