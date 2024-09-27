fetch('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available')
    .then(response => {
        if (!response.ok) {
            throw new Error('Проблемы с сетью ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Возникла проблема с операцией выборки:', error);
    });