import React, { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Link from "next/link";
import { connect } from "react-redux";
import { checkAuth } from "../store/actions/auth";

const MainListItems = (props) => {
  const [loggedIn, setloggedIn] = useState()
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setloggedIn(props.loggedIn)
  }, [])
  
  return (
    <>
      <React.Fragment>
        <Link href="/">
          <ListItemButton>
            <ListItemIcon>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </Link>
        { loggedIn? (
          <Link href="/account/userProfile">
            <ListItemButton>
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </Link>
        ) : null}

        <Link href="/admin/products">
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </ListItemButton>
        </Link>
      </React.Fragment>
    </>
  );
};

const mapStateToProps = ({ auth: { authChecked, loggedIn, currentUser } }) => {
  return { authChecked, loggedIn, currentUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCheckAuth: () => dispatch(checkAuth()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainListItems);
