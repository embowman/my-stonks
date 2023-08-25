export async function postData(url, data={}) {
    const response = await fetch(`http://127.0.0.1:8000/api/${url}`, data={}, {
        method: "POST",
        mode: "cors",
        // cache: "no-cache",
        // credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        // redirect: "follow",
        // referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
    });

    return response.json();
}