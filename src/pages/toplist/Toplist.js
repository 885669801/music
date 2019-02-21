import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getTopListDetail } from '../../api/index'
import { HTTP_OK } from '../../common/config'
import './Toplist.css'
import left from '../../assent/svg/左箭头.png'


//排行榜
class TopList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      officialList: [],
      globalList: [],
      artistList: null
    }
  }
  componentDidMount() {
    getTopListDetail()
      .then(res => {
        // console.log(res)
        if (res.data.code === HTTP_OK) {
          // console.log(res.data.list)
          let officialList = [], globalList = [], artistList = res.data.artistToplist;
          res.data.list.forEach((item) => {
            // console.log(item)
            // console.log(item.id)
            if (item.ToplistType) {
              officialList.push({
                idx: item.idx,
                id: item.id,
                name: item.name,
                coverImgUrl: item.coverImgUrl,
                description: item.description,
                updateFrequency: item.updateFrequency,
                tracks: item.tracks,
                ToplistType: item.ToplistType
              })
            } else {
              globalList.push({
                id: item.id,
                name: item.name,
                coverImgUrl: item.coverImgUrl,
                description: item.description,
                updateFrequency: item.updateFrequency,
                icon: item.coverImgUrl,
                text: item.name
              })
            }
          });
          this.setState({
            officialList, globalList, artistList
          })
        }
      })
  }
  Go(){
    this.props.history.go(-1)
  }
  // () => { this.props.history.push({ pathname: `/playlist/${item.id}` }) }
//   aaa(){
// console.log(this.props.history)
//   }
  render() {
    const { officialList, globalList, artistList
    } = this.state
    // console.log(globalList)
    return (
      <div className="mm-wrapper toplistes">
        <div className="exitses">
          <img src={left} onClick={this.Go.bind(this)}/>
          <div>
            <p className="musicNameses">排行榜</p>
          </div>
        </div>
        {
          officialList.length > 0 ?
            <div className='banges'>
              <h1 className="toplist-titlees">官方榜单</h1>
              <div className="row-listes">
                {
                  officialList.map(item => (
                    <div className="row-itemes" key={item.id} onClick={() => { this.props.history.push({ pathname: `/playlist/${item.id}` }) }}>
                      <div className="item-hdes">
                        <img src={`${item.coverImgUrl}?param=150y150`} alt="" />
                        <p>{item.updateFrequency}</p>
                      </div>
                      <div className="row-item-bdes">
                        {
                          item.tracks.map((tracks, index) => (
                            <p key={`${item.id}${index}`}>{`${tracks.first}-${tracks.second}`}</p>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
                {
                  artistList && artistList.name && (
                    <div className="row-itemes">
                      <div className="item-hdes">
                        <img src={`${artistList.coverUrl}?param=150y150`} alt="" />
                        <p>{artistList.updateFrequency}</p>
                      </div>
                      <div className="row-item-bdes">
                        {
                          artistList.artists.map((item, index) => (
                            <p key={`${item.third}${index}`}>{`${item.first}    ${item.third}`}</p>
                          ))
                        }
                      </div>
                    </div>
                  )
                }
              </div>
              <h1 className="toplist-titlees">全球榜</h1>
              <div className="column-listes">
                {/* <Grid data={this.state.globalList} columnNum={3} hasLine={true} square={false} onClick={() => { this.props.history.push({ pathname: `/playlist/${this.state.globalList.id}` }) }} /> */}
                {
                  globalList.map(item => (
                    <div className="column-itemes" onClick={() => {
                      this.props.history.push({ pathname: `/playlist/${item.id}` })
                    }} key={item.id}>
                      <div className="item-hdes">
                        <img src={`${item.coverImgUrl}?param=150y150`} alt="" />
                        <p>{item.updateFrequency}</p>
                      </div>
                      <div className="column-bdes">{item.name}</div>
                    </div>
                  ))
                }
              </div>
            </div>
            : console.log('123')
        }
      </div>
    )
  }
}

export default withRouter(TopList)
