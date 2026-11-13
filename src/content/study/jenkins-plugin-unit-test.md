---
title: 단위 테스트 — perform과 검증 메서드
date: 2026-11-12
summary: Jenkins를 띄우지 않고 JUnit만으로 doCheck, doFill, perform을 테스트하는 방법과, 단위 테스트로는 확인할 수 없는 것의 경계를 정리합니다.
tags: [jenkins, plugin, test, junit]
series: jenkins
part: core
order: 7
draft: false
---

<script>
  import Refs from '$lib/Refs.svelte';
  const testing = [
    { title: 'Jenkins 문서: Plugin testing', url: 'https://www.jenkins.io/doc/developer/testing/' },
    { title: 'Jenkins 문서: Writing unit tests', url: 'https://www.jenkins.io/doc/developer/testing/writing-unit-tests/' }
  ];
  const junit = [
    { title: 'JUnit 5 User Guide', url: 'https://junit.org/junit5/docs/current/user-guide/' }
  ];
</script>

[지난 글](/study/jenkins-plugin-validation)에서 만든 `doCheckName`, `doFillStyleItems`와 [그 전 글](/study/jenkins-plugin-modify-builder)에서 고친 `perform`을 이번에는 **테스트**합니다. Jenkins를 띄우지 않고 일반 JUnit만 쓰기 때문에 몇 초 안에 끝납니다.

## 단위 테스트로 확인할 수 있는 것

`DescriptorImpl`의 검증 메서드와 `perform`은 사실 **평범한 Java 메서드**입니다. 웹 요청이나 Jenkins 인스턴스가 없어도 `new`로 만들어 호출할 수 있습니다.

| 단위 테스트로 확인 | 단위 테스트로 확인할 수 없음 (다음 글) |
| --- | --- |
| `doCheckName`이 입력별로 error/warning/ok를 돌려주는가 | 이름 규칙대로 `config.jelly`에 연결되는가 |
| `doFillStyleItems`가 올바른 목록을 만드는가 | 폼 제출 → `@DataBoundConstructor` 바인딩 |
| `perform`이 기대한 문장을 출력하는가 | `config.xml` 저장과 복원, 실제 빌드 실행 |

오른쪽 열은 Jenkins가 있어야 확인할 수 있으며, 다음 글의 `JenkinsRule`이 담당합니다.

## 준비

아키타입이 만든 `src/test/java/.../HelloWorldBuilderTest.java`는 `@WithJenkins`를 쓰는 **JenkinsRule 기반** 테스트입니다. 이번에는 Jenkins가 필요 없으므로 같은 패키지에 새 클래스를 만듭니다.

```text
src/test/java/io/jenkins/plugins/sample/
├── HelloWorldBuilderTest.java        ← 아키타입 제공 (JenkinsRule)
└── HelloWorldBuilderUnitTest.java    ← 이번에 추가
```

아키타입 부모 POM이 JUnit 5(Jupiter)를 이미 포함하므로 `pom.xml`은 바꾸지 않아도 됩니다. 아래 테스트는 모두 `mvn test`로 실행됩니다.

```java
class HelloWorldBuilderUnitTest {

    private final HelloWorldBuilder.DescriptorImpl descriptor = new HelloWorldBuilder.DescriptorImpl();

    // 여기에 테스트 메서드를 추가
}
```

`@WithJenkins`가 **없는** 것이 핵심입니다. 이 클래스는 Jenkins를 시작하지 않습니다.

## 검증 메서드 테스트

`doCheckName`은 `FormValidation`을 돌려주고, 종류는 `kind` 필드로 읽습니다.

```java
@Test
void emptyNameIsError() throws Exception {
    assertEquals(Kind.ERROR, descriptor.doCheckName("", false).kind);
}

@Test
void shortNameIsWarning() throws Exception {
    assertEquals(Kind.WARNING, descriptor.doCheckName("Bob", false).kind);
}

@Test
void frenchNameDependsOnUseFrench() throws Exception {
    assertEquals(Kind.WARNING, descriptor.doCheckName("François", false).kind);
    assertEquals(Kind.OK, descriptor.doCheckName("François", true).kind);
}

@Test
void normalNameIsOk() throws Exception {
    assertEquals(Kind.OK, descriptor.doCheckName("Bobby", false).kind);
}
```

- `@QueryParameter`는 웹에서 값을 넣어 주는 표시일 뿐이라, 테스트에서는 **그냥 인자로 넘기면** 됩니다.
- 메시지 문장까지 비교하기보다 `kind`를 비교하는 편이 번역이나 문구 수정에 덜 깨집니다.
- 경계값(`""`, 3글자, 4글자)과 파라미터 조합(`useFrench`)을 나눠서 확인하면 규칙이 바뀔 때 어느 줄이 깨졌는지 바로 보입니다.

