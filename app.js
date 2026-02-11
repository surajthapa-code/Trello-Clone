const MainContainer = document.getElementById("MainContainer");
const ListHeading = document.getElementsByClassName("ListHeading");
const NewCardBtn = document.querySelector(".AddNewCard");
const CardList = document.querySelector(".CardList");



function tempInp4CardL (){
    let TempInput = document.createElement("input");
    CardList.appendChild(TempInput);
    TempInput.focus();

    TempInput.addEventListener("keydown", function (Event){
        if(Event.key === "Enter"){
            if(TempInput.value){
                console.log(CardList.childNodes);
                let CardData= TempInput.value;
                let li = document.createElement("li");
                li.textContent = CardData;
                CardList.appendChild(li);
                
            }
        }
                
    })

    
}

NewCardBtn.addEventListener("click", print =()=>{
        tempInp4CardL();
})
