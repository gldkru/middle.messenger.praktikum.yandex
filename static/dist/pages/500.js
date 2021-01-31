import { templator } from "../modules/Templator.js";
import ErrorPage from "../components/ErrorPage/index.js";
const page = new ErrorPage({
    code: 500,
    text: "Мы уже фиксим"
});
templator.render(page.getContent(), "#app");
//# sourceMappingURL=500.js.map