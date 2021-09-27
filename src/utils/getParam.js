export default (key) => {
  let searchPairs = window.location.search.substr(1);
  searchPairs = searchPairs ? searchPairs.split('&') : [];
  searchPairs = searchPairs.map((pair) => {
    const res = pair.split('=');
    return { key: res[0], value: res[1] || '' };
  });
  searchPairs = searchPairs.filter((pair) => Boolean(pair.value));
  const param = searchPairs.find((pair) => pair.key === key);
  return param ? param.value : '';
}
