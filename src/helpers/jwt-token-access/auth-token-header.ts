export default function authHeader() {
  const authInfo:any = localStorage.getItem('authUser');
  const obj = JSON.parse(authInfo);

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken };
  } else {
    return {};
  }
}
