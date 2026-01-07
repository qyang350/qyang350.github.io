const buttons = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        buttons.forEach(b => b.classList.remove("active"));

        // Remove active class from all content
        contents.forEach(c => c.classList.remove("active"));

        // Activate the clicked button
        btn.classList.add("active");

        // Show the matching content
        const target = btn.dataset.target;
        document.querySelector(`.${target}`).classList.add("active");
    });
});
