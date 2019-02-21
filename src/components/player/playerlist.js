import React from "react"
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import "./playerlist.css"
import list from "../../assent/svg/列表.png"
import { getPlayList } from "../../api/axios"


class playerlist extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            initData: '',
            show: false,
            list: []
        };
    }
    
    componentWillMount() {
        getPlayList("24381616").then(res => {
            console.log(res)
            var ll = []
            res.data.playlist.tracks.map((v, index) => {
                ll.push({
                    value: index,
                    label: v.name,
                    id:v.id,
                    picUrl:v.al.picUrl,
                    singer:v.ar[0].name,
                })
            })
            console.log(this.props.props)
            ll.push({
                value:805,
                label:this.props.props.name,
                id:this.props.props.id,
                picUrl:this.props.props.image,
                singer:this.props.props.singer
            })
            this.setState({
                list: ll
            })
        })
    }
    onChange = (value) => {
        var list2= this.state.list
        this.props.getMid(
            list2[value].value,
            list2[value].label,
            list2[value].id,
            list2[value].picUrl,
            list2[value].singer,
            list2
        )
        let label = '';
        this.state.list.forEach((dataItem) => {
            if (dataItem.value === value[0]) {
                label = dataItem.label;
                if (dataItem.children && value[1]) {
                    dataItem.children.forEach((cItem) => {
                        if (cItem.value === value[1]) {
                            label += `${cItem.label}`;
                        }
                    });
                }
            }
        });
        console.log(label);
    }
    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
        // mock for async data loading
        if (!this.state.initData) {
            setTimeout(() => {
                this.setState({
                    initData: this.state.list,
                });
            }, 500);
        }
    }

    onMaskClick = () => {
        this.setState({
            show: false,
        });
    }

    render() {
        const { initData, show } = this.state;
        const menuEl = (
            <Menu
                className="single-foo-menu"
                data={initData}
                value={['1']}
                level={1}
                onChange={this.onChange}
                height={document.documentElement.clientHeight * 0.6}
            />
        );
        const loadingEl = (
            <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </div>
        );
        return (
            <div className={show ? 'single-menu-active' : ''}>
                <div>
                    <div
                        mode="light"
                        onClick={this.handleClick}
                        className="single-top-nav-bar"
                    >
                        <img src={list} />
                    </div>
                </div>
                {show ? initData ? menuEl : loadingEl : null}
                {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
            </div>
        );
    }
}

export default playerlist