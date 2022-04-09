import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Link from 'next/link';

export const mainListItems = (
  <React.Fragment>
    <Link href="/" >
      <ListItemButton>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href="/account/userProfile"  >
      <ListItemButton>
        <ListItemIcon>
          <PersonOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItemButton>
    </Link>
    <Link href="/admin/products" >
      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettingsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Panel" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
