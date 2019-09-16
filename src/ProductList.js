import React from "react";
import "./css/ProductList.css";
import {Toast, ListView} from "antd-mobile";
import Axios from "axios";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource,
            isLoading: false
        };
        this.postApi();
    }

    render() {
        return (
            <div className="p-list">
                <ListView
                    className="p-list"
                    dataSource={this.state.dataSource}
                    renderRow={this.getRow}
                    initialListSize="20"
                ></ListView>
            </div>
        );
    }

    getRow(data, sid, rid, selector) {
        return <div className="p-list-item">{data.product_name}</div>;
    }

    postApi() {
        Axios.post(
            "https://huge.yaomall.tvm.cn/services/GetMPTProducts",
            JSON.stringify({from: "app", tag_id: "00000000-0000-0000-0000-000000000004", offset: 0, limit: 20})
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

                    let resultData = {};

                    req.data.data.map((item, inx) => {
                        resultData[inx] = item;
                    });

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(resultData)
                    });

                    console.log("ds:", this.state.dataSource);
                }
            })
            .catch(err => {
                console.log("err:", err);
            });
    }
}

export default ProductList;
