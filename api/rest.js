export async function restGet(url){

    const fullUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${url}`;
    const response = await fetch(fullUrl.toString(), {
        method: "GET",
        credentials: 'include'
    }).catch(error => console.log(error.message));

    if(await response && response) {
        const data = response.json();
        return data;
    }
    // const data = await response.json();

}

export async function restPost(url, data){
    const fullUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${url}`;

    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/session/token`, {
        method: "GET",
        credentials: 'include'
    });

    const token = await tokenResponse.text();

    const options = {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(fullUrl.toString(), options);

    try{
        const status = response.status;
        const json = await response.json();
        return {status, json};
    }catch (e) {
        console.log('Problem with JSON', e);
    }
    return response;
}

export async function restPatch(url, data){
    const fullUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${url}`;

    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/session/token`, {
        method: "GET",
        credentials: 'include'
    });

    const token = await tokenResponse.text();

    const options = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(fullUrl.toString(), options);

    try{
        const status = response.status;
        const json = await response.json();
        return {status, json};
    }catch (e) {
        console.log('Problem with JSON', e);
    }
    return response;
}

export async function restDelete(url, data){
    const fullUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${url}`;

    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/session/token`, {
        method: "GET",
        credentials: 'include'
    });

    const token = await tokenResponse.text();

    const options = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': token
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(fullUrl.toString(), options);

    try{
        const status = response.status;
        const json = await response.json();
        return {status, json};
    }catch (e) {
        console.log('Problem with JSON', e);
    }
    return response;
}
