import {firestore} from 'firebase';

const useVerification = () => {
  const verifyUserAssociate = async (uid: any, {onComplete, onFail}: any) => {
    await firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const user = querySnapshot.docs.map(users => users.data());
        if (user[0].type === 'trainner') {
          if (user[0].userAssociate) {
            if (user[0].userAssociate.length > 2) {
              const error = 'Usuário já possui o máximo de associações';
              onComplete(error);
            }
          } else {
            onComplete(false);
          }
        }

        if (user[0].type === 'common') {
          if (user[0].userAssociate) {
            const error = 'Usuário já é associado alguma academia ou treinador';
            onComplete(error);
          } else {
            onComplete(false);
          }
        }
      })
      .catch(error => onFail(error));
  };
  const verifyUserIsGym = async (
    user: any,
    uid: any,
    {onComplete, onFail}: any,
  ) => {
    await firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const gym = querySnapshot.docs.map(doc => doc.data());

        if (user.type === gym[0].type) {
          const error =
            'Usuário não pode convidar ou associar a outra academia';
          onComplete(error);
        } else {
          onComplete(false);
        }
      })
      .catch(error => onFail(error));
  };
  return {verifyUserAssociate, verifyUserIsGym};
};

export default useVerification;
