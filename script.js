const { createStore, applyMiddleware, compose } = Redux;

const initialStage = 0;

const INCREMENTAR = 'INCREMENTAR';
const REDUZIR = 'REDUZIR';

const incrementar = () => ({ type: INCREMENTAR });
const reduzir = () => ({ type: REDUZIR });

function reducer(state = initialStage, action) {
  switch(action.type) {
    case INCREMENTAR:
      return state + 1;
    case REDUZIR:
      return state - 1;
    default:
      return state;
  };
};

const incrementarMiddle = (store) => (next) => (action) => {
  console.group(action.type);
  console.log('ACTION', action);
  console.log('PREV_STATE', store.getState());
  const result = next(action);
  console.log('NEW_STATE', store.getState());
  console.groupEnd();
  return result;
};

const reduzirMiddle = (store) => (next) => (action) => {
  if (action.type === 'REDUZIR') window.alert('REDUZIU');
  return next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(incrementarMiddle, reduzirMiddle));

const store = createStore(reducer, enhancer);

store.dispatch(incrementar());
store.dispatch(incrementar());
store.dispatch(incrementar());

store.dispatch(reduzir());
