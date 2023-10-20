localStorage.clear();
sessionStorage.clear();

document.cookie = '';

window.location.href = window.location.href.split('logout')[0];