import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth: number;
}

/**
 * MUIのカスタムAppBar
 *
 * @param open ドロワーの開閉状態
 */
export const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) =>
    prop !== "open" && prop !== "drawerWidth",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
