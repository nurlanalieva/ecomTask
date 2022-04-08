import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Link from "@mui/material/Link";

export const mainListItems = (
  <React.Fragment>
    <Link href="/dashboard" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href="/account/userProfile" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <PersonOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItemButton>
    </Link>
    <Link href="/admin/products" underline="none" color="inherit">
      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettingsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Panel" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
