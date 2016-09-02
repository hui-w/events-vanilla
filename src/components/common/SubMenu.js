import React from 'react';
import { Link } from 'react-router';
import { isEmpty } from '../../util';
import '../../styles/sub-menu.css';

export default function SubMenu({ previousView, children }) {
  let submenu;
  if (children || previousView) {
    const backButton = previousView && !isEmpty(previousView) &&
      <div className="back-button">
        <Link to={{ pathname: previousView.url }} className="link-button">Back to {previousView.title}</Link>
      </div>;
    submenu = (
      <div className="sub-menu clearfix">
        {backButton}
        {children}
      </div>
    );
  } else {
    submenu = (<div />);
  }
  return submenu;
}
