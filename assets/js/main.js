import appendReport from './appendReport.js';

const selectOptionsContainer = document.querySelector('.filter .search .select-year-container .years');
const categoriesTabsContainer = document.querySelector('.filter .search .categories');
const mainOutput = document.querySelector('.output'); 

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
    appendYearOptions(getUniqueYears(data,'date'))
    appendCategoriesTabs(getUniqueCategories(data,'category'))
    let uniqueCategories = createCategoriesTabs(data,'category');
    let searchObjectFirst = searchObjInit(uniqueCategories)
    controls(searchObjectFirst, data)
}

let formatData = (data) => {
    return data.sort((a,b) => {
        return a.date - b.date
    }).map( (item) => {
        return item.date = new Date(item.date)
    })
}

let getUniqueYears = (data,propName) => {
    let allYears = data.map(current => {
        return current[propName].getFullYear()
    })
    return allYears.filter((v,index,self) => self.indexOf(v) === index)
}
let getUniqueCategories = (data,propName) => {
    let allCats = data.map(current => {
        return current[propName]
    })
    return allCats.filter((v,index,self) => self.indexOf(v) === index)

}

let appendYearOptions = uniqueYears => {
    uniqueYears.forEach( current => {
        let newOption = document.createElement('OPTION')
        newOption.textContent = current
        selectOptionsContainer.appendChild(newOption)
    })
}

let appendCategoriesTabs = uniqueCats => {
    uniqueCats.forEach( current => {
        let newTab = document.createElement('BUTTON')
        newTab.textContent = current
        newTab.dataset.category = current
        categoriesTabsContainer.appendChild(newTab)
    })
}

// let createCategoriesTabs = (data,propName) => {
//     let categories = [];
//     for(let i = 0; i < data.length; i++){
//         categories.push(data[i][propName])
//     }
//     // let categories = data.map

//     let singleCategories = categories.filter((v,index,self) => self.indexOf(v) === index );
//     for(let i = 0; i < singleCategories.length; i++){
//         let newButton = document.createElement('BUTTON');
//         newButton.textContent = singleCategories[i];
//         newButton.dataset.category = singleCategories[i];
//         categoriesTabsContainer.appendChild(newButton);
//     };
//     return singleCategories;
// };

let searchObjInit = (categories) => {
    let searchObj = {
        year: '',
        all: '' 
    };
    searchObj.year = selectOptionsContainer.value;
    searchObj.all = true;
    if(categories){
        categories.map((current,index) => {
            return searchObj[current[index]]
        })
    }
    return searchObj;
};

let controls = (searchObj,data) => {

    function selectOptionsSet(evt){
        searchObj.year = evt.target.value;
    }
    selectOptionsContainer.addEventListener('change',selectOptionsSet);

    function categoryTabsBool(evt){
        evt.preventDefault();
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
        console.log(searchObj)
    };
    categoriesTabsContainer.addEventListener('click',categoryTabsBool);
    
    function performSearch(searchObj,data,evt){
        if(evt){
            evt.preventDefault();
        }
        mainOutput.innerHTML = "";
        for(let i = 0; i<data.length; i++){
            if(data[i].date.getFullYear() == searchObj.year){
                if(searchObj.all === true){
                    appendReport(data[i]);
                }else{
                    for(let props in searchObj){
                        if((searchObj[props] == true) && data[i].category == props){
                            appendReport(data[i])
                        };
                    }; 
                };
            };
        };
    };
    performSearch(searchObj,data);
    document.querySelector('button.search').addEventListener('click',(evt) => {performSearch(searchObj,data,evt)});

    function textFilter(evt){
        let allVisibleReports = document.querySelectorAll('.report');
        for(let i = 0; i < allVisibleReports.length; i++){
            if(!allVisibleReports[i].innerText.toLowerCase().includes(evt.target.value.toLowerCase())){
                allVisibleReports[i].style.display = 'none';
            }else{
                allVisibleReports[i].style.display = 'flex';
            }
        }
    };
    document.querySelector('.filter .search .input-container input').addEventListener('input',(evt) => {textFilter(evt)})        
};

