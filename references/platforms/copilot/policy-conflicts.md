<!--
source: https://docs.github.com/en/copilot/reference/policy-conflicts
fetched: 2026-08-11
status: complete
notes: Fetched via web_fetch (HTML->text). Nav chrome stripped. This is the per-policy table of least-restrictive vs most-restrictive resolution when a user holds licenses from multiple orgs / enterprises.
-->

# Feature availability when GitHub Copilot policies conflict in organizations

Learn how delegating Copilot policy decisions to organizations affects users granted a license by organizations with different policies.

## In this article

- [About delegating policy decisions to organizations](#about-delegating-policy-decisions-to-organizations)
- [How availability is determined](#how-availability-is-determined)
- [Availability for members with Copilot from multiple organizations](#availability-for-members-with-copilot-from-multiple-organizations)
- [Availability for members with Copilot from multiple enterprises](#availability-for-members-with-copilot-from-multiple-enterprises)
- [Next steps](#next-steps)

## About delegating policy decisions to organizations

Policies can be defined for a whole enterprise, or set at the organization level. See [GitHub Copilot policies for enterprises and organizations](https://docs.github.com/en/copilot/concepts/policies).

When an enterprise owner delegates control of a policy to organization owners by setting "No policy," some organizations may enable a feature while others disable it. Users may be granted a Copilot license by organizations with different policies for the same feature.

## How availability is determined

Feature, model, and privacy settings for users are set according to the **least restrictive** or the **most restrictive** policy defined by any of the organizations where they are granted a Copilot license.

- **Least restrictive:** if any of the organizations has **enabled** a feature, this feature is enabled for the user everywhere. This applies to all but the more sensitive Copilot features.

- **Most restrictive:** if any of the organizations has **disabled** a feature, this feature is disabled for the user in all their organizations. This applies only to the most sensitive Copilot features, for example: access to Copilot metrics using the API.

## Availability for members with Copilot from multiple organizations

| Policy | Availability matches | More information |
| --- | --- | --- |
| Copilot Metrics API | Most restrictive organization | Not applicable |
| Semantic indexing for non-GitHub repositories | Most restrictive organization (only available when all organizations explicitly set **Enabled**; **Unconfigured** behaves as disabled) | [Indexing repositories for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/repository-indexing) |
| Suggestions matching public code (privacy policy) | Most restrictive organization | [GitHub Copilot code suggestions in your IDE](https://docs.github.com/en/copilot/concepts/completions/code-suggestions) |
| Allow members without a Copilot license to use Copilot code review in GitHub.com | Most restrictive organization | [Application card: GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents) |
| Copilot can search the web | Least restrictive organization | [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) |
| Copilot Chat in GitHub Mobile | Least restrictive organization | [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) |
| Copilot Chat in the IDE | Least restrictive organization | [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) |
| Copilot Chat agent mode in the IDE | Least restrictive organization | [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) |
| Copilot code review | Least restrictive organization | [Application card: GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents) |
| Copilot cloud agent | Least restrictive organization | [Application card: GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents) |
| Spark | Least restrictive organization | [Application card: GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents) |
| Copilot in GitHub.com | Least restrictive organization | [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) |
| Copilot in GitHub Desktop | Least restrictive organization | [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) |
| Copilot CLI | Least restrictive organization | [Application card: GitHub Copilot Agents](https://docs.github.com/en/copilot/responsible-use/agents) |
| Editor preview features | Least restrictive organization | [GitHub Pre-release License Terms](https://docs.github.com/en/site-policy/github-terms/github-pre-release-license-terms) |
| GitHub Models, one policy per model | Least restrictive organization | [Managing your team's model usage](https://docs.github.com/en/github-models/github-models-at-scale/manage-models-at-scale) |
| MCP servers in Copilot | Least restrictive organization | [Configure MCP servers for your repository](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers) |
| Copilot-generated commit messages | Least restrictive organization | [Application card: GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat) |

## Availability for members with Copilot from multiple enterprises

If a user receives a license from multiple different enterprises, the **most restrictive** policy usually applies. The exceptions are:

- AI credit paid usage (this applies to each enterprise, not the user)
- GitHub Spark

## Next steps

- [Managing policies and features for GitHub Copilot in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies)
- [Managing policies and features for GitHub Copilot in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies)
