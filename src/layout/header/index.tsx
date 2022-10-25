/**
 * @file Header index
 * @author Mingze Ma
 */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useKeycloak} from '@react-keycloak/web'
import _ from "lodash";
import {Badge, Divider, Stack, useTheme} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "src/reducer";
import actions from "src/actions";
import * as kcConfig from 'src/constant/keycloakConfig';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router-dom";
import Search from "src/layout/header/Search";


const pages = ['Products', 'Pricing', 'Blog'];
const SETTINGS = {
  BE_MERCHANT: 'Be A Merchant',
  account: 'Account',
  dashboard: 'Dashboard',
  logout: 'Logout'
};

interface ResponsiveAppBarProps {
  isAdmin?: boolean,
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = (props) => {
  const {isAdmin = false} = props;

  const theme = useTheme();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.global);

  const {keycloak} = useKeycloak();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === SETTINGS.logout) {
      keycloak.logout();
    }
    else if (setting === SETTINGS.BE_MERCHANT) {
      handleClickOpenDialog();
    } else if (setting === SETTINGS.dashboard) {
      window.open('/teacher/module/list');
    }
    setAnchorElUser(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const assignMerchantRole = async () => {
    if(keycloak.authenticated) {
      actions.getMerchantRole()
        .then((merchantRoleRes) => {
          console.log(merchantRoleRes);
          const reqBody = [merchantRoleRes];
          console.log(reqBody);
          actions.assignMerchantRoleToUser(keycloak.tokenParsed!.sub!, reqBody)
            .then(() => {
              setDialogOpen(false);
            })
            .catch((assignRoleError) => {
              console.log(assignRoleError.message);
            });
        })
        .catch((getMerchantError) => {
          console.log(getMerchantError.message);
        });
    }
    else {
      setDialogOpen(false);
      keycloak.logout();
    }
  };

  const isMerchant = (): boolean => {
    if (!keycloak.authenticated) return false;
    return keycloak.tokenParsed!.resource_access![`${kcConfig.KC_CLIENT_ID}`].roles.includes('merchant');
  };

  return (
    <AppBar position="fixed" sx={{bgcolor: theme.palette.background.default}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1, color: theme.palette.primary.main}}/>
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: {xs: 'none', md: 'flex'},
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            E-Learn
          </Typography>

          {!isAdmin && <>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: 'block', md: 'none'},
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography variant="h5" textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1, color: theme.palette.primary.main}}/>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              E-Learn
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              <Search />
              {/*{pages.map((page) => (*/}
              {/*  <Button*/}
              {/*    key={page}*/}
              {/*    onClick={handleCloseNavMenu}*/}
              {/*    sx={{my: 2, display: 'block'}}*/}
              {/*  >*/}
              {/*    <Typography variant="subtitle1" fontWeight="bold">{page}</Typography>*/}
              {/*  </Button>*/}
              {/*))}*/}
            </Box>
          </>}

          <Box  sx={{display: 'flex', flexGrow: 0}} onClick={() => navigate('/checkout')}>
            <IconButton aria-label="cart">
              <Badge variant="dot" color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Divider sx={{mx: {xs: 1, md: 2}}} orientation="vertical" variant="middle" flexItem />
          </Box>

          <Box sx={{flexGrow: 0}}>
            {keycloak.authenticated
              ? <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar
                      alt={_.get(user, 'userInfo.user_lastname', 'Unknown')}
                      src={_.get(user, 'userInfo.user_avatar', '#')}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{mt: '45px'}}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {_.values(SETTINGS).map((setting: string) => (
                    !(isMerchant() && setting === SETTINGS.BE_MERCHANT)
                    && (
                      <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>)
                  ))}
                </Menu>
              </>
              : <Stack spacing={1} direction="row">
                <Button onClick={() => keycloak.login()}>Sign in</Button>
                <Button
                  sx={{display: {xs: 'none'}}}
                  variant="outlined"
                  onClick={() => keycloak.register()}
                  color="secondary"
                >Sign up</Button>
              </Stack>
            }
          </Box>
        </Toolbar>
      </Container>
      <Box>
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm To Be A Merchant?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={assignMerchantRole} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppBar>
  );
};
export default ResponsiveAppBar;
