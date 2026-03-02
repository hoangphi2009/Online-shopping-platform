import components from './components.json';
import ui from "./ui.json";
import auth from "./auth.json";

export default {
  components: {
    ...components.components,
    ...ui.components,
    ...auth.components,
  },
};
