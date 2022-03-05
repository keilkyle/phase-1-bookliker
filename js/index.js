document.addEventListener("DOMContentLoaded", function() {});

const list = document.querySelector("#list")
const showPanel = document.querySelector("#show-panel")

fetch("http://localhost:3000/books", {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
    }})
.then(resp => resp.json())
.then(data => {
    for (i in data) {
        let li = document.createElement("li")
        li.innerText = data[i].title
        li.id = data[i].id
        li.addEventListener("click", expandBook)
        list.appendChild(li)
    }
})

function expandBook(e) {
    let id  = e.target.id

    showPanel.innerHTML = ""
    fetch(`http://localhost:3000/books/${id}`, {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
    }})
    .then(resp => resp.json())
    .then(data => { 
        let img = document.createElement("img")
        img.src = data.img_url
        showPanel.appendChild(img)

        let h1 = document.createElement("h1")
        h1.innerText = data.title
        showPanel.appendChild(h1)

        let p = document.createElement("p")
        p.innerText = data.description
        showPanel.appendChild(p)

        let ul = document.createElement("ul")
        showPanel.appendChild(ul)

        let users = data.users
        for (i in users) {
            let li = document.createElement("li")
            li.innerText = users[i].username
            showPanel.querySelector("ul").appendChild(li)
        }
        let button = document.createElement("button")
        button.innerText = "LIKE"
        button.id = data.id
        button.addEventListener("click", likeBook)
        showPanel.appendChild(button)
    })
}

function likeBook(e) {
    let id  = e.target.id

    fetch(`http://localhost:3000/books/${id}`, {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
    }})
    .then(resp => resp.json())
    .then(data => {
        let users = data.users
        let newUser = {"id": 2, "username": "auer"}
        
        let li = document.createElement("li")
        li.innerText = newUser.username
        showPanel.querySelector("ul").appendChild(li)

        users.push(newUser)
        fetch(`http://localhost:3000/books/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json" 
            },
            body: JSON.stringify({"users": users})        
        })
    })
}
