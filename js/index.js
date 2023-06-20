
//////RECAP/ WHAT I DID////////

//first I made a function that handled the submit event on the form but naming the search variable as the value the person inputs into the form on the website, then doing a fetch request to the API based on the search value
//then I created a function to add an event listener to the submit form as a whole so that when a person hit "submit" it would pass in my handleSubmit function and run the fetch
//at first I just console.log'd the data response of the users array to make sure it was giving me what I wanted
// then I created a function called renderUser that would take the users array data and render it to the DOM by creating html elements, assigning them text and link values based on the API keys, and appending those to the DOM
//the I ameneded my .then callback function to, for the user array, to iterate across all of the users, seeing if the login key equaled the search value, and if so, passing in the renderUser function
//then I added an event listener to my image element, so that when it was clicked it did a fetch request to the repos API based on the user.login info, and at first just console.log'd the repos to make sure it was what I wanted
//then I created a function called renderRepos that would take in the repos data and render it to the DOM by creating list elements and assigning a href and text to the a inside (so that they were clickable) and appended those to the DOM
//then I amended my .then callback function within the image click listener event to iterate across each repo and render them to the DOM by passing in my renderRepos function 



//The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.

function handleSubmit(e) {
    e.preventDefault()
    const search = e.target.querySelector('#search').value
    fetch(`https://api.github.com/search/users?q=${search}`, {
        method: "GET",
        headers: {
            "Accept": "application/vnd.github.v3+json"
        }
})
    .then(res => res.json())
    .then(users => {
        users.items.forEach((user) => {
        if ( user.login === search) {
            renderUser(user)
        }
    })
})
    .catch(e => console.log(e))
    e.target.reset()
}

function searchUser() {
    const form = document.querySelector('#github-form')
    form.addEventListener('submit', handleSubmit)
}

searchUser()

//Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile.)

function renderUser(user) {
    const h3 = document.createElement('h3')
    const image = document.createElement('img')
    const a = document.createElement('a')

    h3.textContent = user.login
    image.src = user.avatar_url
    a.href = user.html_url
    a.textContent = `link to ${user.login}'s profile`
    
    const userList = document.querySelector('#user-list')

    userList.appendChild(h3)
    userList.appendChild(image)
    userList.appendChild(a)


    image.addEventListener('click', () => {
        fetch (`https://api.github.com/users/${user.login}/repos`, {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then (res => res.json())
        .then(repos => {
            repos.forEach(renderRepos)
        })
        .catch(e => console.log(e))
    } )

}

//Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user. check
//Using the response from the Users Repos Endpoint, display all the repositories for that user on the page.
// I'm going to add an event listener to the image that returns the repo data for that user, then adds the repo data to the repo ul as a list of hyperlinks

function renderRepos(repos) {
    const li = document.createElement('li')
    
    const a = document.createElement('a')
    a.href = repos.html_url
    a.textContent = repos.name

    const repoList = document.querySelector('#repos-list')

    repoList.appendChild(li)
    li.prepend(a)
}

