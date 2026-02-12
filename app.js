/* =========================================================
   1. DOM ELEMENT SELECTIONS & GLOBAL STATE
   References to existing HTML and variables for dynamic items.
   ========================================================= */
const MainContainer    = document.getElementById("MainContainer");
const CardList         = document.querySelector(".CardList");
const NewCardBtn       = document.querySelectorAll(".AddNewCard");
const ListHeading      = document.getElementsByClassName("ListHeading");
const ListHeadingText  = document.querySelectorAll(".ListHeadingText");

// Trackers for elements created during runtime
let TempInput;
let NewCard;
let HamBurg;
let HamOptL;
let HamOptn;

/* =========================================================
   2. UI COMPONENT FUNCTIONS
   Logic for building and styling new interface elements.
   ========================================================= */

/**
 * Creates and attaches a hamburger menu icon to the current card.
 */
function AddHamgr() {
    if (NewCard) {
        HamBurg = document.createElement("div");
        HamBurg.textContent = "|||";
        HamBurg.className = "Hamburg";
        
        // Setup layout for the card to house the text and the icon
        NewCard.appendChild(HamBurg);
        NewCard.style.display = "flex";
        NewCard.style.justifyContent = "space-between";
    }
}

/**
 * Logic to disable and hide the input field.
 */
function InputDisable(Event) {
    if (Event.key == "Enter") {
        TempInput.disabled = true; 
        TempInput.style.display = "none";
    }
}

/* =========================================================
   3. CORE FEATURE LOGIC
   The main workflow for adding and editing cards.
   ========================================================= */

/**
 * Orchestrates the creation of a temporary input and its 
 * transformation into a permanent list item.
 */
function tempInp4CardL() {
    // A. Create and focus the temporary input box
    TempInput = document.createElement("input");
    CardList.appendChild(TempInput);
    TempInput.focus();

    // B. Handle 'Blur' event: Auto-hide if the user leaves it empty
    TempInput.addEventListener("blur", function() {
        if (TempInput.value.trim() === "") {
            TempInput.style.display = "none";
        }
    });

    // C. Handle 'Enter' key: Save content and generate permanent card
    TempInput.addEventListener("keydown", function(Event) {
        if (Event.key === "Enter") {
            if (TempInput.value) {
                // Convert input value to a permanent List Item
                NewCard = document.createElement("li");
                NewCard.textContent = TempInput.value;
                NewCard.className = "Cards";
                CardList.appendChild(NewCard);

                // Add the hamburger menu to the new card
                AddHamgr();

                // Make the card editable on click
                NewCard.addEventListener("click", () => {
                    NewCard.setAttribute("contenteditable", "true");
                    NewCard.focus();
                });

                // Finish editing card on Enter
                NewCard.addEventListener("keydown", (Event) => {
                    if (Event.key === "Enter") {
                        Event.preventDefault(); // Prevents line breaks
                        NewCard.setAttribute("contenteditable", "false");
                    }
                });
            }
            // Hide the input field after processing
            InputDisable(Event);
        }
    });
}

/* =========================================================
   4. INITIALIZATION & GLOBAL LISTENERS
   Attaching events to elements that exist on page load.
   ========================================================= */

// Assign click events to all "Add Card" buttons
for (const element of NewCardBtn) {
    element.addEventListener("click", () => {
        tempInp4CardL();
    });
}

// Make existing List Headings editable
for (const element of ListHeading) {
    element.addEventListener("click", () => {
        element.setAttribute("contenteditable", "true");
        element.focus();
    });

    element.addEventListener("keydown", (Event) => {
        if (Event.key == "Enter") {
            Event.preventDefault();
            element.setAttribute("contenteditable", "false");
        }
    });
}
