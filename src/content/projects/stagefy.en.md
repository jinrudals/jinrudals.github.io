---
title: Stagefy — Reusing Jenkins Pipeline Stages in YAML
date: 2026-11-04
summary: A Jenkins plugin that began with the wish for a Jenkins that "just runs when a file is there", like GitHub Actions and GitLab CI, and ended up in the jenkinsci organization.
tags: [jenkins, plugin, pipeline, open-source]
kind: personal
draft: false
---

[Stagefy](https://github.com/jenkinsci/stagefy-plugin) is a Jenkins plugin that lets you define pipeline **stages** in YAML and reuse them across pipelines. The plugin page is at [plugins.jenkins.io/stagefy](https://plugins.jenkins.io/stagefy/).

```groovy
// Jenkinsfile
stagefy.run('Jenkins.yml', 'build')
```

```yaml
# Jenkins.yml
build:
  steps:
    - sh: "make build"
    - sh: "make test"
```

## Why I built it

With GitHub Actions or GitLab CI/CD, a single file in the repository is all it takes for things to run. The project owners write the pipeline themselves, and the syntax is not hard.

Jenkins was different. I created the job, talked to the project lead and wrote the pipeline for them, built a webhook endpoint, and wired everything together. That repetition became too tedious.

So I tried to collapse it into a single endpoint, like GitLab System Hook. That left one problem: "How do I even split up the Jenkinsfile?" The idea I arrived at was:

- Unify the Jenkinsfile into one.
- Read only its contents dynamically.
- Then, why not read stages from other projects too?

Those questions became Stagefy.

## How I built it

The first version was a Groovy shared library, which still lives in my [Jenkins-Stagefy](https://github.com/jinrudals/Jenkins-Stagefy) repository. I worked on it for an hour or two every evening after work for over a month, and the first couple of companies I set it up for still use that version.

I later moved the stage logic into a plugin. A Jenkinsfile now only calls `stagefy.run(...)`, so no separate shared-library code needs Script Security approval. `use`, `template` and `iterated` let you pull stages from other files, stamp them out from templates, and repeat them per item.

[pipeline-as-yaml](https://plugins.jenkins.io/pipeline-as-yaml/) defines a whole pipeline in YAML. Stagefy does not replace it; it complements it by focusing on **reuse at the stage level**.

## What I learned

### Change the question and a path appears

My first question was "How do I split the Jenkinsfile?" The answers didn't come from inside that question, so I flipped it: **what if I don't split it at all, keep one Jenkinsfile, and read only its contents dynamically?**

Features grew the same way. "Could I read a stage from another project too?" became `use`, and templates and iteration followed. I didn't design it up front; it grew each time I asked "can this work too?" one more time.

### You can borrow solutions from elsewhere

I didn't look at the Jenkins problem only from inside Jenkins. I took the way GitHub Actions and GitLab CI work (one file, written by the owner) and GitLab System Hook (one endpoint), and asked what it would look like to bring them to Jenkins.

### Don't be afraid to think creatively

If I had accepted the premise that Jenkins is the tool where you create jobs and wire up webhooks, this project would not exist. I chose to try things even when they sounded odd. The hardest part was the language, Groovy, but what took the longest was **how to look at the problem differently**.

### Still, process matters

I have rarely developed as part of an organization, because I wrote things and used them myself. jenkinsci has a clear process, and it was the first time I felt that for a tool others will use, process matters as much as free-form ideas.

## Links

- Plugin: [jenkinsci/stagefy-plugin](https://github.com/jenkinsci/stagefy-plugin)
- First version (Groovy shared library): [jinrudals/Jenkins-Stagefy](https://github.com/jinrudals/Jenkins-Stagefy)
