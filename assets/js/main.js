'use strict'
let selectOptionsContainer = document.querySelector('.filter .search .select-year-container .years');
let categoriesTabsContainer = document.querySelector('.filter .search .categories');

let fetchData = (link) => {
    fetch(link, {
        method:'GET',
        headers: {
        Accept: 'application/json'
        }
    })
    .then(response => {
        if(response.ok){
           return response.json();
        }else{
            throw new Error('server not')
        }
    })
    .then(json => {
        initApp(json)
    })
};
fetchData('http://localhost:3000/assets/data/data.json');

let initApp = (data) => {
    formatData(data);
    createYearOptions(data,'date');
    let uniqueCategories = createCategoriesTabs(data,'category');
    let searchObjectFirst = searchObjInit(uniqueCategories);
    controls(searchObjectFirst, data);
};

let formatData = (data) => {
    data.sort((a,b) => {
        return a.date - b.date
    });
    for(let i = 0; i < data.length; i++){
         data[i].date = new Date(data[i].date)
    };
    return data;
};

let createYearOptions = (data,propName) => {
    let allYears = [];
    for(let i = 0; i < data.length; i++){
        allYears.push(data[i][propName].getFullYear());
    };
    
    let singleYears = allYears.filter((v,index,self) => self.indexOf(v) === index);
    for(let i = 0; i < singleYears.length; i++){
        let newOption = document.createElement('OPTION');
        newOption.textContent = singleYears[i];
        newOption.dataset.year = singleYears[i];
        selectOptionsContainer.appendChild(newOption);
    }
};

let createCategoriesTabs = (data,propName) => {
    let categories = [];
    for(let i = 0; i < data.length; i++){
        categories.push(data[i][propName])
    }

    let singleCategories = categories.filter((v,index,self) => self.indexOf(v) === index );
    for(let i = 0; i < singleCategories.length; i++){
        let newButton = document.createElement('BUTTON');
        newButton.textContent = singleCategories[i];
        newButton.dataset.category = singleCategories[i];
        categoriesTabsContainer.appendChild(newButton);
    };
    return singleCategories;
};

let searchObjInit = (categories) => {
    let searchObj = {
        year: '',
        all: '' 
    };
    searchObj.year = selectOptionsContainer.value;
    searchObj.all = true;
    if(categories){
        for(let i = 0; i<categories.length; i++){
            searchObj[categories[i]] = false;
        };
    };
    return searchObj;
};

let controls = (searchObj,data) => {

    function selectOptionsSet(evt){
        searchObj.year = evt.target.value;
    }
    selectOptionsContainer.addEventListener('change',selectOptionsSet);

    function categoryTabsBool(evt){
        let categoriesAllTabs = document.querySelectorAll('.filter .search .categories button');
        if(evt.target.dataset.category === 'all' && !evt.target.classList.contains('active')){
            evt.target.classList.add('active');
            searchObj.all = true;
            for(let i = 1; i < categoriesAllTabs.length; i++){
                categoriesAllTabs[i].classList.remove('active');
                searchObj[categoriesAllTabs[i].dataset.category] = false;
            };
        }
        if((evt.target.dataset.category !== 'all' && !evt.target.classList.contains('active')) && evt.target.tagName === 'BUTTON'){
            categoriesAllTabs[0].classList.remove('active');
            searchObj.all = false;
            evt.target.classList.add('active');
            searchObj[evt.target.dataset.category] = true;
        }else if((evt.target.dataset.category !== 'all' && evt.target.classList.contains('active')) && evt.target.tagName === 'BUTTON'){
            evt.target.classList.remove('active');
            searchObj[evt.target.dataset.category] = false;
        };
    };
    categoriesTabsContainer.addEventListener('click',categoryTabsBool);
    
    function performSearch(searchObj,data){
        for(let i = 0; i<data.length; i++){
            if(data[i].date.getFullYear() == searchObj.year){
                if(searchObj.all === true){
                    console.log(data[i]);
                }else{
                    for(let props in searchObj){
                        if((searchObj[props] == true) && data[i].category == props){
                            createLayout(data[i])
                        };
                    }; 
                };
            };
        };
    };
    performSearch(searchObj,data);
    document.querySelector('button.search').addEventListener('click',() => {performSearch(searchObj,data)});

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
            reportDetailsTitle.innerHTML = data.title
                

        
        mainOutput.appendChild(singleReport);
    };
};



