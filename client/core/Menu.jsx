import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';
import CartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import cart from './../cart/cart-helper';

const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#bef67a' };
  else return { color: '#ffffff' };
};

const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) return { color: '#bef67a' };
  else return { color: '#ffffff' };
};

const Menu = withRouter(({ history }) => (
  <div>
    <AppBar position="static" style={{ background: '#2E3B4E' }}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <IconButton aria-label="Home" style={isActive(history, '/')}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Link to="/shops/all">
            <Button style={isActive(history, '/shops/all')}>Shops</Button>
          </Link>
          <Link to="/cart">
            <Button style={isActive(history, '/cart')}>
              My Cart
              <Badge color="secondary" invisible={false} badgeContent={cart.itemTotal()} style={{ marginLeft: '1px' }}>
                <CartIcon />
              </Badge>
            </Button>
          </Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto', alignItems: 'flex-end' }}>
          <span>
            {!auth.isAuthenticated() && (
              <span>
                <Link to="/signup">
                  <Button style={isActive(history, '/signup')}>Sign Up</Button>
                </Link>
                <Link to="/signin">
                  <Button style={isActive(history, '/signin')}>Sign In</Button>
                </Link>
              </span>
            )}
            {auth.isAuthenticated() && (
              <span>
                {auth.isAuthenticated().user.seller && (
                  <Link to="/seller/shops">
                    <Button style={isPartActive(history, '/seller/')}>View My Shops</Button>
                  </Link>
                )}
                <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                  <Button style={isActive(history, `/user/${auth.isAuthenticated().user._id}`)}>View Profile</Button>
                </Link>
                <Button color="inherit" onClick={() => auth.clearJWT(() => history.push('/'))}>
                  Log Out
                </Button>
              </span>
            )}
          </span>
        </div>
      </Toolbar>
    </AppBar>
    
  </div>
));

export default Menu;
