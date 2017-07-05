import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import FilterBox from '../components/common/FilterBox';
import { updateFilters } from '../actions/common';

import '../styles/header.css';

class Header extends Component {
  constructor(props, context) {
    super(props, context);
    this.closeFilterBox = this.closeFilterBox.bind(this);
    this.state = {
      expandFiler: false
    };
  }

  closeFilterBox() {
    this.setState({
      expandFiler: false
    });
  }

  render() {
    return (
      <header className="header">
        <div className="menu">
          {this.props.children}
        </div>
        <div className="right">
          <div
            className="svg-btn" title="Set Filter"
            onClick={() => this.setState({ expandFiler: !this.state.expandFiler })}
          >
            <svg viewBox="0 0 512 512" width="28" height="28">
              <rect width="512" height="512" stroke="none" fill="#404040" />
              <path
                d="M510.5,28.9c-2.6-5.4-8-8.9-14-8.9h-481c-6,0-11.5,3.5-14,8.9
                c-2.6,5.4-1.8,11.9,2.1,16.5l184.9,224.2v206.8
                c0,5.4,2.8,10.4,7.3,13.2c2.5,1.5,5.3,2.3,8.2,2.3
                c2.4,0,4.7-0.5,6.9-1.6l103.9-51.5c5.3-2.6,8.6-8,8.6-13.9l0.2-155.3L508.5,45.4
                C512.3,40.8,513.1,34.4,510.5,28.9z M296.1,254.2c-2.3,2.8-3.5,6.3-3.5,9.9l-0.2,151.3l-72.9,36.1
                V264.1c0-3.6-1.3-7.1-3.5-9.9
                L48.4,51.1h415.2L296.1,254.2z" fill="#FFFFFF"
              />
            </svg>
          </div>
          <div className="svg-btn" title="New Event" onClick={() => browserHistory.push('/edit/')}>
            <svg viewBox="0 0 512 512" width="28" height="28">
              <rect width="512" height="512" stroke="none" fill="#404040" />
              <polygon
                points="496,240.2 271.8,240.2 271.8,16 240.2,16 240.2,240.2 16,240.2 16,271.8 240.2,271.8
                    240.2,496 271.8,496 271.8,271.8 496,271.8" fill="#FFFFFF"
              />
            </svg>
          </div>
        </div>
        {this.state.expandFiler &&
          <FilterBox
            filters={this.props.filters}
            onChange={(filters) => this.props.dispatch(updateFilters(filters))}
            onClose={this.closeFilterBox}
          />
        }
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  filters: PropTypes.object,
  children: PropTypes.array
};

const mapStateToProps = (state) => ({
  filters: state.common.filters
});

export default connect(
  mapStateToProps
)(Header);
