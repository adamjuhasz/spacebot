// Created Tue Apr 11 2017
newScript('POTD')
    .dialog((session, response) => {
        return request({
            uri: 'https://api.nasa.gov/planetary/apod',
            method: 'GET',
            qs: {
                api_key: 'DEMO_KEY'
            },
            json: true,
        })
        .then(apod => {
            response.sendImage(apod.url);
        })
        .delay(1000)
    })