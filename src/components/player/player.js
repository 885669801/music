import React from "react"
import ReactDOM from 'react-dom'
import left from "../../assent/svg/左箭头.png"
import './player.css'
import play from "../../assent/svg/播放.png"
import pause from "../../assent/svg/暂停.png"
import left1 from "../../assent/svg/left.png"
import right1 from "../../assent/svg/right.png"
import PlayerList from "./playerlist"
import store from "../redux/store"

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay: true, // 是否播放
            showMusicList: false, // 是否显示播放列表
            currentTime: 0, // 当前播放时间
            duration: "04:31",
            currentMusic: {
                id: 27955653,
                value: "-1",
                name: "你还要我怎样",
                singer: "薛之谦",
                image: "https://p1.music.126.net/WPHmBisDxnoF4DrBLKwl3Q==/109951163169021112.jpg",
                url: "https://music.163.com/song/media/outer/url?id=27955653.mp3"
            },
            list: []
        }
    }
    componentDidMount() {
        this.audioEle = ReactDOM.findDOMNode(this.refs.audioEle);
        this.jindutiao = ReactDOM.findDOMNode(this.refs.jindutiao);
        this.audioEle.load();
        this.bindEvents()
        console.log(this.props)
        console.log(store.getState())
        if(this.props.history.action!=="POP"){
            this.setState({
                currentMusic:store.getState().currentMusic.currentMusic
            })
        }
    }

    componentWillUnmount() {
        this.unbindEvents()
        
    }
    //添加绑定事件
    bindEvents() {
        this.audioEle.addEventListener('canplay', this.readyPlay);
        // this.audioEle.addEventListener('ended', this.nextPlay);
        this.audioEle.addEventListener('timeupdate', this.timeUpdate)

    }

    //移除绑定事件
    unbindEvents() {
        this.audioEle.removeEventListener('canplay', this.readyPlay);
        // this.audioEle.removeEventListener('ended', this.nextPlay);
        this.audioEle.removeEventListener('timeupdate', this.timeUpdate)
    }
    // 开始播放事件
    readyPlay = () => {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.audioEle.play();
            this.setState({
                isPlay: true
            })
        }, 0)
        
        var duration = parseInt(this.audioEle.duration)
        //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var h;
        h = Math.floor(duration / 60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        duration = duration % 60;
        //将变量转换为字符串
        h += '';
        duration += '';
        //如果只有一位数，前面增加一个0
        h = (h.length == 1) ? '0' + h : h;
        duration = (duration.length == 1) ? '0' + duration : duration;
        this.setState({
            duration: h + ':' + duration,
        });
    };
    // 播放时间改变
    timeUpdate = () => {
        var currentTime = parseInt(this.audioEle.currentTime)
        //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var num;
        num = Math.floor(currentTime / 60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        currentTime = currentTime % 60;
        //将变量转换为字符串
        num += '';
        currentTime += '';
        //如果只有一位数，前面增加一个0
        num = (num.length == 1) ? '0' + num : num;
        currentTime = (currentTime.length == 1) ? '0' + currentTime : currentTime;
        this.setState({
            currentTime: num + ':' + currentTime,
        });
        var value = this.audioEle.currentTime / this.audioEle.duration * 100 + "%";
        this.jindutiao.style.width = value;
        if(this.audioEle.currentTime==this.audioEle.duration){
            this.nextPlay()
        }
    };
    // 播放暂停
    play = e => {
        if (this.state.isPlay) {
            // 暂停
            this.audioEle.pause();
            this.setState({
                isPlay: false
            })
        } else {
            // 播放
            this.audioEle.play();
            this.setState({
                isPlay: true
            })
        }
        e.stopPropagation()
    };
    //先写列表，获取歌曲列表
    //用id做变量获取音乐url
    ChangeMid(value, label, id, picUrl, singer, list) {
        this.setState({
            currentMusic: {
                id: id,
                value: value,
                name: label,
                singer: singer,
                image: picUrl,
                url: "https://music.163.com/song/media/outer/url?id=" + id + ".mp3"
            },
            list: list
        })
        this.setState({})
    }
    changeJdt(e) {
        // if (this.state.isPlay || this.audioEle.currentTime != 0) {
        //     var pgsWidth = this.jindutiao.style.width;
        //     console.log(pgsWidth)
        //     var rate = e.offsetX / pgsWidth;
        //     this.audioEle.currentTime = this.audioEle.duration * rate;
        //     var value = this.audioEle.currentTime / this.audioEle.duration * 100 + "%";
        //     this.jindutiao.style.width = value
        // }
    }
    // 上一首
    prevPlay() {
        var result = this.state.list[this.state.currentMusic.value - 1]
        console.log(result)
        this.audioEle = ReactDOM.findDOMNode(this.refs.audioEle);
        this.setState({
            currentMusic: {
                id: result.id,
                value: result.value,
                name: result.label,
                singer: result.singer,
                image: result.picUrl,
                url: "https://music.163.com/song/media/outer/url?id=" + result.id + ".mp3"
            },
        })
        this.setState({})
    }
    nextPlay() {
        var result = this.state.list[this.state.currentMusic.value + 1]
        console.log(result)
        this.setState({
            currentMusic: {
                id: result.id,
                value: result.value,
                name: result.label,
                singer: result.singer,
                image: result.picUrl,
                url: "https://music.163.com/song/media/outer/url?id=" + result.id + ".mp3"
            },
        })
        this.setState({})
    }
    exit(){
        this.props.history.go(-1)
    }
    render() {
        return (
            <div className="msc">
                <div className="exit">
                    <img src={left} onClick={this.exit.bind(this)}/>
                    <div>
                        <p className="musicName">{this.state.currentMusic.name}</p>
                        <p className="musicper">{this.state.currentMusic.singer}</p>
                    </div>
                </div>
                <div className="middle">
                    <div className="player-cd">
                        <div className="disc-box">
                            <img src={this.state.currentMusic.image} width="250px" />
                        </div>
                    </div>
                </div>
                <div className="jindutiao">
                    <span className="beginTime">{this.state.currentTime}</span>
                    <span className="jdt_time" onClick={this.changeJdt.bind(this)}>
                        <span className="jdt_time2" ref="jindutiao"></span>
                    </span>

                    <span className="allTime">{this.state.duration}</span>
                </div>
                <div className="key_music">
                    <div className="playlists">
                        <PlayerList getMid={this.ChangeMid.bind(this)} props={this.state.currentMusic} />
                    </div>
                    <div className="play_prev">
                        <img src={left1} onClick={this.prevPlay.bind(this)} />
                    </div>
                    <div className="playPlay">
                        <img className="play_key" src={this.state.isPlay ? pause : play} onClick={this.play} />
                    </div>
                    <div className="play_next">
                        <img src={right1} onClick={this.nextPlay.bind(this)} />
                    </div>
                </div>

                <audio ref="audioEle" src={`https://music.163.com/song/media/outer/url?id=${this.state.currentMusic.id}.mp3`}></audio>
            </div>
        )
    }
}

export default Player