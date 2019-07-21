'use strict'
//datalink: http://localhost:3000/assets/data/data.json
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

let initApp = (data,propName) => {
    formatData(data);
    createYearOptions(data,(propName || 'date'));
    let uniqueCategories = createCategoriesTabs(data,(propName || 'category'));
    searchObjInit(uniqueCategories);
};

let formatData = (data) => {
    //sort data from lowest to highest
    data.sort((a,b) => {
        return a.date - b.date
    });
    //turn posix to date
    for(let i = 0; i < data.length; i++){
         data[i].date = new Date(data[i].date)
    };
    return data;
};

let createYearOptions = (data,propName) => {
    //get every year
    let allYears = [];
    for(let i = 0; i < data.length; i++){
        allYears.push(data[i][propName].getFullYear());
    };
    
    //get single years
    let singleYears = allYears.filter((v,index,self) => self.indexOf(v) === index);

    //create and append options
    for(let i = 0; i < singleYears.length; i++){
        let newOption = document.createElement('OPTION');
        newOption.textContent = singleYears[i];
        newOption.dataset.year = singleYears[i];
        selectOptionsContainer.appendChild(newOption);
    }
};

let createCategoriesTabs = (data,propName) => {
    //get every category
    let categories = [];
    for(let i = 0; i < data.length; i++){
        categories.push(data[i][propName])
    }
    //get single categories from every category
    let singleCategories = categories.filter((v,index,self) => self.indexOf(v) === index );

    //create and append tabs
    for(let i = 0; i < singleCategories.length; i++){
        let newButton = document.createElement('BUTTON');
        newButton.textContent = singleCategories[i];
        newButton.dataset.category = singleCategories[i];
        categoriesTabsContainer.appendChild(newButton);
    };
    return singleCategories;
};
// createCategoriesTabs(formatData(arr),'category');


let searchObjInit = (categories) => {
    let categoriesfirstTab = document.querySelector('.filter .search button:nth-child(1)');
    let searchObj = {
        year: '',
        all: '' 
    }
    searchObj.year = selectOptionsContainer.value;
    searchObj.all = true;
    if(categories){
        for(let i = 0; i<categories.length; i++){
            searchObj[categories[i]] = false;
        };
    };
    console.log(searchObj)
    return searchObj;
};

let controls = () => {

}

