export const setCookie = (cookieKey: string, cookieValue: string, expirationDays: number): void => {
  let expiryDate = '';

  if (expirationDays) {
    const date = new Date();

    date.setTime(Number(`${date.getTime()}${expirationDays || 30 * 24 * 60 * 60 * 1000}`));

    expiryDate = `; expiryDate=" ${date.toUTCString()}`;
  }

  document.cookie = `${cookieKey}=${cookieValue || ''}${expiryDate}; path=/`;
};

export const getCookie = (cookieKey: string): string | undefined => {
  let cookieName = `${cookieKey}=`;

  let cookieArray = document.cookie.split(';');

  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }

    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
};

export const eraseCookie = (name: string): void => {
  document.cookie = name + '=; Max-Age=-99999999;';
};