## 선택 목록 테스트

`doFillStyleItems`가 돌려주는 `ListBoxModel`은 `List<Option>`이라 항목마다 `name`(화면 이름)과 `value`(저장 값)를 읽을 수 있습니다.

```java
@Test
void styleItems() {
    ListBoxModel items = descriptor.doFillStyleItems();
    assertEquals(2, items.size());
    assertEquals("Plain", items.get(0).name);
    assertEquals("plain", items.get(0).value);
}
```

## perform 테스트

`perform`은 `listener.getLogger()`에 출력하므로, 로그를 **메모리 스트림에 받아서** 확인합니다.

```java
private String runPerform(HelloWorldBuilder builder) throws Exception {
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    TaskListener listener = new StreamTaskListener(out, StandardCharsets.UTF_8);
    builder.perform(null, null, null, null, listener);
    return out.toString(StandardCharsets.UTF_8);
}

@Test
void performEnglish() throws Exception {
    assertEquals("Hello, Bobby!", runPerform(new HelloWorldBuilder("Bobby")).trim());
}

@Test
void performFrenchShout() throws Exception {
    HelloWorldBuilder builder = new HelloWorldBuilder("Bobby");
    builder.setUseFrench(true);
    builder.setShout(true);
    assertEquals("BONJOUR, BOBBY!", runPerform(builder).trim());
}
```

- `StreamTaskListener`는 출력을 스트림에 쓰는 `TaskListener` 구현입니다. 콘솔에 보일 내용이 `out`에 쌓입니다.
- `run`, `workspace`, `env`, `launcher`에 **`null`을 넘겼습니다.** 지금의 `perform`은 이 값들을 쓰지 않기 때문입니다. 나중에 `run.getParent()`나 `workspace.child(...)`처럼 쓰기 시작하면 `NullPointerException`이 나는데, 그때는 mock 라이브러리(Mockito 등)를 `pom.xml`의 test 의존성으로 추가해 대역을 만들거나 다음 글의 `JenkinsRule`로 실제 빌드를 돌립니다.
- 출력 끝에 줄바꿈이 붙으므로 `trim()`으로 정리했습니다.

## 실행

```bash
mvn test -Dtest=HelloWorldBuilderUnitTest
```

```text
Tests run: 7, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

`-Dtest`로 클래스를 지정하면 JenkinsRule 테스트는 건너뛰어 훨씬 빠릅니다. IDE의 테스트 실행 버튼도 그대로 쓸 수 있습니다.

## 단위 테스트가 놓치는 것

[지난 글](/study/jenkins-plugin-validation)에서 이름 규칙은 **철자 하나만 틀려도 조용히 연결되지 않는다**고 했습니다. 예를 들어 `doCheckNmae`로 오타를 내면 이 글의 테스트는 `doCheckName`을 부르는 순간 **컴파일 오류**로 바로 알려 주지만, 처음부터 `doCheckNmae`로 쓰고 그 이름으로 테스트도 만들었다면 테스트는 통과하고 화면에서만 검증이 동작하지 않습니다. 메서드는 잘 동작하지만 **연결이 안 된 것**이기 때문입니다.

이런 문제는 Jenkins를 실제로 띄워 폼과 서버를 이어 봐야 확인됩니다. 그것이 다음 글의 주제입니다. 단위 테스트는 **규칙(로직)**, JenkinsRule은 **연결(배선)** 을 맡는다고 나눠 보면 이해하기 쉽습니다.

## 정리

- `DescriptorImpl`의 `doCheck`/`doFill`과 `perform`은 평범한 메서드라서, Jenkins 없이 `new`로 만들어 테스트할 수 있다
- `@QueryParameter` 파라미터는 테스트에서 그냥 인자로 넘기고, 결과는 `FormValidation.kind`, `ListBoxModel`의 `name`/`value`로 확인한다
- `perform`은 `StreamTaskListener(ByteArrayOutputStream)`로 출력을 받아 비교한다. 쓰지 않는 인자는 `null`로 둘 수 있다
- 단위 테스트는 빠르지만 폼 연결, 바인딩, 저장 같은 **배선**은 확인하지 못한다

더 자세한 내용은 <Refs label="Plugin testing 문서" links={testing} />와 <Refs label="JUnit 5" links={junit} />를 참고하세요.

다음 글에서는 `JenkinsRule`로 Jenkins를 띄워, 폼 라운드트립과 실제 빌드까지 통합 테스트로 확인합니다.
