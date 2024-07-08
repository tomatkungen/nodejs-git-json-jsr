import { GitCommit, GitCommits } from "../types/git_types";
import { lg } from "../util/pr_lg";
import { git_error } from "./git_error";
import { git_exec } from "./git_exec";

const DELIMITER = ',,';

export const git_commits = async (workdir: string): Promise<GitCommits> => {

    // commit hash, subject, committer date, author name, author email, committer name, committer email
    // git log --pretty=format:%H,%s,%cI,%an,%ae,%cn,%ce
    const stdout = await git_exec(workdir, ...[
        'git',
        '--no-pager',
        'log',
        '--pretty=format:%H,,%s,,%cI,,%an,,%ae,,%cn,,%ce',
    ]);

    if (stdout.includes('fatal:'))
        throw git_error(`GIT_COMMITS: ${stdout}`);

    const lines = stdout.trim().split('\n');

    // No commits in repo
    if (lines.length === 0)
        return [];

    const gitCommits: GitCommits = [];

    for (const [_index, line] of lines.entries()) {
        
        if (line.split(DELIMITER).length !== 7) {
            lg(`GIT_COMMITS: error length ${line}`);
            continue;
        }

        const {
            sha, message, date,
            authorName, authorEmail, committerName,
            committerEmail
        } = git_commit(line);

        gitCommits.push({
            sha,
            date,
            message,
            authorName,
            authorEmail,
            committerName,
            committerEmail
        })
    }

    return gitCommits;
}

const git_commit = (line: string): GitCommit => {
    const [sha, message, date, authorName, authorEmail, committerName, committerEmail] = line.split(DELIMITER)

    return {
        sha,
        message,
        date,
        authorName,
        authorEmail,
        committerName,
        committerEmail
    }
}

// const git_commit_stats = (line: string) => {
//     const gitCommitStats = line.split(',')

//     let fileChanged = 0,
//         insertion = 0,
//         deletion = 0;

//     const integer = (stat: string) => {
//         const match = stat.match(/\d+/);

//         return (
//             match && match.length ? parseInt(match[0], 10) : 0
//         )
//     }

//     for (const gitCommitStat of gitCommitStats) {
//         if (gitCommitStat.includes('deletion'))
//             deletion = integer(gitCommitStat)

//         if (gitCommitStat.includes('insertion'))
//             insertion = integer(gitCommitStat)

//         if (gitCommitStat.includes('file'))
//             fileChanged = integer(gitCommitStat)
//     }

//     return {
//         fileChanged,
//         insertion,
//         deletion
//     }
// }