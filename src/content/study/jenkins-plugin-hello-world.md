---
title: 개발 환경 세팅과 Hello World 플러그인
date: 2026-11-10
summary: JDK와 Maven을 준비하고 아키타입으로 플러그인 프로젝트를 만든 뒤, mvn hpi:run으로 개발용 Jenkins에서 직접 실행해 봅니다.
tags: [jenkins, plugin, maven, java]
series: jenkins
part: basics
order: 2
draft: false
---

<script>
  import Refs from '$lib/Refs.svelte';
  const tutorial = [
    { title: '튜토리얼 1: 개발 환경 준비', url: 'https://www.jenkins.io/doc/developer/tutorial/prepare/' },
    { title: '튜토리얼 2: 플러그인 생성', url: 'https://www.jenkins.io/doc/developer/tutorial/create/' },
    { title: '튜토리얼 3: 빌드와 실행', url: 'https://www.jenkins.io/doc/developer/tutorial/run/' }
  ];
  const jdk = [
    { title: 'Jenkins Java 지원 정책', url: 'https://www.jenkins.io/doc/book/platform-information/support-policy-java/' },
    { title: 'Eclipse Temurin (JDK 다운로드)', url: 'https://adoptium.net/' }
  ];
  const maven = [
    { title: 'Apache Maven 다운로드', url: 'https://maven.apache.org/download.cgi' },
    { title: '튜토리얼 1: Maven 설치와 설정', url: 'https://www.jenkins.io/doc/developer/tutorial/prepare/' }
  ];
  const archetype = [
    { title: '튜토리얼 2: 플러그인 생성', url: 'https://www.jenkins.io/doc/developer/tutorial/create/' },
    { title: '아키타입 전체 버전 목록 (Maven Central)', url: 'https://repo.maven.apache.org/maven2/io/jenkins/archetypes/archetypes-parent/' }
  ];
  const hpi = [
    { title: '튜토리얼 3: 빌드와 실행', url: 'https://www.jenkins.io/doc/developer/tutorial/run/' },
    { title: 'Maven HPI Plugin 문서', url: 'https://jenkinsci.github.io/maven-hpi-plugin/' }
  ];
  const parentPom = [
    { title: 'plugin-pom (부모 POM) 저장소', url: 'https://github.com/jenkinsci/plugin-pom' },
    { title: 'Jenkins 문서: Plugin Build Process', url: 'https://www.jenkins.io/doc/developer/plugin-development/build-process/' }
  ];
</script>

[이전 글](/study/jenkins-plugin-overview)에서 본 구조를 이번에는 직접 만들어 봅니다. 목표는 프로젝트를 생성하고, 개발용 Jenkins를 띄워 내 플러그인이 로드된 것을 확인하는 것입니다.

## 준비물

- <Refs label="JDK" links={jdk} />: **Java 21**을 권장합니다. 현재 Jenkins가 지원하는 Java는 21과 25이고, Java 17은 더 이상 지원되지 않습니다. 공식 튜토리얼도 21을 기준으로 합니다.
- <Refs label="Maven" links={maven} />: 3.9.6 이상. 오래된 버전에서는 `Unknown packaging: hpi` 오류가 날 수 있습니다.
- IDE: IntelliJ IDEA 등 Maven 프로젝트를 열 수 있는 것이면 충분합니다. IntelliJ는 프로젝트를 열기만 해도 동작합니다.

```bash
java -version   # 21 이상
mvn -version    # Maven 3.9.6 이상, 사용 중인 Java가 21인지도 함께 확인
```

> Java 지원 범위는 계속 바뀝니다. 시작하기 전에 <Refs label="Jenkins Java 지원 정책" links={jdk} />을 확인하세요.

### Maven 설정

Jenkins 플러그인용 Maven 저장소와 플러그인 그룹을 `~/.m2/settings.xml`에 등록해 둡니다. <Refs label="공식 튜토리얼" links={tutorial} />이 안내하는 설정입니다.

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                              http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <pluginGroups>
    <pluginGroup>org.jenkins-ci.tools</pluginGroup>
  </pluginGroups>
  <profiles>
    <profile>
      <id>jenkins</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <repositories>
        <repository>
          <id>repo.jenkins-ci.org</id>
          <url>https://repo.jenkins-ci.org/public/</url>
        </repository>
      </repositories>
      <pluginRepositories>
        <pluginRepository>
          <id>repo.jenkins-ci.org</id>
          <url>https://repo.jenkins-ci.org/public/</url>
        </pluginRepository>
      </pluginRepositories>
    </profile>
  </profiles>
