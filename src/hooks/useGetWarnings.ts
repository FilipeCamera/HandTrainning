import {firestore} from 'firebase';

const useGetWarnings = () => {
  const getWarningsTrainner = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('warning')
      .where('gym', 'in', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  const getWarnings = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('warning')
      .where('gym', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return {getWarnings, getWarningsTrainner};
};

export default useGetWarnings;
