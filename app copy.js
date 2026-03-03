document.addEventListener("DOMContentLoaded", () => {

    const mainContainer = document.getElementById("MainContainer");
    const newListBtn = document.getElementById("NewList");

    // =========================
    // ADD NEW LIST
    // =========================
    newListBtn.addEventListener("click", () => {

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter list title...";
        input.className = "listInput";

        newListBtn.innerHTML = "";
        newListBtn.appendChild(input);
        input.focus();

        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter" && input.value.trim() !== "") {
                createList(input.value.trim());
                newListBtn.innerHTML = `<span id="NewList-text">+ add another list</span>`;
            }
        });
    });

    // =========================
    // CREATE LIST
    // =========================
    function createList(title) {

        const list = document.createElement("div");
        list.className = "List";

        list.innerHTML = `
            <div class="ListHeading">
                <span class="ListHeadingText">${title}</span>
                <i class="fa-solid fa-ellipsis-vertical ellipsis"></i>
            </div>
            <div class="ListBody">
                <ul class="CardList"></ul>
                <div class="AddNewCard">
                    <span>+ Add a Card</span>
                </div>
            </div>
        `;

        mainContainer.insertBefore(list, newListBtn);

        setupAddCard(list);
        setupMenu(list);
    }

    // =========================
    // ADD CARD FUNCTIONALITY
    // =========================
    function setupAddCard(list) {

    const addCardBtn = list.querySelector(".AddNewCard");
    const ul = list.querySelector(".CardList");

    addCardBtn.addEventListener("click", () => {

        const input = document.createElement("textarea");
        input.placeholder = "Enter card title...";
        input.className = "cardInput";

        addCardBtn.innerHTML = "";
        addCardBtn.appendChild(input);
        input.focus();

        // Auto expand textarea
        input.addEventListener("input", () => {
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        });

        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.value.trim() !== "") {
                    createCard(input.value.trim(), ul);
                }
                addCardBtn.innerHTML = `<span>+ Add a Card</span>`;
            }
        });
    });
}

    // =========================
    // THREE DOT MENU
    // =========================
    function setupMenu(list) {

        const ellipsis = list.querySelector(".ellipsis");

        ellipsis.addEventListener("click", (e) => {

            // remove existing dropdown
            document.querySelectorAll(".dropdown").forEach(d => d.remove());

            const dropdown = document.createElement("div");
            dropdown.className = "dropdown";

            dropdown.innerHTML = `
                <div class="editList">Edit</div>
                <div class="deleteList">Delete</div>
            `;

            ellipsis.parentElement.appendChild(dropdown);

            // DELETE LIST
            dropdown.querySelector(".deleteList").addEventListener("click", () => {
                list.remove();
            });

            // EDIT LIST
            dropdown.querySelector(".editList").addEventListener("click", () => {
                enableEditHeading(list);
                dropdown.remove();
            });

            e.stopPropagation();
        });

        document.addEventListener("click", () => {
            document.querySelectorAll(".dropdown").forEach(d => d.remove());
        });
    }

    // =========================
    // EDIT HEADING
    // =========================
    function enableEditHeading(list) {

        const headingDiv = list.querySelector(".ListHeading");
        const headingText = list.querySelector(".ListHeadingText");

        const currentText = headingText.innerText;

        headingDiv.innerHTML = `
            <input type="text" class="editHeadingInput" value="${currentText}">
            <button class="doneBtn">Done</button>
        `;

        const input = headingDiv.querySelector(".editHeadingInput");
        const doneBtn = headingDiv.querySelector(".doneBtn");

        input.focus();

        function saveHeading() {
            if (input.value.trim() !== "") {
                headingDiv.innerHTML = `
                    <span class="ListHeadingText">${input.value.trim()}</span>
                    <i class="fa-solid fa-ellipsis-vertical ellipsis"></i>
                `;
                setupMenu(list);
            }
        }

        doneBtn.addEventListener("click", saveHeading);

        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                saveHeading();
            }
        });
    }

});

function createCard(text, ul) {

    const li = document.createElement("li");
    li.className = "card";

    li.innerHTML = `
        <div class="cardContent">
            <span class="cardText">${text}</span>
            <i class="fa-solid fa-ellipsis-vertical cardMenuIcon"></i>
        </div>
    `;

    ul.appendChild(li);

    const menuIcon = li.querySelector(".cardMenuIcon");

    // THREE DOT MENU
    menuIcon.addEventListener("click", (e) => {

        document.querySelectorAll(".cardDropdown").forEach(d => d.remove());

        const dropdown = document.createElement("div");
        dropdown.className = "cardDropdown";

        dropdown.innerHTML = `
            <div class="editCard">Edit</div>
            <div class="deleteCard">Delete</div>
        `;

        li.appendChild(dropdown);

        // DELETE
        dropdown.querySelector(".deleteCard").addEventListener("click", () => {
            li.remove();
        });

        // EDIT
        dropdown.querySelector(".editCard").addEventListener("click", () => {
            enableCardEdit(li);
            dropdown.remove();
        });

        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".cardDropdown").forEach(d => d.remove());
    });
}

function enableCardEdit(li) {

    const oldText = li.querySelector(".cardText").innerText;

    li.innerHTML = `
        <textarea class="editCardInput">${oldText}</textarea>
        <button class="doneEditCard">Done</button>
    `;

    const textarea = li.querySelector(".editCardInput");
    const doneBtn = li.querySelector(".doneEditCard");

    textarea.focus();

    // Auto expand
    textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    });

    function saveCard() {
        if (textarea.value.trim() !== "") {
            li.innerHTML = "";
            createCard(textarea.value.trim(), li.parentElement);
            li.remove();
        }
    }

    doneBtn.addEventListener("click", saveCard);

    textarea.addEventListener("keypress", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            saveCard();
        }
    });
}