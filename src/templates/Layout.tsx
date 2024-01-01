import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { CustomAppBar } from "../molecules/AppBar.tsx";
import { StyledDrawerHeader } from "../atoms/StyledDrawerHeader.tsx";

type Props = {
  children: React.ReactNode;
};

const StyledDiv = styled("div")`
  font-size: 0.8rem;
  color: #929292;
  margin-left: 10px;
`;

const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop: string) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: "5%",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const Layout: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={open} drawerWidth={drawerWidth}>
        <Toolbar>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <Link href="/" color={"secondary"} underline="none">
              Studios
            </Link>
          </Typography>
        </Toolbar>
      </CustomAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <StyledDrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </StyledDrawerHeader>
        <Divider />
        <List>
          <StyledDiv>学び管理</StyledDiv>
          <ListItem key="学び一覧" disablePadding>
            <ListItemButton component={RouterLink} to="/">
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="学び一覧" />
            </ListItemButton>
          </ListItem>
          <ListItem key="学び登録" disablePadding>
            <ListItemButton component={RouterLink} to="/study/create">
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary="学び登録" />
            </ListItemButton>
          </ListItem>
          <ListItem key="復習一覧" disablePadding>
            <ListItemButton component={RouterLink} to="/studies/review">
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <ListItemText primary="復習一覧" />
            </ListItemButton>
          </ListItem>
          <Divider sx={{ mb: "10px" }} />
          <StyledDiv>タグ管理</StyledDiv>
          <ListItem key="タグ一覧" disablePadding>
            <ListItemButton component={RouterLink} to="/tags">
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="タグ一覧" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <StyledDrawerHeader />
        {children}
      </Main>
    </Box>
  );
};