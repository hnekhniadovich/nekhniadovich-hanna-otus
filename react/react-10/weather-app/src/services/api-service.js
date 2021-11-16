const API_KEY = "ad92f2fdefbf4f10b9d7dc8bc19e1fd2";

export const getWeatherByCity = async (city) => {   
    const _apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const res = await fetch(_apiUrl);

    if (!res.ok) {
        throw new Error(`Could not fetch ${_apiUrl}` +
        `, received ${res.status}`)
    }

    return await res.json();
}

export const getWeatherDetailsByCity = async (lat, lon) => {
    const _apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${API_KEY}&units=metric`
    const res = await fetch(_apiUrl);

    if (!res.ok) {
        throw new Error(`Could not fetch ${_apiUrl}` +
        `, received ${res.status}`)
    }

    return await res.json();
}


