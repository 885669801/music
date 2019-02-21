import React from "react"
import { Carousel, Button, WhiteSpace, WingBlank } from 'antd-mobile';

import { getBanner } from "../../api/axios"
import "./css/Lbt.css"

import createHistory from 'history/createBrowserHistory'
const history = createHistory()

class Lbt extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        data: [],
        banerImg: {},
        imgHeight: 176,
        slideIndex: 2,

    }
    componentDidMount() {
        // simulate img loading
        getBanner()
            .then(res => {
                var result = res.data.banners.map(val => {
                    return val.imageUrl
                })
                this.setState({
                    data: result
                })
            })
    }
    componentDidUpdate() {
        // After the new child element is rendered, change the slideIndex
        // https://github.com/FormidableLabs/nuka-carousel/issues/327
        if (this.state.slideIndex !== this.state.data.length - 1) {
            /* eslint react/no-did-update-set-state: 0 */
            this.setState({ slideIndex: this.state.data.length - 1 });
        }

    }
    

    render() {
        return (
            <div>
                
                <div className="index1">
                    <WingBlank>
                        <WhiteSpace />
                        <Carousel
                            autoplay={true}
                            infinite
                            slideWidth={0.8}
                            selectedIndex={this.state.slideIndex}
                        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        // afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map((val, index) => (
                                <a
                                    key={val + index}
                                    href="#"
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                        src={val}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top' }}
                                        onLoad={() => {
                                            // fire window resize event to change height
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 'auto' });
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                </div>
                
            </div>
        );
    }
}

export default Lbt
