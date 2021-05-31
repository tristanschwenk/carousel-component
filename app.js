document.addEventListener('DOMContentLoaded', () => {
    console.log("sucessfully loaded!");

    let itemClassName = "slide";
    let items = document.getElementsByClassName(itemClassName)
    let totalItems = items.length
    let slide = 0
    let moving = true;

    let buttons = document.querySelectorAll('.slider-index')

    buttons.forEach(el => {
        el.addEventListener('click', ()=> {
            console.log(el.dataset.sliderIndex);
            moveCarouselTo(el.dataset.sliderIndex-1)
        })
        console.log(el.dataset.sliderIndex);
    })


    initCarousel();

    // Add required classes :
    function setInitialClasses() {
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");
    }

    function setEventListeners() {
        let next = document.querySelector('.slider-button-next')
        let prev = document.querySelector('.slider-button-prev')

        next.addEventListener('click', moveNext)
        prev.addEventListener('click', movePrev)
    }


    // Next navigation handler
    function moveNext() {
        // Check if moving
        if (!moving) {
            // If it's the last slide, reset to 0, else +1
            if (slide === (totalItems - 1)) {
                slide = 0;
            } else {
                slide++;
            }

            // Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }
    // Previous navigation handler
    function movePrev() {
        // Check if moving
        if (!moving) {
            // If it's the first slide, set as the last slide, else -1
            if (slide === 0) {
                slide = (totalItems - 1);
            } else {
                slide--;
            }

            // Move carousel to updated slide
            moveCarouselTo(slide);
        }
    }

    function disableInteraction() {
        // Set 'moving' to true for the same duration as our transition.
        // (0.5s = 500ms)
        moving = true;
        // setTimeout runs its function once after the given time
        setTimeout(function () {
            moving = false
        }, 500);
    }

    function moveCarouselTo(slide) {
        // Check if carousel is moving, if not, allow interaction
        if (!moving) {

            // temporarily disable interactivity
            disableInteraction();
            // Update the "old" adjacent slides with "new" ones
            let newPrevious = slide - 1;
            let newNext = slide + 1;
            var oldPrevious = slide - 2,
                oldNext = slide + 2;
            // Test if carousel has more than three items
            // Checks and updates if the new slides are out of bounds
            if (newPrevious < 0) newPrevious = totalItems - 1;
            if (newNext >= totalItems) newNext = 0;
            console.log(newNext, newPrevious, slide);
            // Now we've worked out where we are and where we're going, 
            // by adding/removing classes we'll trigger the transitions.
            // Reset old next/prev elements to default classes
            document.querySelector('.prev').className = itemClassName;
            document.querySelector('.next').className = itemClassName;
            // Add new classes  
            items[newPrevious].className = itemClassName + " prev";
            items[slide].className = itemClassName + " active";
            items[newNext].className = itemClassName + " next";
           
        }
    }

    function initCarousel() {
        setInitialClasses();
        setEventListeners();
        // Set moving to false so that the carousel becomes interactive
        moving = false;
    }
});