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
            imgHeight: 20
        };
    }
    render() {
        return (
            <Carousel autoplay={false} infinite>
                {this.state.data.map((val, inx) => (
                    <img key={inx} src={val} alt="" style={{width: "100%", verticalAlign: "top"}} />
                ))}
            </Carousel>
        );
    }
}

export default Banner;
