import {firestore} from 'firebase';

const useGetPostAndWarnings = () => {
  const getPosts = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('posts')
      .where('gym', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return {getPosts};
};

export default useGetPostAndWarnings;
