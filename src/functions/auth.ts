import {firebase} from 'firebase';

import {authActions} from '@actions/auth';
import {dispatchAction} from 'store';

const userPersist = (user: any) => {
  dispatchAction(authActions.setUser, {
    uid: user.uid,
    email: user.email,
    type: user.type,
    plan: user.plan,
    name: user.name,
    slogan: user.slogan,
    avatar: user.avatar,
    cnpj: user.cnpj,
    city: user.city,
    state: user.state,
    course: user.course,
    university: user.university,
    experience: user.experience,
    specs: user.specs,
    problemHealth: user.problemHealth,
    weight: user.weight,
    years: user.years,
    height: user.height,
  });
};

const Logout = () => {
  return new Promise(async (resolve, reject) => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        dispatchAction(authActions.logout, {
          uid: undefined,
          email: undefined,
          type: undefined,
          plan: undefined,
          name: undefined,
          slogan: undefined,
          avatar: undefined,
          cnpj: undefined,
          city: undefined,
          state: undefined,
          course: undefined,
          university: undefined,
          experience: undefined,
          specs: undefined,
          problemHealth: undefined,
          weight: undefined,
          years: undefined,
          height: undefined,
        });
        resolve(true);
      })
      .catch((error: any) => {
        reject(false);
      });
  });
};

export {Logout, userPersist};
