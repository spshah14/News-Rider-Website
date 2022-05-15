// console.log("This is news website");
// 0962d7d242ad42749ebb3e0f6231a2bd
// GET https://newsapi.org/v2/top-headlines/sources?apiKey=API_KEY
// 7d1ca91b0a5ed71f46d65bd1c62e4f1b
// https://gnews.io/api/v4/top-headlines?token=7d1ca91b0a5ed71f46d65bd1c62e4f1b&lang=en&country=in
let newsAccordion = document.getElementById("newsAccordion");
// let country = 'in';
// let newsApi = "0962d7d242ad42749ebb3e0f6231a2bd";
let country = 'in';
let api = "7d1ca91b0a5ed71f46d65bd1c62e4f1b";

const xhr = new XMLHttpRequest();
// xhr.open("GET", `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${newsApi}`, true);
xhr.open("GET", `https://gnews.io/api/v4/top-headlines?token=${api}&lang=en&country=${country}`, true);

xhr.onload = function () {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        // console.log(articles);
        let newsHtml = "";
        articles.forEach(function (element, index) {


            let news = `<div class="accordion-item my-5 newsCard rounded border border-3 border-primary">
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button collapsed btnClass" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}"
                    aria-expanded="true" aria-controls="collapse${index}">
                    <b>Breaking News ${index + 1}:</b><br>  ${element["title"]}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                data-bs-parent="#newsAccordion">
                <div class="accordion-body" id="cardTxt">
                
                <b>About: </b>${element["description"]}.<br><br>
                ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here...</a>

                </div>
            </div>
        </div>`
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;

    }
    else {
        console.log("Some error accured");
    }
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log("fired!", inputVal);
    let newsCard = document.getElementsByClassName('newsCard');
    Array.from(newsCard).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("div")[1].innerText.toLocaleLowerCase();
        let cardTitle = element.getElementsByTagName("button")[0].innerText.toLocaleLowerCase();
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})
xhr.send();
