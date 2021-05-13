
import loadJob from "./loadJobs.js";
const loading = document.querySelector("#loading");
const content = document.querySelector("#content");
const body = document.querySelector("#body");
const jobDescInfo = document.querySelector("#jobDescInfo");
const load_all_btn = document.querySelectorAll(".load-all-btn")[1];
var closeTheJobDesc = document.querySelector("#closeBtn");
const filterByTitle = document.querySelector("#filter-by-title");
const filterByLocation = document.querySelector("#filter-by-location");
const isFullTime = document.querySelector("#full-time");
const searchButton = document.querySelector("#search-btn");
const nightAndDay = document.querySelector("#nightAndDay");
var toggleNightAndDay = true;
var backgroundColor = "lightcyan";

// default jobs when user clicks the page or refreshes the page

let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?description=python&full_time=on";
const displayJobs = url =>{
  fetch(url)
    // reponse.json returns a promise
  .then(response => response.json())
  .then (jsonData => {

    // making listOfJobs a global variable

    window.listOfJobs = jsonData;
    loadJob(0, 12, window.listOfJobs);

    displayButton(listOfJobs);
    // if(isEmpty(window.listOfJobs)){
    //   loading.textContent = "No result found!";
    // }
    if(window.listOfJobs.length == 0){
      loading.textContent = "No result found!";
      loading.style = "display:block";
    }else{
      loading.style = "display:none;";
    }
    // console.log(jsonData)
  })
  .catch(error =>{
    alert("An error occured. Please reload there page");
  });
}
displayJobs(url);

function displayButton(listOfJobs){
  if(listOfJobs.length > 12){
    load_all_btn.style = "display:block;";
  }else{
    load_all_btn.style = "display:none;";
  }
}

load_all_btn.addEventListener("click", ()=>{
  load_all_btn.style = "display:none;";
  loadJob(12, window.listOfJobs.length, window.listOfJobs);
});

content.addEventListener("click", event =>{
  if(event.target.getAttribute("class") === "jobtitle"){
    window.positionOfTarget = getPosition(event.target);
    let jobDesc = document.createElement("div");
    jobDesc.innerHTML = listOfJobs[window.positionOfTarget].description;
    jobDescInfo.insertBefore(jobDesc, jobDescInfo.firstChild);
    jobDescInfo.style = "display:block;";
    body.style = "background:lightgray;";
    content.style = "display:none;";
    load_all_btn.style = "display:none;";

  }

});

function getPosition(clickedEvent){
  let childrenElement = clickedEvent.parentElement.children;
  let titleOfPosition = childrenElement[1].textContent;
  let nameOfCompany = childrenElement[2].textContent;
  let i = 0;
  while(i < window.listOfJobs.length){
    if(window.listOfJobs[i].company === nameOfCompany
    && window.listOfJobs[i].title === titleOfPosition){
      return i;
    }
    i++;
  }
}

closeTheJobDesc.addEventListener("click", closeDesc);

function closeDesc(){

  jobDescInfo.style = "display:none;";
  content.style = "display:grid";
  body.style = "background: "+backgroundColor+";";
  // if(toggleNightAndDay && isClicked){
  //   body.style = "background: black;";
  // }else{
  //   body.style = "background: lightcyan;";
  // }
  // body.style = "background: lightcyan;";
  load_all_btn.style = "display:block;";
}

searchButton.addEventListener("click", event =>{

  closeDesc();
  load_all_btn.style = "display:none;";

  if(filterByTitle.value.length > 0 && filterByLocation.value.length == 0 && !isFullTime.checked){

    loading.textContent = "Loading...";
    content.textContent = "";
    let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?description=" + filterByTitle.value;
    displayJobs(url);
  }
  else if(filterByTitle.value.length > 0 && filterByLocation.value.length > 0 && !isFullTime.checked){

    loading.textContent = "Loading...";
    content.textContent = "";
    let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?description=" + filterByTitle.value
    + "&location="+filterByLocation.value;
    displayJobs(url);
  }
  else if(filterByTitle.value.length > 0 && filterByLocation.value.length > 0 && isFullTime.checked){

    loading.textContent = "Loading...";
    content.textContent = "";
    let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?description=" + filterByTitle.value
    + "&location=" + filterByLocation.value + "&full_time=on";
    displayJobs(url);
  }
  else if(filterByTitle.value.length > 0 && filterByLocation.value.length == 0 && isFullTime.checked){

    loading.textContent = "Loading...";
    content.textContent = "";
    let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?description=" + filterByTitle.value
    + "&full_time=on";
    displayJobs(url);
  }
  else if(filterByLocation.value.length > 0 && !isFullTime.checked){

    loading.textContent = "Loading...";
    content.textContent = "";
    let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?location=" + filterByLocation.value;
    displayJobs(url);
  }
  else if(filterByLocation.value.length > 0 && isFullTime.checked){

    loading.textContent = "Loading...";
    content.textContent = "";
    let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?location=" + filterByLocation.value
    + "&full_time=on";
    displayJobs(url);
  }else if(isFullTime.checked){

    loading.textContent = "Loading...";
    content.textContent = "";
    let url = "https://cors.bridged.cc/https://jobs.github.com/positions.json?full_time=on";
    displayJobs(url);
  }

});

nightAndDay.addEventListener("click", ()=>{
  if(toggleNightAndDay){
    body.style = "background:black";
    document.querySelector("#filter-search").style = "background:black";
    document.querySelector("#full-time-only").style = "color:white;";
    filterByTitle.style = "background:black;color:white;";
    filterByLocation.style = "background:black; color:white;";
    isFullTime.style = "background:black;";
    backgroundColor = "black";
    toggleNightAndDay = false;
  }
  else if(!toggleNightAndDay){
    body.style = "background:lightcyan";
    document.querySelector("#filter-search").style = "background:white";
    document.querySelector("#full-time-only").style = "color:black;";
    filterByTitle.style = "background:white;color:black;";
    filterByLocation.style = "background:white; color:black;";
    isFullTime.style = "background:white;";
    toggleNightAndDay = true;
    backgroundColor = "lightcyan";
  }

});
