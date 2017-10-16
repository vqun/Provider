import { Component, PropTypes, Children } from 'react';
import { combineReducers, createStore } from 'redux';

export default class Provider extends Component {
  static propTypes = {
    reducer: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
  };
  static childContextTypes = {
    store: PropTypes.object.isRequired,
  };
  getChildContext() {
    return { store: this.store };
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      reducer: props.reducer,
    };
    this.store = createStore(combineReducers(props.reducer));
  }
  componentWillReceiveProps(nextProps) {
    const { reducer } = this.state;
    const { reducer: nextReducer } = nextProps;

    if (reducer !== nextReducer) {
      const newReducer = { ...reducer, ...nextReducer };
      this.setState({
        reducer: newReducer,
      });
      this.store.replaceReducer(combineReducers(newReducer));
    }
  }
  render() {
    return Children.only(this.props.children);
  }
}