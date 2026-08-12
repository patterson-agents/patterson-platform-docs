# Consumes the seed layer built by {{ORG}}/agent-seed rather than installing plugins here.
FROM ghcr.io/{{ORG}}/agent-seed:[TBD-tag] AS seed

FROM mcr.microsoft.com/devcontainers/javascript-node:22
COPY --from=seed {{SEED_PATH}} {{SEED_PATH}}
COPY --from=seed /etc/claude-code/managed-settings.json /etc/claude-code/managed-settings.json
ENV CLAUDE_CODE_PLUGIN_SEED_DIR={{SEED_PATH}}
