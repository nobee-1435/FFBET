document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".prize-form-container").forEach(function (form) {
        form.addEventListener("submit", function (event) {

            let container = form.closest(".match-details-container");
            let registeredPlayer = container.querySelector("#registered-payer").textContent;
            let possiblePlayer = container.querySelector("#posible-player").textContent;
            let entryButton = form.querySelector(".entryamount-btn");

            if (parseInt(registeredPlayer) >= parseInt(possiblePlayer)) {
                entryButton.value = "Team Full";
                entryButton.style.backgroundColor = "red"; 
                event.preventDefault(); 
            } else {
                form.submit();
            }
        });
    });
});
