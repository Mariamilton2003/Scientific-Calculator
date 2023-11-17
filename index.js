const disp = document.querySelector(".calculator-display");
const btns = document.querySelectorAll(".btn");

var expression ;

btns.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        disp.value += btn.textContent;
        expression += btn.value;
        console.log(expression);
    });
});
