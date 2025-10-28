// ------------------------------- header sidebar ---------------------------------------------//
 const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');

    menuBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
//--------------------------------end sidebar -------------------------------------------------//
        // -------------------------------slide category --------------------------------------//

        const track = document.getElementById("sliderTrack");
        const prev = document.querySelector(".slider-btn.prev");
        const next = document.querySelector(".slider-btn.next");

        let index = 0;
        let autoSlideInterval;

        const slide = () => {
            const cards = document.querySelectorAll(".category-card");
            const totalCards = cards.length;

            let visibleCards = 6;
            const width = window.innerWidth;
            if (width <= 768) visibleCards = 2;
            else if (width <= 1024) visibleCards = 4;

            const moveBy = 100 / visibleCards;
            index = (index + 1) % totalCards;
            track.style.transform = `translateX(-${index * moveBy}%)`;
        };

        const manualSlide = (direction) => {
            const cards = document.querySelectorAll(".category-card");
            const totalCards = cards.length;

            let visibleCards = 5;
            const width = window.innerWidth;
            if (width <= 768) visibleCards = 2;
            else if (width <= 1024) visibleCards = 4;

            const moveBy = 100 / visibleCards;

            index = (index + direction + totalCards) % totalCards;
            track.style.transform = `translateX(-${index * moveBy}%)`;
        };

        prev.addEventListener("click", () => manualSlide(-1));
        next.addEventListener("click", () => manualSlide(1));

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(() => slide(), 4000);
        };

        const stopAutoSlide = () => {
            clearInterval(autoSlideInterval);
        };

        track.addEventListener("mouseenter", stopAutoSlide);
        track.addEventListener("mouseleave", startAutoSlide);

        startAutoSlide();


        //---------------------------------------- end catagory -----------------------------//


        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('languageDropdown').textContent = item.textContent.trim();
            });
        });



//----------------------------------------------social media ----------------------------------//
 const container = document.getElementById("cardContainer");
  const leftBtn = document.getElementById("scrollLeft");
  const rightBtn = document.getElementById("scrollRight");

  const CARD_WIDTH = 336; // 320px card + 16px gap
  const updateButtons = () => {
    leftBtn.disabled = container.scrollLeft <= 0;
    rightBtn.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;
  };

  leftBtn.addEventListener("click", () => {
    container.scrollBy({ left: -CARD_WIDTH, behavior: "smooth" });
    setTimeout(updateButtons, 500);
  });

  rightBtn.addEventListener("click", () => {
    container.scrollBy({ left: CARD_WIDTH, behavior: "smooth" });
    setTimeout(updateButtons, 500);
  });

  container.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
//-------------------------------------------end social media --------------------------------//