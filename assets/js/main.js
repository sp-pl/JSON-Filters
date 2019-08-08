import appendReport from './appendReport.js';
import getValueForNestedBracket from './helpers.js'

const selectOptionsContainer = document.querySelector('.filter .search .select-year-container .years');
const categoriesTabsContainer = document.querySelector('.filter .search .categories');
const mainOutput = document.querySelector('.output'); 

let fetchData = (link) => {
    return fetch(link, {
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
}

fetchData('http://localhost:3000/assets/data/data.json')
    .then( json => {
        initApp(json)
    })

let initApp = (data) => {
    formatData(data);
    appendTags(getUniqueValues(data,'date.fullYear'),'OPTION',selectOptionsContainer)
    appendTags(getUniqueValues(data,'category'),'BUTTON',categoriesTabsContainer)
    controls(searchObjInit(getUniqueValues(data,'category')), data)
}

let formatData = (data) => {
    return data.sort((a,b) => {
        return a.date - b.date
    }).map( (item) => {
        let itemDate = new Date(item.date)
        return item.date = {
            fullYear: itemDate.getFullYear(),
            month: itemDate.getMonth(),
            day: itemDate.getDay(),
            hours: itemDate.getHours(),
            minutes:itemDate.getMinutes()
        }
    })
}

let getUniqueValues = (data,propName) => {
    let values = data.map((current,index) => {
        return (getValueForNestedBracket(propName,current))
    })
    return values.filter((v,index,self) => self.indexOf(v) === index)
}

let appendTags = (value,tagName,destination) => {
    value.forEach( current => {
        let newTag = document.createElement(tagName)
        newTag.textContent = current
        newTag.dataset.category = current
        destination.appendChild(newTag)
    })
}

let searchObjInit = (categories) => {
    let searchObj = {
        year: '',
        all: '' 
    };
    searchObj.year = selectOptionsContainer.value
    searchObj.all = true
    if(categories){
        categories.forEach((current,index) => {
            searchObj[current] = false
        })
    }
    return searchObj;
}

let controls = (searchObj,data) => {

    function selectOptionsSet(evt){
        searchObj.year = evt.target.value;
    }
    selectOptionsContainer.addEventListener('change',selectOptionsSet);

    function categoryTabsBool(evt){
        evt.preventDefault();
        const categoriesAllTabs = document.querySelectorAll('.filter .search .categories button');
        if(evt.target.dataset.category === 'all' && !evt.target.classList.contains('active')){
            evt.target.classList.add('active');
            searchObj.all = true;
            for(let i = 1; i < categoriesAllTabs.length; i++){
                categoriesAllTabs[i].classList.remove('active');
                searchObj[categoriesAllTabs[i].dataset.category] = false;
            };
        }
        // const isActive=evt.target.matches( 'button.active:not([data-category=all])' );
        // categoriesAllTabs[0].classList.toggle( 'active', isActive );
        // evt.target.classList.toggle( 'active', isActive );
        // searchObj[ evt.target.dataset.category ] =isActive;
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
    
    function performSearch(searchObj,data,propName,evt){
        if(evt){
            evt.preventDefault();
        }
        mainOutput.innerHTML = "";

        data.forEach((current,index) => {
            if(getValueForNestedBracket(propName,current) == searchObj.year){
                if(searchObj.all === true){
                    appendReport(current);
                }else{
                    for(let props in searchObj){
                        if((searchObj[props] == true) && data[i].category == props){
                            appendReport(data[i])
                        };
                    }; 
                };
            }
        })
        // for(let i = 0; i<data.length; i++){
        //     if(data[i].date.getFullYear() == searchObj.year){
        //         if(searchObj.all === true){
        //             appendReport(data[i]);
        //         }else{
        //             for(let props in searchObj){
        //                 if((searchObj[props] == true) && data[i].category == props){
        //                     appendReport(data[i])
        //                 };
        //             }; 
        //         };
        //     };
        // };
    };
    performSearch(searchObj,data,'date.fullYear');
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

