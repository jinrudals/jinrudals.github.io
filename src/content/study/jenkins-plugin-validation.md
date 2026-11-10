---
title: 입력 검증과 선택 목록 — doCheck와 doFill
date: 2026-11-10
summary: 폼 입력을 서버에서 즉시 검증하는 doCheck 메서드와, 드롭다운 목록을 채우는 doFill 메서드가 이름 규칙만으로 어떻게 연결되는지 정리합니다.
tags: [jenkins, plugin, form, validation, descriptor]
series: jenkins
part: core
order: 6
draft: false
---

<script>
  import Refs from '$lib/Refs.svelte';
  const validation = [
    { title: 'Jenkins 문서: Form validation', url: 'https://www.jenkins.io/doc/developer/forms/form-validation/' },
    { title: 'Jenkins 문서: Securely implementing form validation', url: 'https://www.jenkins.io/doc/developer/security/form-validation/' }
  ];
  const controls = [
    { title: 'Jenkins 문서: Jelly form controls', url: 'https://www.jenkins.io/doc/developer/forms/jelly-form-controls/' }
  ];
</script>

[지난 글](/study/jenkins-plugin-modify-builder)에서 필드를 추가했으니, 이번에는 그 입력을 **검증**하고 **선택지를 채우는** 방법을 봅니다. 둘 다 `Descriptor`에 메서드를 만들고 **이름 규칙**으로 `config.jelly`의 `field`와 연결하는 방식입니다.

## doCheck: 입력 검증

```java
public FormValidation doCheckName(@QueryParameter String value) {
    if (value.isEmpty()) {
        return FormValidation.error("이름을 입력하세요");
    }
    return FormValidation.ok();
}
```

- 메서드 이름은 `doCheck` + **필드 이름의 첫 글자를 대문자로** (`name` → `doCheckName`)입니다.
- 사용자가 입력칸을 바꾸면 브라우저가 서버에 확인을 요청(AJAX)하고, 결과를 입력칸 아래에 보여 줍니다.
- 반환 타입은 `FormValidation`이며 세 종류입니다.

| 메서드 | 의미 | 화면 표시 |
| --- | --- | --- |
| `FormValidation.ok()` | 정상 | 메시지 없음 |
| `FormValidation.warning(msg)` | 경고 (저장은 가능) | 경고 메시지 |
| `FormValidation.error(msg)` | 오류 | 오류 메시지 |

`config.jelly`는 **바꿀 것이 없습니다.** `<f:entry field="name">` 안의 `<f:textbox />`가 `doCheckName`을 보고 자동으로 연결합니다.

> `value`라는 **파라미터 이름이 중요합니다.** "이 입력칸의 값"을 뜻하는 예약된 이름입니다. 다른 이름을 쓰고 싶으면 `@QueryParameter("value") String meaningfulName`처럼 지정합니다.

### 다른 필드 값도 함께 보기

검증이 다른 입력칸에 의존할 때는 파라미터를 추가합니다. 파라미터 이름이 `field` 이름과 짝이 됩니다.

```java
public FormValidation doCheckName(@QueryParameter String value, @QueryParameter boolean useFrench) {
    if (!useFrench && value.matches(".*[éáàç].*")) {
        return FormValidation.warning("프랑스어 옵션을 켜는 게 좋을 수도 있어요");
    }
    return FormValidation.ok();
}
```

[지난 글](/study/jenkins-plugin-builder)에서 본 `HelloWorldBuilder`의 `doCheckName`이 바로 이런 형태입니다. 여러 파라미터를 받으면 **그중 하나라도 바뀔 때** 검증이 다시 실행됩니다.

### 프로젝트 같은 문맥 정보 쓰기

검증 중에 지금 편집 중인 잡이 필요하면 `@AncestorInPath`를 씁니다.

```java
public FormValidation doCheckName(@QueryParameter String value, @AncestorInPath AbstractProject project) {
    // project를 보고 판단
}
```

## doFill: 선택 목록 채우기

드롭다운은 고정 문자열이 아니라 **서버가 목록을 만들어 주는** 방식을 많이 씁니다. 필드 이름이 `style`이라면 이렇게 만듭니다.

```java
public ListBoxModel doFillStyleItems() {
    ListBoxModel items = new ListBoxModel();
    items.add("Plain", "plain");
    items.add("Shout", "shout");
    return items;
}
```

```xml
<f:entry title="${%Style}" field="style">
    <f:select />
</f:entry>
```

- 이름 규칙은 `doFill` + 필드 이름(첫 글자 대문자) + `Items`입니다.
- `items.add("화면에 보이는 이름", "저장되는 값")` 순서입니다.
- 선택한 값은 생성자나 `@DataBoundSetter`로 **문자열**로 전달됩니다.

## 이름 규칙 한눈에 보기

`field="style"`이라면 다음 메서드들이 **설정 없이** 연결됩니다.

| 메서드 | 역할 |
| --- | --- |
| `getStyle()` / `setStyle(...)` | 객체 ↔ 폼 값 |
| `doCheckStyle(...)` | 입력 검증 |
| `doFillStyleItems()` | 드롭다운 목록 |

규칙은 편하지만, **철자가 하나만 틀려도 조용히 연결되지 않습니다.** 검증이 안 나오거나 목록이 비면 먼저 `field` 이름과 메서드 이름을 비교해 보세요.

## 알아 두면 좋은 점

- `doCheck`/`doFill`은 **Descriptor의 공개 메서드**로, 웹으로 호출됩니다. 권한이 필요한 검증이라면 `hasPermission`을 확인하고, 권한이 없을 때는 `FormValidation.ok()`를 돌려주는 방식이 권장됩니다. 자세한 내용은 <Refs label="Form validation 문서" links={validation} />를 참고하세요.
- 검증은 **편의 기능**입니다. 저장 시점에 값이 안전하다는 보장은 아니니, 실행 코드(`perform`)에서도 방어적으로 다루세요.
- 버튼을 눌러 검증하는 방식(`f:validateButton`)과 더 많은 컨트롤은 <Refs label="Jelly form controls" links={controls} /> 문서에 있습니다.

## 정리

- `doCheck<Field>`는 입력 검증, `doFill<Field>Items`는 드롭다운 목록
- 연결은 **이름 규칙**으로만 이루어지고, `value`는 "이 입력칸의 값"을 뜻하는 예약 이름이다
- 다른 필드가 필요하면 `@QueryParameter`로 받고, 문맥은 `@AncestorInPath`로 받는다
- 공개 웹 메서드이므로 입력과 권한을 신뢰하지 않는다

다음 글에서는 플러그인을 **테스트**하는 방법을 봅니다. 먼저 단위 테스트로 `perform`과 검증 메서드를 확인해 봅니다.
