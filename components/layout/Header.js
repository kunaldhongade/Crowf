import { useSession, signIn, signOut } from "next-auth/react";
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
import GoogleIcon from "@mui/icons-material/Google";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Wallet from "./Wallet.js";
import Link from "next/link";
import * as React from "react";

const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const Router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    <Typography
      variant="h6"
      sx={{ my: 2, fontFamily: "Russo One", textAlign: "center" }}
    >
      Crowf
    </Typography>;
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontFamily: "Russo One", textAlign: "center" }}
      >
        Crowf
      </Typography>
      <Divider />
      <List>
        <ListItem key={"campaign"} disablePadding>
          <Link href={"/"}>
            <span active={Router.pathname == "/" ? true : false}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={"campaign"} />
              </ListItemButton>
            </span>
          </Link>
        </ListItem>

        <ListItem key={"create campaign"} disablePadding>
          <Link href={"/createcampaign"}>
            <span active={Router.pathname == "/createcampaign" ? true : false}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={"create campaign"} />
              </ListItemButton>
            </span>
          </Link>
        </ListItem>

        <ListItem key={"dashboard"} disablePadding>
          <Link href={"/dashboard"}>
            <span active={Router.pathname == "/dashboard" ? true : false}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={"dashboard"} />
              </ListItemButton>
            </span>
          </Link>
        </ListItem>

        <ListItem key={"Connect Wallet"} sx={{ paddingLeft: 2 }}>
          <Wallet />
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ backgroundColor: "#9c27b0" }}>
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
          <Link href={"/"}>
            <Typography
              variant="h6"
              component="div"
              noWrap
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block", fontFamily: "Russo One" },
              }}
            >
              Crowf
            </Typography>
          </Link>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button key={"campaign"} sx={{ color: "#fff" }}>
              <Link href={"/"}>
                <span active={Router.pathname == "/" ? true : false}>
                  Campaigns
                </span>
              </Link>
            </Button>
            <Button key={"create campaign"} sx={{ color: "#fff" }}>
              <Link href={"/createcampaign"}>
                <span
                  active={Router.pathname == "/createcampaign" ? true : false}
                >
                  createcampaign
                </span>
              </Link>
            </Button>
            <Button key={"Dashboard"} sx={{ color: "#fff" }}>
              <Link href={"/dashboard"}>
                <span active={Router.pathname == "/dashboard" ? true : false}>
                  Dashboard
                </span>
              </Link>
            </Button>
            {status === "authenticated" ? (
              <Button
                onClick={() => signOut()}
                key={"Logout"}
                sx={{ color: "#fff" }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                onClick={() => signIn("google")}
                key={"Google Login"}
                sx={{ color: "#fff" }}
              >
                <GoogleIcon />
              </Button>
            )}
            <Button key={"Connect Wallet"} sx={{ color: "#fff" }}>
              <Wallet />
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;
