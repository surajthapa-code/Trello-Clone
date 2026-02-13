const NewCardBtn = document.querySelectorAll(".AddNewCard");
const MainContainer = document.querySelectorAll(".MainContainer");


for (const element of NewCardBtn) {
    element.addEventListener("click",function (){
        let TempInput = document.createElement("input");
        TempInput.className = "TempInput";
        console.log(element.previousElementSibling);
        let Cardlist = element.previousElementSibling;
        element.appendChild(TempInput);
        TempInput.focus();

        //till here if user clicks on new btn a temp input field display's and takes user input
        //+++++++++++NOW+++++++++

        TempInput.addEventListener("keydown",(Event)=>{
            if(Event.key === "Enter")
                {if(TempInput.value.trim() === ""){
                    TempInput.disabled = true;
                    TempInput.style.display = "none";
                }else{
                    let Card = document.createElement("li");
                    Card.textContent = TempInput.value;
                    Card.className = "Card";
                    Cardlist.appendChild(Card);
                }
                
            }
        })

        TempInput.addEventListener("blur",function(){
            
            TempInput.disabled = true;
            TempInput.style.display = "none";
        })
        //now the input value will saved as Card and displayed and input will disappear if ignored
                //+++++++++NOW++++++++++++++
                
        })
        
}