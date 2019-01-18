import React from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';

const NavItem = (props) => {
  const pageURI = window.location.pathname+window.location.search;
  const liClassName = (props.path === pageURI) ? 'nav-item active' : 'nav-item';
  const aClassName = props.disabled ? 'nav-link disabled' : 'nav-link';
  return (
    <span className={liClassName}>
      <Link to={props.path} className={aClassName}>
        {props.children}
        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
      </Link>
    </span>
  );
};

NavItem.propTypes = {
  path: propTypes.string.isRequired,
  disabled: propTypes.string,
  children: propTypes.object.isRequired,
};

export default NavItem;
