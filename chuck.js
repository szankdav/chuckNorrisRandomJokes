"use strict";

function viccMegjelenitese(text) {
  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", "alert-info", "alert-dismissible", "fade", "show", "my-3");
  alertDiv.setAttribute("role", "alert");
  const textNode = document.createTextNode(text);
  alertDiv.append(textNode);
  const btn = document.createElement("button");
  btn.classList.add("btn-close");
  btn.setAttribute("type", "button");
  btn.setAttribute("aria-label", "Bezárás");
  btn.dataset.bsDismiss = "alert";
  alertDiv.append(btn);

  for (const node of document.getElementById("viccek").childNodes) {
    node.remove();
  }
  document.getElementById("viccek").append(alertDiv);
}

//viccMegjelenitese("Chuck Norris knows the last digit of PI.");

const url = "https://api.chucknorris.io/jokes/random"

function viccLekerese(url){
    fetch(url, {
        headers: {
            "Accept": "application/json"
        }
    })
    .then(res => {
        if(!res.ok){
            throw new Error("A vicc lekérése sikertelen!")
        }
        return res.json()
    })
    .then(joke => {
        viccMegjelenitese(joke.value)
    })
    .catch(err => {
        console.error(err)
        alert("A vicc lekérése sikertelen: " + err)
    })
}

document.getElementById("random").addEventListener("click", () => {
    viccLekerese(url)
})

function formGeneralasa(categories){
    const form = document.createElement('form')
    const formDiv = document.createElement('div')
    const label = document.createElement('label')
    label.htmlFor = "kategoria"
    label.classList.add("form-label")
    label.append(document.createTextNode("Kategória:"))
    formDiv.append(label)
    const select = document.createElement('select')
    select.id = "kategoria"
    select.name = "kategoria"
    select.classList.add("form-select", "my-2")

    for(const category of categories){
        const option = document.createElement("option")
        option.value = category
        const nagyKezdoBetu = category.charAt(0).toUpperCase() + category.slice(1)
        option.append(document.createTextNode(nagyKezdoBetu))
        select.append(option)
    }

    formDiv.append(select)

    const submit = document.createElement('input')
    submit.type = "submit"
    submit.classList.add("btn", "btn-success", "my-2")
    submit.value = "Véletlen vicc a kiválasztott kategóriából"
    submit.addEventListener("click", (e) => {
        e.preventDefault()
        mutasdGombKattintas(url)
    })

    form.append(formDiv)
    form.append(submit)

    const viccek = document.getElementById("viccek")
    viccek.parentNode.insertBefore(form, viccek)

    document.getElementById("urlap").style.display = "none"
}

document.getElementById("urlap").addEventListener("click", () => {
    fetch("https://api.chucknorris.io/jokes/categories", {
        headers: {
            "Accept" : "application/json",
        }
    })
    .then(res => {
        return res.json()
    })
    .then(cat => {
        console.log(cat)
        formGeneralasa(cat)
    })
})

function mutasdGombKattintas(url){
    const cat = document.getElementById("kategoria")
    fetch(url + `?category=${cat.value}`)
    .then(res => {
        return res.json()
    })
    .then(joke => {
        viccMegjelenitese(joke.value)
    })
}