import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {useDispatch} from "react-redux"
import { logout } from "../../../actions/userAction";
function UserOptions({ user }) {
 const dispatch= useDispatch()
  const alert = useAlert();
  const navigate = useNavigate();

  const orders = () => {
    navigate("/orders");
  };

  const account = () => {
    navigate("/account");
  };

  const logoutUser = () => {
    dispatch(logout());
    alert.success("logout completed");
  };

  const dashboard = () => {
    navigate("/dashboard");
  };

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avtar.url ? user.avtar.url : "/profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => {
          return (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
            />
          );
        })}
      </SpeedDial>
    </Fragment>
  );
}

export default UserOptions;
