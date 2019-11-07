import React from "react";
import {withRouter} from "react-router-dom";
import "./css/Detail.css";
import "antd-mobile/dist/antd-mobile.css";
import "lib-flexible";
import {Carousel, Toast} from "antd-mobile";
import Axios from "axios";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerImgs: [],
            imgHeight: "300px",
            productName: "",
            productSale: 0,
            productQuanPrice: 0,
            price: 0.0,
            quanUrl: "",
            quanStart: "",
            quanEnd: "",
            realPrice: 0,
            productType: "",
            tuijian: "",
            cssDisplay: "none"
        };

        Toast.loading("正在加载...");
        this.getDetail();
    }

    render() {
        return (
            <div className="Detail" style={{display: this.state.cssDisplay}}>
                <Carousel className="banner" autoplay={false} infinite>
                    {this.state.bannerImgs.map((val, inx) => (
                        <img
                            src={val}
                            alt=""
                            key={inx}
                            style={{width: "100%", verticalAlign: "top"}}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event("resize"));
                                this.setState({imgHeight: "auto"});
                            }}
                        />
                    ))}
                </Carousel>
                <div className="container">
                    <div className="product-name">
                        <span>{this.state.productName}</span>
                        <span>{`月销:${this.state.productSale}`}</span>
                    </div>
                    <div className="price">
                        <div className="price-left">
                            <span>{this.state.realPrice}</span>
                            <span>{this.state.price}</span>
                        </div>
                        <span>{this.state.productType}</span>
                    </div>
                    <div className="quan">
                        <div className="quan-left">{this.state.productQuanPrice}</div>
                        <div className="quan-middle">
                            <div>优惠券</div>
                            <div>{`使用期限:${this.state.quanStart}-${this.state.quanEnd}`}</div>
                        </div>
                        <div className="quan-right">领券</div>
                    </div>
                </div>
                <div className="tuijian">
                    <div className="tuijian-title">推荐理由</div>
                    <div className="tuijian-container">{this.state.tuijian}</div>
                </div>
                <div className="imgs">
                    {this.state.bannerImgs.map((val, inx) => (
                        <img
                            src={val}
                            alt=""
                            key={inx}
                            style={{width: "100%", verticalAlign: "top"}}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event("resize"));
                                this.setState({imgHeight: "auto"});
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    getDetail() {
        console.log("this.props:", this.props.match.params);
        let skuid = this.props.match.params.skuid || "";
        let apiUrl = "https://huge.yaomall.tvm.cn/services/GetProductDetail";
        let params = {
            user_id: "hlg_oCLOAuHoQrBO182K6QJ6rIvXubKE",
            sku_id: skuid,
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
        if (!skuid) {
            Toast.hide();
            Toast.error("未获取到skuid");
            return false;
        }
        Axios.post(apiUrl, JSON.stringify(params)).then(req => {
            Toast.hide();
            this.setState({
                cssDisplay: "block"
            });
            if (!req) {
                Toast.fail("GetProductDetail not request.");

                return false;
            }

            if (req.data) {
                req = req.data;
            }

            if (req.data) {
                this.setState({
                    bannerImgs: req.data.product_image_list || [],
                    productName: req.data.product_name || "",
                    productSale: req.data.goods_sale_num || 0,
                    price: req.data.unit_price || 0,
                    productType: req.data.cps_type || "",
                    tuijian: req.data.introduce || ""
                });

                if (req.data.ba_coupon) {
                    let start = req.data.ba_coupon.start_time || "";
                    let end = req.data.ba_coupon.end_time || "";

                    start = start.replace(/-/gi, ".");
                    end = end.replace(/-/gi, ".");

                    this.setState({
                        productQuanPrice: req.data.ba_coupon.price || 0,
                        quanUrl: req.data.ba_coupon.activity_url || "",
                        quanStart: start,
                        quanEnd: end
                    });
                }

                let price = parseFloat(this.state.price);
                let quanPrice = parseFloat(this.state.productQuanPrice);

                this.setState({
                    realPrice: parseFloat(price - quanPrice).toFixed(2)
                });

                console.log("data:", req.data);
            }
        });
    }

    goBack() {
        this.props.history.push("/");
    }
}

export default withRouter(Detail);
