import React from "react";
import "./css/Detail.css";
import "antd-mobile/dist/antd-mobile.css";
import "lib-flexible";
import Tools from "./tools";
import {Carousel} from "antd-mobile";
import Axios from "axios";

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            bannerImgs: []
        };
    }

    render() {
        return (
            <div className="Detail">
                <Carousel className="banner" autoplay={false} infinite>
                    {this.state.bannerImgs.map(val => (
                        <a
                            key={val}
                            href="http://www.alipay.com"
                            style={{display: "inline-block", width: "100%", height: "750px"}}
                        >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                style={{width: "100%", verticalAlign: "top"}}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event("resize"));
                                    this.setState({imgHeight: "auto"});
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                <div>detail</div>
                <div>{Tools.getUrlParams("a")}</div>
            </div>
        );
    }

    getDetail() {
        let apiUrl = "https://huge.yaomall.tvm.cn/services/GetProductDetail";
        let params = {
            user_id: "hlg_oCLOAuHoQrBO182K6QJ6rIvXubKE",
            sku_id: 602307244529,
            from: "tmall",
            unit_price: "23.9",
            vip_back_cash: 2.91,
            commission: 2.91,
            sales_volume: "833",
            ba_coupon: {
                start_time: "2019-10-09",
                price: "10",
                activity_url:
                    "https://uland.taobao.com/coupon/edetail?e=DP4MecgcK9gE%2BdAb1JoOOoBoSSgXXxM7RWAl76cEBMWJBiHzvBsckWQs6RJpdGDgnRT6DU8C1WSaO4nvdDPDtvYL3CHz5ef0DfqEFBOhTcxhGmSSKILg5YojCx%2BLvqKfgwOCYbfuSOIbKQcl51EPfxslvvZeHXLQVMUIL7dUV6fnbYfZPG6qkhyk4Acx5KDO100AtL32rujgiFQiQ0E%2FrO3vo5UGhtJZ0wC8dC3wEO6Z%2FGvCO%2BpAxw%3D%3D&traceId=0b00a8e015706767295035664e",
                end_time: "2019-10-16",
                original_price: "20"
            }
        };
        Axios.post(apiUrl);
    }
}

export default Detail;
