let darkMode = localStorage.getItem('darkMode');
const SearchBtn = document.getElementById('search-btn');
const theme = document.getElementById('theme');
const themeIcon = document.getElementById('themeicon');
const input = document.getElementById('input-el');
const url = 'https://api.github.com/users/';
const noresults = document.getElementById('er-mes');
const avatar = document.getElementById('avatar');
const username = document.getElementById('username');
const uname = document.getElementById('name');
const date = document.getElementById('date');
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const bio = document.getElementById('bio');
const repos = document.getElementById('repos');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const user_location = document.getElementById('location');
const page = document.getElementById('page');
const twitter = document.getElementById('twitter');
const company = document.getElementById('company');

//MODE SETTING

function enableDarkMode() {
    //1.add class to the body
    document.body.classList.add('darkMode');
    //2.update darkMode in the localStorage
    localStorage.setItem('darkMode', 'enabled');
    theme.innerText = "LIGHT";
    themeIcon.src = "./assets/icon-sun.svg";
}

const disableDarkMode = () =>{
    //1.add class to the body
    document.body.classList.remove('darkMode');
    //2.update darkMode in the localStorage
    localStorage.setItem('darkMode', null);
    theme.innerText = "DARK";
    themeIcon.src = "./assets/icon-moon.svg";
}

// If the user already visited and enabled darkMode
// start thinhs off with it on
// if (darkMode === 'enabled'){
//     enableDarkMode();
// }

//when someone clicks the button
theme.addEventListener('click', function(){
    //get their darkMode seting
    darkMode = localStorage.getItem('darkMode');

    //if it not current enabled, enable it
    if(darkMode !== 'enabled'){
        enableDarkMode();
    // if it has been enabled, turn it off
    } else {
        disableDarkMode();
    }
})

//darkMode default to users windows settings
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    enableDarkMode();   
}

//GETTING USER INFORMATION

//accessing enter key
input.addEventListener("keydown", function(e){
    if(!e){
        var e = window.event;
    }
    if(e.key == "Enter"){
        if(input.value !== ""){
            getUserInfo(url+input.value);
        }  
    }
}, false);

input.addEventListener('input', function(){
    noresults.style.display = "none";
})

SearchBtn.addEventListener('click', getUserInfo);

// function getUserInfo(){
//    // console.log("function is getting accessed");
//    fetch(url+input.value).then(result => result.json()).then(data =>{
//        if(data.message == "Not Found"){
//         console.log("User profile not found");
//        } else {
//         console.log(data);
//        } 
//    }).catch(e => {
//        console.log(e);
//    })
       
// }

function getUserInfo(gitUrl){
    //Javascript promises to fetch data
    fetch(gitUrl).then(result => result.json()).then(data => {
        updateProfile(data)
    }).catch(error => {
        throw error;
    })
}

function updateProfile(data){
    if(data.message !== "Not Found"){
        noresults.innerText = "";
        function checkNull(param1, param2) {
            if((param1 === "") || (param1 === null)){
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return "Not available" 
            }else{
                return `${param1}`
            }
        }

        //passing the values to their id's 

        avatar.src = `${data.avatar_url}`
        uname.innerText = `${data.name}`
        username.innerText = `@${data.login}`
        datesegments = data.created_at.split("T").shift().split("-")
         //splitting date
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1]-1]} ${datesegments[0]}`
        //checking bio condition
        bio.innerText = (data.bio == null)? "This profile has no bio" : `${data.bio}`
        repos.innerText = `${data.public_repos}`
        followers.innerText = `${data.followers}`
        following.innerText = `${data.following}`
        user_location.innerText = checkNull(data.location, user_location)
        page.innerText = checkNull(data.blog, page)
        twitter.innerText = checkNull(data.twitter_username, twitter)
        company.innerText = checkNull(data.company, company)
    } else {
        noresults.innerText = "No results";
        noresults.style.display = "block";     
    }
}

//default octocat profile
getUserInfo(`${url}octocat`);