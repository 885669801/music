import React from "react"
import { getMusicList } from "../../api/axios"
import "./css/musilist.css"
import erji from "../../assent/svg/耳机.png"


class GetMusicList extends React.Component {
    state = {
        result: [],
        id:""
    }
    componentDidMount() {
        // simulate img loading
        getMusicList()
            .then(res => {
                var result = res.data.result.map(val => {
                    return val
                })
                // console.log(result)
                this.setState({
                    result: result
                })
            })
    }

    

    render() {
        return (
            <div>
                <h1 className="listTitle">推荐歌单</h1>
                <div className="mainList">
                    <ul>
                        {
                            this.state.result.map((v) => {
                                if (parseInt(v.playCount) / 100000000 > 1) {
                                    v.playCount = (parseInt(v.playCount / 10000000) / 10 + "亿")
                                } else if (parseInt(v.playCount) / 100000000 < 1 && parseInt(v.playCount) > 10000) {
                                    v.playCount = parseInt(parseInt(v.playCount) / 10000) + "万"
                                }
                                return <li className="list_li" key={v.id} onClick={()=>{this.props.props.history.push({ pathname: `/playlist/${v.id}` })}}>
                                    <img src={v.picUrl} />
                                    <p className="p1"><img src={erji} />{v.playCount}</p>
                                    <p className="p2">{v.name}</p>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default GetMusicList
