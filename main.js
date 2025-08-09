 document.addEventListener("DOMContentLoaded", function () {


 
 // ===== NAVBAR TOGGLE =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const menuIcon = document.getElementById("menuIcon");

function closeNav() {
  navMenu.classList.remove("show");
  menuIcon.classList.replace("fa-xmark", "fa-bars");
}

navToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("show");

  if (navMenu.classList.contains("show")) {
    menuIcon.classList.replace("fa-bars", "fa-xmark");
  } else {
    menuIcon.classList.replace("fa-xmark", "fa-bars");
  }
});

document.addEventListener("click", (e) => {
  const clickedInsideMenu = navMenu.contains(e.target);
  const clickedToggle = navToggle.contains(e.target);

  if (!clickedInsideMenu && !clickedToggle && navMenu.classList.contains("show")) {
    closeNav();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("show")) {
    closeNav();
  }
});    
     
     /*===Scroll to up===*/
const btn = document.getElementById("scrollTopBtn");

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 300 ? "flex" : "none";
  });
  




     /*=== Hero Slider===*/  

  const heroSwiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 1,
    spaceBetween: 0,
    effect: "fade"
  });
  
  
       /*=== About Slider===*/  
const aboutSwiper = new Swiper('.aboutSwiper', {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});
  

// ===== FAQ TOGGLE ===== 

  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const icon = btn.querySelector(".icon");

      const isActive = item.classList.contains("active");

      // Close all
      document.querySelectorAll(".faq-item").forEach(i => {
        i.classList.remove("active");
        const ic = i.querySelector(".icon");
        if (ic) ic.textContent = "+";
      });

      // Open current
      if (!isActive) {
        item.classList.add("active");
        if (icon) icon.textContent = "−";
      }
    });
  });



  const posts = [
    { id: 1, category: 'Growth', title: 'Grow your potential with strategy', author: 'Maria Doe', date: 'Jan 1, 2022', img: 'img1.jpg' },
    { id: 2, category: 'Business', title: 'Startup lessons and what to avoid', author: 'Allisa Mayer', date: 'Jun 5, 2022', img: 'img2.jpg' },
    { id: 3, category: 'Productivity', title: 'Boost your efficiency at work', author: 'Mark Dower', date: 'Jun 22, 2022', img: 'img3.jpg' },
    { id: 4, category: 'Skills', title: 'Learn soft skills in 30 days', author: 'Lisa Neymar', date: 'Jun 30, 2022', img: 'img4.jpg' },
    { id: 5, category: 'Business', title: 'Building teams for modern companies', author: 'Denis Peterson', date: 'Jan 30, 2022', img: 'img5.jpg' },
    { id: 6, category: 'Productivity', title: 'Time tracking tools comparison', author: 'Mika Lendon', date: 'Feb 14, 2022', img: 'img6.jpg' },
    { id: 7, category: 'Skills', title: 'Public speaking made easy', author: 'Jane Ray', date: 'Feb 20, 2022', img: 'img1.jpg' },
    { id: 8, category: 'Growth', title: 'Mastering mindset shifts', author: 'Tom Bright', date: 'Mar 3, 2022', img: 'img2.jpg' },
    { id: 9, category: 'Business', title: 'How to pitch investors', author: 'Emma Cold', date: 'Apr 1, 2022', img: 'img3.jpg' },
    { id: 10, category: 'Productivity', title: 'Morning habits of top CEOs', author: 'Paul June', date: 'May 11, 2022', img: 'img4.jpg' },
    { id: 11, category: 'Skills', title: 'Learn design in 10 hours', author: 'Alex Roy', date: 'Jul 1, 2022', img: 'img5.jpg' },
    { id: 12, category: 'Growth', title: 'Mindful leadership tips', author: 'Sophie Hill', date: 'Jul 20, 2022', img: 'img6.jpg' }
  ];

  const blogContainer = document.getElementById('blogContainer');
  const filterButtons = document.querySelectorAll('.filter-buttons button');
  const pageButtons = document.querySelectorAll('.page-btn');
  const navButtons = document.querySelectorAll('.nav-btn[data-nav]');
  let currentPage = 1;
  const postsPerPage = 6;
  let filteredPosts = [...posts];

  function renderPosts() {
    blogContainer.innerHTML = '';
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToShow = filteredPosts.slice(start, end);

    postsToShow.forEach(post => {
      blogContainer.innerHTML += `
        <div class="blog-card">
          <img src="assets/images/${post.img}" alt="Blog Image">
          <div class="blog-card-content">
            <small><a href="#">${post.category}</a></small>
            <h3><a href="#">${post.title}</a></h3>
            <div class="blog-author-info">
              <img src="assets/images/${post.img}" alt="${post.author}">
              <div class="blog-details">
                <span class="name">${post.author}</span>
                <span class="date">${post.date}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    updateActivePagination();
  }

  function updateActivePagination() {
    pageButtons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.page) === currentPage);
    });
  }

  pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page);
      renderPosts();
    });
  });

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.nav;
      const maxPage = Math.ceil(filteredPosts.length / postsPerPage);
      if (type === 'prev' && currentPage > 1) {
        currentPage--;
      } else if (type === 'next' && currentPage < maxPage) {
        currentPage++;
      }
      renderPosts();
    });
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      filteredPosts = category === 'all' ? [...posts] : posts.filter(post => post.category === category);
      currentPage = 1;
      renderPosts();
    });
  });

  renderPosts();







  
    const avatars = document.querySelectorAll(".avatar");
    avatars.forEach((avatar) => {
      const name = avatar.getAttribute("data-name") || '';
      const initials = name
        .split(" ")
        .map(part => part[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
      avatar.textContent = initials;
    });
  
  
  
  
 });