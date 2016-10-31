import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SubMenu from '../components/common/SubMenu';
import BusyIcon from '../components/common/BusyIcon';
import EventForm from '../components/item/EventForm';

import { unloadTags } from '../actions/tags';
import { initEvent, loadEvent, unloadEvent, createEvent, updateEvent } from '../actions/event';
import { unloadCachedData } from '../actions/events';
import { resetFilters } from '../actions/common';

import '../styles/form-view.css';

class FormView extends Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      // Show or hide scrim
      changing: false
    };
  }

  componentDidMount() {
    if (this.props.params.id) {
      // Editing: Load the item
      this.props.dispatch(loadEvent(this.props.params.id));
    } else {
      // Adding: Init the item
      this.props.dispatch(initEvent(this.props));
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.id && !newProps.params.id) {
      // When changing from edit mode to add mode
      newProps.dispatch(initEvent(newProps));
    }
  }

  componentWillUnmount() {
    // Unload the item to avoid showing next time before laoding
    this.props.dispatch(unloadEvent());
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
      changing: true
    });

    if (newItem.id == null) {
      this.props.dispatch(createEvent(newItem, onComplete));
    } else {
      this.props.dispatch(updateEvent(newItem, onComplete));
    }
  }

  onCancel() {
    const id = this.props.params.id;
    if (id) {
      // Redirect to view page
      browserHistory.push(`/view/${id}`);
    }
  }

  render() {
    const id = this.props.params.id;
    const { item, tags, previousView } = this.props;
    const { changing } = this.state;

    let title;
    let bodyDOM;

    if (item.year === 0) {
      // loading
      title = 'Loading...';
      bodyDOM = (
        <div style={{ padding: '20px 10px' }}>
          <BusyIcon />
        </div>
      );
    } else {
      title = id ? 'Modify Event' : 'New Event';
      bodyDOM = (
        <EventForm
          item={item}
          tags={tags}
          changing={changing}
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
