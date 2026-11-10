---
title: Builder 직접 수정하기 — 필드 하나 추가해 보기
date: 2026-11-10
summary: HelloWorldBuilder에 옵션 하나를 추가하면서, Java 코드·config.jelly·config.properties가 어떻게 함께 바뀌는지 직접 확인합니다.
tags: [jenkins, plugin, builder, jelly]
series: jenkins
part: core
order: 5
draft: false
---

[지난 글](/study/jenkins-plugin-builder)에서 코드를 읽었으니, 이번에는 직접 고쳐 봅니다. 목표는 인사말을 **대문자로 출력하는 옵션(`shout`)** 을 추가하는 것입니다. 작은 변경이지만 폼 바인딩의 전 과정을 한 번씩 거칩니다.

## 변경할 곳 세 군데

| 파일 | 할 일 |
| --- | --- |
| `HelloWorldBuilder.java` | 필드, getter, `@DataBoundSetter`, `perform` 수정 |
| `config.jelly` | 체크박스 항목 추가 |
| `config.properties` | 화면에 표시할 문자열 추가 |

옵션이므로 **setter 방식**(`@DataBoundSetter`)을 씁니다. 필수 값이 아니라서 생성자는 건드리지 않습니다.

## 1. Java 코드

```java
private boolean shout;

public boolean isShout() {
    return shout;
}

@DataBoundSetter
public void setShout(boolean shout) {
    this.shout = shout;
}
```

`perform`에서 값을 사용합니다.

```java
String message = (useFrench ? "Bonjour, " : "Hello, ") + name + "!";
listener.getLogger().println(shout ? message.toUpperCase() : message);
```

getter 이름은 `isShout`입니다. `boolean`의 getter는 `is`로 시작하는 것이 관례이고, 지난 글의 `isUseFrench`와 같은 패턴입니다.

## 2. config.jelly

`name` 항목 아래에 추가합니다.

```xml
<f:entry title="${%Shout}" field="shout">
    <f:checkbox />
</f:entry>
```

`field="shout"`이 Java의 `shout`(`isShout()` / `setShout()`)과 이어집니다. 이름이 어긋나면 값이 저장되지 않거나 화면에 반영되지 않으니, 철자를 맞추는 것이 가장 중요합니다.

## 3. config.properties

```properties
Shout=Shout
```

`${%Shout}`가 이 값을 찾아 표시합니다. 번역 파일(`config_ko.properties` 등)을 두면 언어별로 바꿀 수 있습니다.

## 실행해서 확인

Java 코드를 바꿨으므로 `hpi:run`을 **재시작**합니다.

```bash
# 실행 중이면 Ctrl-C로 종료한 뒤
mvn hpi:run
```

1. 지난 글에서 만든 Freestyle 프로젝트를 열고 **구성**으로 들어갑니다.
2. "Say hello world" 단계에 **Shout** 체크박스가 보이는지 확인합니다.
3. 체크하고 저장한 뒤 빌드하면 Console Output이 대문자로 나옵니다.

```text
HELLO, JENKINS!
```

체크를 해제하고 다시 빌드하면 원래대로 `Hello, Jenkins!`가 나옵니다. 저장 후 구성 화면을 다시 열어 체크 상태가 유지되는지도 확인해 보세요. 이것이 getter(`isShout`)가 값을 화면에 되돌려 주는 부분입니다.

## 기존 데이터는 어떻게 될까

`work/` 디렉터리에는 이전에 저장한 잡 설정이 남아 있습니다. 이 설정에는 `shout` 값이 없지만, 필드 기본값이 `false`이므로 **그대로 로드되고 기존 동작도 변하지 않습니다.** 기존 사용자가 있는 플러그인에 필드를 추가할 때, 기본값을 안전하게 두는 것이 호환성의 첫걸음입니다.

## 정리

- 옵션 필드는 **필드 + getter + `@DataBoundSetter`** 세트로 추가한다
- 화면은 `config.jelly`의 `field` 이름이 Java와 일치해야 연결된다
- 표시 문자열은 `config.properties`에 두고 `${%키}`로 참조한다
- 필드를 추가해도 기본값이 안전하면 기존 설정은 그대로 동작한다

다음 글에서는 입력 검증을 더 깊이 다룹니다. `doCheck…`가 어떻게 호출되고, 선택 목록은 `doFill…`로 어떻게 채우는지 살펴봅니다.
