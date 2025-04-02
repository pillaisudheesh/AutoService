import React from "react";
import Main from "./Main";
import Content from "./Content";
import Profile from "../components/Profile/Profile";
import Stats from "../components/Stats/Stats";
import Bookings from "../components/Booking/Bookings";

const Dashboard = ({darkMode}) => {
    return (
        <Main>
            <Content>
                <Stats darkMode={darkMode} />
                <Bookings />
                <div className="flex flex-col gap-3 lg:flex-row"></div>
            </Content>
            <Profile />
        </Main>
    );
};

export default Dashboard;
