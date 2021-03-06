import {firebase} from 'firebase';

import {authActions} from '@actions/auth';
import {dispatchAction} from 'store';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const userPersist = (user: any) => {
  dispatchAction(authActions.setUser, {
    uid: user.uid,
    email: user.email,
    type: user.type,
    plan: user.plan,
    slogan: user.slogan,
    name: user.name,
    avatar: user.avatar,
    sex: user.sex,
    course: user.course,
    university: user.university,
    experience: user.experience,
    specs: user.specs,
    problemHealth: user.problemHealth,
    weight: user.weight,
    age: user.age,
    height: user.height,
    trainnerAssociate: user.trainnerAssociate,
    limitTrainning: user.limitTrainning,
    commons: user.commons,
    completeRegister: user.completeRegister,
  });
};

const Logout = async () => {
  return new Promise(async (resolve, reject) => {
    await firebase
      .auth()
      .signOut()
      .then(async () => {
        dispatchAction(authActions.logout, {
          uid: undefined,
          email: undefined,
          type: undefined,
          slogan: undefined,
          plan: undefined,
          name: undefined,
          avatar: undefined,
          sex: undefined,
          course: undefined,
          university: undefined,
          experience: undefined,
          specs: undefined,
          problemHealth: undefined,
          weight: undefined,
          age: undefined,
          height: undefined,
          limitTraining: undefined,
          commons: undefined,
          completeRegister: undefined,
        });
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser) {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          resolve(true);
        } else {
          resolve(true);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export {Logout, userPersist};
