import {firestore} from 'firebase';
import moment from 'moment';

const useGetWarnings = () => {
  const getWarnings = ({uid, onComplete, onFail}: any) => {
    firestore()
      .collection('warnings')
      .where('from', '==', uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        const warnings = list.filter(warnings => {
          if (
            moment.unix(warnings.createdAt.seconds).isSame(Date.now(), 'day')
          ) {
            return warnings;
          }
        });

        onComplete(warnings);
      })
      .catch(err => onFail(err));
  };

  return {getWarnings};
};

export default useGetWarnings;
