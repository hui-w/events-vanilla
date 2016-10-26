import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import SubMenu from '../components/common/SubMenu';
import BusyIcon from '../components/common/BusyIcon';
import YearSelect from '../components/list/YearSelect';
import MonthBox from '../components/list/MonthBox';
import { setActiveValue } from '../actions/events';
import { updatePreviousView } from '../actions/common';
import { eventListToHierarchy, filterList } from '../util';

import '../styles/list-view.css';

class ListView extends Component {
  constructor() {
    super();

    this.onItemClick = this.onItemClick.bind(this);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.setYear(this.props.params.year);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.monthlyList) {
      this.setState({
        loading: false
      });
    }

    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setYear(nextProps.params.year);
    }
  }

  componentWillUnmount() {
    const {
      activeYear
    } = this.props;
    this.props.updatePreviousView(`Year ${activeYear}`, this.props.location.pathname);
  }

  onItemClick(id) {
    browserHistory.push(`/view/${id}`);
  }

  setYear(year) {
    this.setState({
      loading: true
    });

    let intYear;
    if (!year) {
      // get the current year
      const today = new Date();
      intYear = today.getFullYear();
    } else {
      intYear = parseInt(year, 10);
    }

    // dispatch the action
    this.props.activeYearSet(intYear);
  }

  render() {
    const {
      monthlyList,
      years,
      activeYear
    } = this.props;

    // the list of monthly data
    let monthlyListDOM;
    if (this.state.loading) {
      monthlyListDOM = <div style={{ margin: '15px 10px' }}><BusyIcon /></div>;
    } else {
      monthlyListDOM = monthlyList.map((monthlyItem, index) =>
        <MonthBox key={index} year={activeYear} item={monthlyItem} onItemClick={this.onItemClick} />
      );
    }

    // the list of year links
    const yearListDOM = years && years.length > 0 ? (<div>
        Years: {' '}
        {years.map(year =>
          <span key={year}>
            <Link to={{ pathname: `/list/${year}` }}>{year}</Link>
            {' '}
          </span>
        )}
    </div>) : ' ';

    return (
      <div>
        <SubMenu>
          <Link to={{ pathname: '/edit/' }} className="link-button">+ New Event</Link>
          <div className="right">
            <YearSelect
              yearList={years}
              selectedYear={parseInt(activeYear, 10)}
              onChange={(year) => browserHistory.push(`/list/${year}`)}
            />
          </div>
        </SubMenu>
        <div className="list-view">
          {monthlyListDOM}
        </div>
        <div className="year-list">
          {yearListDOM}
        </div>
      </div>
    );
  }
}

ListView.propTypes = {
  activeYear: PropTypes.number,
  years: PropTypes.array,
  monthlyList: PropTypes.array,
  location: PropTypes.object,
  params: PropTypes.object,
  activeYearSet: PropTypes.func,
  updatePreviousView: PropTypes.func
};

const getListByYear = (lists, year) => {
  if (lists && lists[year]) {
    return lists[year];
  }

  return [];
};

const mapStateToProps = (state) => {
  const events = getListByYear(state.events.annualEvents, state.events.activeYear);
  const fList = filterList(events, state.common.filters);
  const monthlyList = eventListToHierarchy(fList);
  return {
    monthlyList,
    years: state.events.years,
    activeYear: state.events.activeYear
  };
};

const mapDispatchToProps = (dispatch) => ({
  activeYearSet: (year) => {
    dispatch(setActiveValue(year, 0, 0));
  },
  updatePreviousView: (title, url) => {
    dispatch(updatePreviousView(title, url));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListView);
