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

### 질문을 바꾸면 길이 보인다

처음 질문은 "Jenkinsfile을 어떻게 나누지?"였습니다. 이 질문 안에서는 답이 잘 나오지 않았습니다. 그래서 질문을 뒤집었습니다. **나누지 말고 하나로 통일한 뒤, 안의 내용만 동적으로 읽으면 어떨까?**

기능은 이런 식으로 자랐습니다. "그러면 다른 프로젝트에 있는 stage도 읽을 수 있지 않을까?" 하는 생각이 `use`가 됐고, 거기서 템플릿과 반복이 이어졌습니다. 처음부터 설계한 것이 아니라, 한 번 더 "이것도 되지 않을까?"를 물을 때마다 늘어났습니다.

### 문제는 다른 곳에서 빌려 올 수 있다

Jenkins 문제를 Jenkins 안에서만 보지 않았습니다. 파일 하나만 두면 돌아가고 오너가 직접 쓰는 GitHub Actions와 GitLab CI의 방식, endpoint 하나로 받는 GitLab System Hook의 방식을 가져와 Jenkins에 이식해 보면 어떨까 생각했습니다.

### 창의적으로 생각하는 것을 두려워하지 않기

"원래 Jenkins는 job을 만들어 주고 webhook을 엮는 도구"라는 전제를 그대로 받아들였다면 이 프로젝트는 없었을 겁니다. 엉뚱해 보여도 일단 만들어 보는 쪽을 택했고, 퇴근 후 하루 한두 시간씩 한 달 넘게 붙잡았습니다. 가장 어려웠던 것은 Groovy라는 언어였지만, 오래 걸린 건 언어보다 **어떻게 다르게 볼까**였습니다.

### 그래도 절차는 필요하다

다만 저는 어떤 조직에 속해 개발해 본 경험이 거의 없습니다. 만든 것을 제가 썼기 때문입니다. jenkinsci에는 확실한 프로세스가 있었고, 남이 쓰는 도구가 되려면 자유로운 발상만큼 절차가 중요하다는 것을 처음 실감했습니다.

## 링크

- 플러그인: [jenkinsci/stagefy-plugin](https://github.com/jenkinsci/stagefy-plugin)
- 첫 버전(Groovy shared library): [jinrudals/Jenkins-Stagefy](https://github.com/jinrudals/Jenkins-Stagefy)
