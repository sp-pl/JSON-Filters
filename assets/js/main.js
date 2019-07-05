'use strict';

(function(){

    let resp = 0;

    let link = window.location.origin + '/assets/data/data.json'

    const categoriesContainer = document.querySelector('form.search .categories');
    const categoriesYears = document.querySelector('form.search .years');
    const outputContainer = document.querySelector('.filter .output');
    const textInput = document.querySelector('.input-container input');
    const searchButton = document.querySelector('.input-container button.search');
    const yearSelect = document.querySelector('section.filter select')
    const tagsContainer = document.querySelector('section.filter .categories');

    var uniqueYears = [];
    const choicesObj = {
        date: '',
        Wszystkie: true

    };

    //fetch data and run functions
    fetch(link,{
        method: 'GET',
        headers: {
            Accept: 'application/json'
        },
    }).then(response => {
        if(response.ok){
            response.json().then(json => {
              return resp = json;
            }).then(resp =>{
                resp.sort((a, b) => (a.date > b.date) ? 1 : -1)
                initData(resp)
                configObj()
                controlls()
                giveReports(choicesObj,resp)
                
            }
            )
        }
    })

    function initData(resp){

        // format date
        let allRecordYears = [];

        for(let i = 0; i < resp.length; i++){

            resp[i].date = new Date(resp[i].date);
            allRecordYears.push(resp[i].date.getFullYear());

        };

        let uniqueYears = (allRecordYears) = allRecordYears.filter((v,i) => allRecordYears.indexOf(v) === i);

        //add select options
        for(let i = 0; i < uniqueYears.length; i++){

            let selectOption = document.createElement('option');
            selectOption.innerText = uniqueYears[i];
            selectOption.setAttribute('value',uniqueYears[i]); 
            selectOption.dataset.year = uniqueYears[i];
            categoriesYears.appendChild(selectOption);

        }
        yearSelect.value = yearSelect[yearSelect.length - 1].value

        //get categories and create tabs
        let allCategories = [];
        
        for(let i = 0; i < resp.length; i++){
            
            allCategories.push(resp[i].category);

        }

        let uniqueCategories = (allCategories) = allCategories.filter((v,i) => allCategories.indexOf(v) === i);

        for(let i = 0; i < uniqueCategories.length; i++){

            let categoryButton = document.createElement('button');
            categoryButton.innerText = uniqueCategories[i];
            categoryButton.dataset.category = uniqueCategories[i];
            categoriesContainer.appendChild(categoryButton);

        }
    };//end of init data


    function createdTags(){

            let tags = document.querySelectorAll('section.filter .categories button');
            return tags;  

    };


    function configObj(){

        var tagsNow = createdTags()

        //prepare config obj
        for(let i = 1; i < tagsNow.length  ; i++){
            if(tagsNow[i].dataset.category == 'Wszystkie'){
                choicesObj[tagsNow[i].dataset.category] = true;
            }else{
                choicesObj[tagsNow[i].dataset.category] = false;
            }
        }

        choicesObj.date = yearSelect[yearSelect.length - 1].value

        return choicesObj

    }// end of: configObj



    function controlls(){
        
        categoriesYears.addEventListener('change', function(){

            choicesObj.date = categoriesYears.value;
            
            giveReports(choicesObj,resp)
        
        });//end of: listener for year select
        
        tagsContainer.addEventListener('click',function(evt){

            var tagsNow = createdTags()

            if(evt.target.classList.contains('active')){

                evt.target.classList.remove('active')
                choicesObj[evt.target.dataset.category] = false;

            }else{

                evt.target.classList.add('active')
                choicesObj[evt.target.dataset.category] = true;

            }

            if(evt.target.dataset.category == 'Wszystkie'){

                for(var i = 0; i < tagsNow.length; i++){
                        tagsNow[i].classList.remove('active')
                        choicesObj[tagsNow[i].dataset.category] = false;
                }

                evt.target.classList.add('active')
                choicesObj.Wszystkie = true;

            }else{

                tagsNow[0].classList.remove('active')
                choicesObj.Wszystkie = false;

            };
            
            giveReports(choicesObj,resp);        

        });//end of: event listener for tags function
    }//end of: control functions

            
    function textSearch(){
        
        let reportsTitlesAndDescriptionsArray = Array.from(document.querySelectorAll('.output .report .content .holder'));
       
        var reportContainer;
        
            for(var i = 0; i < reportsTitlesAndDescriptionsArray.length; i++){
                
                reportContainer = reportsTitlesAndDescriptionsArray[i].parentElement;
                
                if(reportsTitlesAndDescriptionsArray[i].innerText.toLowerCase().includes(textInput.value.toLowerCase())){
                    
                   while(!reportContainer.classList.contains('report')){
                        
                        reportContainer = reportContainer.parentElement;

                    }

                    reportContainer.style.display = 'flex'; 
                    
                }else if((!reportsTitlesAndDescriptionsArray[i].innerText.toLowerCase().includes(textInput.value.toLowerCase())) || (textInput.value == '') ){

                    while(!reportContainer.classList.contains('report')){
                        
                        reportContainer = reportContainer.parentElement

                    }

                    reportContainer.style.display = 'none';

                }

            }
    };//end of textsearch function                
       
    textInput.addEventListener('keyup',textSearch);
    searchButton.addEventListener('click',textSearch);



    function giveReports(a,re){

        outputContainer.innerHTML = " "

        var configObjKeys = [], key;

        for(key in a){
            if (a.hasOwnProperty(key)) configObjKeys.push(key)
        }
        
        for(var i = 0; i < re.length; i++){
            
            let singleItem = document.createElement('DIV');
                singleItem.classList.add('report');

            var metaContainer = 
                '<div class="meta"><p class="time">'
                    + ((re[i].date.getDay() <= 9) ? ('0' + re[i].date.getDay()) : re[i].date.getDay()) + '.' 
                    + ((re[i].date.getMonth() <= 9) ? ('0' + re[i].date.getMonth()) : re[i].date.getMonth()) + '.' 
                    + re[i].date.getFullYear() + 
                    '<br/> '
                    + re[i].date.getHours() + '.' + ((re[i].date.getMinutes() <= 9) ? ('0' + re[i].date.getMinutes()) : re[i].date.getMinutes()) + 
                    '</p><p class="category">' + 'Raporty ' + re[i].category.toLowerCase() + 
                 '</p></div>';

            var reportDetails = '<div class="holder"><h2 class="title">' + re[i].title + '</h2><p class="description">' + re[i].description + '</p></div><div class="action"><a class="open" href="#">Zobacz raport</a>';
            var reportFiles = '';
            var reportMultiFiles = '';     
            
            if(a[configObjKeys[1]]){
                
                createReportLaout(singleItem);

            }else{

                for(let o = 2; o < configObjKeys.length; o++ ){

                    if(a[configObjKeys[o]]){

                        if(re[i].category == (configObjKeys[o])){

                            createReportLaout(singleItem);
                        
                        }

                    }
                }
           }    
        }//end of main for    

        function createReportLaout(single_item){
            
            if(re[i].date.getFullYear() == a[configObjKeys[0]]){
                
                if(re[i].files.length == 0){
                
                    single_item.classList.add('no-file');
                    single_item.innerHTML = metaContainer + '<div class="content">' + reportDetails + '</div>';
                    outputContainer.appendChild(single_item)

                }else if(re[i].files.length == 1){
                    
                    single_item.classList.add('single-file')
                    reportFiles = '<a class="download" href="#">' + resp[0].files[0].filename + '.pdf (' + resp[0].files[0].filesize + 'kB)</a></div>';
                    single_item.innerHTML = metaContainer + '<div class="content">' + reportDetails + reportFiles + '</div>';
                    outputContainer.appendChild(single_item)

                }else{

                    for(var y = 0; y < re[i].files.length; y++){

                        single_item.classList.add('multi-file')
                        reportMultiFiles += '<a href="#">' + re[i].files[y].filename + '.pdf ('+ resp[0].files[0].filesize + 'kB)</a>';
                        single_item.innerHTML = metaContainer + '<div class="content">' + reportDetails + '<div class="accordion-container"><a href="#" class="accordion">pliki do pobrania (' + re[i].files.length + ')</a>'+ '<div>' + reportMultiFiles + '</div>' +'</div>' + '</div>';
                        outputContainer.appendChild(single_item)   

                    }

                }
            }

            
            if(i == re.length - 1){
                
                let accordions = document.querySelectorAll('section.filter .accordion');
                
                if(accordions){
                
                    for(let i = 0; i < accordions.length; i++){

                        accordions[i].addEventListener('click',function(evt){

                            evt.preventDefault();
                            
                            if(!evt.target.classList.contains('active')){

                                evt.target.classList.add('active');

                            }else{

                                evt.target.classList.remove('active');
                            
                            }

                        });

                    };

                };
            };
        }//end of: createReportLayout function
    }// end of: give reports

}())

