export const setCookie = (key: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${key}=${value}; expires=${expires}; path=/`;
};

export const getCookie = (key: string): string | undefined => {
  const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, cookie) => {
    const [k, v] = cookie.split('=');
    acc[k] = v;
    return acc;
  }, {});
  return cookies[key];
};

export const deleteCookie = (key: string) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
