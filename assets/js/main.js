



//datalink: http://localhost:3000/assets/data/data.json
// bca = fetchData('http://localhost:3000/assets/data/data.json')
let fetchData = (link) => {
    return fetch(link, {
        method:'GET',
        headers: {
            Accept: 'application/json'
        }
        })
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            return resp = JSON.stringify(myJson);
        });
};

