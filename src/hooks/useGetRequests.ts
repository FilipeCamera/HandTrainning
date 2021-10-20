import {firestore} from 'firebase';

const useGetRequests = () => {
  const getRequests = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('requests')
      .where('trainnerId', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return getRequests;
};

export default useGetRequests;
