<!--
source: https://docs.github.com/en/copilot/reference/custom-instructions-support
fetched: 2026-08-11
status: complete
notes: Fetched via web_fetch (HTML->text). Nav chrome stripped. Tables were rendered without cell line breaks in the text extraction, so bullets inside a cell run together (e.g. "instructions.📂 Path-specific"); reproduced verbatim from the source rendering.
-->

# Support for different types of custom instructions

Find out which environments support which types of custom instructions.

## In this article

- [GitHub.com](#githubcom)
- [Visual Studio Code](#visual-studio-code)
- [Visual Studio](#visual-studio)
- [JetBrains IDEs](#jetbrains-ides)
- [Eclipse](#eclipse)
- [Xcode](#xcode)
- [Copilot CLI](#copilot-cli)
- [Further reading](#further-reading)

This reference article provides details of which types of custom instructions are supported in various environments. For more information about the various types of custom instructions for GitHub Copilot, see [About customizing GitHub Copilot responses](https://docs.github.com/en/copilot/concepts/prompting/response-customization).

## GitHub.com

| Copilot feature | Types of custom instructions supported |
| --- | --- |
| Copilot Chat | 👤 **Personal** instructions. 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 🏢 **Organization** instructions. |
| Copilot cloud agent | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). 🤖 **Agent** instructions (using `AGENTS.md`, `CLAUDE.md` or `GEMINI.md` files). 🏢 **Organization** instructions. |
| Copilot code review | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). 🤖 **Agent** instructions (using an `AGENTS.md` file). 🏢 **Organization** instructions. |

## Visual Studio Code

| Copilot feature | Types of custom instructions supported |
| --- | --- |
| Copilot Chat | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). 🤖 **Agent** instructions (using an `AGENTS.md` file). |
| Copilot cloud agent | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). 🤖 **Agent** instructions (using `AGENTS.md`, `CLAUDE.md` or `GEMINI.md` files). |
| Copilot code review | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). |

## Visual Studio

| Copilot feature | Types of custom instructions supported |
| --- | --- |
| Copilot Chat | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). |
| Copilot code review | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). |

## JetBrains IDEs

In JetBrains IDEs, you can manage supported customizations from the Agent Customizations editor. In the GitHub Copilot Chat panel, click the settings icon in the top-right, then click **Customizations**.

The editor lets you work with workspace customizations for the current project or personal customizations that follow you across projects. You can use it to view and edit custom agents, manage reusable skills and prompt files, and configure instructions. For more information, see [Adding repository custom instructions for GitHub Copilot in your IDE](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions-in-your-ide/add-repository-instructions-in-your-ide) and [Creating custom agents for Copilot cloud agent in your IDE](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-custom-agents-in-your-ide).

| Copilot feature | Types of custom instructions supported |
| --- | --- |
| Copilot Chat | 👤 **Personal** instructions. 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). |
| Copilot cloud agent | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). 🤖 **Agent** instructions (using `AGENTS.md`, `CLAUDE.md` or `GEMINI.md` files). |
| Copilot code review | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). |

## Eclipse

| Copilot feature | Types of custom instructions supported |
| --- | --- |
| Copilot Chat | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). |
| Copilot cloud agent | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). 🤖 **Agent** instructions (using `AGENTS.md`, `CLAUDE.md` or `GEMINI.md` files). |
| Copilot code review | Custom instructions are currently not supported. |

## Xcode

| Copilot feature | Types of custom instructions supported |
| --- | --- |
| Copilot Chat | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). |
| Copilot cloud agent | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). 🤖 **Agent** instructions (using `AGENTS.md`, `CLAUDE.md` or `GEMINI.md` files). |
| Copilot code review | 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file). 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files). |

## Copilot CLI

- 📦 **Repository-wide** instructions (using the `.github/copilot-instructions.md` file).
- 📂 **Path-specific** instructions (using `.github/instructions/**/*.instructions.md` files).
- 🤖 **Agent** instructions (using `AGENTS.md`, `CLAUDE.md` or `GEMINI.md` files).
- 👤 **Personal** instructions (using `~/.copilot/copilot-instructions.md` or `~/.copilot/instructions/**/*.instructions.md` files).

## Further reading

- [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions)
- [Adding personal custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-personal-instructions)
- [Adding organization custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions)
