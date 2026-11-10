const params = new URLSearchParams(window.location.search);
const owner = params.get("owner");
const repo = params.get("repo");

const urlApi = `https://api.github.com/repos/${owner}/${repo}`;
fetch(urlApi).then(function(response) {

  if (!owner){
    throw new Error(` sorry the owner not a valible new `);
  } else if (!repo){
    throw new Error(`sorry the repo not allowed new `);
  }

  if (response.status === 404){
    throw new Error(` User not found`);
  } else if (response.status === 403){
    throw new Error(`Too many requests, try again later`);
  }

  if (!response.ok){
    throw new Error(`Something went wrong, please try again`);
  }

  const data = response.json();
  return data;

}).then(function(data) {

  const continer = document.getElementById("analysis-report");
  continer.textContent = "";
  continer.hidden = false;

  const titel = document.createElement("h1");
  titel.textContent = data.name;
  titel.classList.add("titel");
  continer.appendChild(titel);

  let description;
  let language;
  let license;

  if (data.description === null){
    description = `we not find a description yet`;
  } else {
    description = data.description;
  }

  if (data.language === null){
    language = `we are not find a language yet `;
  } else {
    language = data.language;
  }

  if (data.license === null){
    license = `this repo not have a license yet `;
  } else {
    license = data.license.name;
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;
  descriptionElement.classList.add("description");
  continer.appendChild(descriptionElement);

  const languageElement = document.createElement("p");
  languageElement.classList.add("language");
  languageElement.textContent = language;
  continer.appendChild(languageElement);

  const stars = document.createElement("p");
  stars.classList.add("stars");
  stars.textContent = ` stars ${data.stargazers_count}`;
  continer.appendChild(stars);

  const forks = document.createElement("p");
  forks.classList.add("forks");
  forks.textContent = `forks count ${data.forks}`;
  continer.appendChild(forks);

  const issues = document.createElement("p");
  issues.classList.add("issues");
  issues.textContent = `issues :${data.open_issues_count}`;
  continer.appendChild(issues);

  const branch = document.createElement("p");
  branch.textContent = data.default_branch;
  branch.classList.add("branch");
  continer.appendChild(branch);

  const licenseElement = document.createElement("p");
  licenseElement.classList.add("license");
  licenseElement.textContent = license;
  continer.appendChild(licenseElement);

  const topicsContainer = document.createElement("div");
  topicsContainer.classList.add("topics-container");

  if (!data.topics || data.topics.length === 0) {
    const noTopics = document.createElement("p");
    noTopics.textContent = "No topics found for this repository.";
    noTopics.classList.add("topics");
    topicsContainer.appendChild(noTopics);
  } else {
    data.topics.forEach(function(topicName) {
      const topic = document.createElement("p");
      topic.textContent = topicName;
      topic.classList.add("topic");
      topicsContainer.appendChild(topic);
    });
  }

  continer.appendChild(topicsContainer);

  const homePageURL = document.createElement("a");
  homePageURL.classList.add("homePageURL");
  homePageURL.target = "_blank";
  homePageURL.href = data.homepage;

  if (data.homepage === null){
    homePageURL.textContent = "#";
  } else {
    homePageURL.textContent = "go to webtise on this repo";
    homePageURL.rel = "noopener noreferrer";
    continer.appendChild(homePageURL);
  }

  const visibility = document.createElement("p");
  visibility.classList.add("visibility");
  visibility.textContent = data.visibility;
  continer.appendChild(visibility);

  const archived = document.createElement("p");
  archived.classList.add("archived");
  if (data.archived === true){
    archived.textContent = `archived : Yes`;
  } else {
    archived.textContent = `archived : No`;
  }
  continer.appendChild(archived);

  const create_Time = document.createElement("p");
  const date_time = new Date(data.created_at);
  create_Time.textContent = `created : ${date_time.toLocaleDateString()}`;
  create_Time.classList.add("create_Time");
  continer.appendChild(create_Time);

  const last_Updated = document.createElement("p");
  const date_updated = new Date(data.updated_at);
  last_Updated.textContent = `last updated : ${date_updated.toLocaleDateString()}`;
  last_Updated.classList.add("last_Updated");
  continer.appendChild(last_Updated);

  const pushe_Time = document.createElement("p");
  const date_push = new Date(data.pushed_at);
  pushe_Time.textContent = `last push : ${date_push.toLocaleDateString()}`;
  pushe_Time.classList.add("pushe_Time");
  continer.appendChild(pushe_Time);

  const Isfork = document.createElement("p");
  const isFork = data.fork;
  if (isFork === true) {
    Isfork.textContent = `repository Fork`;
  } else {
    Isfork.textContent = `Not forked yet`;
  }
  Isfork.classList.add("isFork");
  continer.appendChild(Isfork);

  const repoId = document.createElement("p");
  repoId.textContent = `Repository ID is :${data.id}`;
  repoId.classList.add("repoId");
  continer.appendChild(repoId);

  const repoSize = document.createElement("p");
  repoSize.textContent = `Repository Size is : ${(data.size / 1024).toFixed(2)} MB`;
  repoSize.classList.add("reposize");
  continer.appendChild(repoSize);

  const watchers = document.createElement("p");
  watchers.textContent = `watchers :${data.watchers_count}`;
  watchers.classList.add("watchers");
  continer.appendChild(watchers);

  const full_Name = document.createElement("p");
  full_Name.textContent = data.full_name;
  full_Name.classList.add("full_Name");
  continer.appendChild(full_Name);

  const htmlUrl = document.createElement("a");
  htmlUrl.href = data.html_url;
  htmlUrl.textContent = `View repository on GitHub`;
  htmlUrl.target = "_blank";
  htmlUrl.rel = "noopener noreferrer";
  htmlUrl.classList.add("htmlUrl");
  continer.appendChild(htmlUrl);

  const nodeId = document.createElement("p");
  nodeId.textContent = `repo node id is :${data.node_id}`;
  nodeId.classList.add("nodeId");
  continer.appendChild(nodeId);

  const ownerLogin = document.createElement("p");
  ownerLogin.textContent = `Repository Owner: ${data.owner.login}`;
  ownerLogin.classList.add("ownerlogin");
  continer.appendChild(ownerLogin);

  const imgOwner = document.createElement("img");
  imgOwner.src = data.owner.avatar_url;
  imgOwner.alt = `a img for owner repo`;
  imgOwner.loading = "lazy";
  imgOwner.classList.add("imgOwner");
  continer.appendChild(imgOwner);

  const ownerPage = document.createElement("a");
  ownerPage.href = data.owner.html_url;
  ownerPage.textContent = `Visit owner profile on GitHub`;
  ownerPage.target = "_blank";
  ownerPage.rel = "noopener noreferrer";
  ownerPage.classList.add("ownerPage");
  continer.appendChild(ownerPage);

  const ownerId = document.createElement("p");
  ownerId.textContent = `owner Id :${data.owner.id}`;
  ownerId.classList.add("ownerId");
  continer.appendChild(ownerId);

  const ownerType = document.createElement("p");
  ownerType.textContent = `owner Type :${data.owner.type}`;
  ownerType.classList.add("ownerType");
  continer.appendChild(ownerType);

  const ownerSiteAdmin = document.createElement("p");
  ownerSiteAdmin.classList.add("ownerSiteAdmin");
  if (data.owner.site_admin === true){
    ownerSiteAdmin.textContent = `Owner Site Admin: Yes`;
  } else {
    ownerSiteAdmin.textContent = `Owner Site Admin: No`;
  }
  continer.appendChild(ownerSiteAdmin);

  const ownerGravatar = document.createElement("p");
  ownerGravatar.textContent = `Owner Gravatar ID: ${data.owner.gravatar_id}`;
  ownerGravatar.classList.add("ownerGravatar");
  continer.appendChild(ownerGravatar);

  const hasIssues = document.createElement("p");
  hasIssues.classList.add("hasIssues");
  if (data.has_issues === true){
    hasIssues.textContent = `Issues enabled: Yes`;
  } else {
    hasIssues.textContent = `Issues enabled: No`;
  }
  continer.appendChild(hasIssues);

  const has_projects = document.createElement("p");
  has_projects.classList.add("has_projects");
  if (data.has_projects === true){
    has_projects.textContent = `Projects enabled: Yes`;
  } else {
    has_projects.textContent = `project enabled: No`;
  }
  continer.appendChild(has_projects);

  const hasWiki = document.createElement("p");
  hasWiki.classList.add("hasWiki");
  if (data.has_wiki === true){
    hasWiki.textContent = `Wiki enabled: Yes`;
  } else {
    hasWiki.textContent = `wiki enabled: No`;
  }
  continer.appendChild(hasWiki);

  const hasDownloads = document.createElement("p");
  hasDownloads.classList.add("hasDownloads");
  if (data.has_downloads === true){
    hasDownloads.textContent = `download enabled: Yes`;
  } else {
    hasDownloads.textContent = `download enabled: No`;
  }
  continer.appendChild(hasDownloads);

  const hasDiscussions = document.createElement("p");
  hasDiscussions.classList.add("hasDiscussions");
  if (data.has_discussions === true){
    hasDiscussions.textContent = `Discussions enabled: Yes`;
  } else {
    hasDiscussions.textContent = `Discussions  enabled: No`;
  }
  continer.appendChild(hasDiscussions);

  const has_pages = document.createElement("p");
  has_pages.classList.add("has_pages");
  if (data.has_pages === true){
    has_pages.textContent = `github pages enabled: Yes`;
  } else {
    has_pages.textContent = `github pages enabled: No`;
  }
  continer.appendChild(has_pages);

  const has_disabled = document.createElement("p");
  has_disabled.classList.add("has_disabled");
  if (data.disabled === true){
    has_disabled.textContent = `Repository disabled : yes`;
  } else {
    has_disabled.textContent = `Repository disabled: No`;
  }
  continer.appendChild(has_disabled);

  const allowRebaseMerge = document.createElement("p");
  allowRebaseMerge.classList.add("allowRebaseMerge");
  if (data.allow_rebase_merge === true){
    allowRebaseMerge.textContent = `Rebase merge enabled: Yes`;
  } else {
    allowRebaseMerge.textContent = `Rebase merge enabled: No`;
  }
  continer.appendChild(allowRebaseMerge);

  const allowSquashMerge = document.createElement("p");
  allowSquashMerge.classList.add("allowSquashMerge");
  if (data.allow_squash_merge === true){
    allowSquashMerge.textContent = `Squash merge enabled: Yes`;
  } else {
    allowSquashMerge.textContent = `Squash merge enabled: No`;
  }
  continer.appendChild(allowSquashMerge);

  const allowMergeCommit = document.createElement("p");
  allowMergeCommit.classList.add("allowMergeCommit");
  if (data.allow_merge_commit === true){
    allowMergeCommit.textContent = `Merge commit enabled: Yes`;
  } else {
    allowMergeCommit.textContent = `Merge commit enabled: No`;
  }
  continer.appendChild(allowMergeCommit);

  const allowAutoMerge = document.createElement("p");
  allowAutoMerge.classList.add("allowAutoMerge");
  if (data.allow_auto_merge === true){
    allowAutoMerge.textContent = `Auto merge enabled: Yes`;
  } else {
    allowAutoMerge.textContent = `Auto merge enabled: No`;
  }
  continer.appendChild(allowAutoMerge);

  const deleteBranchOnMerge = document.createElement("p");
  deleteBranchOnMerge.classList.add("deleteBranchOnMerge");
  if (data.delete_branch_on_merge === true){
    deleteBranchOnMerge.textContent = `Delete branch on merge: Yes`;
  } else {
    deleteBranchOnMerge.textContent = `Delete branch on merge: No`;
  }
  continer.appendChild(deleteBranchOnMerge);

  fetch(data.owner.followers_url).then(function(followers) {
    if (!followers.ok){
      throw new Error(`Something went wrong, please try again`);
    }
    return followers.json();
  }).then(function(followers) {
    const sectionFollowrs = document.getElementById("followrs");

    followers.forEach(function(followersData) {
      const card = document.createElement("div");
      card.classList.add("card");
      sectionFollowrs.appendChild(card);

      const imgFollwers = document.createElement("img");
      imgFollwers.src = followersData.avatar_url;
      imgFollwers.alt = `img for a one of followrs`;
      imgFollwers.loading = "lazy";
      imgFollwers.classList.add("imgFollowers");
      card.appendChild(imgFollwers);

      const loginFollowers = document.createElement("p");
      loginFollowers.textContent = `name :${followersData.login}`;
      loginFollowers.classList.add("loginFollowers");
      card.appendChild(loginFollowers);

      const followersType = document.createElement("p");
      followersType.classList.add("followersType");
      followersType.textContent = `type:${followersData.type}`;
      card.appendChild(followersType);

      const followersDataUrl = document.createElement("a");
      followersDataUrl.classList.add("followersDataUrl");
      followersDataUrl.href = followersData.html_url;
      followersDataUrl.textContent = `go to ${followersData.login} page`;
      followersDataUrl.target = "_blank";
      followersDataUrl.rel = "noopener noreferrer";
      card.appendChild(followersDataUrl);

      const followersDataId = document.createElement("p");
      followersDataId.classList.add("followersDataId");
      followersDataId.textContent = `the id for ${followersData.login} is : ${followersData.id}`;
      card.appendChild(followersDataId);

      const followersDataNodeId = document.createElement("p");
      followersDataNodeId.classList.add("followersDataNodeId");
      followersDataNodeId.textContent = `the node id is : ${followersData.node_id}`;
      card.appendChild(followersDataNodeId);
      const followersDataGravatarId = document.createElement("p")
     followersDataGravatarId.classList.add("followersDataGravatarId");
     followersDataGravatarId.textContent = followersData.gravatar_id;
     card.appendChild(followersDataGravatarId);
     
      const details = document.createElement("details");
      card.appendChild(details);
      details.classList.add("details");

      const summary = document.createElement("summary");
      summary.classList.add("summary");
      summary.textContent = `show ${followersData.login} followers`;
      details.appendChild(summary);

      let loaded = false;
      details.addEventListener("toggle", function() {
        if (details.open && !loaded) {
          fetch(followersData.following_url.replace("{/other_user}", "")).then(function(response) {
            if (!response.ok){
              throw new Error(`Something went wrong, please try again`);
            }
            return response.json();
          }).then(function(followingUsers) {
            followingUsers.forEach(function(followingUsers) {
              loaded = true;

              const continerFollowers = document.createElement("div");

              const followingUsersName = document.createElement("p");
              followingUsersName.classList.add("followingUsersName");
              followingUsersName.textContent = followingUsers.login;
              continerFollowers.appendChild(followingUsersName);

              const followingUsersImg = document.createElement('img');
              followingUsersImg.src = followingUsers.avatar_url;
              followingUsersImg.alt = `avatat for ${followingUsers.login}`;
              followingUsersImg.classList.add("followingUsersImg");
              followingUsersImg.loading = "lazy";
              continerFollowers.appendChild(followingUsersImg);

              const link = document.createElement("a");
              link.href = followingUsers.html_url;
              link.textContent = `Go to ${followingUsers.login} page on GitHub`;
              link.target = "_blank";
              link.rel = "noopener noreferrer";
              continerFollowers.appendChild(link);

              details.appendChild(continerFollowers);
            });
          });
        }
      });
    });

  }).catch(function(error) {
    const errorMsg = document.createElement("p");
    errorMsg.textContent = error.message;
    errorMsg.classList.add("errorMsg");
    document.body.appendChild(errorMsg);
  });
 const gistsSection = document.getElementById("gists");
   gistsSection.classList.add("gistsSection");
   fetch(data.owner.gists_url.replace("{/gist_id}","")).then(function(gists) {
       if(!gists.ok){
         throw new Error(`Something went wrong, please try again`);  
       }
      return gists.json() 
       }).then(function(gistsUsers) {

           gistsUsers.forEach(function(gistsUser) {
            const gistsContiner = document.createElement("div");
         gistsContiner.classList.add("gistsContiner");
          gistsSection.appendChild(gistsContiner);
          const gistsId = document.createElement("p");
          gistsId.classList.add("gistsId");
          gistsId.textContent = `the gist id is : ${gistsUser.id}`;
        gistsContiner.appendChild(gistsId);
        let descriptionGists;
        if(gistsUser.description === null){
            descriptionGists =  `sorry the discription not avalible new`;
        }else{
           descriptionGists =  gistsUser.description;
        }
        const gistsUserDescription = document.createElement("p");
        gistsUserDescription.classList.add("gistsUserDescription");
        gistsUserDescription.textContent = descriptionGists;
        
  gistsContiner.appendChild(gistsUserDescription);           
    let public;         
  const gistsUserPublic = document.createElement("p");
     gistsUserPublic.classList.add("gistsUserPublic");
     if(gistsUser.public === true){
        public = `public : yes`; 
     }else{
        public = `public : no`;
     } 
     gistsUserPublic.textContent = public;
       gistsContiner.appendChild(gistsUserPublic);
       const timeCreate = new Date(gistsUser.created_at);
       const gistsUserCreateAt = document.createElement("p");
       gistsUserCreateAt.classList.add("gistsUserCreateAt");
       gistsUserCreateAt.textContent = `created At :${timeCreate.toLocaleDateString()}`;
    gistsContiner.appendChild(gistsUserCreateAt)
     
   const timeupdated = new Date(gistsUser.updated_at);
       const gistsUserUpdatedAt = document.createElement("p");
       gistsUserUpdatedAt.classList.add("gistsUserUpdatedAt");
       gistsUserUpdatedAt.textContent = `Updated At :${timeupdated.toLocaleDateString()}`;
    gistsContiner.appendChild(gistsUserUpdatedAt) 
    const gistsUserComments = document.createElement("p");
    gistsUserComments.classList.add("gistsUserComments");
    gistsUserComments.textContent = `comments count is ${gistsUser.comments}`;
   gistsContiner.appendChild(gistsUserComments) 
   const gistsUserCommentsEnabled = document.createElement("p");
   
gistsUserCommentsEnabled.classList.add("gistsUserCommentsEnabled");

if (gistsUser.comments_enabled === true) {
  gistsUserCommentsEnabled.textContent = `Comments enabled: Yes`;
} else {
  gistsUserCommentsEnabled.textContent = `Comments enabled: No`;
}
gistsContiner.appendChild(gistsUserCommentsEnabled);
const gistsUserOwnerLogin = document.createElement("p");
  gistsUserOwnerLogin.classList.add("gistsUserOwnerLogin");
  gistsUserOwnerLogin.textContent = `name :${gistsUser.owner.login}`;
  gistsContiner.appendChild(gistsUserOwnerLogin);
const gistsUserOwnerId = document.createElement("p");
  gistsUserOwnerId.classList.add("gistsUserOwnerId");
  gistsUserOwnerId.textContent = `id is :${gistsUser.owner.id}`;
  gistsContiner.appendChild(gistsUserOwnerId);
const gistsUserOwnerAvatarUrl = document.createElement("img");
  gistsUserOwnerAvatarUrl.classList.add("gistsUserOwnerAvatarUrl");
  gistsUserOwnerAvatarUrl.src = gistsUser.owner.avatar_url;
  gistsUserOwnerAvatarUrl.alt = `an img for ${gistsUser.owner.login}`;
  gistsUserOwnerAvatarUrl.loading = "lazy";
  gistsContiner.appendChild(gistsUserOwnerAvatarUrl);
const gistsUserOwnerHtmlUrl = document.createElement("a");
  gistsUserOwnerHtmlUrl.classList.add("gistsUserOwnerHtmlUrl")
  gistsUserOwnerHtmlUrl.textContent = `go to ${gistsUser.owner.login} page on GitHub`;
  gistsUserOwnerHtmlUrl.rel = "noopener noreferrer";
  gistsUserOwnerHtmlUrl.href = gistsUser.owner.html_url;
  gistsUserOwnerHtmlUrl.target = "_blank";
  gistsContiner.appendChild(gistsUserOwnerHtmlUrl);
const gistsUserOwnerType = document.createElement("p");
  gistsUserOwnerType.classList.add("gistsUserOwnerType")
    gistsUserOwnerType.textContent= `type :${gistsUser.owner.type}`;
       
    
    gistsContiner.appendChild(gistsUserOwnerType); 
    const formatObjectFiles = Object.values(gistsUser.files);
    const cardFiles = document.createElement("div");
    cardFiles.classList.add("cardFiles");
    gistsContiner.appendChild(cardFiles)
    formatObjectFiles.forEach(function(file) {
        const fileName = document.createElement("p");
        fileName.classList.add("fileName");
        fileName.textContent = `file Name :${file.filename}`;
        cardFiles.appendChild(fileName);
        const fileType = document.createElement("p");
        fileType.classList.add("fileType");
        fileType.textContent = `file type :${file.type}`;
        cardFiles.appendChild(fileType);
    const fileLanguage = document.createElement("p");
        fileLanguage.classList.add("fileLanguage");
        fileLanguage.textContent = `file Language ${file.language}`;
        cardFiles.appendChild(fileLanguage);
     const fileRawUrl = document.createElement("a");
        fileRawUrl.href= file.raw_url;
        fileRawUrl.rel = "noopener noreferrer";
        fileRawUrl.textContent = `go to ${file.filename}`;
        fileRawUrl.target = "_blank";
        fileRawUrl.classList.add("fileRawUrl");
        cardFiles.appendChild(fileRawUrl);
        const fileSize = document.createElement("p");
        fileSize.textContent = `file size ${file.size} Byts`;
        fileSize.classList.add("fileSize");
        cardFiles.appendChild(fileSize)
        
    })
    const gistsUserTruncated = document.createElement("p");
gistsUserTruncated.classList.add("gistsUserTruncated");

if (gistsUser.truncated === true) {
  gistsUserTruncated.textContent = `Content truncated: Yes`;
} else {
  gistsUserTruncated.textContent = `Content truncated: No`;
}

gistsContiner.appendChild(gistsUserTruncated);
    
             
           })
       }).catch(function(error) {
           const errorMsg = document.createElement("p");
  errorMsg.textContent = error.message;
  errorMsg.classList.add("errorMsg");
  document.body.appendChild(errorMsg);
       })
  
  fetch(data.forks_url).then(function(forkResponse) {
      if (forkResponse.status === 404){
    throw new Error(` User not found`);
  } else if (forkResponse.status === 403){
    throw new Error(`Too many requests, try again later`);
  }else if(!forkResponse.ok){
     throw new Error(`Something went wrong, please try again`); 
  }

  return forkResponse.json()
  }).then(function(forkResponse) {
 
  const forksContiner = document.getElementById("forks")
    forksContiner.classList.add("forksContiner")
    forkResponse.forEach(function(fork) {
        const cardFork = document.createElement("div");
        cardFork.classList.add("cardFork");
        forksContiner.appendChild(cardFork);
        const forkName = document.createElement("p");
        forkName.classList.add("forkName")
        forkName.textContent = `fork Name : ${fork.name}`;
      cardFork.appendChild(forkName) 
       const forkFullName = document.createElement("p");
       forkFullName.classList.add("forkFullName");
       forkFullName.textContent = `fork full name ${fork.full_name}`;
       cardFork.appendChild(forkFullName);
       const forkOwner = document.createElement("p");
forkOwner.classList.add("forkOwner");
forkOwner.textContent = `Owner: ${fork.owner.login}`;
cardFork.appendChild(forkOwner);

const forkOwnerAvatar = document.createElement("img")
forkOwnerAvatar.src = fork.owner.avatar_url;
forkOwnerAvatar.alt = `an img for owner fork`;
forkOwnerAvatar.loading = "lazy";
forkOwnerAvatar.classList.add("forkOwnerAvatar");
cardFork.appendChild(forkOwnerAvatar)
const forkOwnerPage = document.createElement("a");
forkOwnerPage.classList.add("forkOwnerPage");
forkOwnerPage.href = fork.owner.html_url;
forkOwnerPage.textContent = "Visit owner profile";
forkOwnerPage.target = "_blank";
forkOwnerPage.rel = "noopener noreferrer";
cardFork.appendChild(forkOwnerPage);
const forkHtmlUrl = document.createElement("a");
forkHtmlUrl.classList.add("forkHtmlUrl");
forkHtmlUrl.href = fork.html_url;
forkHtmlUrl.textContent = "View fork on GitHub";
forkHtmlUrl.target = "_blank";
forkHtmlUrl.rel = "noopener noreferrer";
cardFork.appendChild(forkHtmlUrl);
let forkDescription;

if (fork.description === null) {
  forkDescription = "No description available.";
} else {
  forkDescription = fork.description;
}

const forkDescriptionElement = document.createElement("p");
forkDescriptionElement.classList.add("forkDescription");
forkDescriptionElement.textContent = forkDescription;
cardFork.appendChild(forkDescriptionElement);
let forkLanguage;

if (fork.language === null) {
  forkLanguage = "Language not available.";
} else {
  forkLanguage = fork.language;
}

const forkLanguageElement = document.createElement("p");
forkLanguageElement.classList.add("forkLanguage");
forkLanguageElement.textContent = `Language: ${forkLanguage}`;
cardFork.appendChild(forkLanguageElement);
const forkStargazersCount = document.createElement("p");
forkStargazersCount.classList.add("forkStargazersCount")
forkStargazersCount.textContent = `stars :${fork.stargazers_count}`;
cardFork.appendChild(forkStargazersCount)
const forkWatchersCount = document.createElement("p");
forkWatchersCount.classList.add("forkWatchersCount");
forkWatchersCount.textContent = `Watchers: ${fork.watchers_count}`;
cardFork.appendChild(forkWatchersCount);
const forkForksCount = document.createElement("p");
forkForksCount.classList.add("forkForksCount");
forkForksCount.textContent = `forks :${fork.forks_count}`;
cardFork.appendChild(forkForksCount);
const forkDefaultBranch = document.createElement("p");
forkDefaultBranch.classList.add("forkDefaultBranch");
forkDefaultBranch.textContent = `Default branch: ${fork.default_branch}`;
cardFork.appendChild(forkDefaultBranch);
const forkCreatedAt = document.createElement("p");
const forkCreatedDate = new Date(fork.created_at);

forkCreatedAt.classList.add("forkCreatedAt");
forkCreatedAt.textContent = `Created: ${forkCreatedDate.toLocaleDateString()}`;

cardFork.appendChild(forkCreatedAt);
const forkUpdatedAt = document.createElement("p");
const forkUpdatedDate = new Date(fork.updated_at);

forkUpdatedAt.classList.add("forkUpdatedAt");
forkUpdatedAt.textContent = `Updated: ${forkUpdatedDate.toLocaleDateString()}`;

cardFork.appendChild(forkUpdatedAt);
const forkPushedAt = document.createElement("p");
const forkPushedDate = new Date(fork.pushed_at);

forkPushedAt.classList.add("forkPushedAt");
forkPushedAt.textContent = `Last push: ${forkPushedDate.toLocaleDateString()}`;

cardFork.appendChild(forkPushedAt);

    })
    
    
    
      
  }).catch(function(error) {
      const errorMsg = document.createElement("p");
  errorMsg.textContent = error.message;
  errorMsg.classList.add("errorMsg");
  document.body.appendChild(errorMsg);
  })
  
fetch(data.issue_events_url.replace("{/number}","")).then(function(issues) {  
     if (issues.status === 404){
    throw new Error(` issues not found`);
  } else if (issues.status === 403){
    throw new Error(`Too many requests, try again later`);
  }

  if (!issues.ok){
    throw new Error(`Something went wrong, please try again`);
  }
  return issues.json()
 
}).then(function(issue) {



   const issueContiner = document.getElementById("issue");
issue.forEach(function(event) {
  const name = document.createElement("p");
  name.classList.add("name");
  name.textContent =` event :${event.event}`;
  issueContiner.appendChild(name)
  const issueData = new Date(event.created_at);
  const issueCreateAt = document.createElement("p");
  issueCreateAt.classList.add("issueCreateAt");
  issueCreateAt.textContent = `crearted At : ${issueData.toLocaleDateString()}`;
  issueContiner.appendChild(issueCreateAt);
  const actor = document.createElement("p");
  actor.classList.add("actor");
  actor.textContent = `Actor :${event.actor.login}`;
  issueContiner.appendChild(actor);
  const imgActor = document.createElement("img")
  imgActor.src = event.actor.avatar_url;
  imgActor.classList.add("imgActor")
imgActor.alt = `Avatar of ${event.actor.login}`;
imgActor.loading = "lazy";
issueContiner.appendChild(imgActor);
const actorUrl = document.createElement("a");
actorUrl.classList.add("actorUrl");
actorUrl.href = event.actor.html_url;
actorUrl.textContent = `go to ${event.actor.login} on GitHub`;
actorUrl.target = "_blank";
issueContiner.appendChild(actorUrl);
const issueNumber = document.createElement("p");
issueNumber.classList.add("issueNumber");
issueNumber.textContent = `issue Number :${event.issue.number}`;
issueContiner.appendChild(issueNumber);
const eventIssueTitle = document.createElement("p");
eventIssueTitle.textContent = `issue Titel : ${event.issue.title}`;
eventIssueTitle.classList.add("eventIssueTitle");
issueContiner.appendChild(eventIssueTitle);
const eventIssueHtmlUrl = document.createElement("a");
eventIssueHtmlUrl.href = event.issue.html_url;
eventIssueHtmlUrl.target = "_blank";
eventIssueHtmlUrl.textContent = `go to issue page`;
eventIssueHtmlUrl.classList.add("eventIssueHtmlUrl");
issueContiner.appendChild(eventIssueHtmlUrl);
console.log(event.issue.html_url);
console.log(event.issue.url);
const issueApiUrl = document.createElement("a");
issueApiUrl.classList.add("issueApiUrl");
issueApiUrl.href = event.issue.url;
issueApiUrl.textContent = `API URL for issue`;
issueApiUrl.target = "_blank";
issueApiUrl.rel = "noopener noreferrer";

issueContiner.appendChild(issueApiUrl);
const eventIssueState = document.createElement("p");
eventIssueState.textContent = `state : ${event.issue.state}`;
eventIssueState.classList.add("eventIssueState");
issueContiner.appendChild(eventIssueState);
const issueBody = document.createElement("p");
issueBody.classList.add("issueBody");

if (event.issue.body === null) {
    issueBody.textContent = "Issue Description: No description available.";
} else {
    issueBody.textContent = `Issue Description: ${event.issue.body}`;
    const eventIssueUserLogin = document.createElement("p");
    eventIssueUserLogin.classList.add("eventIssueUserLogin");
    eventIssueUserLogin.textContent = `Issue Autor : ${event.issue.user.login}`;
issueContiner.appendChild(eventIssueUserLogin);
const eventIssueUserAvatarUrl = document.createElement("img");
eventIssueUserAvatarUrl.classList.add("eventIssueUserAvatarUrl");
eventIssueUserAvatarUrl.src = event.issue.user.avatar_url;
eventIssueUserAvatarUrl.alt = `an img for ${event.issue.user.login}`;
eventIssueUserAvatarUrl.loading = "lazy";
issueContiner.appendChild(eventIssueUserAvatarUrl);
const issueUserUrl = document.createElement("a");
issueUserUrl.classList.add("issueUserUrl");
issueUserUrl.href = event.issue.user.html_url;
issueUserUrl.textContent = `Go to ${event.issue.user.login} profile`;
issueUserUrl.target = "_blank";
issueUserUrl.rel = "noopener noreferrer";

issueContiner.appendChild(issueUserUrl);
const labelsContainer = document.createElement("div");
labelsContainer.classList.add("issueLabels");

if (event.issue.labels.length === 0) {
    const noLabels = document.createElement("p");
    noLabels.textContent = "No labels";
    labelsContainer.appendChild(noLabels);
} else {
    event.issue.labels.forEach(function(label) {
        const labelElement = document.createElement("span");

        labelElement.classList.add("issueLabel");
        labelElement.textContent = label.name;

        labelElement.style.backgroundColor = `#${label.color}`;

        labelsContainer.appendChild(labelElement);
    });
}

issueContiner.appendChild(labelsContainer);
}

issueContiner.appendChild(issueBody);
const reactionsContainer = document.createElement("div");
reactionsContainer.classList.add("issueReactions");

const plusOne = document.createElement("p");
plusOne.textContent = `👍 ${event.issue.reactions["+1"]}`;
reactionsContainer.appendChild(plusOne);

const minusOne = document.createElement("p");
minusOne.textContent = `👎 ${event.issue.reactions["-1"]}`;
reactionsContainer.appendChild(minusOne);

const laugh = document.createElement("p");
laugh.textContent = `😄 ${event.issue.reactions.laugh}`;
reactionsContainer.appendChild(laugh);

const hooray = document.createElement("p");
hooray.textContent = `🎉 ${event.issue.reactions.hooray}`;
reactionsContainer.appendChild(hooray);

const confused = document.createElement("p");
confused.textContent = `😕 ${event.issue.reactions.confused}`;
reactionsContainer.appendChild(confused);

const heart = document.createElement("p");
heart.textContent = `❤️ ${event.issue.reactions.heart}`;
reactionsContainer.appendChild(heart);

const rocket = document.createElement("p");
rocket.textContent = `🚀 ${event.issue.reactions.rocket}`;
reactionsContainer.appendChild(rocket);

const eyes = document.createElement("p");
eyes.textContent = `👀 ${event.issue.reactions.eyes}`;
reactionsContainer.appendChild(eyes);

issueContiner.appendChild(reactionsContainer);


const issueCommentsUrl = document.createElement("a");
issueCommentsUrl.classList.add("issueCommentsUrl");
issueCommentsUrl.href = event.issue.repository_url;
issueCommentsUrl.textContent = "View issue comments API";
issueCommentsUrl.target = "_blank";
issueCommentsUrl.rel = "noopener noreferrer";
issueContiner.appendChild(issueCommentsUrl);

const issueEventsUrl = document.createElement("a");
issueEventsUrl.classList.add("issueEventsUrl");
issueEventsUrl.href = event.issue.events_url;
issueEventsUrl.textContent = "View issue events API";
issueEventsUrl.target = "_blank";
issueEventsUrl.rel = "noopener noreferrer";
issueContiner.appendChild(issueEventsUrl);

const issueTimelineUrl = document.createElement("a");
issueTimelineUrl.classList.add("issueTimelineUrl");
issueTimelineUrl.href = event.issue.timeline_url;
issueTimelineUrl.textContent = "View issue timeline";
issueTimelineUrl.target = "_blank";
issueTimelineUrl.rel = "noopener noreferrer";
issueContiner.appendChild(issueTimelineUrl);
if (event.commit_url) {
    const commitUrl = document.createElement("a");
    commitUrl.classList.add("commitUrl");
    commitUrl.href = event.commit_url;
    commitUrl.textContent = "View related commit API";
    commitUrl.target = "_blank";
    commitUrl.rel = "noopener noreferrer";
    issueContiner.appendChild(commitUrl);
}
})  

    
})

 fetch(data.events_url).then(function(events) {
     
    
       if (events.status === 404){
    throw new Error(` User not found`);
  } else if (events.status === 403){
    throw new Error(`Too many requests, try again later`);
  }

  if (!events.ok){
    throw new Error(`Something went wrong, please try again`);
  }

 
    return events.json()
}).then(function(events) {
        if(events.length === 0){
        throw new Error(`sorry this repo not have events yet`);
    }

    const eventContiner = document.getElementById("events");
    events.forEach(function(event) {
          const eventType = document.createElement("p");
    eventType.classList.add("eventType");
    eventType.textContent = `event type : ${event.type}`;
    eventContiner.appendChild(eventType);
   const eventCreatedAt = document.createElement("p");
   const timeEventCreate = new Date(event.created_at)
   eventCreatedAt.classList.add('eventCreatedAt');
   eventCreatedAt.textContent = `created At : ${timeEventCreate.toLocaleDateString()}`;
   eventContiner.appendChild(eventCreatedAt);
   const eventActorLogin = document.createElement("p");
   eventActorLogin.classList.add("eventActorLogin");
   eventActorLogin.textContent = `Name : ${event.actor.login}`;
   eventContiner.appendChild(eventActorLogin);
   const eventActorAvatarUrl = document.createElement("img");
   eventActorAvatarUrl.classList.add("eventActorAvatarUrl")
   eventActorAvatarUrl.src = event.actor.avatar_url;
   eventActorAvatarUrl.alt = `img for ${event.actor.login}`;
   eventActorAvatarUrl.loading = "lazy";
   eventContiner.appendChild(eventActorAvatarUrl);
   
const commits = event.payload?.commits;

if (Array.isArray(commits) && commits.length > 0) {
  commits.forEach(function(commit) {
    const eventPayloadCommits = document.createElement("p");

    eventPayloadCommits.classList.add("eventPayloadCommits");
    eventPayloadCommits.textContent =
      `Commit message: ${commit.message}`;

    eventContiner.appendChild(eventPayloadCommits);
  });
} else {
  const noCommits = document.createElement("p");

  noCommits.classList.add("eventPayloadCommits");
  noCommits.textContent = "No commit details available for this event.";

  eventContiner.appendChild(noCommits);
} 
   
   if(event.payload?.ref){
   const eventPayloadRef = document.createElement('p');
   eventPayloadRef.classList.add("eventPayloadRef");
   eventPayloadRef.textContent = `Git reference ${event.payload.ref}`;
   eventContiner.appendChild(eventPayloadRef);    
   }
   if(event.payload?.head){
   const eventPayloadHead = document.createElement("p");
   eventPayloadHead.textContent = event.payload.head;
      eventPayloadHead.classList.add("eventPayloadHead");
   eventContiner.appendChild(eventPayloadHead);       
   }
   if(event.payload?.before){
    const eventPayLoadBefore = document.createElement("p");
   eventPayLoadBefore.classList.add("eventPayLoadBefore");
   eventPayLoadBefore.textContent = event.payload.before;
 eventContiner.appendChild(eventPayLoadBefore);   
   }
   
 if(event.payload?.push_id){
     const eventPayLoadPushId = document.createElement("p");
     eventPayLoadPushId.classList.add("eventPayLoadPushId");
     eventPayLoadPushId.textContent = event.payload.push_id;
 eventContiner.appendChild(eventPayLoadPushId);
     }  
 if(event.payload?.size){
     const eventPayloadSize = document.createElement("p");
    eventPayloadSize.classList.add("eventPayloadSize");
    eventPayloadSize.textContent = event.payload.size;
    eventContiner.appendChild(eventPayloadSize); 
 }
 if (event.payload?.distinct_size != null) {
    const eventPayloadDistinctSize = document.createElement("p");

    eventPayloadDistinctSize.classList.add("eventPayloadDistinctSize");
    eventPayloadDistinctSize.textContent =
        `Distinct commits: ${event.payload.distinct_size}`;

    eventContiner.appendChild(eventPayloadDistinctSize);
}
const eventRepoName = document.createElement("p");
eventRepoName.classList.add("eventRepoName");
eventRepoName.textContent = `Name : ${event.repo.name}`   
eventContiner.appendChild(eventRepoName);
const eventRepoUrl = document.createElement("a");
 eventRepoUrl.classList.add("eventRepoUrl");
 eventRepoUrl.textContent = `go to repo gitHub`;
 eventRepoUrl.href = `https://github.com/${event.repo.name}`;
 eventRepoUrl.target = "_blank";
 eventContiner.appendChild(eventRepoUrl)
const eventPublic  = document.createElement("p");
eventPublic.classList.add("eventPublic");
if(event.public === true) {
   eventPublic.textContent = `is public : yes` 
}else{
    eventPublic.textContent = `is public : no` 
}
eventContiner.appendChild(eventPublic);
const eventActorId = document.createElement('p');
eventActorId.classList.add("eventActorId");
eventActorId.textContent = `Id : ${event.actor.id}`;
eventContiner.appendChild(eventActorId);
const eventActorUrl = document.createElement("a");
eventActorUrl.classList.add("eventActorUrl");
eventActorUrl.textContent = `go to ${event.actor.login} on GitHub`;
eventActorUrl.href = `https://github.com/${event.actor.login}`;
eventActorUrl.target = "_blank";
eventContiner.appendChild(eventActorUrl);
if (event.org) {
  const eventOrg = document.createElement("p");
  eventOrg.classList.add("eventOrg");
  eventOrg.textContent = `Organization: ${event.org.login}`;
  eventContiner.appendChild(eventOrg);
  const eventOrGavatarUrl = document.createElement("img");
  eventOrGavatarUrl.alt = `img for ${event.org.login}`;
  eventOrGavatarUrl.src = event.org.avatar_url;
  eventOrGavatarUrl.classList.add("eventOrGavatarUrl");
  eventContiner.appendChild(eventOrGavatarUrl)
}
const eventId = document.createElement("p");
eventId.classList.add("eventId");
eventId.textContent = `ID: ${event.id}`;
eventContiner.appendChild(eventId);
const eventRepoId = document.createElement("p");
eventRepoId.classList.add("eventRepoId");
eventRepoId.textContent = `repo Id : ${event.repo.id}`;
eventContiner.appendChild(eventRepoId);
if (event.type === "ForkEvent" && event.payload?.forkee) {
  const forkRepo = event.payload.forkee;

  
  const forkRepoName = document.createElement("p");
  forkRepoName.classList.add("forkRepoName");
  forkRepoName.textContent = `Forked repository: ${forkRepo.full_name}`;
  eventContiner.appendChild(forkRepoName);

  
  if (forkRepo.html_url) {
    const forkRepoUrl = document.createElement("a");
    forkRepoUrl.classList.add("forkRepoUrl");
    forkRepoUrl.textContent = "Open forked repository on GitHub";
    forkRepoUrl.href = forkRepo.html_url;
    forkRepoUrl.target = "_blank";
    forkRepoUrl.rel = "noopener noreferrer";
    eventContiner.appendChild(forkRepoUrl);
  }

  
  if (forkRepo.owner?.login) {
    const forkRepoOwner = document.createElement("p");
    forkRepoOwner.classList.add("forkRepoOwner");
    forkRepoOwner.textContent = `Repository owner: ${forkRepo.owner.login}`;
    eventContiner.appendChild(forkRepoOwner);
  }

  
  if (forkRepo.owner?.avatar_url) {
    const forkRepoOwnerAvatar = document.createElement("img");
    forkRepoOwnerAvatar.classList.add("forkRepoOwnerAvatar");
    forkRepoOwnerAvatar.src = forkRepo.owner.avatar_url;
    forkRepoOwnerAvatar.alt = `Avatar of ${forkRepo.owner.login || "repository owner"}`;
    forkRepoOwnerAvatar.loading = "lazy";
    eventContiner.appendChild(forkRepoOwnerAvatar);
  }
}

if (event.type === "PullRequestEvent" && event.payload?.pull_request) {
  const pullRequest = event.payload.pull_request;

  const prAction = document.createElement("p");
  prAction.classList.add("prAction");
  prAction.textContent = `Pull Request action: ${event.payload.action || "Unknown"}`;
  eventContiner.appendChild(prAction);

  const prNumber = document.createElement("p");
  prNumber.classList.add("prNumber");
  prNumber.textContent = `Pull Request #${event.payload.number ?? pullRequest.number ?? "Unknown"}`;
  eventContiner.appendChild(prNumber);

  
  const prTitle = document.createElement("p");
  prTitle.classList.add("prTitle");
  prTitle.textContent = `Title: ${pullRequest.title || "No title available"}`;
  eventContiner.appendChild(prTitle);

  
  if (pullRequest.html_url) {
    const prUrl = document.createElement("a");
    prUrl.classList.add("prUrl");
    prUrl.textContent = "View Pull Request on GitHub";
    prUrl.href = pullRequest.html_url;
    prUrl.target = "_blank";
    prUrl.rel = "noopener noreferrer";
    eventContiner.appendChild(prUrl);
  }

  
  const prMerged = document.createElement("p");
  prMerged.classList.add("prMerged");
  prMerged.textContent = `Merged: ${pullRequest.merged ? "Yes" : "No"}`;
  eventContiner.appendChild(prMerged);
}
    
    
    
if (event.type === "IssueCommentEvent" && event.payload?.issue && event.payload?.comment) {
  const issue = event.payload.issue;
  const comment = event.payload.comment;

 
  const issueCommentAction = document.createElement("p");
  issueCommentAction.classList.add("issueCommentAction");
  issueCommentAction.textContent = `Action: ${event.payload.action || "Unknown"}`;
  eventContiner.appendChild(issueCommentAction);

  
  const issueNumber = document.createElement("p");
  issueNumber.classList.add("issueNumber");
  issueNumber.textContent = `Issue #${issue.number ?? "Unknown"}`;
  eventContiner.appendChild(issueNumber);

  
  const issueTitle = document.createElement("p");
  issueTitle.classList.add("issueTitle");
  issueTitle.textContent = `Issue title: ${issue.title || "No title available"}`;
  eventContiner.appendChild(issueTitle);

  
  if (issue.html_url) {
    const issueUrl = document.createElement("a");
    issueUrl.classList.add("issueUrl");
    issueUrl.textContent = "View Issue on GitHub";
    issueUrl.href = issue.html_url;
    issueUrl.target = "_blank";
    issueUrl.rel = "noopener noreferrer";
    eventContiner.appendChild(issueUrl);
  }

  
  const issueCommentBody = document.createElement("p");
  issueCommentBody.classList.add("issueCommentBody");
  issueCommentBody.textContent = comment.body || "No comment text available";
  eventContiner.appendChild(issueCommentBody);

 
  if (comment.html_url) {
    const issueCommentUrl = document.createElement("a");
    issueCommentUrl.classList.add("issueCommentUrl");
    issueCommentUrl.textContent = "View Comment on GitHub";
    issueCommentUrl.href = comment.html_url;
    issueCommentUrl.target = "_blank";
    issueCommentUrl.rel = "noopener noreferrer";
    eventContiner.appendChild(issueCommentUrl);
  }
} 

})
   
}).catch(function(error) {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = error.message;
  errorMsg.classList.add("errorMsg");
  document.body.appendChild(errorMsg);
});



}).catch(function(error) {
  const errorMsg = document.createElement("p");
  errorMsg.textContent = error.message;
  errorMsg.classList.add("errorMsg");
  document.body.appendChild(errorMsg);
});






if(!navigator.onLine){
    sessionStorage.setItem("offlinepage", window.location.href);
    window.location.href = "/offline.html";
}
window.addEventListener("offline",function(){
    sessionStorage.setItem("offlinepage", window.location.href);
    window.location.href = "/offline.html";
})
