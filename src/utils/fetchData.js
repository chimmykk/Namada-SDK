const fetchData = async (url, cb) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Something went wrong to fetching the data", res.status);
    }

    const data = await res.json();

    cb(data);
  } catch (err) {
    return err;
  }
};

export default fetchData;
