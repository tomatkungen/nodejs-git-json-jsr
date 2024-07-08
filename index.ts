import { git_log_short } from "./src/public/git_log_short";
import { lg } from "./src/util/pr_lg";

export {
  git_log_short,
  lg
};

(() => {
  lg('nodejs-git-json');
})();