import React from "react";
import {Carousel} from "antd-mobile";
import banner1 from "./imgs/banner1.jpg";
import banner2 from "./imgs/banner1.jpg";
import banner3 from "./imgs/banner1.jpg";

class Banner extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [banner1, banner2, banner3],
            imgHeight: "100px"
        };
    }
    render() {
        return (
            <Carousel autoplay={false} infinite style={{height: this.state.imgHeight}}>
                {this.state.data.map((val, inx) => (
                    <img
                        key={inx}
                        src={val}
                        alt=""
                        style={{width: "100%", verticalAlign: "top"}}
                        onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event("resize"));
                            this.setState({imgHeight: "auto"});
                        }}
                    />
                ))}
            </Carousel>
        );
    }
}

export default Banner;
