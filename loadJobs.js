
export default function loadJob(startIndex, stopIndex, listOfJobs){
  for(let numVisibleJobs = startIndex; numVisibleJobs<stopIndex; numVisibleJobs++){
    if(numVisibleJobs >= listOfJobs.length) return;
    let parentElement = document.createElement("div");
    parentElement.style.cssText = "background:white;width:300px;position:relative;"
    +"padding:30px 0 20px 20px;";
    parentElement.setAttribute("class", "jobDesc");


    let postedTime = document.createElement("div");
    let time = listOfJobs[numVisibleJobs].created_at;

    postedTime.innerHTML = time.substring(4, 10) + ", "+ time.substring(time.length-4)
    + " | " + listOfJobs[numVisibleJobs].type;
    postedTime.style = "font-size:14px; color:gray;";

    let title = document.createElement("div");
    title.setAttribute("class", "jobtitle");
    title.innerHTML = listOfJobs[numVisibleJobs].title;
    title.style = "margin-top:10px; margin-bottom:10px;font-weight:bold;";

    let typeOfJob = document.createElement("div");
    typeOfJob.innerHTML = listOfJobs[numVisibleJobs].type;

    let nameOfCompany = document.createElement("div");
    nameOfCompany.innerHTML = listOfJobs[numVisibleJobs].company;
    nameOfCompany.style = "font-size:14px; color:gray;";

    let companyLogo = document.createElement("img");
    companyLogo.setAttribute("src", listOfJobs[numVisibleJobs].company_logo);
    companyLogo.style.cssText = "width:50px; height:50px; border-radius:20px;position:absolute;"
    + "left:20px; top:-30px;";

    let location = document.createElement("div");
    location.innerHTML = listOfJobs[numVisibleJobs].location;
    location.style = "color: #5964E0;font-size:14px; margin-top:20px;";

    parentElement.appendChild(postedTime);
    parentElement.appendChild(title);
    parentElement.appendChild(nameOfCompany);
    if(listOfJobs[numVisibleJobs].company_logo != null){
      parentElement.appendChild(companyLogo);
    }
    parentElement.appendChild(location);
    content.appendChild(parentElement);
  }
}
