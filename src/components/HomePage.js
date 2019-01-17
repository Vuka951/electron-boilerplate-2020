import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <i className="fab fa-linkedin-in"></i>
          <FormattedMessage id="homepage-text" defaultMessage="This is some Text on the home page"/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
