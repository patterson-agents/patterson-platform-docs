# Templates

Each top-level directory is a blueprint: a repository (or, for `consuming-repo`, a set of
fragments) that can be copied into place and committed. `_MANIFEST.yaml` is the catalog.

## Placeholders

Every template uses `{{DOUBLE_BRACE}}` tokens. `scripts/scaffold` substitutes them.

| Placeholder | Default | Notes |
| --- | --- | --- |
| `{{ORG}}` | from `git remote get-url origin`, else prompt | The GitHub org holding every platform repository |
| `{{PLATFORM_PREFIX}}` | prompt | Prefix on every published plugin and skill name. Effectively permanent |
| `{{MARKETPLACE_NAME}}` | `{{PLATFORM_PREFIX}}` | What users type after `@`. Effectively permanent |
| `{{OWNER_NAME}}` | prompt | Team named as owner in the marketplace manifest |
| `{{OWNER_EMAIL}}` | from `git config user.email` | Contact in the manifest and CODEOWNERS |
| `{{DEPT}}` | prompt, per department | Short department slug, for example `vet` |
| `{{DEPT_DOMAIN}}` | prompt | The domain a department plugin covers, for example `pims` |
| `{{DEFAULT_BRANCH}}` | `main` | Used in workflow triggers |
| `{{SEED_PATH}}` | `/opt/agent-seed` | Where the container seed is baked and mounted |

## Conventions inside templates

- `[TBD]` marks a decision a human must make. Leaving one in place is better than
  inventing content, because an unfilled marker gets noticed and a plausible invention
  does not.
- `_exemplar`, `_role`, and `_domain` directories are prototypes. The scaffolder renames
  them from the relevant placeholder, so `_domain` becomes `pims` and so on.
- Every blueprint ships a README written for the person who will read it first, which is
  usually a contributor rather than the platform team.
