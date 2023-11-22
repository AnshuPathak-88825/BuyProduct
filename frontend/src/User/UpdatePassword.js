import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../component/layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, updatePassword } from "../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstant";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
// import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, isUpdated } = useSelector((state) => state.profile);

  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    let myForm = {};
    myForm.oldpassword = oldpassword;
    myForm.newpassword = newpassword;
    myForm.confirmpassword = confirmpassword;
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      navigate(`/account`);

      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile updated successfully");
      navigate(`/account`);
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <Fragment>
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2>Update Profile</h2>
          <form
            className="updatePasswordForm"
            encType="multipart/form-data"
            onSubmit={updatePasswordSubmit}
          >
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="old password"
                required
                value={oldpassword}
                onChange={(e) => setoldpassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="new password"
                required
                value={newpassword}
                onChange={(e) => setnewpassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockIcon />
              <input
                type="password"
                placeholder="confirm password"
                required
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="updatePassword"
              className="updatePasswordBtn"
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
