# nodejs git json

Nodejs-git-json is a JSR module library that can output json from git repository.

* Jsr node-git-json v0.1.1

#### NPM package
NPM package that based on native nodegit v0.28.0-alpha.22
https://www.npmjs.com/package/nodejs-git-json 

* Npm node-git-json v1.14.0

# Prerequisites

[NodeJS](https://nodejs.org/en/about/previous-releases) >= v18.6.0

## Installation

```shell

# yarn
$ yarn dlx jsr add @tomatkungen/nodejs-git-json

# Import in ESM
import * as mod from "@tomatkungen/nodejs-git-json";

```

## Commands

```typescript
    // Alias
    git_log_short(path: string = './', config: Config = CONFIG): Promise<GitLogsShort>  // Fast

    // @path string - Relative or absolute path for folder where git repository exist

    // @config Object - Config for std out in console
        // @stdOut boolean - Output print to the terminal or command prompt the data
        // @stdPrgOut boolean - Output print to the terminal or command prompt the progress
```

## Usage

```typescript

import {
    git_log_short,  // Fast
} from "@tomatkungen/nodejs-git-json";

(async () => {
    const log_short = await git_log_short('./my-path/git/git-nodejs-git-json/');

    // log json object equal to "git log --shortstat"
    console.log(log_short);

})()
```

### Types

#### GitLogsShort

```typescript
GitLogsShort = [
    {
        // Commit unique ID sha-1
        sha: string;
        // Commit date as ISO
        date: string;
        // Commit message
        message: string;
        // Commit signature author name
        authorName: string;
        // Commit signature author email
        authorEmail: string;
        // Commit committer name
        commiterName: string;
        // Commit commiter email
        commiterEmail: string;
        // Commit total number of insertions
    }
    ...
]
```