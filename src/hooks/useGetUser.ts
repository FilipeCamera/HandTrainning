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

  const getUsers = async ({onComplete, onFail}: any) => {
    await firestore()
      .collection('users')
      .get()
      .then(res => {
        const users = res.docs.map(doc => doc.data());
        onComplete(users);
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
  const getUserTypeAndAssociate = ({
    type,
    associate,
    onComplete,
    onFail,
  }: any) => {
    firestore()
      .collection('users')
      .where('type', '==', type)
      .where('userAssociate', '==', associate)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };
  const getUserTypeAndAssociateID = ({
    type,
    associate,
    onComplete,
    onFail,
  }: any) => {
    firestore()
      .collection('users')
      .where('type', '==', type)
      .where('userAssociate', '==', associate)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.id);
        onComplete(list);
      })
      .catch(err => onFail(err));
  };
  const getUserTypeAndAssociateTrainner = ({
    type,
    associate,
    onComplete,
    onFail,
  }: any) => {
    firestore()
      .collection('users')
      .where('type', '==', type)
      .where('uid', 'in', associate)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  const getUserTrainner = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('users')
      .where('type', '==', 'trainner')
      .where('userAssociate', 'array-contains', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        onComplete(list);
      })
      .catch(err => onFail(err));
  };

  return {
    getUser,
    getUserLogged,
    searchUser,
    getUsers,
    getUserType,
    getUserTypeAndAssociate,
    getUserTypeAndAssociateTrainner,
    getUserTrainner,
    getUserTypeAndAssociateID,
  };
};

export default useGetUser;
