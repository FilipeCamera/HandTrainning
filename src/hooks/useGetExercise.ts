import {firestore} from 'firebase';

const useGetExercise = () => {
  const getExerciseByGym = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('exercises')
      .where('gym', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return getExerciseByGym;
};

export default useGetExercise;
