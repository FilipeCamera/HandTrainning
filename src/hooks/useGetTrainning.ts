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

  const getTrainningId = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('trainnings')
      .where('commonId', '==', uid)
      .get()
      .then(querySnapshot => {
        const trainning = querySnapshot.docs.map(doc => doc.id);
        onComplete(trainning[0]);
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
  const getTrainningDeleteUnbindGymCT = ({uid, listUid, onFail}: any) => {
    firestore()
      .collection('trainnings')
      .where('commonId', 'in', listUid)
      .where('trainnerId', '==', uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          firestore().collection('trainnings').doc(doc.id).delete();
          firestore().collection('trainningScores').doc(doc.id).delete();
        });
      })
      .catch(err => onFail(err));
  };
  return {
    getTrainning,
    getTrainningTrainner,
    getTrainningId,
    getTrainningDeleteUnbindGymCT,
  };
};

export default useGetTrainning;
