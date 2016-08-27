import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { loadTags } from '../../actions/tags';
import { arrayIndexOf, arrayRemove, arrayClear } from '../../util';
import Config from '../../config';
import '../../styles/filter-box.css';

class FilterBox extends Component {
	constructor(props, context) {
		super(props, context);

		// load the initial value
		this.state = {
			filters: { ...this.props.filters
			}
		};
	}

	componentDidMount() {
		if (this.props.tags.length <= 0) {
			// get all tags when popup
			this.props.dispatch(loadTags());
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tags.length <= 0) {
			// get all tags when tag is reset
			this.props.dispatch(loadTags());
		}
	}

	onGroupChange(key) {
		// let newFilters = JSON.parse(JSON.stringify(this.state.filters));
		const newFilters = { ...this.state.filters
		};
		arrayClear(newFilters[key]);
		this.setState({
			filters: newFilters
		});

		this.onChange();
	}

	onItemChange(key, val) {
		const newFilters = { ...this.state.filters
		};
		if (arrayIndexOf(newFilters[key], val) > -1) {
			// remove
			arrayRemove(newFilters[key], val);
		} else {
			// add
			newFilters[key].push(val);
		}
		this.setState({
			filters: newFilters
		});

		this.onChange();
	}

	onChange() {
		this.props.onChange({ ...this.state.filters
		});
	}

	render() {
		const {
			tags,
			onClose
		} = this.props;

		return (
			<div className="filter-box">
				<div className="filter-box-header">
					Filters
					<div className="close" onClick={onClose} />
				</div>
				<div className="filter-box-body">
					<div className="group-header">
						<span onClick={() => this.onGroupChange('flags')}>Flag</span>
					</div>
					<div className="filter-item">
					{
						Config.FlagColors.map((color, index) => {
							let className = arrayIndexOf(this.state.filters.flags, index) > -1 ?
								'flag-radio-item flag-radio-selected' : 'flag-radio-item';
							return (
								<div className="flag-item-wrapper" key={index} onClick={() => this.onItemChange('flags', index)}>
									<div className={className} style={{ backgroundColor: color }} />
								</div>
							);
						})
					}
					</div>
					<div className="group-header">
						<span onClick={() => this.onGroupChange('flags')}>Tag</span>
					</div>
					{
						tags.map((tag, index) => {
							let className = arrayIndexOf(this.state.filters.tags, tag) > -1 ? 'icon-checked' : 'icon-unchecked';
							return (
								<div
									className="filter-item tag-item-wrapper" key={index}
									onClick={() => this.onItemChange('tags', tag)}
								>
									<div className={className}>{tag}</div>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
}

FilterBox.propTypes = {
	filters: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	tags: PropTypes.array,
	dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
	tags: state.tags.list
});

export default connect(
	mapStateToProps
)(FilterBox);
