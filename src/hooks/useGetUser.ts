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

  const searchUser = async (
    value: string,
    type: string,
    {onComplete, onFail}: any,
  ) => {
    await firestore()
      .collection('users')
      .where('name', '>=', value)
      .where('name', '<=', value + '\uf8ff')
      .get()
      .then(querySnapshot => {
        const users = querySnapshot.docs.map(res => res.data());
        const usersUpdted = users.filter(
          user => user.type === type && value !== '',
        );
        onComplete(usersUpdted);
      })
      .catch(error => onFail(error));
  };

  const getUserType = ({type, onComplete, onFail}: any) => {
    firestore()
      .collection('users')
      .where('type', '==', type)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  const getUserCommonsTrainner = ({commons, onComplete, onFail}: any) => {
    firestore()
      .collection('users')
      .where('type', '==', 'common')
      .where('uid', 'in', commons)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  const getUserCommonsTrainnerId = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('users')
      .where('type', '==', 'common')
      .where('trainnerAssociate', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  const getTrainnerAssociate = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const trainner = querySnapshot.docs.map(doc => doc.data());
        onComplete(trainner[0]);
      })
      .catch(err => onFail(err));
  };

  return {
    getUser,
    getUserLogged,
    searchUser,
    getUserType,
    getUserCommonsTrainner,
    getUserCommonsTrainnerId,
    getTrainnerAssociate,
  };
};

export default useGetUser;
