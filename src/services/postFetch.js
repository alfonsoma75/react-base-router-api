export default async function postFetch( url, bodyData, headers ) {
    // Django requiere que el post vaya con la url terminada en /
    const lastItem = url.slice[-1]
    url += (lastItem !== '/') ? '/' : ''

    const response = await fetch( url, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify(bodyData)
    })
    return await response.json()
}