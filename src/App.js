import React from "react";
import "./css/App.css";
import "antd-mobile/dist/antd-mobile.css";
import "lib-flexible";
import Banner from "./Banner";
import Funball from "./Funball";
import ProductList from "./ProductList";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Banner></Banner>
                <Funball></Funball>
                <ProductList></ProductList>
            </div>
        );
    }
}

export default App;
