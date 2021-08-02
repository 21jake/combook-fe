// import { intersection } from 'lodash';
// import React from 'react';

// import { Authorities } from '../../enumeration/authorities';
// import store from '../../store';

// const Unauthorized = React.lazy(() => import('../errors/Unauthorized'));

// enum ClassNameOutput {
//   DISPLAY = 'd-block-inline',
//   HIDE = 'd-none',
// }

// const { user } = store.getState().authentication;

// const checkOverlapBetweenPerms = (requiredPerms: Authorities[], userAuthorities: Authorities[]): boolean => {
//   return !!intersection(requiredPerms, userAuthorities).length;
// };
// export const checkIfUserIsAdmin = (userAuthorities: Authorities[] | undefined): boolean => {
//   return !userAuthorities ? false : userAuthorities.includes(Authorities.ROLE_ADMIN);
// };

// export const handleItemVisibility = (...requiredPerms: Authorities[]): ClassNameOutput => {
//   if (user) {
//     const { authorities } = user;
//     if (checkIfUserIsAdmin(authorities)) return ClassNameOutput.DISPLAY;
//     return checkOverlapBetweenPerms(requiredPerms, authorities)
//       ? ClassNameOutput.DISPLAY
//       : ClassNameOutput.HIDE;
//   }
//   return ClassNameOutput.HIDE;
// };

// export const checkIfUserAuthorized = (...requiredPerms: Authorities[]): boolean => {
//   // SIMILAR TO handleItemVisibility BUT RETURN BOOLEANS INSTEAD OF CLASSNAME
//   if (user) {
//     const { authorities } = user;
//     if (checkIfUserIsAdmin(authorities)) return true;
//     return checkOverlapBetweenPerms(requiredPerms, authorities) ? true : false;
//   }
//   return false;
// };

// export const redirectIfUserUnauthorized = (
//   Component: React.LazyExoticComponent<any>,
//   ...requiredPerms: Authorities[]
// ): React.LazyExoticComponent<any> => {
//   if (user) {
//     const { authorities } = user;
//     if (checkIfUserIsAdmin(authorities)) return Component;
//     return checkOverlapBetweenPerms(requiredPerms, authorities) ? Component : Unauthorized;
//   } else {
//     return Unauthorized;
//   }
// };
export {};
