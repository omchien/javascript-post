import postApi from './api/postApi';

function createPostElement(post) {
  if (!post) return;

  try {
    // find and clone template
    const postTemplate = document.getElementById('postTemplate');
    if (!postTemplate) return;

    const liElement = postTemplate.content.firstElementChild.cloneNode(true);
    if (!liElement) return;

    // update title, desc, author, thumbnail
    const titleElement = liElement.querySelector('#postItemTitle');
    if (titleElement) titleElement.textContent = post.title;

    const descElement = liElement.querySelector('#postItemDescription');
    if (descElement) descElement.textContent = post.description;

    const authorElement = liElement.querySelector('#postItemAuthor');
    if (authorElement) authorElement.textContent = post.author;
  } catch (error) {
    console.log('failed to create post item');
  }
}

function renderPostList(postList) {
  if (!Array.isArray(postList) || postList.length === 0) return;

  const ulElement = document.getElementById('postsList');
  if (!ulElement) return;

  postList.forEach((post, index) => {
    console.log(post);
    const liElement = createPostElement(post);
    console.log(liElement);
    // ulElement.appendChild(liElement);
  });
}

(async () => {
  try {
    const { data, pagination } = await postApi.getAll({ _page: 1, _limit: 6 });
    console.log(data);
    // renderPostList(data);
  } catch (error) {
    console.log('get all failed', error);
  }
})();
