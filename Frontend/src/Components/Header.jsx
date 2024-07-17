import React, { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { Link } from "react-router-dom";
import ncu from "../assets/ncu.png";
import ncuDark from "../assets/ncuDark.png";
import "../App.css";
import "./header.css";
import ToggleSwitch from "./ToggleSwitch"; // Adjust the path if necessary
import { decodeToken } from 'jwt-decode'; // Corrected import

function Header() {
  const [user, setUser] = useState({});
  const [isChecked, setIsChecked] = useState(true);
  const [imgUrl, setImgUrl] = useState(ncuDark);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token :" + response.credential);
    var userObject = decodeToken(response.credential); // Use decodeToken instead of jwtDecode
    console.log(userObject);
    setUser(userObject);
    document.getElementById("profileBtn").hidden = false;
    document.getElementById("signInDiv").hidden = true;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "957033742281-1rd2kunk0u0dmj4h822l7mf17bdc9go1.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );

  }, []);

  useEffect(() => {
    if (isChecked) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isChecked]);

  const handleChange = () => {
    isChecked ? setImgUrl(ncu) : setImgUrl(ncuDark);
    setIsChecked(!isChecked);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const bodyClass = document.body.classList;
    if (isDarkMode) {
      bodyClass.add("dark");
    } else {
      bodyClass.remove("dark");
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <header className="page-header">
        <div className="logo">
          <Link to="/Home">
            <img alt="logo" src={imgUrl} className="logo-img" />
          </Link>
        </div>
        <div className="head">
          <nav className="navbar">
            <Link to="/Home">HOME</Link>
            <Link to="/Lostitm">LOST ITEMS</Link>
            <Link to="/Founditm">FOUND ITEMS</Link>
            <Link to="/Report">REPORT</Link>
          </nav>
        </div>
        {/* <ToggleSwitch onToggle={handleToggle} /> */}
        <div className="Switch">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon"></i>
            <i className="fas fa-sun"></i>
            <span className="balldark"></span>
          </label>
        </div>
        <div className="btns">
          {/* <GoogleLogin  onSuccess={responseMessage} onError={errorMessage} /> */}
          <button id="signInDiv"></button>

          <Link className="blue-btn" id="profileBtn" hidden={!user.name} to="/Profile">
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/ios-filled/50/gender-neutral-user.png"
              alt="Profile"
            />
            {user.name}
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Header;
