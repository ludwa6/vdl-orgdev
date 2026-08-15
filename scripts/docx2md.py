#!/usr/bin/env python3
"""docx -> markdown, for the handbook audit trail.

The Portuguese source is .pages, which git cannot diff. Pages exports .docx,
and this renders that to markdown so a governance change shows up as a
readable diff rather than a changed binary.

Heading level is inferred from the run size Pages emits, since the export
carries no named heading styles:
    24pt  -> #      18pt -> ##      14pt -> ###      else body
"""
import sys, re, docx
from docx.oxml.ns import qn

H1, H2, H3 = 304800, 228600, 177800     # EMU


def is_bullet(p):
    pPr = p._p.pPr
    return pPr is not None and pPr.find(qn('w:numPr')) is not None


def convert(path):
    d = docx.Document(path)
    out, blank = [], False
    for p in d.paragraphs:
        text = p.text.strip()
        if not text:
            if not blank and out:
                out.append(""); blank = True
            continue
        blank = False
        run = p.runs[0] if p.runs else None
        size = run.font.size if run else None
        bold = bool(run.bold) if run else False

        if is_bullet(p):
            out.append(f"- {text}")          # list items stay adjacent
        elif size == H1:
            out += ([""] if out else []) + [f"# {text}", ""]
        elif size == H2:
            out += ([""] if out else []) + [f"## {text}", ""]
        elif size == H3:
            out += ([""] if out else []) + [f"### {text}", ""]
        elif bold:
            out += [f"**{text}**", ""]
        else:
            out += [text, ""]      # blank line after every paragraph: markdown
                                   # needs it, and it makes each paragraph its
                                   # own diff hunk

    md = "\n".join(out)
    md = re.sub(r"\n{3,}", "\n\n", md).strip() + "\n"
    return md


if __name__ == '__main__':
    sys.stdout.write(convert(sys.argv[1]))
