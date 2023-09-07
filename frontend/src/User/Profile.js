import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../component/layout/MetaData";
import Loader from "../component/layout/Loader/Loader";
import { useSelector } from "react-redux";
import "./Profile.css"

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {isAuthenticated && user ? (
            <Fragment>
              <MetaData title={`${user.name}'s Profile`} />
              <div className="profileContainer">
                <div>
                  <h1>My Profile</h1>
                  <img src={user.avtar.url} alt={user.name} />
                  <Link to="/me/update">Edit Profile</Link>
                </div>
                <div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </div>
                 

                  <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <div>
              {isAuthenticated ? (
                "Loading..."
              ) : (
                <p>Please log in to view your profile.</p>
              )}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;

