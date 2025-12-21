import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
     const navigate = useNavigate();
    return (
        <div style={{background: "light-gray"}}>
            <button onClick={() => navigate("/")}> Overview of databases </button>
            {/* <button onClick={() => navigate("/login")}> Login view </button> */}
            <button onClick={() => navigate("/trade")}> Trade prototype </button>
            <button onClick={() => navigate("/generateworld/")}> Generate new world </button>
        </div>
    )
}

export default Header
