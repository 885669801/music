import React, { Component } from "react"
// import { Grid } from 'antd-mobile'

import Loading from '../base/loading/loading'
import { playlist } from '../api/index'
import { HTTP_OK } from "../common/config.js"
import BaseSongList from '../base/songlist/songlist'
import { formatPlayCount } from '../common/util'
import Scroll from '../base/scroll/scroll'

import "./playlist.css"

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: true,
            defaultName: "歌单",
            id: ""
        }
    }


    componentDidMount() {
        this.setState({
            id: this.props.location.pathname.substring(10)
        })
        console.log(this.state.id)
        setTimeout(() => {
            playlist(this.state.id).then(res => {
                return res.json();
            }).then(res => {
                if (res.code === HTTP_OK) {
                    console.log(res)
                    this.setState({
                        data: res.playlist,
                        loading: false
                    })
                }
            })
        }, 0);

    }
    exit() {
        this.props.history.go(-1)
    }
    render() {
        const { loading } = this.state
        const {
            name,
            coverImgUrl,
            avatarUrl,
            nickname,
            playCount,
            tracks
        } = this.state.data
        console.log(this.state.data)
        return (

            <div className="playlist mm-wrapper">
                <div className="back">
                    <p className="title" onClick={this.exit.bind(this)}></p>
                    <span className="dis">{name}</span>
                </div>
                {coverImgUrl && (
                    <div className="mm-blur mm-blur-min">
                        <div
                            className="mm-blur-bg"
                            style={{
                                backgroundImage: `url(${coverImgUrl}?param=99y98)`
                            }}
                        />
                    </div>
                )}
                {loading ? (
                    <Loading />
                ) : (
                        <div>
                            <header className="playlist-header">
                                <div className="playlist-header-wrapper" style={{
                                    backgroundImage: `url(${coverImgUrl})`

                                }}>

                                    <div
                                        className="playlist-header-hd"
                                    >
                                        <img
                                            src={`${coverImgUrl}?param=99y98`}
                                            alt=""
                                        />
                                    </div>
                                    <div className="playlist-header-bd">
                                        <h1>{name}</h1>
                                        <div className="playlist-header-user">
                                            <img
                                                src={`${avatarUrl}?param=50y50`}
                                                alt=""
                                            />
                                            <span>{nickname}</span>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            {tracks && tracks.length > 0 && (
                                <BaseSongList
                                    showRank
                                    list={tracks}
                                    props={this.props}
                                />
                            )}
                        </div>
                    )}
            </div>
        )
    }
}

export default Playlist 
