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

  return getTrainning;
};

export default useGetTrainning;
