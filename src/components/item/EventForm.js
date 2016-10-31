import React, { Component, PropTypes } from 'react';
import update from 'react/lib/update';
import BusyIcon from '../../components/common/BusyIcon';
import FlagRadio from '../../components/item/FlagRadio';
import RecurrenceRadio from '../../components/item/RecurrenceRadio';

import '../../styles/event-form.css';

export default class EventForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFlagChange = this.handleFlagChange.bind(this);
    this.handleRecurrenceChange = this.handleRecurrenceChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onReset = this.onReset.bind(this);

    this.state = {
      item: {
        ...this.props.item
      },
      error: null
    };
  }

  componentWillReceiveProps(newProps) {
    // Handle this only changing from editing to creating
    if (this.props.item.id && !newProps.item.id) {
      this.setState({
        item: {
          ...newProps.item
        },
        error: null
      });
    }
  }

  onSubmit(e) {
    const item = this.state.item;

    // form validation
    if (item.text.length <= 0) {
      this.setState({
        error: 'text can not be empty'
      });
      return;
    }

    e.preventDefault();
    this.props.onSubmit(item);
  }

  onCancel() {
    this.props.onCancel();
  }

  onReset() {
    this.setState({
      item: {
        ...this.props.item
      },
      error: null
    });
  }

  handleTextChange(e) {
    const newItem = update(this.state.item, {
      [e.target.getAttribute('name')]: { $set: e.target.value }
    });
    this.setState({
      item: newItem,
      error: null
    });
  }

  handleTagChange(tag) {
    const newItem = {
      ...this.state.item,
      tag
    };
    this.setState({
      item: newItem,
      error: null
    });
  }

  handleDateChange(date) {
    // console.log(Date.parse(date.format('YYYY-MM-DD')));
    try {
      const d = new Date(`${date.format('YYYY-M-D')}Z`);
      const newItem = { ...this.state.item,
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: d.getDate()
      };
      this.setState({
        item: newItem,
        error: null
      });
    } catch (e) {
      /* eslint-disable */
      console.warn(e);
      /* eslint-disable */
    }
  }

  handleFlagChange(index) {
    const newItem = { ...this.state.item,
      flag: index
    };
    this.setState({
      item: newItem,
      error: null
    });
  }

  handleRecurrenceChange(index) {
    const item = this.state.item;
    item.recurrence = index;
    this.setState({
      item,
      error: null
    });
  }

  render() {
    // tag list
    let tagList = this.props.tags &&
      <div className="tag-list">
      {this.props.tags.map((tag, index) =>
        <div key={index} className="tag-item-wrapper" onClick={() => this.handleTagChange(tag)}>
          <div className="tag-item">{tag}</div>
        </div>
      )}
      </div>;

    // item
    const item = this.state.item;

    // messages
    let errorDOM = this.state.error &&
      <div className="form-row">
        <div className="field-label" />
        <div className="field-control" style={{ color: 'red' }}>
          Error: {this.state.error}
        </div>
      </div>;

    // action buttons
    let buttons;
    if (this.props.changing) {
      buttons = <BusyIcon />;
    } else {
      buttons = (
        <div>
          <button type="submit" className="button" onClick={this.onSubmit}>Save</button>
          {this.state.item.id != null &&
            <button type="button" className="button" onClick={this.onCancel}>Cancel</button>
          }
          <button type="button" className="button" onClick={this.onReset}>Reset</button>
        </div>
      );
    }

    return (
      <div className="event-form">
        <div className="form-row">
          <input
            name="year"
            value={item.year}
            type="number"
            min="1983" max="2083"
            className="form-control"
            style={{ width: '60px' }}
            onChange={this.handleTextChange}
          />
          -
          <input
            name="month"
            value={item.month}
            type="number"
            min="1" max="12"
            className="form-control"
            style={{ width: '40px' }}
            onChange={this.handleTextChange}
          />
          -
          <input
            name="date"
            value={item.date}
            type="number"
            min="1" max="31"
            className="form-control"
            style={{ width: '40px' }}
            onChange={this.handleTextChange}
          />
          {' '}
          (YYYY-M-D)
        </div>
        <div className="form-row">
          <textarea
            name="text" value={item.text} className="form-control"
            style={{ width: '288px', height: '60px' }} placeholder="Text Contents"
            onChange={this.handleTextChange}
          />
        </div>
        <div className="form-row">
          <div className="field-label">Number</div>
          <div className="field-control">
            <input
              name="number" value={item.number} type="number" className="form-control"
              style={{ width: '100px' }}
              onChange={this.handleTextChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="field-label">Tag</div>
          <div className="field-control">
            <input
              name="tag" type="text" value={item.tag} className="form-control"
              style={{ width: '100px' }}
              onChange={this.handleTextChange}
            />
            <br />
            {tagList}
          </div>
        </div>
        <div className="form-row">
          <div className="field-label">Flag</div>
          <div className="field-control">
            <FlagRadio selectedIndex={item.flag} onChange={this.handleFlagChange} />
          </div>
        </div>
        <div className="form-row" style={{display: "none"}}>
          <div className="field-label">Recurrence</div>
          <div className="field-control">
            <RecurrenceRadio selectedIndex={item.recurrence} onChange={this.handleRecurrenceChange} />
          </div>
        </div>
        {errorDOM}
        <div className="form-row">
          <div className="field-label">&nbsp;</div>
          <div className="field-control">
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

EventForm.propTypes = {
  tags: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
