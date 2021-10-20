import {firestore} from 'firebase';

const useGetTrainning = () => {
  const getTrainning = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('trainnings')
      .where('commonId', '==', uid)
      .get()
      .then(querySnapshot => {
        const trainning = querySnapshot.docs.map(doc => doc.data());
        return onComplete(trainning[0]);
      })
      .catch(err => onFail(err));
  };

  const getTrainningTrainner = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('trainnings')
      .where('trainnerId', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };
  return {getTrainning, getTrainningTrainner};
};

export default useGetTrainning;
