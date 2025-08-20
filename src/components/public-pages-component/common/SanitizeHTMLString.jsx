"use client";

import DOMPurify from "dompurify";

const SanitizeHTMLString = ({
  containerClass = "",
  htmlString = "",
  allowedTags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "b",
    "i",
    "strong",
    "em",
    "a",
    "ul",
    "ol",
    "li",
    "br",
    "span",
  ],
  allowedAttributes = ["href", "target", "rel", "class"],
}) => {
  // Validate HTML string
  if (!htmlString || typeof htmlString !== "string") return "";

  // Sanitize the HTML string using DOMPurify
  const clean = DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
    FORBID_TAGS: [
      "script",
      "style",
      "iframe",
      "object",
      "embed",
      "form",
      "input",
      "textarea",
      "button",
      "link",
      "meta",
    ],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
    ADD_URI_SAFE_ATTRIBUTES: ["target"],
    ALLOW_UNKNOWN_PROTOCOLS: false,
    KEEP_CONTENT: false,
    USE_PROFILES: { html: true },
  });

  // Return sanitized HTML string wrapped in a container with the specified class
  return (
    <div
      className={containerClass}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
};

export default SanitizeHTMLString;

/*
  -- FORBID_TAGS: Removes extremely risky tags.

  -- FORBID_ATTR: Prevents use of inline event handlers (onclick, etc.) and style attribute (which can be used for XSS).

  -- ALLOW_UNKNOWN_PROTOCOLS: false  - Prevents things like javascript: in href.

  -- KEEP_CONTENT: false - Ensures that removed tags' content is also stripped (e.g., from <script>).

  -- Added rel to attributes: So links can be given rel="noopener noreferrer" if you wish. Ex -
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Visit Example
  </a>

  -- class allowed: Useful for Tailwind or scoped styles, while still safe.
*/
