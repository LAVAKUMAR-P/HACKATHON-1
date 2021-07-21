//INTRO LINE

let intro=document.createElement("div");
intro.className="intro";
intro.innerHTML= `<h5>HERE YOU CAN SEARCH ANIME DETAILS<h5>`   
document.body.append(intro);

//SEARCH BAR

let searchBar=document.createElement("div");
searchBar.className="serch-bar"
searchBar.innerHTML =`
<div>
<div class="boxContainer" >
<table class="elementscontainer">
<tr>
    <td>
       <input type="text" placeholder="ENTER ANIME NAME"
       class="search">
       <button onclick='Search()'>SEARCH</button>
    <td>
</tr>
</table>
<div>
</div>
`
document.body.append(searchBar);

//SERCH TRANSFER & CLEAR SCREEN
function Search(){
    var carbagecheck = document.getElementsByClassName('user-list');
    var carbagecheckerr = document.getElementsByClassName('error');
    if (carbagecheckerr.length > 0) {
        document.querySelector(".error").remove();
      }
     if (carbagecheck.length > 0) {
        document.querySelector(".user-list").remove();
      }
    const query=document.querySelector('.search').value;
    localStorage.setItem("lastname",query);
    getUser();
}


//LINK TO GET USERS

async function getUser(){
    let a=localStorage.getItem("lastname");
    localStorage.removeItem("lastname");
    const data =await fetch(`https://api.jikan.moe/v3/search/anime?q=${a}`,
    {
        method:"GET"
    }
    );
    try{
        const users=await data.json();
        const user=users.results;
        loadUsers(user);
       }
    catch(err){
        const userList = document.createElement("div");
        userList.className = "error";
        userList.innerHTML=`<div>please enter right anime name</div>
        <div>some examples
               <ul>
               <li>Masashi: commander or general</li>
               <li>Michi: a righteous way</li>
               <li>Natsu: born in summer</li>
               <li> Katsu: victorious</li>
               <li> Noburu: to expand,</li>
               <li>one piece</li>
               <li>nekomata1037,ect.........................</li>
               </ul>
            </div>`
        document.body.append(userList);
    }
}

// TO LOAD USERS IN SCREEN

function loadUsers(users) {

const userList = document.createElement("div");
    userList.className = "user-list";
    users.forEach((user) => {
           const userContainer = document.createElement("div");
           userContainer.className = "user-container";
           userContainer.innerHTML= `<div class="card">
                  <div class="card-elements">
                  <img class="image" src=${user.image_url} alt="anime"  \>
                  <h4>NAME: ${user.title}</h4>
                  <div class="card-content">
                  <h6>TYPE OF SERIES: ${user.type}</h6>
                  <h6>START DATE: ${new Date(user.start_date).toDateString()}</h6>
                  <h6>END DATE: ${new Date(user.end_date).toDateString()}</h6>
                  <h6>IMDB RATING: ${user.score}</h6>
                  </div>
                   <div>
             </div>` 
      userList.append(userContainer);
    });
  
    document.body.append(userList);
  }

  //END OF THE CODE