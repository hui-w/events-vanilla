import React from 'react';
import PropTypes from 'prop-types';
import { Link, IndexLink } from 'react-router';
import Header from '../../containers/Header';
import '../../styles/app.css';

export default function App({ children }) {
  return (
    <div>
      <Header>
        <IndexLink to="/" activeClassName="active-item">Home</IndexLink>
        <Link to="/calendar" activeClassName="active-item">Calendar</Link>
        <Link to="/search" activeClassName="active-item">Search</Link>
        {/* <Link to="/settings" activeClassName="active-item">Settings</Link> */}
      </Header>
      <div className="main">{children}</div>
      <footer className="footer">
        <div className="copyright">
          &copy; Events Vanilla {
            process.env.NODE_ENV === 'development' &&
              <span>- NODE_ENV [{process.env.NODE_ENV}]</span>
          }
        </div>
      </footer>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object
};
