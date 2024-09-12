
const accesskey='IWIanT2oSv83CDpEEndhkOoiMdgRVVTKuX535W1f_zs';
const form_search=document.getElementById("search-form");
const box_search=document.getElementById("search-box");
const result_search=document.getElementById("search-result");
const search=document.getElementById("show-more-btn");
let keyword="";
let page=1;
async function searchImages() {
    keyword=box_search.value;//input me jo value put kare ge wo save hogi
    const url=`https://api.unsplash.com/search/collections?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;
    const response=await fetch(url);
    const data= await response.json();
    if(page===1){
        result_search.innerHTML="";
    }
    
    const results=data.results;
    results.forEach((result) => {
        console.log(result);  // Log the result object
        // Ensure cover_photo and URLs exist
        if (result.cover_photo && result.cover_photo.urls && result.cover_photo.urls.small) {
            const image = document.createElement("img");
            image.src = result.cover_photo.urls.small;
    
            const imagelink = document.createElement("a");
            imagelink.href = result.links.html;
            imagelink.target = "_blank";
            imagelink.appendChild(image);
    
            result_search.appendChild(imagelink);
        } else {
            console.log("No valid image found for this collection.");
        }
        search.style.display="block"
    });
    
    
   
}
form_search.addEventListener("submit",(e) =>{
    e.preventDefault();
    page=1;
    searchImages();
});
search.addEventListener("click",()=>{
    page++;
    searchImages();
})