document.addEventListener('DOMContentLoaded', async () => {
    const slideshowContainer = document.getElementById('slideshow-container');
    const dotsContainer = document.getElementById('dots-container');
  
    try {
      const response = await fetch('/images');
      const images = await response.json();
  
      images.forEach((image, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.classList.add('mySlides', 'fade');
        slide.innerHTML = `
          <div class="numbertext">${index + 1} / ${images.length}</div>
          <img src="uploads/${image}" style="width:100%">
          <div class="text">Image ${index + 1}</div>
        `;
        slideshowContainer.appendChild(slide);
  
        // Create dot
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => currentSlide(index + 1));
        dotsContainer.appendChild(dot);
      });
  
      showSlides();
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  });
  
  let slideIndex = 0;
  
  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  