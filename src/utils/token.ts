/**
 * 获取当前 token
 */
export const getTokenHeader = (): string | null => {
  return localStorage.getItem("tokenHeader");
};

/**
 * 获取当前 token
 */
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * 保存 token
 */
export const setTokenInfo = (tokenHeader: string, token: string) => {
  localStorage.setItem("tokenHeader", tokenHeader);
  localStorage.setItem("token", token);
};

/**
 * 移除 token
 */
export const removeTokenInfo = () => {
  localStorage.removeItem("tokenKey");
  localStorage.removeItem("token");
};
