let inputArea = document.querySelector(".inputfield input");
let addBtn = document.querySelector(".inputfield button");
let todolist = document.querySelector(".todolist");
let clearAll = document.querySelector(".clearAll");
// Add button is enabled only when the user types something on the input area
inputArea.onkeyup = () => {
    let userData = inputArea.value;
    if(userData.trim()!=0)
    {
        addBtn.classList.add("active");
    }
    else
    {
        addBtn.classList.remove("active");
    }
}

showlist();

// ************ ADD feautre *******************
// when user clicks add button 
addBtn.onclick = () => {
    let userData = inputArea.value;
    let getlocalStorage = localStorage.getItem("New Todo");
    if(getlocalStorage==null) // if the storage is null,creating a new array
    {
        listArr = [];
    }
    else
    {
        listArr = JSON.parse(getlocalStorage); //else getting the array that was created previously [here, converting the json file into javascript object]
    }
    listArr.push(userData); //adding the user data to the array
    localStorage.setItem("New Todo",JSON.stringify(listArr)); // adding it into the local Storage [sending a data to web server, so it must be in json type, so we are making it as string]
    showlist();
    inputArea.value="";
    addBtn.classList.remove("active");
}

function showlist(){
    let getlocalStorage = localStorage.getItem("New Todo");
    if(getlocalStorage==null) // if the storage is null,creating a new array
    {
        listArr = [];
    }
    else
    {
        listArr = JSON.parse(getlocalStorage); //else getting the array that was created previously [here, converting the json file into javascript object]
    }
    let pendingNumber = document.querySelector(".pendingNum");
    if(listArr.length>0)
    {
        pendingNumber.textContent = listArr.length;
    }
    else
    {
        pendingNumber.textContent=0;
    }
    let newLItag = ``;

    listArr.forEach((element,index) => {
        newLItag += `<li>${element}<span onclick="deleteTask(${index})" ><i class="fas fa-trash"></i></span></li>`;
    });
    todolist.innerHTML = newLItag;
}

// ************ DELETE feautre ******************* 
function deleteTask(index){
    let getlocalStorage = localStorage.getItem("New Todo"); // grabbing the local storage
    listArr = JSON.parse(getlocalStorage);  //converting it from json to js object
    listArr.splice(index,1); //deleting it from the array
    localStorage.setItem("New Todo",JSON.stringify(listArr)); //again setting it to the local storage
    showlist(); // showing the list to the web
}

// ************ CLEAR ALL feautre ******************* 
clearAll.onclick = () => {
    listArr=[];
    localStorage.setItem("New Todo",JSON.stringify(listArr));
    showlist();
}