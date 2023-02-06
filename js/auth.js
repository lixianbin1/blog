(() => {
  const auth = () => {

    const day = 60 * 60 * 24 * 1000;
    const { is_post, lock, passwords, root } = window.AD_CONFIG;
    
    if(is_post === false || lock === false) {
      return;
    }
    
    let [password, expires] = atob(window.localStorage.getItem('auth')).split(':'),
      now = new Date().getTime();

    if(passwords.includes(password) && now < expires) {
      return; 
    }
    password = prompt('验证您是否有权限阅读此文章');
    password = sha256(password || '');
    console.log('asd')
    if(passwords.includes(password)) {
      expires = now + day * 3;
      window.localStorage.setItem('auth', btoa(`${password}:${expires}`));
    } else {
      alert('您没有阅读权限');
      window.location.href = root;
    }
  };

  // article password auth
  auth();
})();