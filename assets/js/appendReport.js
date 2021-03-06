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
        reportContent.appendChild(reportDescription);
        singleReport.appendChild(reportContent);

    let reportAction = document.createElement('DIV');
        reportAction.classList.add('action');

    let seeReportLink = document.createElement('A');
        seeReportLink.innerHTML = "Zobacz raport";

        reportAction.appendChild(seeReportLink); 

    if(data.files.length === 0){
        reportContent.appendChild(reportAction);
    }else if(data.files.length === 1){
            reportContent.appendChild(reportAction);
        let singleFileLink = document.createElement('A');
            singleFileLink.setAttribute('href','#');
            singleFileLink.classList.add('download');
            singleFileLink.innerHTML = data.files[0].filename + '.pdf (' + data.files[0].filesize + ')kB';
            reportAction.appendChild(singleFileLink);
    }else{
        let multiFileContainer = document.createElement('DIV');
            multiFileContainer.classList.add('accordion-container');

        let accordionLink = document.createElement('A');
            accordionLink.classList.add('accordion');
            accordionLink.innerHTML = 'pliki do pobrania (' + data.files.length + ')</a>';
            accordionLink.addEventListener('click',function(){
                this.classList.toggle('active')
            })

            multiFileContainer.appendChild(accordionLink);

        let multiFileHolder = document.createElement('DIV');
            multiFileContainer.appendChild(multiFileHolder);
            

        for(let i = 0; i<data.files.length; i++){
            let singleFileLink = document.createElement('A');
                singleFileLink.setAttribute('href','#');
                singleFileLink.innerHTML = data.files[i].filename + '.pdf' + 
                '(' + data.files[i].filesize + '.kB)</a>';
                multiFileHolder.appendChild(singleFileLink);
        }
            multiFileContainer.appendChild(multiFileHolder);
            reportContent.appendChild(multiFileContainer);
    }    


    mainOutput.appendChild(singleReport);
};
export default createLayout;