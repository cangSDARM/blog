import {
  AppBar as MAppBar,
  Toolbar as MToolbar,
  Button as MIconButton,
  Typography as MTypography,
  SvgIcon as MSvg,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon as MListItemIcon,
  Avatar as MAvatar,
  ListSubheader,
  Divider,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";

const AppBar = styled(MAppBar)({
  userSelect: "none",
  background: "rebeccapurple",
  borderBottom: "1px solid rgba(50, 50, 50, 0.5)",
  overflow: "hidden" /*enable to BFC*/,
  justifyContent: "center",
  textDecoration: "none",
  fontFamily: "Source Sans Pro, Helvetica, Arial, sans-serif",
  height: 86 /* if want expanded to hidden Y scrollbar, need this*/,
});
const Toolbar = styled(MToolbar)({
  height: "96%",
});
const IconButton = styled(MIconButton)({
  minWidth: 48,
  maxWidth: 48,
  minHeight: 48,
  maxHeight: 48,
  marginRight: "2em",
});
const Typography = styled(MTypography)({
  fontFamily: "inherit",
  alignItems: "baseline",
});
const SvgIcon = styled(MSvg)({
  width: 32,
  height: 32,
});
const Avatar = styled(MAvatar)({
  width: 24,
  height: 24,
  borderRadius: 0,
});
const ListItemIcon = styled(MListItemIcon)({
  minWidth: 32,
});

export {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SvgIcon,
  Drawer,
  List,
  ListItemText,
  ListItemIcon,
  Avatar,
  ListSubheader,
  Divider,
  ListItem,
};
