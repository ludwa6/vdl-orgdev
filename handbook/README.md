# handbook — the Tier 2 audit trail

**These are exports, not the source.** Nita authors the Handbook in Apple Pages. The `.pages` files
are the working documents and live outside this repo, in
`00-OrgDevProject/20260810_NitaShared(final)/`.

This directory exists because `.pages` is a zip of compressed protobuf: git can store it but cannot
diff it, so a governance change would show up as *"binary file changed"* and nothing more. The
question *"what did document 05 say in June?"* had no answer before this.

## What is here

| | |
|---|---|
| `pt/` | The **definitive** Portuguese set — `.docx` exported from the `.pages`, and `.md` rendered from that `.docx` |
| `en/` | The English set — `.md` is authored, `.docx` is rendered from it |

**The Portuguese wins.** Where the two disagree, the Portuguese is the governance document and the
English is a translation of it.

## The rule

> **On every accepted revision, export and commit.** The `.pages` stays the working file; what is
> committed here is the record.

Committing only on *accepted* revisions is deliberate. This is not a backup of work in progress — it
is the answer to *"what did the Handbook say on the day that decision was taken?"*, and that answer
is only meaningful for versions the organisation actually adopted.

## How the exports are produced

```
.pages ──Pages AppleScript (export as Microsoft Word)──▶ .docx ──scripts/docx2md.py──▶ .md
```

The whole set takes about a minute. Heading levels are inferred from the run sizes Pages emits
(24pt → `#`, 18pt → `##`, 14pt → `###`), because the export carries no named heading styles. Each
paragraph is written on its own line with a blank line after it, so a changed paragraph is a
one-line diff rather than a reflowed block.

## What this is not

It is **not** a place to edit the Handbook. An edit made here would be overwritten by the next
export and would never reach the document Nita is actually working in. Changes go to the `.pages`.
