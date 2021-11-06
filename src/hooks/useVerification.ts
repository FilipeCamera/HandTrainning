import {firestore} from 'firebase';
import {useSelector} from 'react-redux';

const useVerification = () => {
  const auth = useSelector((state: any) => state.auth.user);

  const verifyUserType = ({uid, onComplete, onFail}: any) => {
    return firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const user = querySnapshot.docs.map(doc => doc.data());

        if (user[0].type !== 'gym') {
          onComplete(true);
        } else {
          onComplete(false);
        }
      })
      .catch(err => onFail(err));
  };
  const verifyUserAssociate = async ({uid, onComplete, onFail}: any) => {
    return firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        const user = querySnapshot.docs.map(users => users.data());
        if (user[0].type === 'trainner') {
          if (user[0].userAssociate) {
            if (user[0].userAssociate.length > 2) {
              onComplete('Usuário já possui o máximo de associações', false);
            }
            user[0].userAssociate.map(associate => {
              if (associate === auth.uid) {
                onComplete('Usuário já é associado a sua academia', false);
              }
            });
          } else {
            onComplete('', true);
          }
        }

        if (user[0].type === 'common') {
          if (user[0].userAssociate) {
            onComplete(
              'Usuário já é associado alguma academia ou treinador',
              false,
            );
          } else {
            onComplete('', true);
          }
        }
      })
      .catch(error => onFail(error));
  };
  const updateUserAssociate = ({
    uid,
    type,
    associate,
    gym,
    onComplete,
    onFail,
  }: any) => {
    if (type === 'trainner') {
      firestore()
        .collection('users')
        .doc(uid)
        .update({userAssociate: [...associate, gym]})
        .then(res => {
          onComplete('Usuário agora faz parte da sua academia');
        })
        .catch(err => onFail(err));
    } else {
      firestore()
        .collection('users')
        .doc(uid)
        .update({userAssociate: gym})
        .then(res => {
          onComplete('Usuário agora faz parte da sua academia');
        })
        .catch(err => onFail(err));
    }
  };

  return {verifyUserAssociate, updateUserAssociate, verifyUserType};
};

export default useVerification;
