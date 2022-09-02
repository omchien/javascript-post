import postApi from './api/postApi';
import {
  initSearch,
  renderPostList,
  initPagination,
  renderPagination,
  toast,
  setTextContent,
} from './utils';

async function handleFilterChange(filterName, filterValue) {
  try {
    // update query params
    const url = new URL(window.location);
    if (filterName) url.searchParams.set(filterName, filterValue);

    // reset page if needed
    if (filterName === 'title_like') url.searchParams.set('_page', 1);

    history.pushState({}, '', url);

    // fetch API
    // re-render post list
    const { data, pagination } = await postApi.getAll(url.searchParams);
    renderPostList('postList', data);
    renderPagination('postsPagination', pagination);
  } catch (error) {
    console.log('failed to fetch post list');
  }
}

function registerPostDeleteEvent() {
  document.addEventListener('post-delete', async (e) => {
    try {
      const post = e.detail;
      const modal = document.getElementById('exampleModal');
      setTextContent(modal, '.modal-body', `Are you sure to remove post ${post.title}?`);

      const removeButton = modal.querySelector('#modalRemoveButton');
      if (removeButton)
        removeButton.addEventListener('click', async () => {
          await postApi.remove(post.id);
          await handleFilterChange();
          toast.success('Remove post successfully');
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  });
}

(async () => {
  try {
    const url = new URL(window.location);

    // update search params if needed
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

    history.pushState({}, '', url);
    const queryParams = url.searchParams;

    registerPostDeleteEvent();

    initPagination({
      elementId: 'postsPagination',
      defaultParams: queryParams,
      onChange: (page) => handleFilterChange('_page', page),
    });

    initSearch({
      elementId: 'searchInput',
      defaultParams: queryParams,
      onChange: (value) => handleFilterChange('title_like', value),
    });

    // render post list based URL params
    handleFilterChange();
  } catch (error) {
    console.log('get all failed', error);
  }
})();
