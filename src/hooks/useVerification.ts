import {firestore} from 'firebase';

const useVerification = () => {
  const verifyUserAssociate = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const user = querySnapshot.docs.map(users => users.data());
        if (user[0].type === 'trainner') {
          if (!!user[0].commons && user[0].commons !== 0) {
            if (user[0].plan === 'basic' && user[0].commons.length >= 20) {
              onComplete('Usuário já possui o máximo de alunos', true);
            } else {
              onComplete('', false);
            }
          } else {
            onComplete('', false);
          }
        }

        if (user[0].type === 'common') {
          if (!!user[0].trainnerAssociate && user[0].trainnerAssociate !== '') {
            onComplete('Usuário já possui um treinador', true);
          } else {
            onComplete('', false);
          }
        }
      })
      .catch(error => onFail(error));
  };

  return {verifyUserAssociate};
};

export default useVerification;
