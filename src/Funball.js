import React from "react";
import "./css/iconfont.css";
import "./css/Funball.css";
import {Flex, WhiteSpace} from "antd-mobile";

class Funball extends React.Component {
    render() {
        return (
            <div className="funball">
                <WhiteSpace size="lg"></WhiteSpace>
                <Flex style={{textAlign: "center"}}>
                    <Flex.Item>
                        <div className="iconfont icon-shiwu"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>食品</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="iconfont icon-naiping"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>母婴</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="iconfont icon-juanzhi"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>日用</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="iconfont icon-nvren"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>女装</div>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="xl"></WhiteSpace>
                <Flex style={{textAlign: "center"}}>
                    <Flex.Item>
                        <div className="iconfont icon-pingbandiannao"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>数码</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="iconfont icon-bingxiang"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>家电</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="iconfont icon-hufupin"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>个护</div>
                    </Flex.Item>
                    <Flex.Item>
                        <div className="iconfont icon-bangqiu"></div>
                        <WhiteSpace size="sm"></WhiteSpace>
                        <div>运动</div>
                    </Flex.Item>
                </Flex>
                <WhiteSpace size="lg"></WhiteSpace>
            </div>
        );
    }
}

export default Funball;
