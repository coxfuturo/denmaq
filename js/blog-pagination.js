document.addEventListener("DOMContentLoaded", function () {

    const blogGrid = document.getElementById("blogGrid");
    const pagination = document.getElementById("blogPagination");

    if (!blogGrid || !pagination) {
        return;
    }

    // Number of blogs shown on each page
    const blogsPerPage = 15;

    // Get all blog columns
    const blogs = Array.from(
        blogGrid.querySelectorAll(":scope > [class*='col-']")
    );

    let currentPage = 1;

    const totalBlogs = blogs.length;
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);


    function showPage(page) {

        currentPage = page;

        const start = (page - 1) * blogsPerPage;
        const end = start + blogsPerPage;

        blogs.forEach((blog, index) => {

            if (index >= start && index < end) {
                blog.style.display = "";
            } else {
                blog.style.display = "none";
            }

        });

        renderPagination();

        // Scroll back to blog section
        const blogSection = document.querySelector(".blog-row");

        if (blogSection && page !== 1) {
            window.scrollTo({
                top: blogSection.offsetTop - 120,
                behavior: "smooth"
            });
        }
    }


    function createButton(text, page, className = "") {

        const button = document.createElement("button");

        button.type = "button";
        button.innerHTML = text;

        if (className) {
            button.classList.add(className);
        }

        if (page === currentPage) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }

        button.addEventListener("click", function () {
            showPage(page);
        });

        return button;
    }


    function renderPagination() {

        pagination.innerHTML = "";

        if (totalPages <= 1) {
            return;
        }


        // Previous button
        const previous = document.createElement("button");

        previous.type = "button";
        previous.className = "next-btn previous-btn";
        previous.innerHTML =
            '<i class="fas fa-chevron-left"></i> Previous';

        previous.disabled = currentPage === 1;

        if (currentPage === 1) {
            previous.style.opacity = "0.5";
            previous.style.cursor = "default";
        }

        previous.addEventListener("click", function () {

            if (currentPage > 1) {
                showPage(currentPage - 1);
            }

        });

        pagination.appendChild(previous);


        // Page numbers
        const maxVisiblePages = 7;

        let pages = [];


        if (totalPages <= maxVisiblePages) {

            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

        } else {

            pages.push(1);

            if (currentPage > 4) {
                pages.push("dots");
            }

            let start = Math.max(2, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);

            if (currentPage <= 4) {
                start = 2;
                end = 5;
            }

            if (currentPage >= totalPages - 3) {
                start = totalPages - 4;
                end = totalPages - 1;
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) {
                pages.push("dots");
            }

            pages.push(totalPages);
        }


        pages.forEach(function (page) {

            if (page === "dots") {

                const dots = document.createElement("span");

                dots.className = "dots";
                dots.textContent = "...";

                pagination.appendChild(dots);

            } else {

                pagination.appendChild(
                    createButton(page, page)
                );

            }

        });


        // Next button
        const next = document.createElement("button");

        next.type = "button";
        next.className = "next-btn";
        next.innerHTML =
            'Next <i class="fas fa-chevron-right"></i>';

        next.disabled = currentPage === totalPages;

        if (currentPage === totalPages) {
            next.style.opacity = "0.5";
            next.style.cursor = "default";
        }

        next.addEventListener("click", function () {

            if (currentPage < totalPages) {
                showPage(currentPage + 1);
            }

        });

        pagination.appendChild(next);

    }


    // Initialize
    showPage(1);

});