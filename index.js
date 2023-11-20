const toggleTheme = () =>{
    const themeImg = document.querySelector(".img-icon");
    const themeBtn = document.querySelector(".theme-button");
    themeBtn.value = themeBtn.value == "dark" ? "light" :"dark";
    console.log(themeBtn.value);
    themeImg.src = themeBtn.value == "dark"?"./asset/icons8-sun-24.png":"./asset/icons8-crescent-moon-16.png";
    console.log(themeImg.src);
    if(themeBtn.value == "light"){
        document.querySelector(':root').style.setProperty("--clr-bg","#F6FDC3");
        document.querySelector(':root').style.setProperty("--cal-clr-bg","#1F1717");
        document.querySelector(':root').style.setProperty("--clr-shadow","#252525");
    }
    if(themeBtn.value == "dark"){
        document.querySelector(':root').style.setProperty("--clr-bg","#22092C");
        document.querySelector(':root').style.setProperty("--cal-clr-bg","#F2FFE9");
        document.querySelector(':root').style.setProperty("--clr-shadow","#F2FFE9");

    }
}

const disp = document.querySelector(".calculator-display");
const btns = document.querySelectorAll(".btn");

var expression ="";

btns.forEach((btn,i)=>{
    btn.addEventListener("click",()=>{
        if(btn.textContent === "DEL" || btn.textContent === "=" || btn.textContent === "AC") return
        disp.value += btn.textContent;
        expression += btn.getAttribute("value").toLocaleLowerCase();
        console.log(expression);
    });
});

const DeleteFn = () => {
    console.log("delting...");
    disp.value = (disp.value).toString().slice(0,-1);
    expression = expression.toString().slice(0,-1);
}

const clearFn = () => {
    disp.value = "";
    expression = "";
}

const evaluateFn = () => {
    const regexExpression =/\b(sin|cos|tan|sqrt|log)(\(\d+\))|(sin|cos|tan|sqrt|log)(?:\s*)(\d+)|(\d+)(\^)(\d+)|(π)|(e)(\d+)|()\b/gm;
    expression = expression.toString().replace(regexExpression, (match, fun1, n1, fun2, n2, n3, fun3, n4, fun4,fun5,n5) => {
        console.log(match + " " + fun1 + " " + n1 + " " + fun2 + " " + n2 + " " + fun3 + " " + n3+ fun4 + " " + n4+ fun5 + " " + n5);
        const fun=fun1 || fun2 || fun3 || fun4 ||fun5;
        const angle= n1 || n2;
        console.log(fun);
        if (fun) {
            switch (fun) {
                case "sin":
                    return `Math.sin(${angle})`;
                case "cos":
                    return `Math.cos(${angle})`;
                case "tan":
                    return `Math.tan(${angle})`;
                case "sqrt":
                    return `Math.sqrt(${angle})`;
                case "log":
                    return `Math.log10(${angle})`;
                case "^":
                    return `Math.pow(${n3},${n4})`;
                case "π":
                    return `Math.PI`;
                case "e":
                    return `Math.exp(${n5})`
                default:
                    return match;
            }
        }
        return match;
    });
    try {
        disp.value = eval(expression);
    } catch (error) {
        console.error("Error evaluating expression:", error);
    }
}