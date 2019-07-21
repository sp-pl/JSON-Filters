import createLayout from './createLayout.js';
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

};



