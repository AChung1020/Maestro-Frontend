import React from "react"
import {Link} from "react-router-dom"
import SearchBar from "../Components/Search_Bar"
import MusiciansImage from "../Images/Homepage_Musicians.png"
function Home() {
    return <div className = "homepageOverall">
        <div className = "homepageLeft">
            <h1 className = "headerText">Where Musicians Meet Clients</h1>
            <Link to = '/Find_Events'> Search Listings </Link>
            <SearchBar/>
        </div>
        <div className = 'homepageRight'>
            <img src = {MusiciansImage}
                alt = "MusiciansImage"
                height = "1000px"
                width = "804px"
            />
        </div>
    </div>
};
export default Home;