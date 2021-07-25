import {auth, firestore} from 'firebase';
import {userPersist} from 'functions';

const useGetUser = () => {
  const getUser = async (uid: string) => {
    await firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(querySnapshot => {
        const user = querySnapshot.data();
        userPersist(user);
      });
  };

  return {getUser};
};

export default useGetUser;
