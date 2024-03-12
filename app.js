const basURL=  "https://api.exchangerate-api.com/v4/latest";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>{
   let currCode=element.value;
   let countryCode=countryList[currCode];
   let newSrcLink=`https://flagsapi.com/${countryCode}/flat/64.png`
   let img= element.parentElement.querySelector("img");
   img.src= newSrcLink;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    // console.log(fromCurr,toCurr);
    const url=`${basURL}/${fromCurr.value}`;

    let response= await fetch(url);
    let data= await response.json();
    let all= await data["rates"];
   let rate= all[toCurr.value];

   let finalAmount=amtVal * rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

})