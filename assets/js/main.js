



//datalink: http://localhost:3000/assets/data/data.json
let fetchData = (link) => {
    fetch(link, {
        method:'GET',
        headers: {
            Accept: 'application/json'
        }
    }).then(response => {
        if(response.ok){
            console.log('response ok')
        }else{
            console.log(response.error)
        };
    });
};