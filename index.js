// Theme btn function
const themebtns = document.querySelectorAll(".theme-icons");
const darkBtn = document.querySelector("[data-theme = dark]");
const lightBtn = document.querySelector("[data-theme = light]");
const rootEl = document.documentElement;

themebtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let theme = btn.getAttribute("data-theme");
    themeFunc(theme);
  });
});

// theme function

var themeFunc = (theme) => {
  switch (theme) {
    case "dark":
      darkBtn.style.display = "none";
      lightBtn.style.display = "flex";
      rootEl.style.setProperty("--l-grad", "#c193c5");
      rootEl.style.setProperty("--r-grad", "#7bc6cc");
      rootEl.style.setProperty("--bg-clr", "#222831");
      rootEl.style.setProperty("--bg-soft-clr", "#393e46");
      break;
    case "light":
      darkBtn.style.display = "flex";
      lightBtn.style.display = "none";
      rootEl.style.setProperty("--l-grad", "#000428");
      rootEl.style.setProperty("--r-grad", "#004e92");
      rootEl.style.setProperty("--bg-clr", "#9d9a8e");
      rootEl.style.setProperty("--bg-soft-clr", "#f6f4eb");
      break;
  }
};

const disp = document.querySelector(".calculator-display");
const btns = document.querySelectorAll(".btn");
const func = document.querySelectorAll(".btn span");

var expression = "";

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (
      func[i].innerHTML === "DEL" ||
      func[i].innerHTML === "=" ||
      func[i].innerHTML === "AC"
    )
      return;
    disp.value += btn.textContent;
    expression += btn.getAttribute("value").toLocaleLowerCase();
    console.log(expression);
  });
});

const DeleteFn = () => {
  console.log("delting...");
  disp.value = disp.value.toString().slice(0, -1);
  expression = expression.toString().slice(0, -1);
};

const clearFn = () => {
  disp.value = "";
  expression = "";
};

const evaluateFn = () => {
  const regexExpression =
    /\b(sin|cos|tan|sqrt|log)(\(\d+\))|(sin|cos|tan|sqrt|log)(?:\s*)(\d+)|(\d+)(\^)(\d+)|(π)|(e)(\d+)|()\b/gm;
  expression = expression
    .toString()
    .replace(
      regexExpression,
      (match, fun1, n1, fun2, n2, n3, fun3, n4, fun4, fun5, n5) => {
        const fun = fun1 || fun2 || fun3 || fun4 || fun5; // select the fun`s which are present in expression
        const angle = n1 || n2; // select degree / value for the selected fun`s
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
              return `Math.exp(${n5})`;
            default:
              return match;
          }
        }
        return match;
      }
    );
  try {
    let result = eval(expression);
    disp.value = result;
  } catch (error) {
    console.error("Error evaluating expression:", error);
  }
};
