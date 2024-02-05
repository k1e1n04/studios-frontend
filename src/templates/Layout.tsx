"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
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
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { CustomAppBar } from "@/molecules/CustomAppBar";
import { StyledDrawerHeader } from "@/atoms/StyledDrawerHeader";
import Link from "next/link";
import { views } from "@/constants/views";
import { useRecoilState } from "recoil";
import { isLoggedInAtom, useInitializeLoggedIn } from "@/states/isLoggedInAtom";
import { useRouter } from "next/navigation";
import { LogoutButton } from "@/molecules/Auth/LogoutButton";
import {useState} from "react";
import {isThrottledAtom} from "@/states/isThrottledAtom";
import {Button} from "@mantine/core";

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
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isThrottled, setIsThrottled] = useRecoilState(isThrottledAtom);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  useInitializeLoggedIn();

  // ログインしていない場合はログイン画面にリダイレクト
  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push(views.AUTH_LOGIN.path);
    }
  }, [isLoggedIn]);

  /**
   * 学び管理のドロワーのコンポーネント
   */
  const studyDrawerComponents = [
    {
      name: views.STUDY_LIST.name,
      path: views.STUDY_LIST.path,
      icon: <FormatListBulletedIcon />,
    },
    {
      name: views.STUDY_REGISTER.name,
      path: views.STUDY_REGISTER.path,
      icon: <AppRegistrationIcon />,
    },
    {
      name: views.STUDY_REVIEW_LIST.name,
      path: views.STUDY_REVIEW_LIST.path,
      icon: <RateReviewIcon />,
    },
    {
      name: views.STUDY_TAG_LIST.name,
      path: views.STUDY_TAG_LIST.path,
      icon: <FormatListBulletedIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar
        position="fixed"
        open={open}
        drawerWidth={drawerWidth}
        color={"secondary"}
        sx={{ boxShadow: "none" }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "bold" }}
            color="primary"
          >
            <Link href={views.STUDY_LIST.path} color="primary">
              Studyo
            </Link>
          </Typography>
          <LogoutButton />
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
        <List>
          <StyledDiv>学び管理</StyledDiv>
          {studyDrawerComponents.map((component) => (
            <ListItem key={component.name} disablePadding>
              <Link
                href={component.path}
                passHref
                style={{ display: "flex", width: "100%" }}
              >
                <ListItemButton>
                  <ListItemIcon>{component.icon}</ListItemIcon>
                  <ListItemText primary={component.name} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <StyledDrawerHeader />
          {children}
      </Main>
      <Dialog open={isThrottled}>
        <DialogTitle>リクエストが混み合っています</DialogTitle>
        <DialogContent>
          <DialogContentText>
            時間をおいて再度お試しください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsThrottled(false)}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
