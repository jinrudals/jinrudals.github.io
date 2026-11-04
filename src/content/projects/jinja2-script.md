---
title: jinja2_script — Jinja2 템플릿 안에서 Python 헬퍼 쓰기
date: 2026-11-04
summary: ERB가 Ruby를 템플릿에 넣을 수 있듯이, 템플릿 안에서 Python 함수를 정의할 수 있게 해 주는 Jinja2 확장.
tags: [python, jinja2, template, open-source]
kind: personal
draft: false
---

[jinja2_script](https://github.com/jinrudals/jinja2_script)는 `{% script %}` 블록을 추가하는 Jinja2 확장입니다. 템플릿 안에서 이름 있는 Python 헬퍼를 정의하고, 일반 Jinja import로 재사용할 수 있습니다. 아직 PyPI에는 없지만 배포할 계획입니다.

```jinja2
{% script pricing %}
def total(items):
    return sum(items)
{% endscript %}
Total: {{ pricing.total(items) }}
```

```python
from jinja2 import Environment
from jinja_script_block import ScriptBlockExtension

env = Environment(extensions=[ScriptBlockExtension])
```

헬퍼를 별도 파일에 두고 다른 Jinja 템플릿처럼 import할 수도 있습니다.

```jinja2
{% from "scripts/pricing.jinja" import pricing %}
{{ pricing.total(items) }}
```

## 왜 만들었나

SemiFive에서 팀 리더와 메인 언어를 정할 때 선택지는 Ruby와 Python 두 가지였습니다. 신규 입사자라면 누구나 Python을 알고 있어서 저는 Python 쪽으로 기울어 있었습니다.

그런데 리더가 ERB 이야기를 꺼냈습니다. ERB는 함수와 헬퍼를 템플릿 안에 바로 넣을 수 있는데, Jinja2는 그러려면 별도의 Python 파일이 필요합니다. 그 차이를 메우려고, Python과 Jinja2로도 같은 일을 할 수 있게 이 확장을 만들었습니다.

## 동작 방식

- 각 스크립트는 공개 이름 하나를 선언하고, 템플릿이 그 지점에 도달할 때 ERB처럼 순서대로 실행됩니다. 건너뛴 분기의 스크립트는 실행되지 않습니다.
- 스크립트는 출력을 만들지 않습니다. 결과는 `{{ name.value }}`로 렌더링합니다.
- 스크립트에서 렌더 입력값과 매크로 인자, 루프 메타데이터 같은 지역 변수를 읽을 수 있습니다.
- import와 include마다 새로운 스크립트 상태가 만들어져서, 렌더 사이에 가변 네임스페이스를 공유하지 않습니다.
- 잘못된 Python이나 이름 중복 같은 오류는 템플릿 이름과 줄 번호와 함께 컴파일 시점에 실패합니다.

스크립트 블록은 임의의 Python을 실행하므로 신뢰할 수 있는 템플릿에만 써야 합니다. 샌드박스가 아닙니다.

## 링크

- 저장소: [jinrudals/jinja2_script](https://github.com/jinrudals/jinja2_script)
