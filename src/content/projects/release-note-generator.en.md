---
title: Release Note Generator — Automating Release Notes for a SoC Project
date: 2026-11-06
summary: A tool built at Semifive to compare commits and files between tags and publish release notes in Confluence, including information about the impact on synthesis.
tags: [automation, python, gitlab, jira, confluence, soc]
kind: work
draft: false
---

I built this release note automation tool while working on a SoC project at Semifive. It went beyond collecting commits between tags: it also compared the actual files along the design hierarchy to describe what had changed in a release.

## Why I built it

The project leader sat to my left, and every release meant another round of tracking down changes and writing them up. One person cannot know every detail of every change across a project. Checking commits and issues one by one, then putting the findings into Confluence, was repetitive work.

So I automated the process of gathering the information needed for each release, turning it into a report, and publishing it in Confluence.

## What it compared

When a tag was created, the tool checked the commits since the previous tag. But a commit list alone did not explain how the files had actually changed or what those changes meant for the SoC design flow. It also compared files and organized the changes by their place in the hierarchy.

For example, the report included information to help determine whether memory-related changes required synthesis to be rerun, and whether resynthesis was needed at each stage of the HPDF (Hierarchical Physical Design Flow). The comparison itself was a simple diff; what mattered was showing the changed files in the context of the hierarchy.

## How it worked

I used Python to connect the GitLab, Jira, and Confluence APIs. The tool gathered commits and file changes between tags, brought in Jira information, and published the resulting report as a Confluence page.

Rather than just listing changes, the release notes gave the project leader the information needed to understand their scope and whether synthesis needed to be rerun.

## Tech stack

- **Python**: data collection and report generation
- **GitLab API**: tag and commit information
- **Jira API**: project issue information
- **Confluence API**: publishing release reports
- **File comparison**: organizing changed files by hierarchy

## Looking back

### The people using the tool know what data they need

The data available through an API was not necessarily the data needed for the job. From a developer's perspective, collecting commits and issues might seem sufficient. But the project leader needed information that answered a different question: "Do we need to rerun synthesis?"

Before deciding what to collect, I had to understand the reader's work and the decisions they needed to make. The data requirements came from the people using the report, not from what I thought should go into it.

### Beyond the change list: what happens next?

This project taught me that release notes are more than a collection of commit messages. The project leader needed to know not just what had changed, but what those changes meant for the work that followed.

That was why the report covered both commits and files, along with synthesis considerations for memory changes and the impact at each HPDF stage. I focused on automating the repetitive information gathering while giving people the context they needed to make their own decisions.
