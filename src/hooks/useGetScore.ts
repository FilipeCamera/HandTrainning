import {firestore} from 'firebase';

const useGetScore = () => {
  const getScore = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('trainningScores')
      .doc(uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.data();
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  const getTrainnerScore = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('trainningScores')
      .where('trainnerId', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return {getScore, getTrainnerScore};
};

export default useGetScore;
