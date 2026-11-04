---
title: jinja2_script — Python helpers inside Jinja2 templates
date: 2026-11-04
summary: A Jinja2 extension that lets you define Python functions inside a template, the way ERB lets you embed Ruby.
tags: [python, jinja2, template, open-source]
kind: personal
draft: false
---

[jinja2_script](https://github.com/jinrudals/jinja2_script) is a Jinja2 extension that adds a `{% script %}` block. You define named Python helpers inside the template itself and reuse them through ordinary Jinja imports. It is not on PyPI yet, but I plan to publish it.

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

Helpers can live in their own file and be imported like any other Jinja template:

```jinja2
{% from "scripts/pricing.jinja" import pricing %}
{{ pricing.total(items) }}
```

## Why I built it

When I was choosing the main language with the team lead at SemiFive, we had two options: Ruby and Python. I leaned toward Python because every new member knows it.

The lead brought up ERB. With ERB you can embed functions and helpers in the template itself. With Jinja2 you need a separate Python file for that. That gap was the reason I made this extension, so that Python and Jinja2 could do the same thing.

## How it works

- Each script declares one public name and runs when the template reaches it, in order, like ERB. A skipped branch does not execute its script.
- Scripts produce no output. You render a result with `{{ name.value }}`.
- Scripts can read render inputs and local variables such as macro arguments and loop metadata.
- Each import and include creates fresh script state, so renders do not share mutable namespaces.
- Errors such as invalid Python or duplicate names fail at compile time, with the template name and line.

Script blocks run arbitrary Python, so they are for trusted templates only. They are not a sandbox.

## Links

- Repository: [jinrudals/jinja2_script](https://github.com/jinrudals/jinja2_script)
