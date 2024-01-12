import React from "react";
import Navigation from '../Navigation';
import {Outlet} from "react-router-dom";

    
const Layout = (props) => {    

    console.log("Layout.render() Call")
    console.log(props);

    const NavBarCSS = {
    display:"flex",
    justifyContent: "flex-start"
    }

    return (
        <div className="App">
            <header className="App-header">
                <Navigation sx={NavBarCSS} user={props.user}/>
                <Outlet/>
            </header>
        </div>
    );
}

export default Layout;