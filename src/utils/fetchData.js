const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  const json = await response.json();
  return json;
};

export default fetchData;
