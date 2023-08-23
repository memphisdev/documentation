const git_token = process.env.REPO_TOKEN

import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: git_token
  })

let req = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'memphisdev',
    repo: 'memphis.py',
    path: 'README.md',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
})

let quick_start = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'memphisdev',
    repo: 'documentation',
    branch: 'github_api_test',
    path: 'docs/sdk/client-libraries/python/quick-start.md',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
})

const quick_start_sha = quick_start.data.sha;

const readme_content = atob(req.data.content)
const readme_h3_to_h2 = readme_content.replace(/###/g, '##')
const commit_string = `---
title: Python Quickstart
description: A quickstart on how to use the Python client library
---`+ '\n' + readme_h3_to_h2 

await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'memphisdev',
    repo: 'documentation',
    path: 'docs/sdk/client-libraries/python/quick-start.md',
    message: 'Updating Python SDK Quick-Start from python github action',
    committer: {
      name: 'Automated Workflow',
      email: 'john@memphis.dev'
    },
    content: btoa(commit_string),
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    sha: quick_start_sha
})