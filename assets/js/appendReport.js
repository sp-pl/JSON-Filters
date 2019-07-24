function createLayout(data){
    console.log(data)
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

//<div class="holder">
//    <h2 class="title">' + re[i].title + '</h2>
//    <p class="description">' + re[i].description + '</p>
//</div>
//<div class="action">
//    <a class="open" href="#">Zobacz raport</a>

    let reportContent = document.createElement('DIV');
        reportContent.classList.add('content');        

    let reportDetails = document.createElement('DIV');
        reportDetails.classList.add('holder');

    let reportDetailsTitle = document.createElement('H2');
        reportDetailsTitle.classList.add('title');
        reportDetailsTitle.innerHTML = data.title;

        reportDetails.appendChild(reportDetailsTitle);

    let reportDescription = document.createElement('P');
        reportDescription.classList.add('description');    
        reportDescription.innerHTML = data.description;

        reportContent.appendChild(reportDetails);
        singleReport.appendChild(reportContent);

    let reportAction = document.createElement('DIV');
        reportAction.classList.add('action');

    if(data.files.length === 0){
        console.log(0);
    }else if(data.files.length === 1){
        console.log(1);
    }else{
        for(let i = 0; i<data.files.length; i++){
            console.log(i);
        }
    }    


    mainOutput.appendChild(singleReport);
};
export default createLayout;