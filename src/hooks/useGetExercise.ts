import {firestore, storage} from 'firebase';

const useGetExercise = () => {
  const getExerciseByGym = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('exercises')
      .where('gym', '==', uid)
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

  const removeExercise = ({exercise, onComplete, onFail}: any) => {
    firestore()
      .collection('exercises')
      .where('name', '==', exercise.name)
      .where('gym', '==', exercise.gym)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(async doc => {
          const storageRef = storage().refFromURL(exercise.url);

          const imageRef = storage().ref(storageRef.fullPath);

          await imageRef.delete();

          if (exercise.type === 'double') {
            const storageRef2 = storage().refFromURL(exercise.urlTwo);

            const imageRef2 = storage().ref(storageRef2.fullPath);

            await imageRef2.delete();
          }
          firestore()
            .collection('exercises')
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
  return {getExerciseByGym, removeExercise};
};

export default useGetExercise;
