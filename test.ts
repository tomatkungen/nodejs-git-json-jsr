import { git_log_short, lg } from "./index"

(async () => {
    const res = await git_log_short('./', { stdOut: true })

     lg(res);
})()