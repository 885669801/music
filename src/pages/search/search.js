import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { searchHot, search,searchPic } from '../../api/index'
import { HTTP_OK } from '../../common/config'
import './search.css'
import axios from 'axios'
import left from '../../assent/svg/左箭头.png'
import store from "../../components/redux/store"
//搜索页面
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            // hots: [],//热搜
            songs: []
        }
    }
    // componentDidMount() {
    //     searchHot()
    //         .then(res => {
    //             // console.log(res)
    //             this.setState({
    //                 hots: res.data.result.hots
    //             })
    //         })
    // }
    searchChange = e => {
        console.log(e.target.value)
        this.setState({
            value: e.target.value
        })
    }
    onEnter = e => {
        if (e.keyCode === 13) {
            console.log(e.target.value)
            this.setState({
                query: e.target.value
            })
            search(e.target.value)
                .then(res => {
                    console.log(res.data.result.songs)
                    this.setState({
                        songs: res.data.result.songs
                    })
                })
        }
    }
    itemCick(index) {
        console.log(this.state.songs[index])
        const id = this.state.songs[index].id
        searchPic(id)
            .then(res => {
                console.log(res.data.songs[0].al.picUrl)
                const currentMusic = {
                    id:this.state.songs[index].id,
                    value:"0",
                    name:this.state.songs[index].name,
                    image:res.data.songs[0].al.picUrl,
                    singer:this.state.songs[index].artists[0].name,
                    url:"https://music.163.com/song/media/outer/url?id="+this.state.songs[index].id+".mp3"
                }
                store.dispatch({
                    type:'OTHER_MUSIC',
                    payload:{currentMusic:currentMusic}
                })
                this.props.history.push("/player")
            })
    }
    Go() {
        this.props.history.go(-1)
    }
    render() {
        const { value, songs } = this.state
        
        return (
            <div className="mm-wrapper search">
                <div className="mm-wrapper toplist">
                    <div className="exitss">
                        <img src={left} onClick={this.Go.bind(this)} />
                        <div className="input1">
                            <input
                                className="search-head-input"
                                type="text"
                                placeholder="搜索你喜欢的"
                                value={value}
                                autoFocus="autofocus"
                                onChange={this.searchChange.bind(this)}
                                onKeyDown={this.onEnter}
                            />
                        </div>
                    </div>
                </div>
                <div className='div'>
                    {
                        songs.map((item, index) => (
                            <div key={item.id} className='search-list' onClick={this.itemCick.bind(this,index)}>
                                <span className="span1">{index + 1}</span>
                                <div>
                                    <p>
                                        {item.name}
                                        {item.alias.length === 1 ? '（' : ''}
                                        {item.alias.length === 1 ? item.alias : ''}
                                        {item.alias.length === 1 ? '）' : ''}
                                    </p>
                                    <p>{item.artists[0].name}-{item.album.name}</p>
                                    <p>{item.alias.length === 1 ? item.alias : ''}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Search)