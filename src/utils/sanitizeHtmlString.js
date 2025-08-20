import sanitizeHtml from "sanitize-html";

export const sanitizeHTMLServer = (
  htmlString,
  allowedTags = [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "b", "i", "strong", "em", "a",
    "ul", "ol", "li", "br", "span",
  ],
  allowedAttributes = {
    a: ["href", "target", "rel"],
    "*": ["class"],
  }
) => {
  if (!htmlString || typeof htmlString !== "string") return "";

  return sanitizeHtml(htmlString, {
    allowedTags,
    allowedAttributes,
    disallowedTagsMode: "discard",
    allowProtocolRelative: false,
    enforceHtmlBoundary: true,
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
};
