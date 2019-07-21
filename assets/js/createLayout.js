function createLayout(data){
    let mainOutput = document.querySelector('.output');
    let singleReport = document.createElement('DIV');
        singleReport.classList.add('report');

    let metaBox = document.createElement('DIV');
        metaBox.classList.add('meta');

        singleReport.appendChild(metaBox);

    let innerMetaP1 = document.createElement('P');
        innerMetaP1.classList.add('time');

        innerMetaP1.innerHTML = 
            ((data.date.getDay() <= 9) ? ('0' + data.date.getDay()) : data.date.getDay()) + '.' 
            + ((data.date.getMonth() <= 9) ? ('0' + data.date.getMonth()) : data.date.getMonth()) + '.' 
            + data.date.getFullYear() + 
            '<br/> ' + data.date.getHours() + '.' + ((data.date.getMinutes() <= 9) ? ('0' + data.date.getMinutes()) : data.date.getMinutes()); 
        
        metaBox.appendChild(innerMetaP1)
    
    let innerMetaP2 = document.createElement('P');
        innerMetaP2.classList.add('category');

        innerMetaP2.innerHTML = 'Raporty ' + data.category.toLowerCase()
        
        metaBox.appendChild(innerMetaP2);

    let reportDetails = document.createElement('DIV');
        reportDetails.classList.add('holder');

    let reportDetailsTitle = document.createElement('H2');
        reportDetailsTitle.innerHTML = data.title;

        reportDetails.appendChild(reportDetailsTitle);

    let reportDescription = document.createElement('P');    
        reportDescription.innerHTML = data.description;    

    
    mainOutput.appendChild(singleReport);
};
export default createLayout;