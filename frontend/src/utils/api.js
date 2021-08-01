const apiURL = process.env.REACT_APP_API_URL;
async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? "POST" : "GET",
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-type": data ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response;
      if (response.ok) {
        return await data.json();
      } else {
        return data;
      }
    });
}
export { client };
