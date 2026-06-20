const allImages = [
    {src:"images/img0.jpg",category:"birds"},
    {src:"images/img1.jpg",category:"nature"},
    {src:"images/img2.jpg",category:"nature"},
    {src:"images/img3.jpg",category:"nature"},
    {src:"images/img4.jpg",category:"flowers"},
    {src:"images/img5.jpg",category:"animals"},
    {src:"images/img6.jpg",category:"flowers"},
    {src:"images/img7.jpg",category:"flowers"},
    {src:"images/img8.jpg",category:"nature"},
    {src:"images/img9.jpg",category:"birds"},
    {src:"images/img10.jpg",category:"nature"},
    {src:"images/img11.jpg",category:"animals"},
    {src:"images/img13.jpg",category:"animals"},
    {src:"images/img14.jpg",category:"animals"},
   {src:"images/img16.jpg",category:"birds"},
   {src:"images/img17.jpg",category:"birds"},
    {src:"images/img18.jpg",category:"birds"},
    {src:"images/img19.jpg",category:"flowers"},
    {src:"images/img20.jpg",category:"flowers"}
];

let images = [...allImages];
let currentIndex = 0;

const gallery = document.getElementById("gallery");
const categorybtn = document.querySelectorAll("#category button");
const filter = document.getElementById("filters");

const lightbox = document.getElementById("lightbox");
const lightimg = document.getElementById("lightbox-img");

function displayGallery(){

    gallery.innerHTML = "";

    images.forEach((image,index)=>{

        const img = document.createElement("img");

        img.src = image.src;

        img.style.filter = getFilter();

        img.addEventListener("click",()=>{

            currentIndex = index;
            lightbox.style.display = "flex";
            lightimg.src = image.src;

        });

        gallery.appendChild(img);

    });
}

function getFilter(){

    const selected = filter.value;

    if(selected === "grayscale") return "grayscale(100%)";
    if(selected === "sepia") return "sepia(100%)";
    if(selected === "blur") return "blur(3px)";
    if(selected === "brightness") return "brightness(150%)";

    return "none";
}

displayGallery();


categorybtn.forEach(button =>{

    button.addEventListener("click",()=>{
        categorybtn.forEach(btn =>{
            btn.classList.remove("active");
        });
        button.classList.add("active");

       const  selected = button.value;
       
        
       if(selected == "all"){
        images =[...allImages];
        
       }
      else{
        images = allImages.filter(
            image => image.category === selected
        );
              }
       displayGallery();
    });
});

filter.addEventListener("change",displayGallery);

document.getElementById("close").addEventListener("click",()=>{

    lightbox.style.display = "none";

});

document.getElementById("next-light").addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= images.length){
        currentIndex = 0;
    }

    lightimg.src = images[currentIndex].src;

});

document.getElementById("prev-light").addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = images.length - 1;
    }

    lightimg.src = images[currentIndex].src;

});

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){
        lightbox.style.display = "none";
    }

});

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display === "flex"){

        if(e.key === "ArrowRight"){
            document.getElementById("next-light").click();
        }

        if(e.key === "ArrowLeft"){
            document.getElementById("prev-light").click();
        }

        if(e.key === "Escape"){
            lightbox.style.display = "none";
        }
    }
});