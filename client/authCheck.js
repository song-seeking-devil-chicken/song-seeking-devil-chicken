const authStatus = { authenticated: false };

authStatus.getAuthStatus = function getAuthStatus() {
  fetch('/api/checkAuth').then((res) => res.json()).then((res) => {
    console.log(res.authenticated);
    if (res.authenticated === true) authStatus.authenticated = true;
    return authStatus.authenticated;
  }).catch(() => authStatus.authenticated);

  console.log('checked!');
};

module.exports = authStatus;
