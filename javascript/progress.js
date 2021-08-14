window.onload = () => {
  let body = document.body,
      html = document.documentElement;

  let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
  );

  const setProgress = () => {
      let scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;
      let width = (scrollFromTop / height) * 100 + '%';

      const progressBar = document.getElementById('progress');
      if(!progressBar)
        return
      progressBar.style.width = width;
  };

  window.addEventListener('scroll', setProgress);
  const sideMenuItems = document.querySelectorAll('li.side_menu_item');
  sideMenuItems.forEach((e) => {
    const headerId = e.id.replace('-label', '');
    e.onclick = () => {
      document.getElementById(headerId).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  });

  setProgress();
}
