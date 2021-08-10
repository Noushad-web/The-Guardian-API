localStorage.clear();

const theme_section_home = document.querySelector(".theme_section_home");


let myHeaders = new Headers();
myHeaders.append(
  "Cookie",
  "AWSELB=75B9BD811C5C032EDEF76366759629DCCB8726D7A371904BEC1C3B7DFC40019571E370E2C4E4519DDF3CD336789F71716B110728D86C7DC210F3FA24BF2C842FBAE8E26E2E; AWSELBCORS=75B9BD811C5C032EDEF76366759629DCCB8726D7A371904BEC1C3B7DFC40019571E370E2C4E4519DDF3CD336789F71716B110728D86C7DC210F3FA24BF2C842FBAE8E26E2E"
);

let requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

// by default news
(() => {
  fetch(
    "https://content.guardianapis.com/search?&page-size=12&order-by=newest&show-fields=headline,shortUrl,thumbnail,lastModified&api-key=74b244d7-9bf5-476e-b3a0-7c1dc4630a0f",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const resultArray = result.response.results;
      


      resultArray.forEach((everyRootItem, i) => {
        const { headline, shortUrl, thumbnail, lastModified } = everyRootItem.fields;

        theme_section_home.innerHTML += `
        <a class="thumbnail_wrapper col-lg-3 col-md-6 col-11 ma-md-auto mb-1 mb-md-3" href="./content.html" id=${everyRootItem.id} >
          <figure class="thumbnail-fig" id=${everyRootItem.id}>
            <img src="${thumbnail}" class="img-fluid" alt="image not found" />
          </figure>
          <div class="thumbnail_headline" >${headline} <br> <small class="text-center" ><i>published : ${lastModified}</i></small> </div>
        </a>
        `;
        
        const thumbnail_wrapper = document.querySelectorAll('.thumbnail_wrapper');
          // event listener attaching 
          thumbnail_wrapper.forEach((currentThumbnail) => {
            currentThumbnail.addEventListener('click', (e) => {
              // e.preventDefault();
              localStorage.setItem('apiId', e.target.parentElement.id);
            })
          })
          
        });

    })
    .catch((error) => console.log("error", error));
})();


