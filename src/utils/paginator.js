/* eslint-disable require-jsdoc */
function paginator(arr, page, limit) {
  // Ensure page and limit are valid numbers
  page = Math.max(1, page); // Page should be at least 1
  limit = Math.max(1, limit); // Limit should be at least 1

  const totalItems = arr.length;
  const totalPages = Math.ceil(totalItems / limit);

  // Calculate the start index for slicing
  const startIndex = (page - 1) * limit;
  // Calculate the end index for slicing
  const endIndex = Math.min(startIndex + limit, totalItems);

  const data = {
    paginate: arr.slice(startIndex, endIndex),
    totalItems,
    totalPages,
    currentPage: page
  };

  // Determine if there is a next page
  if (page < totalPages) {
    data.next = page + 1;
  }

  // Determine if there is a previous page
  if (page > 1) {
    data.prev = page - 1;
  }

  return data;
}

export default paginator;
