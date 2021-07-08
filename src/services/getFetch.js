export default async function getFetch( url, headers ) {
    const response = await fetch(url, {
        headers: headers
    })
    return await response.json()
}