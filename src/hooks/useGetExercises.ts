import {firestore} from 'firebase';

const useGetExercises = () => {
  const getExercises = ({onComplete, onFail}: any) => {
    firestore()
      .collection('exercises')
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
  return {getExercises};
};

export default useGetExercises;
