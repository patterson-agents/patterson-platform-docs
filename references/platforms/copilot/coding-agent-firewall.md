<!--
source: https://docs.github.com/en/copilot/how-tos/use-copilot-agents/coding-agent/customize-the-agent-firewall
fetched: 2026-08-11
status: complete
notes: Fetched via web_fetch (HTML->text). Nav chrome stripped. Contains the org -> repo cascade semantics for firewall settings ("Let repositories decide" / locked when org sets Enabled or Disabled).
-->

# Customizing or disabling the firewall for GitHub Copilot

Learn how to control the domains and URLs that Copilot cloud agent and Copilot code review can access.

## In this article

- [Overview](#overview)
- [Limitations](#limitations)
- [Understanding the recommended firewall allowlist](#understanding-the-recommended-firewall-allowlist)
- [Configuring the firewall at the organization level](#configuring-the-firewall-at-the-organization-level)
- [Configuring the firewall at the repository level](#configuring-the-firewall-at-the-repository-level)
- [Further reading](#further-reading)

> **Note**
>
> Firewall configuration is managed from the "Internet access" settings tab, which covers both Copilot cloud agent and Copilot code review. Previous configurations saved as Actions variables will be maintained on that page.

## Overview

By default, Copilot's access to the internet is limited by a firewall.

> **Note**
>
> Copilot code review also supports firewall configuration, at both the organization and repository level, under its own section of the "Internet access" tab described below. This allows you to configure firewall rules for Copilot code review independently of Copilot cloud agent. See [Using GitHub Copilot code review](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review#customizing-copilot-code-reviews-environment).

Limiting internet access helps manage data exfiltration risks. Unexpected behavior from Copilot, or malicious instructions, could lead to code or other sensitive information being leaked to remote locations.

The firewall always allows access to a number of hosts that Copilot uses to interact with GitHub. By default, a recommended allowlist is also enabled to allow the agent to download dependencies.

If Copilot tries to make a request which is blocked by the firewall, a warning is added to the pull request body (for new pull requests) or to a comment (for existing pull requests). The warning shows the blocked address and the command that tried to make the request.

![Screenshot of a warning from Copilot about being blocked by the firewall.](https://docs.github.com/assets/cb-58205/images/help/copilot/cloud-agent/firewall-warning.png)

## Limitations

The agent firewall has important limitations that affect its security coverage.

- **Only applies to processes started by the agent**: The firewall only applies to processes started by the agent via its Bash tool. It does not apply to Model Context Protocol (MCP) servers or processes started in configured Copilot setup steps.
- **Only applies within the GitHub Actions appliance**: The firewall only operates within the GitHub Actions appliance environment. It does not apply to processes running outside of this environment.
- **Bypass potential**: Sophisticated attacks may bypass the firewall, potentially allowing unauthorized network access and data exfiltration.

These limitations mean that the firewall provides protection for common scenarios, but should not be considered a comprehensive security solution.

## Understanding the recommended firewall allowlist

The recommended allowlist, enabled by default, allows access to:

- Common operating system package repositories (for example, Debian, Ubuntu, Red Hat).
- Common container registries (for example, Docker Hub, Azure Container Registry, AWS Elastic Container Registry).
- Packages registries used by popular programming languages (C#, Dart, Go, Haskell, Java, JavaScript, Perl, PHP, Python, Ruby, Rust, Swift).
- Common certificate authorities (to allow SSL certificates to be validated).
- Hosts used to download web browsers for the Playwright MCP server.

For the complete list of hosts included in the recommended allowlist, see [Copilot allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference#copilot-cloud-agent-recommended-allowlist).

## Configuring the firewall at the organization level

Organization owners can configure all firewall settings at the organization level, for both Copilot cloud agent and Copilot code review. To access the firewall settings:

1. In the upper-right corner of GitHub, click your profile picture, then click **Organizations**.

2. Select an organization by clicking on it.

3. Under your organization name, click **Settings**. If you cannot see the "Settings" tab, select the dropdown menu, then click **Settings**. In the sidebar, under "Code, planning, and automation", click **Copilot**, and then click **Internet access**.

The "Internet access" page has separate sections for Copilot cloud agent and Copilot code review, so you can configure the following settings independently for each.

### Enabling or disabling the firewall

> **Warning**
>
> Disabling the firewall will allow Copilot to connect to any host, increasing risks of exfiltration of code or other sensitive information.

1. Under "Internet access", set the **Enable firewall** setting to **Enabled**, **Disabled**, or **Let repositories decide** (default).

### Enabling or disabling the recommended allowlist

1. Under "Internet access", set the **Recommended allowlist** setting to **Enabled**, **Disabled**, or **Let repositories decide** (default).

### Controlling whether repositories can add custom allowlist rules

By default, repository administrators can add their own entries to the firewall allowlist. Organization owners can disable this to prevent repositories from adding custom rules.

1. Under "Internet access", set the **Allow repository custom rules** setting to **Enabled** (default) or **Disabled**.

### Managing the organization custom allowlist

Items added to the organization custom allowlist apply to all repositories in the organization. These items cannot be deleted at the repository level. Organization-level and repository-level rules are combined.

1. Under "Internet access", click **Organization custom allowlist**.

2. Add the addresses you want to include in the allowlist. You can include:

   - **Domains** (for example, `packages.contoso.corp`). Traffic will be allowed to the specified domain and any subdomains.

     **Example**: `packages.contoso.corp` will allow traffic to `packages.contoso.corp` and `prod.packages.contoso.corp`, but not `artifacts.contoso.corp`.

   - **URLs** (for example, `https://packages.contoso.corp/project-1/`). Traffic will only be allowed on the specified scheme (`https`) and host (`packages.contoso.corp`), and limited to the specified path and descendant paths.

     **Example**: `https://packages.contoso.corp/project-1/` will allow traffic to `https://packages.contoso.corp/project-1/` and `https://packages.contoso.corp/project-1/tags/latest`, but not `https://packages.contoso.corp/project-2`, `ftp://packages.contoso.corp` or `https://artifacts.contoso.corp`.

3. Click **Add rule**.

4. After validating your list, click **Save changes**.

## Configuring the firewall at the repository level

Repository administrators can configure firewall settings at the repository level, including enabling or disabling the firewall, enabling or disabling the recommended allowlist, and managing a custom allowlist. Depending on the organization-level configuration, some of these settings may be locked. The repository settings page also has separate sections for Copilot cloud agent and Copilot code review, so you can configure these settings independently for each.

To access the firewall settings:

1. On GitHub, navigate to the main page of the repository.

2. Under your repository name, click **Settings**. If you cannot see the "Settings" tab, select the dropdown menu, then click **Settings**.

3. In the sidebar, under "Code, planning, and automation", click **Copilot** then **Internet access**.

### Enabling or disabling the firewall (repository level)

> **Note**
>
> You can only change this setting at the repository level if the organization-level **Enable firewall** setting is set to **Let repositories decide**. If the organization-level setting is **Enabled** or **Disabled**, you can't change this setting for individual repositories.

1. Toggle the **Enable firewall** setting on or off.

### Enabling or disabling the recommended allowlist (repository level)

> **Note**
>
> You can only change this setting at the repository level if the organization-level **Recommended allowlist** setting is set to **Let repositories decide**. If the organization-level setting is **Enabled** or **Disabled**, you can't change this setting for individual repositories.

1. Toggle the **Recommended allowlist** setting on or off.

### Managing the custom allowlist (repository level)

> **Note**
>
> You can only add custom allowlist rules at the repository level if the organization-level **Allow repository custom rules** setting is set to **Enabled**.

1. Click **Custom allowlist**.

2. Add the addresses you want to include in the allowlist. You can include:

   - **Domains** (for example, `packages.contoso.corp`). Traffic will be allowed to the specified domain and any subdomains.

     **Example**: `packages.contoso.corp` will allow traffic to `packages.contoso.corp` and `prod.packages.contoso.corp`, but not `artifacts.contoso.corp`.

   - **URLs** (for example, `https://packages.contoso.corp/project-1/`). Traffic will only be allowed on the specified scheme (`https`) and host (`packages.contoso.corp`), and limited to the specified path and descendant paths.

     **Example**: `https://packages.contoso.corp/project-1/` will allow traffic to `https://packages.contoso.corp/project-1/` and `https://packages.contoso.corp/project-1/tags/latest`, but not `https://packages.contoso.corp/project-2`, `ftp://packages.contoso.corp` or `https://artifacts.contoso.corp`.

3. Click **Add rule**.

4. After validating your list, click **Save changes**.

## Further reading

- [Store information in variables](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables#creating-configuration-variables-for-a-repository)
- [Configure the development environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment)
