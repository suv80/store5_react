import React from "react";
import "./css/App.css";
import "antd-mobile/dist/antd-mobile.css";
import "lib-flexible";
import Banner from "./Banner";
import Funball from "./Funball";
import ProductList from "./ProductList";

class App extends React.Component {
    render() {
        window.addEventListener("popstate", e => {
            console.log(e);
            console.log(e.currentTarget.location.href);
            console.log(e.target.location.href);

            return false;
        });
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
