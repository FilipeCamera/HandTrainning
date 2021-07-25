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
    uf: user.uf,
    course: user.course,
    university: user.university,
    experience: user.experience,
    specs: user.specs,
    problemHealth: user.problemHealth,
    weight: user.weight,
    age: user.age,
    height: user.height,
    limitGym: user.limitGym,
    limitCommon: user.limitCommon,
    limitTrainner: user.limitTrainner,
    completeRegister: user.completeRegister,
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
          age: undefined,
          height: undefined,
          limitGym: undefined,
          limitCommon: undefined,
          limitTrainner: undefined,
          completeRegister: undefined,
        });
        resolve(true);
      })
      .catch((error: any) => {
        reject(false);
      });
  });
};

export {Logout, userPersist};
