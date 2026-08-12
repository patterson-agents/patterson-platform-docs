<!--
source: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions
fetched: 2026-08-11
status: complete
notes: Fetched via web_fetch (HTML->text). Nav chrome stripped. Short page. Organization custom instructions are stored in ORG SETTINGS UI (a text box), NOT in a repo file. No equivalent enterprise-level custom-instructions page exists as of this fetch (enterprise-level customization is done via custom AGENTS in the designated .github-private repo -- see enterprise-org-custom-agents.md).
-->

# Adding organization custom instructions for GitHub Copilot

Customize Copilot responses for members of your organization.

## Who can use this feature?

Organization owners

Organizations with a GitHub Copilot Business or GitHub Copilot Enterprise plan

> **Note**
>
> **Support:** Organization custom instructions are currently only supported for Copilot Chat on GitHub.com, Copilot code review on GitHub.com and Copilot cloud agent on GitHub.com.

Organization owners can add instructions for Copilot, to tailor responses to specific needs and preferences across the organization. For an overview of this, and other types of custom instructions for Copilot, see [About customizing GitHub Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=webui).

## Adding organization custom instructions

You can add organization custom instructions via your organization settings.

1. In the upper-right corner of GitHub, click your profile picture, then click **Organizations**.

2. Select an organization by clicking on it.

3. Under your organization name, click **Settings**. If you cannot see the "Settings" tab, select the dropdown menu, then click **Settings**.

    ![Screenshot of the tabs in an organization's profile. The "Settings" tab is outlined in dark orange.](https://docs.github.com/assets/cb-49309/images/help/discussions/org-settings-global-nav-update.png)

4. In the left sidebar, click **Copilot** then click **Custom instructions**.

5. Under "Preferences and instructions", add natural language instructions to the text box.

    You can write your instructions in any format you prefer. For example, you can write them as a single block of text, each on a new line, or separated by blank lines.

6. Click **Save changes**. Your instructions are now active, and will stay active until you change or remove them.

To see your instructions in action, go to [https://github.com/copilot](https://github.com/copilot) and start a conversation.
