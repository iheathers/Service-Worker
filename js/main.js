if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_whole_site.js')
      .then(() => console.log('Service Worker Registered'))
      .catch((error) => console.log('Serview Worker Registration Error'));
  });
}

console.log('Testing on Netlify');
