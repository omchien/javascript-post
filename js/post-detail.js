import dayjs from 'dayjs';
import postApi from './api/postApi';
import { registerLightBox, setTextContent } from './utils';

function renderPostDetail(post) {
  if (!post) return;

  // render edit page link
  const editPageLink = document.getElementById('goToEditPageLink');
  if (editPageLink) {
    editPageLink.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit post`;
    editPageLink.href = `/add-edit-post.html?id=${post.id}`;
  }

  // render hero image
  const heroImage = document.getElementById('postHeroImage');
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`;

    heroImage.addEventListener('error', () => {
      heroImage.src = 'https://picsum.photos/id/1/1368/1000';
    });
  }

  // render title, desc, author, updatedAt
  setTextContent(document, '#postDetailTitle', post.title);
  setTextContent(document, '#postDetailDescription', post.description);
  setTextContent(document, '#postDetailAuthor', post.author);
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updatedAt).format('- DD/MM/YYYY HH:mm')
  );
}

(async () => {
  try {
    registerLightBox({
      modalId: 'lightbox',
      imgSelector: 'img[data-id="lightboxImg"',
      prevSelector: 'button[data-id="lightboxPrev',
      nextSelector: 'button[data-id="lightboxNext',
    });

    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');
    if (!postId) return;

    const post = await postApi.getById(postId);
    renderPostDetail(post);
  } catch (error) {
    console.log(error);
  }
})();
