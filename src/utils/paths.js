export function tagToPath(tag) {
  return `/tags/${tag}`;
}

export function skipIndexTag(tag) {
  return tag.fieldValue.toString() !== "index";
}
