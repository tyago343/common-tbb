async function client(endpoint, {data, token, headers: customHeaders, ...customConfig} = {}) {
    const config = {
        method: data ? "POST" : "GET",
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-type": data ? 'application/json': undefined,
            ...customHeaders
        },
        ...customConfig
    }
}
export {client}