export function getPriceQueryParams(queryParams, key, value) {
  const hasValueInParam = queryParams.has(key);

  if (value && hasValueInParam) {
    queryParams.set(key, value);
  } else if (value) {
    queryParams.append(key, value);
  } else if (hasValueInParam) {
    queryParams.delete(key);
  }

  return queryParams;
}

export function parseCallbackUrl(url) {
  const res = url.replace(/%3A/g, ':').replace(/%2F/g, '/');
  return res;
}

export function getUserReview(reviews, userId) {
  const userReview = reviews.find((review) => review?.user?.id === userId);

  return userReview;
}
