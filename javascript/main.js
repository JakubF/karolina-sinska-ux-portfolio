window.onload = () => {
  // image enlargement
  const modal = document.getElementById("img-modal");
  const modalImg = document.getElementById("modal-content");
  const modalCaption = document.getElementById("modal-caption");
  const modalCloseButton = document.getElementById("modal-close");

  const loadImageToModal = (image) => {
    modalImg.src = image.src;
    modalCaption.innerHTML = image.alt;
  };

  const findSiblingImage = (image, offset) => {
    let currentIndex = 0;
    const images = document.querySelectorAll(".enlargeable-image");
    images.forEach((img, index) => {
      if(image.src == img.src) {
        currentIndex = index;
      }
    });
    let targetIndex = currentIndex + offset;
    if(targetIndex >= images.length - 1) {
      targetIndex = 0;
    } else if(targetIndex < 0) {
      targetIndex = images.length - 1;
    }
    return images[targetIndex];
  };

  document.querySelectorAll(".enlargeable-image").forEach((image) => {
    image.onclick = () => {
      modal.style.display = "block";
      loadImageToModal(image);
    }
  });

  modalCloseButton.onclick = () => { 
    modal.style.display = "none";
  }

  window.addEventListener("keydown", (event) => {
    let newImage;
    if (event.defaultPrevented)
      return;

    switch (event.key) {
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        newImage = findSiblingImage(modalImg, -1);
        loadImageToModal(newImage);
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        newImage = findSiblingImage(modalImg, 1);
        loadImageToModal(newImage);
        break;
      case "Esc": // IE/Edge specific value
      case "Escape":
        modalCloseButton.click();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);

  // progress bar
  let body = document.body,
      html = document.documentElement;
  const headerOffsets = {};

  let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
  );

  document.querySelectorAll("a.nav-link").forEach((link) => {
    const id = link.href.split("#")[1];
    const header = document.getElementById(id);
    headerOffsets[header.offsetTop + html.clientHeight] = link;
  });

  const updateTableOfContentsCurrentLink = (scrollFromTop) => {
    let currentLink = document.querySelector(".current-nav-link")
    if(currentLink)
      currentLink.classList.remove('current-nav-link');
    const allLinks = Object.entries(headerOffsets).reverse();
    const newLink = (allLinks.find((offset) => offset[0] <= scrollFromTop) || allLinks[allLinks.length - 1])[1];
    newLink.classList.add("current-nav-link");
  };

  const setProgress = () => {
      let scrollFromTop = (html.scrollTop || body.scrollTop) + html.clientHeight;
      let width = (scrollFromTop / height) * 100 + '%';

      const progressBar = document.getElementById('progress');
      if(!progressBar)
        return
      progressBar.style.width = width;

      updateTableOfContentsCurrentLink(scrollFromTop);
  };

  window.addEventListener('scroll', setProgress);

  setProgress();
};
