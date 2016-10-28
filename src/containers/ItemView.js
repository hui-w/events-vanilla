import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import SubMenu from '../components/common/SubMenu';
import BusyIcon from '../components/common/BusyIcon';
import EventItem from '../components/item/EventItem';

import { loadEvent, unloadEvent, deleteEvent } from '../actions/event';
import { unloadCachedData } from '../actions/events';

import '../styles/item-view.css';

class ItemView extends Component {
  constructor(props, context) {
    super(props, context);
    this.onModify = this.onModify.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      changing: false,
      item: null
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
  }

  // redirect to the edit view
  onModify(id) {
    browserHistory.push(`/edit/${id}`);
  }

  // delete item
  onDelete(id) {
    const onComplete = () => {
      // clear the annual cache
      this.props.dispatch(unloadCachedData());

      // redirect
      browserHistory.push('/');
    };

    if (window.confirm('Are you sure to delete?')) {
      this.setState({
        changing: true
      });

      this.props.dispatch(deleteEvent(id, onComplete));
    }
  }

  render() {
    const {
      previousView
    } = this.props;
    const {
      changing,
      item
    } = this.state;


    if (!item) {
      return <div style={{ margin: '15px 10px' }}><BusyIcon /></div>;
    }

    const actions = changing ? <BusyIcon /> : (
      <div>
        <button type="button" className="button" onClick={() => this.onModify(item.id)}>Modify</button>
        <button type="button" className="button" onClick={() => this.onDelete(item.id)}>Delete</button>
      </div>
    );

    return (
      <div>
        <SubMenu previousView={previousView}>
          <div className="right">
            {`${item.year}-${item.month}-${item.date}`}
          </div>
        </SubMenu>
        <div className="item-view">
          <EventItem item={item} />
          <div className="tools">
            {actions}
          </div>
        </div>
      </div>
    );
  }
}

ItemView.propTypes = {
  item: PropTypes.object,
  previousView: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  item: state.event.item,
  previousView: state.common.previousView
});

export default connect(
  mapStateToProps
)(ItemView);
