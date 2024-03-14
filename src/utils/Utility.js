export function getHeadersWithToken(token) {
  const headers = {
    "x-auth-token": `${token}`,
    "content-type": "application/json",
  };

  return headers;
}
