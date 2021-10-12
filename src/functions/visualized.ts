import {visualizedActions} from '@actions/visualized';
import {dispatchAction} from 'store';

const setVisualize = () => {
  dispatchAction(visualizedActions.setVisualized, {
    visualized: true,
  });
};

const setNotVisualize = () => {
  dispatchAction(visualizedActions.setNotVisualized, {
    visualized: false,
  });
};

export {setVisualize, setNotVisualize};
