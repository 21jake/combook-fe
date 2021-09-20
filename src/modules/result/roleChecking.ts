import { intersection } from 'lodash';
import React from 'react';
import store from '../../store';
import { Role } from '../../shared/enum/role';


const Unauthorized = React.lazy(() => import('../error/Unauthorized'));

export enum ClassNameOutput {
  DISPLAY = 'd-block-inline',
  HIDE = 'd-none',
}

const { user } = store.getState().authentication;

export const redirectIfUserUnauthorized = <T>(
  Component: React.LazyExoticComponent<(props: T) => JSX.Element>,
  ...requiredRoles: Role[]
): React.LazyExoticComponent<(props: T) => JSX.Element> => {
  if (user) {
    const { role } = user;
    return requiredRoles.includes(role) ? Component : Unauthorized;
  } else {
    return Unauthorized;
  }
};

export const handleItemVisibility = (...requiredRoles: Role[]): ClassNameOutput => {
  if (user) {
    const { role } = user;
    return requiredRoles.includes(role) ? ClassNameOutput.DISPLAY : ClassNameOutput.HIDE;
  }
  return ClassNameOutput.HIDE;
};

export const checkUserRole = (...requiredRoles: Role[]): boolean => {
  // This behaves exactly like handleItemVisibility function, but returns boolean instead of className
  if (user) {
    const { role } = user;
    return requiredRoles.includes(role) ? true : false;
  }
  return false;
};
