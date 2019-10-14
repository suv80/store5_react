import React from "react";
import "./css/ProductList.css";
import {Flex, Toast, Button} from "antd-mobile";
import Axios from "axios";

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            offset: 0,
            limit: 20,
            _$(str) {
                return document.querySelectorAll(str);
            },
            isApi: false
        };
        this.postApi();
    }

    render() {
        window.addEventListener("scroll", e => {
            let H = this.state._$("html")[0].clientHeight;
            H = H || this.state._$("body")[0].clientHeight;
            let scroll = this.state._$("html")[0].scrollTop;
            scroll = scroll || this.state._$("body")[0].scrollTop;
            let nextTop = this.refs.next.offsetTop;

            if (H + scroll >= nextTop) {
                this.postApi();
            }
        });

        return (
            <div>
                {this.state.dataSource.map((item, inx) => {
                    return this.getItem(item, inx);
                })}
                <div ref="next"></div>
                <Button ref="button" loading>
                    loading button
                </Button>
            </div>
        );
    }

    getItem(item, inx) {
        return (
            <Flex className="p-list-item" key={inx} align="start" justify="between">
                <div className="p-left">
                    <img className="p-img" src={this.getPImg(item)}></img>
                </div>
                <div className="p-right">
                    <div className={"p-name" + " " + this.getType(item)}>{item.product_name}</div>
                    <Flex justify="between">
                        {this.getCouponInfo(item)}
                        {this.getSaleInfo(item)}
                    </Flex>
                    <Flex justify="between">
                        <div className="p-price">
                            <span>{this.getRealPrice(item)}</span>
                            <span>{this.getPrice(item)}</span>
                        </div>
                    </Flex>
                    <Flex justify="between">{this.getBackCash(item)}</Flex>
                </div>
            </Flex>
        );
    }

    getPImg(obj) {
        let defaultImg = "https://assets.yaomall.tvm.cn/Uploads/store5/imgs/default_product.png";
        let pimg = obj.product_image || "";

        if (!pimg) {
            pimg = defaultImg;
        }

        return pimg;
    }

    getType(obj) {
        if (/(京东)/gi.test(obj.cps_type)) {
            if (/【/gi.test(obj.product_name)) {
                return "jd";
            } else {
                return "jd right-padding";
            }
        } else if (/(淘宝)|(天猫)/gi.test(obj.cps_type)) {
            if (/【/gi.test(obj.product_name)) {
                return "taobao";
            } else {
                return "taobao right-padding";
            }
        }
    }

    getRealPrice(obj) {
        let uprice = obj.unit_price || 0;
        let cprice = 0;
        let commission = obj.commission || 0;

        if (obj.ba_coupon) {
            cprice = obj.ba_coupon.price || 0;
        }

        return "¥" + parseFloat(uprice - cprice - commission).toFixed(2);
    }

    getPrice(obj) {
        let uprice = obj.unit_price || 0;

        return "¥" + uprice;
    }

    getCouponInfo(obj) {
        let cprice = 0;

        if (obj.ba_coupon) {
            cprice = parseInt(obj.ba_coupon.price) || 0;

            if (cprice <= 0) {
                return "";
            } else {
                return <div className="p-coupon">{cprice + "元券"}</div>;
            }
        } else {
            return "";
        }
    }

    getSaleInfo(obj) {
        let saleNum = obj.sales_volume || 0;

        return <div className="sale-num">{"月销：" + saleNum}</div>;
    }

    getBackCash(obj) {
        let back = obj.commission || 0;

        return <div className="back-cash">{"赚：￥" + back}</div>;
    }

    postApi() {
        if (this.state.isApi) {
            return false;
        }

        this.setState({
            isApi: true
        });

        Axios.post(
            "https://huge.yaomall.tvm.cn/services/GetMPTProducts",
            JSON.stringify({
                from: "app",
                tag_id: "00000000-0000-0000-0000-000000000004",
                offset: this.state.offset,
                limit: this.state.limit
            })
        )
            .then(req => {
                console.log("req:", req);

                if (!req) {
                    Toast.fail("接口未返回");

                    return false;
                }

                if (!req.data) {
                    Toast.fail("接口未返回数据");

                    return false;
                }

                if (req.data.data) {
                    Toast.success("数据返回成功");

                    let dataArr = this.state.dataSource.concat(req.data.data);

                    this.setState({
                        dataSource: dataArr
                    });

                    console.log("ds:", this.state.dataSource);
                }

                let offset = parseInt(this.state.offset);
                let limit = parseInt(this.state.limit);
                let newOffset = offset + limit;

                this.setState({
                    isApi: false,
                    offset: newOffset
                });
            })
            .catch(err => {
                console.log("err:", err);

                this.setState({
                    isApi: false
                });
            });
    }
}

export default ProductList;
