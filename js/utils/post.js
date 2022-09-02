import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextContent, truncateText } from './common';

// to use fromNow function
dayjs.extend(relativeTime);

export function createPostElement(post) {
  if (!post) return;

  // find and clone template
  const postTemplate = document.getElementById('postTemplate');
  if (!postTemplate) return;

  const liElement = postTemplate.content.firstElementChild.cloneNode(true);
  if (!liElement) return;

  // update title, desc, author, thumbnail
  // const titleElement = liElement.querySelector('#postItemTitle');
  // if (titleElement) titleElement.textContent = post.title;
  setTextContent(liElement, '#postItemTitle', post.title);
  setTextContent(liElement, '#postItemDescription', truncateText(post.description, 100));
  setTextContent(liElement, '#postItemAuthor', post.author);
  setTextContent(liElement, '#postItemTimeSpan', ` - ${dayjs(post.updateAt).fromNow()}`);

  const thumbnailElement = liElement.querySelector('#postItemImage');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src = 'https://picsum.photos/id/10/1368/400';
    });
  }

  // attach event go to detail post
  // when click on div.post-item
  const divElement = liElement.firstElementChild;
  if (divElement) {
    divElement.addEventListener('click', () => {
      // Cach 1: if event is triggered from menu -> ignore
      const menu = liElement.querySelector('#postItemMenu');
      if (menu && menu.contains(event.target)) return;

      window.location.assign(`/post-detail.html?id=${post.id}`);
    });
  }

  // attach event for edit button
  const editButton = liElement.querySelector('#postItemEdit');
  if (editButton)
    editButton.addEventListener('click', (e) => {
      // Cach 2: prevent event bubbling to parent
      // e.stopPropagation();
      window.location.assign(`/add-edit-post.html?id=${post.id}`);
    });

  // attach event for remove button
  const removeButton = liElement.querySelector('#postItemRemove');
  if (removeButton)
    removeButton.addEventListener('click', (e) => {
      const customEvent = new CustomEvent('post-delete', {
        bubbles: true,
        detail: post,
      });

      removeButton.dispatchEvent(customEvent);
    });

  return liElement;
}

export function renderPostList(elementId, postList) {
  if (!Array.isArray(postList)) return;

  const ulElement = document.getElementById(elementId);
  if (!ulElement) return;

  // clear current list
  ulElement.textContent = '';

  postList.forEach((post, index) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}
