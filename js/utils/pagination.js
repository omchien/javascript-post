export function renderPagination(elementId, pagination) {
  const ulPagination = document.getElementById(elementId);
  if (!pagination || !ulPagination) return;

  const { _page, _limit, _totalRows } = pagination;
  // calc totalPages
  const totalPages = Math.ceil(_totalRows / _limit);

  // save page and totalPages to ulPagination
  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  // check if enable,disable prev/next link
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  const nextLink = ulPagination.lastElementChild?.lastElementChild;

  if (_page <= 1) prevLink.classList.add('disabled');
  else prevLink.classList.remove('disabled');

  if (_page >= totalPages) nextLink.classList.add('disabled');
  else nextLink.classList.remove('disabled');
}

export function initPagination({ elementId, defaultParams, onChange }) {
  // bind click event for prev/next link
  const ulPagination = document.getElementById(elementId);
  if (!ulPagination) return;

  // handle prev click
  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  if (prevLink) {
    prevLink.addEventListener('click', (e) => {
      e.preventDefault();

      const page = Number.parseInt(ulPagination.dataset.page) || 1;
      if (page > 1) onChange?.(Number.parseInt(page) - 1);
    });
  }

  // handle next click
  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener('click', (e) => {
      e.preventDefault();

      const page = Number.parseInt(ulPagination.dataset.page) || 1;
      const totalPages = ulPagination.dataset.totalPages;
      if (page < totalPages) onChange?.(Number.parseInt(page) + 1);
    });
  }
}
