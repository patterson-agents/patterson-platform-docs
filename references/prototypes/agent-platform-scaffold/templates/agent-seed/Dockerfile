# Builds the plugin seed baked into container images, so containers start with the
# catalog present and clone nothing at runtime. No git credentials needed inside the
# container, and it works airgapped.

FROM node:22-bookworm-slim AS seed

ARG MARKETPLACE={{ORG}}/agent-marketplace
ENV CLAUDE_CODE_PLUGIN_CACHE_DIR={{SEED_PATH}}

RUN npm install -g @anthropic-ai/claude-code

# Plugins install directly into the seed path because CLAUDE_CODE_PLUGIN_CACHE_DIR is
# set. --config sets userConfig values non-interactively, which is the only way to
# pre-answer the enable-time prompts.
RUN claude plugin marketplace add "${MARKETPLACE}" \
 && claude plugin install {{PLATFORM_PREFIX}}-conventions@{{MARKETPLACE_NAME}} \
      --config ticket_prefix=[TBD] \
 && claude plugin install {{PLATFORM_PREFIX}}-core@{{MARKETPLACE_NAME}}

FROM node:22-bookworm-slim
COPY --from=seed {{SEED_PATH}} {{SEED_PATH}}
COPY managed-settings.json /etc/claude-code/managed-settings.json

# Located at runtime by probing this path rather than trusting paths inside the seed
# JSON, so the seed works when mounted somewhere other than where it was built.
ENV CLAUDE_CODE_PLUGIN_SEED_DIR={{SEED_PATH}}
ENV DISABLE_AUTOUPDATER=1

# Pin rather than using the Dev Container Feature, which always installs latest.
RUN npm install -g @anthropic-ai/claude-code@[TBD-version]
