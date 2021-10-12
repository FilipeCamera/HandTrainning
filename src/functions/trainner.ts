import {trainnerActions} from '@actions/trainner';
import {dispatchAction} from 'store';

const setGymId = (data: string) => {
  dispatchAction(trainnerActions.setGymAssociate, {
    gym: data,
  });
};

const removeGymId = () => {
  dispatchAction(trainnerActions.removeGymAssociate, {
    gym: undefined,
  });
};

export {setGymId, removeGymId};