</settings>
```

## 프로젝트 생성

Jenkins가 제공하는 Maven <Refs label="아키타입" links={archetype} />으로 뼈대를 만듭니다.

```bash
mvn -U archetype:generate -Dfilter=io.jenkins.archetypes:
```

목록에서 `hello-world-plugin`(빌드 단계 예제가 들어 있는 아키타입)을 고르고, **가장 최신 버전**을 선택합니다. 이어서 값을 입력합니다.

| 항목 | 값 |
| --- | --- |
| `groupId` | 아키타입이 제안하는 값 사용 (발행할 때만 의미가 큽니다) |
| `artifactId` | `demo` |
| `version` | 기본값 `1.0-SNAPSHOT` |

`artifactId`는 첫 릴리스 이후 바꿀 수 없고, `jenkins`나 `plugin` 같은 단어는 넣지 않고 플러그인이 하는 일만 나타내는 이름을 씁니다. 생성된 디렉터리 이름은 관례에 맞춰 `demo-plugin`으로 바꾸고 빌드해 봅니다.

```bash
mv demo demo-plugin
cd demo-plugin
mvn verify
```

처음에는 의존성을 내려받느라 시간이 걸리고, 정적 분석(SpotBugs)과 테스트를 거쳐 `BUILD SUCCESS`가 나오면 됩니다.

## 생성된 구조

```text
demo-plugin/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/io/jenkins/plugins/sample/HelloWorldBuilder.java
    │   └── resources/
    │       ├── index.jelly
    │       └── io/jenkins/plugins/sample/HelloWorldBuilder/
    │           ├── config.jelly
    │           └── config.properties
    └── test/
```

파일 구성은 아키타입 버전에 따라 조금씩 달라질 수 있습니다. 코드를 한 줄씩 읽는 건 다음 글에서 하고, 여기서는 **뼈대만** 봅니다.

```java
public class HelloWorldBuilder extends Builder implements SimpleBuildStep { // Extension Point: Builder
    // ...

    @Extension // 이 Descriptor를 Jenkins에 등록
    public static final class DescriptorImpl extends BuildStepDescriptor<Builder> {
        // ...
    }
}
```

`@Extension`이 붙은 `DescriptorImpl`이 Jenkins에 등록되고, 그 대상(Extension Point)은 `Builder`입니다. 그래서 "빌드 단계 추가" 목록에 이 플러그인이 나타납니다.

설정 화면은 `config.jelly`가 맡는데, **클래스와 같은 패키지 경로 아래, 클래스 이름의 폴더**에 두어야 합니다. Jenkins는 이 규칙으로 `HelloWorldBuilder`에 맞는 화면을 찾습니다.

```text
src/main/java/io/jenkins/plugins/sample/HelloWorldBuilder.java
src/main/resources/io/jenkins/plugins/sample/HelloWorldBuilder/config.jelly
```

## pom.xml 핵심

```xml
<parent>
  <groupId>org.jenkins-ci.plugins</groupId>
  <artifactId>plugin</artifactId>
  <version><!-- 부모 POM 버전 --></version>
</parent>
```

<Refs label="부모 POM" links={parentPom} />이 컴파일, 어노테이션 처리(`@Extension` 색인), `.hpi` 패키징, 테스트용 Jenkins 실행까지 설정해 줍니다. 플러그인이 지원하는 **최소 코어 버전**(`jenkins.baseline` 등)과 부모 POM 버전은 아키타입이 채워 주는 값이 최신 기준이므로, 처음에는 그대로 두면 됩니다.

## 실행

```bash
mvn hpi:run
```

<Refs label="HPI 플러그인" links={hpi} />의 `hpi:run` 목표로, 플러그인이 설치된 개발용 Jenkins가 `http://localhost:8080/jenkins/`에 뜹니다. 콘솔에 `Jenkins is fully up and running`이 나오면 접속할 수 있습니다. 포트는 `-Dport=5000`처럼 바꿀 수 있습니다. `JENKINS_HOME`은 프로젝트의 `work/` 디렉터리라서, 다음 실행에도 설정과 데이터가 유지됩니다. 종료는 터미널에서 `Ctrl-C`입니다.

## 동작 확인

1. 새 Freestyle 프로젝트를 만듭니다.
2. **빌드 단계 추가**에서 "Say hello world"를 선택하고 이름을 입력합니다.
3. 저장 후 빌드를 실행하고 **Console Output**을 봅니다.

```text
Started by user anonymous
Building in workspace .../demo-plugin/work/workspace/testjob
Hello, Jenkins!
Finished: SUCCESS
```

폼에 입력한 이름이 빌드 단계 객체로 전달되는 연결은 `@DataBoundConstructor`가 맡고 있습니다.

## 자주 만나는 문제

- **Java 버전 불일치**: `mvn -version`에 표시되는 Java가 21 이상인지 먼저 확인합니다.
- **`Unknown packaging: hpi`**: Maven이 오래된 버전일 때 나옵니다. 3.9.6 이상으로 올립니다.
- **`archetype:generate`가 멈춤**: 네트워크나 저장소 설정 문제일 수 있으니 `settings.xml`을 확인합니다.
- **첫 실행이 느림**: 코어와 의존성을 내려받느라 처음에만 오래 걸립니다.

## 정리

- Java 21과 Maven 3.9.6 이상을 준비하고 `settings.xml`에 Jenkins 저장소를 등록한다
- 아키타입으로 시작하면 부모 POM이 빌드·패키징·실행을 대부분 처리해 준다
- `mvn verify`로 빌드를 검증하고, `mvn hpi:run`으로 개발용 Jenkins에서 확인한다
- Jelly 뷰는 클래스와 같은 패키지 경로에 둔다

다음 글에서는 이 Builder 코드를 한 줄씩 읽으며 `Descriptor`와 폼 바인딩을 살펴봅니다.
