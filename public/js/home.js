document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".prize-form-container").forEach(function (form) {
        form.addEventListener("submit", function (event) {

            let container = form.closest(".match-details-container"); // G
            let registeredPlayer = container.querySelector("#registered-payer").textContent;
            let possiblePlayer = container.querySelector("#posible-player").textContent;
            let entryButton = form.querySelector(".entryamount-btn");

            if (parseInt(registeredPlayer) >= parseInt(possiblePlayer)) {
                entryButton.value = "Team Full"; // Change button text
                entryButton.style.backgroundColor = "red"; // Optional: Change color
                event.preventDefault(); // Prevent form submission initially
            } else {
                form.submit(); // Proceed to new page if slots are available
            }
        });
    });
});
