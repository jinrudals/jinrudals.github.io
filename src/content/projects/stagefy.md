---
title: Stagefy — YAML로 Jenkins 파이프라인 스테이지 재사용하기
date: 2026-11-04
summary: GitHub Actions, GitLab CI처럼 "파일만 있으면 돌아가는" Jenkins를 만들고 싶어서 시작해 jenkinsci 조직에 들어간 플러그인.
tags: [jenkins, plugin, pipeline, open-source]
kind: personal
draft: false
---

[Stagefy](https://github.com/jenkinsci/stagefy-plugin)는 파이프라인 **스테이지**를 YAML로 정의하고 여러 파이프라인에서 재사용하게 해 주는 Jenkins 플러그인입니다. 플러그인 페이지는 [plugins.jenkins.io/stagefy](https://plugins.jenkins.io/stagefy/)에 있습니다.

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

## 왜 만들었나

GitHub Actions나 GitLab CI/CD는 특정 파일 하나만 두면 알아서 돌아갑니다. 그래서 파이프라인은 프로젝트 오너가 직접 작성하고, 문법도 어렵지 않습니다.

Jenkins는 달랐습니다. 제가 job을 만들고, 프로젝트 리더와 소통하며 pipeline을 대신 써 주고, webhook endpoint를 만들어 서로 엮어야 했습니다. 이 반복이 너무 번거로웠습니다.

그래서 GitLab System Hook처럼 endpoint를 하나로 모으려고 했습니다. 그러자 "Jenkinsfile 자체는 어떻게 나누지?"라는 문제가 남았습니다. 거기서 나온 생각은 이랬습니다.

- Jenkinsfile은 하나로 통일한다.
- 안의 내용만 동적으로 읽는다.
- 그렇다면 다른 프로젝트에 있는 stage도 읽을 수 있지 않을까?

이 질문들이 Stagefy가 됐습니다.

## 어떻게 만들었나

첫 버전은 Groovy shared library였고, 지금도 [Jenkins-Stagefy](https://github.com/jinrudals/Jenkins-Stagefy) 저장소에 남아 있습니다. 퇴근 후 하루 한두 시간씩 한 달 넘게 고민하며 만들었고, 처음 한두 회사는 지금도 이 버전을 쓰고 있습니다.

그 뒤 stage 로직을 플러그인 안으로 옮겼습니다. 이제 Jenkinsfile은 `stagefy.run(...)`만 호출하므로, 별도의 shared library 코드에 Script Security 승인을 받을 필요가 없습니다. `use`, `template`, `iterated`로 스테이지를 다른 파일에서 가져오고, 템플릿으로 찍어내고, 항목마다 반복할 수 있습니다.

[pipeline-as-yaml](https://plugins.jenkins.io/pipeline-as-yaml/)은 파이프라인 전체를 YAML로 정의합니다. Stagefy는 그것을 대체하지 않고 **스테이지 단위의 재사용**에 집중해 보완합니다.

## 배운 것

가장 어려웠던 것은 언어(Groovy)였지만, 그보다 오래 붙잡고 있었던 고민은 이것입니다. 같은 문제를 어떻게 하면 다르게 볼 수 있을까.

그리고 jenkinsci에 들어가는 과정에서 **절차의 중요성**을 배웠습니다. 저는 어떤 조직에 속해 개발해 본 경험이 거의 없습니다. 제가 만든 것을 제가 썼기 때문입니다. jenkinsci에는 확실한 프로세스가 있었고, 그 절차가 왜 필요한지 처음으로 몸으로 느꼈습니다.

## 링크

- 플러그인: [jenkinsci/stagefy-plugin](https://github.com/jenkinsci/stagefy-plugin)
- 첫 버전(Groovy shared library): [jinrudals/Jenkins-Stagefy](https://github.com/jinrudals/Jenkins-Stagefy)
