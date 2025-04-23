import { sharedFunction } from "../shared/utils.js";

sharedFunction("Home Page");
console.log("Home page loaded");

document.querySelector("h1").addEventListener("click", () => {
  alert("Welcome home!");
});
