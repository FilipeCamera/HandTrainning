import {firestore} from 'firebase';

const useInvites = () => {
  const acceptedInvite = ({userId, uid, onComplete, onFail}: any) => {
    firestore()
      .collection('invites')
      .where('from', '==', uid)
      .where('to', '==', userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          firestore()
            .collection('invites')
            .doc(doc.id)
            .update({
              accept: true,
              updatedAt: firestore.FieldValue.serverTimestamp(),
            })
            .then(res => {
              onComplete(true);
            })
            .catch(err => onFail(err));
        });
      })
      .catch(err => onFail(err));
  };

  const getInvites = async ({uid, onComplete, onFail}: any) => {
    await firestore()
      .collection('invites')
      .where('from', '==', uid)
      .where('accept', '==', null)
      .get()
      .then(res => {
        const invites = res.docs.map(doc => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        onComplete(invites);
      })
      .catch((error: any) => onFail(error));
  };
  const recusedInvite = ({userId, uid, onComplete, onFail}: any) => {
    firestore()
      .collection('invites')
      .where('from', '==', uid)
      .where('to', '==', userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          firestore()
            .collection('invites')
            .doc(doc.id)
            .update({
              accept: false,
              updatedAt: firestore.FieldValue.serverTimestamp(),
            })
            .then(res => {
              onComplete(true);
            })
            .catch(err => onFail(err));
        });
      })
      .catch(err => onFail(err));
  };
  const sendInvite = async ({to, from, onComplete, onFail}: any) => {
    const data = {
      createdAt: firestore.FieldValue.serverTimestamp(),
      accept: null,
      to: to,
      from: from,
    };
    await firestore()
      .collection('invites')
      .doc()
      .set(data)
      .then((res: any) => {
        onComplete(res);
      })
      .catch(error => onFail(error));
  };
  return {sendInvite, getInvites, acceptedInvite, recusedInvite};
};

export default useInvites;
