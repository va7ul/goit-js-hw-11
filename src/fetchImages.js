export async function fetchImages(name, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32844399-402b025363825ff7850242d10';

    const axios = require('axios').default;

    try {
        return await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(resp => {
            if (!resp.data.total) {
            throw new Error("Bad request!!!");
            }
        return resp.data;
    });
    } catch (error) {
        console.log(error);
    }


    // return fetch(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(resp => {
    //     if (!resp.ok) {
    //         throw new Error(resp.status);
    //     }
    //     return resp.json();
    // }).then(data => {
    //     if (!data.total) {
    //         throw new Error(data.total);
    //     }
    //     console.log(data);
    //     return data;
    // })
}