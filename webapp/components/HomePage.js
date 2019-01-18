import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import axios from 'axios';

class HomePage extends Component {
  componentDidMount() {
    axios.get('http://localhost:3000')
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
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
