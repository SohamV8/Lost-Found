import React from "react";
import "./UserProfile.css";
import { FaUser } from "react-icons/fa";

import userData from "../dummyData/profileDummyData";

export default function UserProfile() {
  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-pic-container">
          <div className="profile-pic">
            <FaUser className="user-pic-icon" />
          </div>
        </div>
        <div className="profile-box">
          <div className="profile-details">
            <h2>{userData.name}</h2>
            <p>{userData.id}</p>
            <p>{userData.email}</p>
          </div>
          <div className="profile-buttons">
            <button className="profile-btn">Edit Profile</button>
            <button className="profile-btn">Edit Post</button>
          </div>
        </div>
      </div>
      
      <div className="posted-detail">
        <h3 className="posted-heading">Posted</h3>
        <table className="posts-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Date Lost</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {userData.posts.map((post, index) => (
              <tr key={index}>
                <td>
                  <div className="post-photo"></div>
                </td>
                <td>{post.name}</td>
                <td>{post.dateLost}</td>
                <td>{post.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
