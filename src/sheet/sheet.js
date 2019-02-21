import React, { Component } from "react"
import { ListView } from 'antd-mobile';


import ColumnList from '../base/columnList/columnList'
import Scroll from '../base/scroll/scroll'
import Loading from "../base/loading/loading.js"

import { getTopPlaylist } from '../api/index'
import { HTTP_OK } from "../common/config.js"
import formatPlayList from "../model/playlist";
import createHistory from "history/createBrowserHistory"
import left from '../assent/svg/左箭头.png'


import "./sheet.css"

const history = createHistory()

class SheetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options: {
        pullUpLoad: true,
        probeType: 2
      },
      page: 1,
      data: []
    }
  }


  componentDidMount() {
    this.setState({
      loading: true,
    });
    this._getTopPlaylist()
  }


  _getTopPlaylist() {
    getTopPlaylist()
      .then(res => {
        if (res.data.code === HTTP_OK) {
          const data = this.state.data, page = this.state.page + 1;
          this.setState({
            data: data.concat(formatPlayList(res.data.playlists)),
            loading: false,
            page
          })
          // console.log(this.state.data)
        }
      })
  }


  pullUpLoad = () => {
    // console.log('上拉');
    this.setState({
      loading: true,
    });
    this._getTopPlaylist()
  };

  Go(){
    this.props.history.go(-1)
  }
  render() {
    const { loading, options, data } = this.state;
    return (
      <div className="sheetlist mm-wrapper">
        <div className="exits">
          <img src={left} onClick={this.Go.bind(this)} />
          <div>
            <p className="musicNames">歌单</p>
          </div>
        </div>     
          <ColumnList
            list={data}
            onItemClick={id => this.props.history.push(`/playlist/${id}`)
            }
          />

          <Loading show={loading} />
      </div>
    )
  }
}
export default SheetList