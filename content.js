const content_page = document.querySelector(".theme_section");
const apiId = localStorage.getItem("apiId");
const whole_page = document.querySelector('.main-wrapper');
const loader_wrapper = document.getElementById("loaderWrapper");

// loader 
// const loader = () => {
//   loader_wrapper.innerHTML = `
    
//   `;
// };

// page loaded 
function actualData() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    "AWSELB=75B9BD811C5C032EDEF76366759629DCCB8726D7A30D93925AE6796CF81003C5E07EB78986E4519DDF3CD336789F71716B110728D86C7DC210F3FA24BF2C842FBAE8E26E2E; AWSELBCORS=75B9BD811C5C032EDEF76366759629DCCB8726D7A30D93925AE6796CF81003C5E07EB78986E4519DDF3CD336789F71716B110728D86C7DC210F3FA24BF2C842FBAE8E26E2E"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://content.guardianapis.com/${apiId}?api-key=74b244d7-9bf5-476e-b3a0-7c1dc4630a0f&show-fields=headline,shortUrl,thumbnail,body,publication,lastModified`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const { headline, shortUrl, thumbnail, lastModified, body, publication } =
        result.response.content.fields;

      content_page.innerHTML += `
          <div class="wrapper_news col-11 mx-auto my-md-3 my-1 ">
            <figure class="thumbnail_img text-center">
              <img src="${thumbnail}" alt="" class="img-fluid" />
            </figure>
  
            <div class="display-6 heading ">${headline}</div>
            <div class="info theme-color px-md-4 px-2 py-2 my-2 my-md-4 d-flex justify-content-between">
              <div class="publication">Published by : ${publication}</div>
              <div class="published-date">Publishing date : ${lastModified}</div>
            </div>
  
            <div class="body col-12 px-1 mx-auto">
              ${body}
            </div>
          </div>`;

      document.querySelectorAll("img").forEach((currentImg) => {
        // console.log(currentImg)
        currentImg.classList.add("img-fluid");
      });
    })
    .catch((error) => console.log("error", error));
};


console.log(whole_page)

window.addEventListener("load",(params) => {
  

  actualData();

})



