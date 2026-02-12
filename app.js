/* ---------------------------------------------------------
   1. DOM Element Selections
   Storing references to HTML elements to use them later.
--------------------------------------------------------- */
const MainContainer    = document.getElementById("MainContainer");
const CardList         = document.querySelector(".CardList");
const NewCardBtn       = document.querySelectorAll(".AddNewCard");
const ListHeading      = document.getElementsByClassName("ListHeading");
const ListHeadingText  = document.querySelectorAll(".ListHeadingText");

// Global variables to track the temporary input and newly created cards
let TempInput;
let NewCard;

/* ---------------------------------------------------------
   2. Function: InputDisable
   Hides and disables the text input once the user 
   presses "Enter" to finish their entry.
--------------------------------------------------------- */
function InputDisable(Event) {
    if (Event.key == "Enter") {
        TempInput.disabled = true; // Prevents further typing
        TempInput.style.display = "none"; // Removes it from view
    }
}

/* ---------------------------------------------------------
   3. Function: tempInp4CardL
   Main logic for adding a new card:
   - Creates a temporary input field for typing the name.
   - On "Enter", converts that text into a permanent <li> card.
   - Attaches a click event to the new card to make it editable.
--------------------------------------------------------- */
function tempInp4CardL() {
    // Step A: Create and show the input field
    TempInput = document.createElement("input");
    CardList.appendChild(TempInput);
    TempInput.focus();

    // Step B: Listen for the "Enter" key to save the card
    TempInput.addEventListener("keydown", function(Event) {
        if (Event.key === "Enter") {
            if (TempInput.value) {
                // Create the permanent List Item (Card)
                NewCard = document.createElement("li");
                NewCard.textContent = TempInput.value;
                NewCard.className = "Cards";
                CardList.appendChild(NewCard);

                // Add functionality to edit the card content later by clicking it
                NewCard.addEventListener("click", () => {
                    NewCard.setAttribute("contenteditable", "true");
                    NewCard.focus();
                });
            }
            // Hide the input field regardless of whether text was entered
            InputDisable(Event);
        }
    });
}

/* ---------------------------------------------------------
   4. Initial Event Listeners
   Sets up the click actions for buttons and headings 
   that exist when the page first loads.
--------------------------------------------------------- */

// Loop through all "Add" buttons to trigger the card creation input
for (const element of NewCardBtn) {
    element.addEventListener("click", () => {
        tempInp4CardL();
    });
}

// Loop through all list titles to make them editable on click
for (const element of ListHeadingText) {
    element.addEventListener("click", () => {
        element.setAttribute("contenteditable", "true");
        element.focus();
    });
}
