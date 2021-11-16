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

  const deletePostOrWarning = ({type, title, onComplete, onFail}: any) => {
    firestore()
      .collection(`${type}`)
      .where('title', '==', title)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          firestore().collection(`${type}`).doc(doc.id).delete();
          onComplete(true);
        });
      })
      .catch(error => onFail(error));
  };

  return {getPosts, deletePostOrWarning};
};

export default useGetPostAndWarnings;
