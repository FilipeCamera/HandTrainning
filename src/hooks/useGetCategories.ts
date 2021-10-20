import {firestore} from 'firebase';

const useGetCategories = () => {
  const getCategories = ({onComplete, onFail}: any) => {
    firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return getCategories;
};

export default useGetCategories;
