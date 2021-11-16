import {firestore} from 'firebase';

const useGetCategories = () => {
  const getCategories = ({onComplete, onFail}: any) => {
    firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return {...data, id};
        });
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return getCategories;
};

export default useGetCategories;
