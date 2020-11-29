const Utils = {
  parseURL: () => {
    const url = location.hash.slice(1).toLowerCase() || '/';

    const detailURL = url.split('/');

    const request = {
      resource: null,
      id: null,
    };

    request.resource = detailURL[0];
    request.id = detailURL[1];
    return request;
  },
};

export default Utils;
