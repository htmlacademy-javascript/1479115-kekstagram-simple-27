const config = {
  baseUrl: 'https://27.javascript.pages.academy/kekstagram-simple',
};

const makeRequest = ({ endpoint = '', onSuccess, onFail, method = 'GET', body = null }) => {
  fetch(`${config.baseUrl}/${endpoint}`, {
    method,
    body,
  })
    .then((response) => response.ok ? response.json() : response.json().then((errorData) => Promise.reject(errorData)))
    .then((data) => {
      onSuccess(data);
    }).catch(onFail);
};

export { makeRequest };
