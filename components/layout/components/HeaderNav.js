// import React from 'react';
// import styled from 'styled-components';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// const HeaderNav = () => {
//     const Router = useRouter();
//     return (
//         <HeaderNavWrapper>
//             <Link href={'/'}><HeaderNavLinks active={Router.pathname == "/" ? true : false}>
//                 Campaigns
//             </HeaderNavLinks></Link>

//             <Link href={'/createcampaign'}><HeaderNavLinks active={Router.pathname == "/createcampaign" ? true : false}>
//                 Create Campaigns
//             </HeaderNavLinks></Link>

//             <Link href={'/dashboard'}><HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false}>
//                 Dashboard
//             </HeaderNavLinks></Link>

//         </HeaderNavWrapper>
//     )
// }

// const HeaderNavWrapper = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     background-color: ${(props) => props.theme.bgDiv};
//     border-radius: 10px;
//     padding: 6px;
//     height: 50%;
// `;

// const HeaderNavLinks = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     background-color: ${(props) => props.active ? props.theme.bgSubDiv : props.theme.bgDiv};
//     height:100%;
//     font-family: 'Rubik', sans-serif;
//     margin: 5px;
//     border-radius: 10px;
//     padding: 0 5px 0 5px;
//     cursor: pointer;
//     font-weight: bold;
//     font-size: small;

// `;

// export default HeaderNav;


import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from 'next/link';
import { useRouter } from 'next/router';


const drawerWidth = 240;

const HeaderNav = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Crowf
            </Typography>
            <Divider />
            <List>
                <ListItem key={"campaign"} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText primary={"campaign"} />
                    </ListItemButton>
                </ListItem>

                <ListItem key={"create campaign"} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText primary={"create campaign"} />
                    </ListItemButton>
                </ListItem>

                <ListItem key={"dashboard"} disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText primary={"dashboard"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                    >
                        Crowf
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Button key={"campaign"} sx={{ color: "#fff" }}>
                            {"campaign"}
                        </Button>
                        <Button key={"create campaign"} sx={{ color: "#fff" }}>
                            {"create campaign"}
                        </Button>
                        <Button key={"Dashboard"} sx={{ color: "#fff" }}>
                            {"Dashboard"}
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
export default HeaderNav;
