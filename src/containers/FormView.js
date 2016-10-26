import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SubMenu from '../components/common/SubMenu';
import BusyIcon from '../components/common/BusyIcon';
import EventForm from '../components/item/EventForm';

import { loadTags, unloadTags } from '../actions/tags';
import { loadEvent, unloadEvent, createEvent, updateEvent } from '../actions/event';
import { unloadCachedData } from '../actions/events';
import { resetFilters } from '../actions/common';

import '../styles/form-view.css';

class FormView extends Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      // Show or hide scrim
      changing: false,
      item: { ...props.item
      }
    };
  }

  componentDidMount() {
    if (this.props.params.id) {
      // Load the item
      this.props.dispatch(loadEvent(this.props.params.id));
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.item != newProps.item) {
      this.setState({
        item: {
          ...newProps.item
        }
      });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(unloadEvent());
    return true;
  }

  // create of update item
  onSubmit(newItem) {
    // clear the annual cache
    const onComplete = (id) => {
      // clear the cache
      this.props.dispatch(unloadCachedData());
      this.props.dispatch(unloadTags());
      this.props.dispatch(resetFilters());

      this.setState({
        changing: false
      });

      if (id) {
        // When new item created, a id of new record will be called back
        // Redirect to new created item
        browserHistory.push(`/view/${id}`);
      }
    };

    this.setState({
      item: newItem,
      changing: true
    });

    if (newItem.id == null) {
      this.props.dispatch(createEvent(newItem, onComplete));
    } else {
      this.props.dispatch(updateEvent(newItem, onComplete));
    }
  }

  render() {
    const id = this.props.params.id;
    const {
      activeYear,
      activeMonth,
      activeDate,
      previousView
    } = this.props;
    const item = this.state.item;

    let title;
    let bodyDOM;

    if (id && item.id == null) {
      // loading
      title = 'Loading...';
      bodyDOM = (
        <div style={{ padding: '20px 10px' }}>
          <BusyIcon />
        </div>
      );
    } else {
      if (id) {
        // editing
        title = 'Modify Event';
      } else {
        // creating
        title = 'New Event';

        // initial year, month and date
        const date = new Date();
        item.year = activeYear === 0 ? date.getFullYear() : activeYear;
        item.month = activeMonth === 0 ? date.getMonth() + 1 : activeMonth;
        item.date = activeDate === 0 ? date.getDate() : activeDate;
      }
      bodyDOM = (
        <EventForm
          item={item}
          tags={this.props.tags}
          changing={this.state.changing}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
        />
      );
    }

    return (
      <div>
        <SubMenu previousView={previousView}>
          <div className="right">
            {title}
          </div>
        </SubMenu>
        {bodyDOM}
      </div>
    );
  }
}

FormView.propTypes = {
  item: PropTypes.object,
  tags: PropTypes.array,
  activeYear: PropTypes.number,
  activeMonth: PropTypes.number,
  activeDate: PropTypes.number,
  previousView: PropTypes.object,
  params: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  item: state.event.item,
  tags: state.tags.list,
  activeYear: state.events.activeYear,
  activeMonth: state.events.activeMonth,
  activeDate: state.events.activeDate,
  previousView: state.common.previousView
});

export default connect(
  mapStateToProps
)(FormView);
