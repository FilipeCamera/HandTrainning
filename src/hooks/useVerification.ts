import {firestore} from 'firebase';

const useVerification = () => {
  const verifyUserAssociate = async (uid: any, {onComplete, onFail}: any) => {
    const status = await firestore()
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
              return false;
            }
          } else {
            onComplete(false);
            return true;
          }
        }

        if (user[0].type === 'common') {
          if (user[0].userAssociate) {
            const error = 'Usuário já é associado alguma academia ou treinador';
            onComplete(error);
            return false;
          } else {
            onComplete(false);
            return true;
          }
        }
      })
      .catch(error => onFail(error));
    return status;
  };
  const verifyUserIsType = async (
    user: any,
    uid: any,
    {onComplete, onFail}: any,
  ) => {
    const status = await firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const userEnvited = querySnapshot.docs.map(doc => doc.data());

        if (user.type === userEnvited[0].type) {
          const error =
            'Você não pode convidar ou associar a um usuário com o mesmo tipo que o seu.';
          onComplete(error);
          return false;
        } else {
          onComplete(false);
          return true;
        }
      })
      .catch(error => onFail(error));
    return status;
  };
  return {verifyUserAssociate, verifyUserIsType};
};

export default useVerification;
