# 0001. Keep every platform repository in one GitHub organization

- **Status:** accepted
- **Date:** [TBD]
- **DRI:** [TBD]

## Context

This looks like an administrative preference and is actually a platform constraint.

When an organization marketplace syncs through GitHub, a plugin source can be private in
two cases: a `github.com` source sharing the marketplace repository's owner, or a source
on a GitHub Enterprise host with the GHE App installed on that repository. The `npm` and
`archive` source types are not supported by organization sync at all.

## Decision

Every platform repository lives in `{{ORG}}`. Ownership is distributed through separate
repositories and CODEOWNERS rather than through separate organizations.

## Consequences

Department repositories can be referenced directly by `github` source with a `path`, and
no vendoring step is required.

A department that insists on its own organization cannot be referenced. Its plugin
folders would have to be copied into the marketplace repository by CI, which is possible
but adds a synchronisation step and makes the catalog a content repository rather than a
manifest.

Reversing this means moving repositories, so it is worth settling before the first
department onboards.
