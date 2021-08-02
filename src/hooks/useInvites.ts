import {firestore} from 'firebase';

const useInvites = () => {
  const acceptedInvite = async (
    invite: any,
    state: boolean,
    {onComplete, onFail}: any,
  ) => {
    const data = {
      ...invite,
      accept: state,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    await firestore()
      .collection('invites')
      .doc(invite.uid)
      .update(data)
      .then((res: any) => {
        if (res) {
          onComplete(true);
        }
      })
      .catch(error => onFail(false));
  };
  const getInvites = async (uid: any, {onComplete, onFail}: any) => {
    await firestore()
      .collection('invites')
      .where('from', '==', uid)
      .where('accept', '==', null)
      .get()
      .then(res => {
        const invites = res.docs.map(doc => doc.data());
        onComplete(invites);
      })
      .catch((error: any) => onFail(error));
  };
  const sendInvite = async (to: any, from: any, {onComplete}: any) => {
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
      .catch(error => console.log(error));
  };
  return {sendInvite, getInvites, acceptedInvite};
};

export default useInvites;
