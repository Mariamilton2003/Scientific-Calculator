const disp = document.querySelector(".calculator-display");
const btns = document.querySelectorAll(".btn");

var expression ;

btns.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        if(btn.textContent === "DEL" || btn.textContent === "=") return
        disp.value += btn.textContent;
        expression += btn.value;
        console.log(expression);
    });
});

const DeleteFn = () => {
    console.log("delting...");
    disp.value = (disp.value).toString().slice(0,-1);
}

const evaluateFn = () => {
    const sinTest = /\b(?:sin)([\s+][?=[0-9]{1,5})/gm;
    expression = "sin 90".replace(/\b(?:sin)([\s+][?=[0-9]{1,5})/gm,(match,n1,n2)=>{
        console.log(match);
        console.log(n1);
        console.log(n2);
    })
    disp.value = eval(disp.value)
}