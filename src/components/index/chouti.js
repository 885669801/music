import React from "react"
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import "./css//chouti.css";
import Lbt from "./Lbt"
import "./css/chouti.css"
import iconMenu from "../../assent/svg/菜单.png"
import iconMusic from "../../assent/svg/音乐.png"
import iconWangyi from "../../assent/svg/网易云.png"
import iconVideo from "../../assent/svg/视频.png"
import iconSearch from "../../assent/svg/搜索.png"
import FM from "../../assent/svg/FM.png"
import rili from "../../assent/svg/日历15.png"
import gedan from "../../assent/svg/歌单.png"
import paihangbang from "../../assent/svg/排行榜.png"
import MusicList from "./musicList"

class Chouti extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    open: false,
  }
  onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
  }


  paihangbang() {
    // console.log(this)
    this.props.history.push('/toplist')
  }
  gedan(){
    this.props.history.push('/sheetlist')
  }
  toplay() {
    this.props.history.push('/player')
  }
  render() {

    // fix in codepen
    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            // thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          // thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

    return (<div>
      <div className="header1">
        <div className="left">
          <img src={iconMenu} onClick={this.onOpenChange} />
        </div>
        <div className="center">
          <img src={iconMusic} />
          <img className="wangyi" src={iconWangyi} />
          <img src={iconVideo} />
        </div>
        {/* 搜索 */}
        <div className="right">
          <img src={iconSearch} onClick={() => { this.props.history.push({ pathname: `/search` }) }} />
        </div>
      </div>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle={false}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        <Lbt />
        <div className="list">
          <ul>
            <li>
              <div className="li_img" onClick={this.toplay.bind(this)}>
                <img src={FM} />
              </div>
              私人FM
                        </li>
            <li><div className="li_img"><img src={rili} /></div>每日推荐</li>
            <li><div className="li_img"><img src={gedan} onClick={this.gedan.bind(this)}/></div>歌单</li>
            <li><div className="li_img"><img src={paihangbang} onClick={this.paihangbang.bind(this)} /></div>排行榜</li>
          </ul>
        </div>
        <MusicList props={this.props}/>
      </Drawer>
    </div>);
  }
}
export default Chouti