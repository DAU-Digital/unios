// Small text helpers for display copy that has already been through keepTogether
// (glued words carry no-break spaces, so only U+0020 is a break opportunity).

// A name without its trailing parenthetical: "AIチューター（AI Tutor）" → "AIチューター".
export function shortName(name: string): string {
  return name.replace(/\s*[（(][^）)]*[）)]\s*$/, "");
}

// Breaks a label into lines of at most `max` characters, at plain spaces only;
// text without one (CJK) stays on a single line.
export function wrapLabel(text: string, max: number): string[] {
  const lines: string[] = [];
  for (const word of text.split(" ")) {
    const last = lines[lines.length - 1];
    if (last !== undefined && last.length + 1 + word.length <= max) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

// Splits off the last word so it can be kept on one line with what follows it,
// e.g. a layer code chip. Unspaced (CJK) text keeps its last two characters.
export function withTail(text: string): [head: string, tail: string] {
  const at = text.lastIndexOf(" ");
  if (at >= 0) return [text.slice(0, at + 1), text.slice(at + 1)];
  const chars = Array.from(text);
  if (chars.length <= 2) return ["", text];
  return [chars.slice(0, -2).join(""), chars.slice(-2).join("")];
}
