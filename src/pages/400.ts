import { templator } from "../modules/Templator.js";
import ErrorPage from "../components/ErrorPage/index.js";

const page = new ErrorPage({
  code: 400,
  text: "Плохой запрос"
});

templator.render(page.getContent(), "#app");
