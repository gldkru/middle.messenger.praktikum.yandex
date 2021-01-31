import { templator } from "../modules/Templator.js";
import ErrorPage from "../components/ErrorPage/index.js";

const page = new ErrorPage({
  code: 404,
  text: "Не туда попали"
});

templator.render(page.getContent(), "#app");
