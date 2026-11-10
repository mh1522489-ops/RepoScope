let inputValue;
let  getInput;
const searchButton = document.getElementById("search-button");
const status_message = document.getElementById("status-message");
const searchInput = document.getElementById("input-search");
const section = document.getElementById("report");
 

searchButton.onclick = function(event) {

      event.preventDefault()
     getInput = document.getElementById("username");
   inputValue = getInput.value.trim();
   if(inputValue === ""){
    status_message.textContent = `Please enter a GitHub username`;
    return;
    
}else{
   status_message.textContent = ``; 
   
}

 searchButton.disabled = true;  
   const scratchUrl = `https://api.github.com/users/${inputValue}/repos`;
fetch(scratchUrl).then(function(output) {

if (output.status === 404){
throw new Error(` User not found`);
}else if (output.status === 403){ 

throw new Error(`Too many requests, try again later`);
} else if(!output.ok) {

            throw new Error(`Something went wrong, please try again`);
        }
  


    const data = output.json();
    return data;
}).then(function(output) {

const searchValue = searchInput.value.trim().toLowerCase();


const filteredRepos = output.filter(function(repository) {

    return repository.name.toLowerCase().includes(searchValue);
});
 
     

if (filteredRepos.length === 0) {
  status_message.textContent = "No repositories match your filter";
  section.textContent = "";
  return;
} 
         section.hidden = false;
    section.textContent = "";
    
    
   filteredRepos.forEach(function(repository) {
   
    
    let description;
    let language;
   
         if(repository.description === null){
     description = `sorry we are not found imformation description on this repo`;
       }
       else{
        description = repository.description;
    }
    
    if(repository.language === null){
     language = `we not find A base language`;
      }
      else{
        language = repository.language;  }
    
    
        const card = document.createElement("div")
        card.classList.add("card")
        const name = document.createElement("h3")
        name.classList.add("name")
        name.textContent = repository.name;
        
        
        const descriptionElement =  document.createElement("p")
        descriptionElement.textContent= description;
        
        const languageElement = document.createElement("p");
        languageElement.textContent = language;
    languageElement.classList.add("language");
        const stars = document.createElement("p");
        stars.textContent =`Stars ${repository.stargazers_count}`;
        
        const forks = document.createElement("p");
        forks.textContent =` Forks ${repository.forks_count}`;
        
      const repoLink = document.createElement("a")
      repoLink.href = repository.html_url;
      repoLink.classList.add("repo-link")
      repoLink.textContent = `View on GitHub`;
      
      
      card.appendChild(name)
      card.appendChild(descriptionElement)
      card.appendChild(languageElement)
     
      card.appendChild(repoLink)
      const stats = document.createElement("div");
stats.classList.add("stats");
    stats.appendChild(forks)
    stats.appendChild(stars)
     card.appendChild(stats) 
      const advancedButton = document.createElement("button");
      
      advancedButton.onclick = function(event){
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      advancedButton.appendChild(ripple)
      const rect = button.getBoundingClientRect();
      ripple.style.left =`${event.clientX - rect.left}px`;
      ripple.style.right = `${event.cliedY - rect.right}px`;
      ripple.addEventListener("animationend",function(){
          ripple.remove()
      })
    
      }

      
      
      advancedButton.type = "button";
      advancedButton.textContent = "Advanced Analysis";
      advancedButton.classList.add("advanced-button")
      card.appendChild(advancedButton)
      advancedButton.onclick = function() {
          const owner = repository.owner.login;
          const repo = repository.name;
          const url = `analysis.html?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`;
          document.body.classList.add("page-exit");

    setTimeout(() => {
        window.location.href = url;
    }, 350);
}

          
      
    section.appendChild(card)
     
        });

}).catch(function(error) {
    status_message.textContent = error.message;
     section.textContent = "";
}).finally(function () {
    searchButton.disabled = false;
  });

};






if(!navigator.onLine){
    sessionStorage.setItem("offlinepage", window.location.href);
    window.location.href = "/offline.html";
}
window.addEventListener("offline",function(){
    sessionStorage.setItem("offlinepage", window.location.href);
    window.location.href = "/offline.html";
})


