export default async function puthFetch( url, bodyData, headers ) {
    const response = await fetch( url, {
        headers: headers,
        method: 'PUT',
        body: JSON.stringify(bodyData)
    })
    return await response.json()
}