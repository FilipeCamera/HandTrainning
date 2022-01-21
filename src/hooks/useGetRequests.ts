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

  const removeRequestByCommonId = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('requests')
      .where('commonId', '==', uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          firestore()
            .collection('requests')
            .doc(doc.id)
            .delete()
            .then(res => {
              onComplete(true);
            })
            .catch(err => onFail(err));
        });
      })
      .catch(err => onFail(err));
  };

  return {getRequests, removeRequestByCommonId};
};

export default useGetRequests;
