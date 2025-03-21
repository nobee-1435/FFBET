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

let matchApplied_Succes_Notification_Bar = document.getElementById('matchApplied-succes-notification-bar');
let matchAppliedorcanceledValue = document.getElementById('matchAppliedorcanceledValue');
let notificationValue = matchAppliedorcanceledValue.textContent
if(notificationValue.includes("Already")){
    matchApplied_Succes_Notification_Bar.style.backgroundColor = "red";
}
if(matchApplied_Succes_Notification_Bar.style.display = 'block'){
    setTimeout(() => {
        matchApplied_Succes_Notification_Bar.style.display = 'none';
    }, 10000);
}

//prize detials container show functions
document.addEventListener('click', (event) => {
    // Check if the clicked element is a button inside a match container
    if (event.target.closest('.arrowbtnContainer')) {
      const button = event.target.closest('.arrowbtnContainer');
      const container = button.closest('.firstPrizeandPriceArrowContainer').querySelector('.prizeContainer');
      const arrow = button.querySelector('.arrow');

      if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block';
        arrow.textContent = '▲'; // Change to up arrow
      } else {
        container.style.display = 'none';
        arrow.textContent = '▼'; // Change to down arrow
      }
    }
  });
