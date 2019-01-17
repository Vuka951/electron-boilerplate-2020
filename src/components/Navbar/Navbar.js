import React, {Component} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {setLocale} from '../../actions/locale';
import NavItem from './NavItem';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle Navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <NavItem path="/"><FormattedMessage id="navbar-homepage" defaultMessage="Home"/></NavItem>
            <NavItem path="/about"><FormattedMessage id="navbar-about" defaultMessage="About"/></NavItem>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Languages
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a onClick={() => this.props.setLocale('en')} className="dropdown-item">EN</a>
                <a onClick={() => this.props.setLocale('sr')} className="dropdown-item">SR</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  setLocale: propTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, {setLocale}, null, {pure: false})(Navbar);
