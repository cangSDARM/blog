import {
  Avatar as MAvatar,
  Divider,
  Drawer as MDrawer,
  ListItemIcon as MListItemIcon,
  ListItemText,
  Typography as MTypography,
} from "@material-ui/core";
import { styled, withStyles } from "@material-ui/styles";

const Drawer = withStyles({
  paper: {
    backgroundColor: "#fff",
  },
})(MDrawer);
const Typography = styled(MTypography)({
  fontFamily: "inherit",
  alignItems: "baseline",
});
const Avatar = styled(MAvatar)({
  width: 24,
  height: 24,
  borderRadius: 0,
});
const ListItemIcon = styled(MListItemIcon)({
  minWidth: 32,
});

export { Typography, Drawer, ListItemText, ListItemIcon, Avatar, Divider };
