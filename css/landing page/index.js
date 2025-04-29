const btn = document.getElementById("btn");
const navEL = document.querySelector(".collapse");

const toggle = () => {
  btn.addEventListener("click", () => {
    navEL.classList.toggle("open");
  });
};
toggle();
