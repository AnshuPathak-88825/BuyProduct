import React, { Fragment, useEffect, useState } from "react";
import "./UpdateUser.css";
import Loader from "../component/layout/Loader/Loader";
import Profile from "../../images/Profile.png";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, updateUser } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../constants/userConstant";

const UserUpdate = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    let myForm = {};
    myForm.name = name;
    myForm.email = email;
    myForm.avatar = avatar;
    dispatch(updateUser(myForm));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();

    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avtar);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      dispatch(loadUser());
      navigate(`/account`);
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated, user]);
  return (
    <Fragment>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2>Update Profile</h2>
          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div id="updateProfileImage">
              <img src={Profile} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleImage}
              />
            </div>
            <input
              type="submit"
              value="updateProfile"
              className="updateProfileBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UserUpdate;
