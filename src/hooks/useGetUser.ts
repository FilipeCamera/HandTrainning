import {auth, firestore} from 'firebase';

const useGetUser = () => {
  const controller = new AbortController();

  const getUserLogged = async ({onComplete}: any) => {
    auth().onAuthStateChanged((user: any) => {
      if (user) {
        onComplete(user);
      } else {
        onComplete(undefined);
      }
    });

    return () => {
      const timeout = setTimeout(() => controller.abort(), 5000);
      clearTimeout(timeout);
    };
  };
  const getUser = async ({uid, onComplete, onFail}: any) => {
    await firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(querySnapshot => {
        const user = querySnapshot.data();
        onComplete(user);
      })
      .catch(error => {
        onFail(error);
      });

    return () => {
      const timeout = setTimeout(() => controller.abort(), 5000);
      clearTimeout(timeout);
    };
  };

  const getUsersByInvited = async (uid: any, {onComplete, onFail}: any) => {
    await firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const users = querySnapshot.docs.map(doc => doc.data());
        onComplete(users);
      })
      .catch(error => onFail(error));
  };
  const searchUser = async (value: string, {onComplete, onFail}: any) => {
    await firestore()
      .collection('users')
      .where('name', '>=', value)
      .where('name', '<=', value + '\uf8ff')
      .get()
      .then(querySnapshot => {
        const users = querySnapshot.docs.map(res => res.data());
        onComplete(users);
      })
      .catch(error => onFail(error));
  };
  return {getUser, getUserLogged, searchUser, getUsersByInvited};
};

export default useGetUser;
