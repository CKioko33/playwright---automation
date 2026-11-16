---
name: playwright-locator
description: Analyze supplied HTML and choose a reliable, accessible Playwright locator for a specified or clearly identifiable element. Use when asked to select, write, or improve a Playwright locator from HTML.
---

# Choose a Playwright locator from HTML

Inspect the supplied HTML and identify the intended element before recommending a locator. The user may name the target, describe it, or provide a snippet with one clearly identifiable target. Never guess which element they mean when the snippet contains multiple plausible targets.

## Locator selection

Choose the strongest locator supported by the actual markup, prioritizing user-facing semantics and resilience:

1. `getByRole(role, { name })` for interactive and named semantic elements such as buttons, links, headings, and checkboxes. Use the role and accessible name supported by the markup; account for native labels, `aria-label`, and `aria-labelledby` where visible. Prefer an exact name match when it avoids matching similarly named elements.
2. `getByLabel(text)` for form controls associated with a visible or accessible label.
3. `getByText(text)` for meaningful visible content when role or label is not the better fit. Prefer a scoped locator if the same text appears in multiple places.
4. `getByPlaceholder(text)` only when the placeholder is the useful identifying text and a label is absent or not the intended identifier.
5. `getByAltText(text)` or `getByTitle(text)` when the target is specifically identified by its image alternative text or title attribute.
6. `getByTestId(value)` when the user requests it, the markup provides a clear stable test ID, or user-facing semantics cannot identify the target reliably. Do not prefer test IDs over a suitable accessible locator by default.
7. `locator(css)` only when higher-priority locators are unavailable or insufficient. Prefer stable IDs, `data-*` attributes, or meaningful structural scoping; avoid generated classes, styling-only classes, and long structural chains.
8. XPath only when explicitly requested or when the markup offers no reasonable, stable alternative. Explain why it is necessary and keep the expression as short as possible.

Use the locator method that best matches the target, not a fixed preference applied without regard to the HTML. If the markup does not expose enough information to form a reliable locator, say what is missing and request the smallest additional detail needed. Do not invent labels, accessible names, test IDs, attributes, or runtime uniqueness.

## Reliability checks

- Base the recommendation only on the supplied markup and target description.
- If the target is not specified and multiple elements could be intended, ask which element to locate instead of returning several speculative answers.
- Check whether the proposed name or text could match repeated elements in the snippet. If so, scope it to a meaningful parent using a semantic locator or `filter({ has: ... })`; avoid `.first()`, `.last()`, and `nth()` unless the user identifies the element by position.
- Distinguish a locator that appears unique in the snippet from one proven unique at runtime. Do not claim runtime uniqueness without running against the page.
- If the HTML is incomplete, mention the assumption that affects the locator.
- Return a Playwright locator expression, not a raw CSS/XPath selector alone. Use the `page` fixture/object as the starting point unless the supplied context indicates another locator scope.
- Keep the answer focused: no full test, imports, or unrelated locator alternatives unless requested.

## Response format

When the target is clear, respond with:

**Target:** a short description of the matched element.

**Recommended locator:**

```js
page.getByRole('button', { name: 'Save', exact: true })
```

**Why:** one concise sentence explaining why this method fits the markup and whether any relevant ambiguity remains.

If a reliable recommendation cannot be made, ask one concise clarification question and state the ambiguity; do not use the success format with a guessed locator.
