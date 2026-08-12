<!--
source: https://docs.github.com/en/copilot/concepts/prompting/response-customization (tool=webui tab)
fetched: 2026-08-11
status: complete
notes: Fetched via web_fetch (HTML->text). This page has 6 tool tabs (vscode/jetbrains/visualstudio/webui/eclipse/xcode) that render into one HTML page; only the DEFAULT/webui tab body is reproduced here. THIS IS THE AUTHORITATIVE PAGE for the custom-instructions precedence order.
-->

# About customizing GitHub Copilot responses

Learn about customizing the behavior of GitHub Copilot to fit with your preferences and requirements.

## Tool navigation

- [Visual Studio Code](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=vscode)
- [JetBrains IDEs](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=jetbrains)
- [Visual Studio](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=visualstudio)
- [Web browser](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=webui)
- [Eclipse](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=eclipse)
- [Xcode](https://docs.github.com/en/copilot/concepts/prompting/response-customization?tool=xcode)

## In this article

- [About customizing Copilot responses](#about-customizing-copilot-responses)
- [Types of custom instructions](#types-of-custom-instructions)
- [About personal instructions](#about-personal-instructions)
- [About repository custom instructions](#about-repository-custom-instructions)
- [About organization custom instructions](#about-organization-custom-instructions)
- [Precedence of custom instructions](#precedence-of-custom-instructions)
- [Using custom instructions](#using-custom-instructions)
- [Writing effective custom instructions](#writing-effective-custom-instructions)
- [Next steps](#next-steps)
- [Further reading](#further-reading)

> **Note**
>
> This version of this article is about custom instructions on the GitHub website. Click the tabs above for other environments.

## About customizing Copilot responses

GitHub Copilot can provide responses that are tailored to your personal preferences, the way your team works, the tools you use, or the specifics of your project, if you provide it with enough context to do so. Instead of repeatedly adding this contextual detail to your prompts, you can create custom instructions that automatically add this information for you. The additional information is not displayed, but is available to Copilot to allow it to generate higher quality responses.

> **Note**
>
> Due to the non-deterministic nature of AI, Copilot may not always follow your custom instructions in exactly the same way every time they are used.

## Types of custom instructions

There are three main types of custom instructions that you can use to customize Copilot responses on the GitHub website:

- **Personal instructions** apply to all conversations you have with Copilot Chat across the GitHub website. They allow you to specify your individual preferences, such as preferred language or response style, ensuring that the responses are tailored to your personal needs.
- **Repository custom instructions** apply to conversations within the context of a specific repository. They are useful for defining project-specific coding standards, frameworks, or tools. For example, you can specify that a repository uses TypeScript and a particular library, ensuring consistent responses for all contributors.
- **Organization custom instructions** apply to conversations within the context of an organization on the GitHub website. They are ideal for enforcing organization-wide preferences, such as a common language or security guidelines. Organization custom instructions can only be set by organization owners for organizations with a Copilot Business or Copilot Enterprise subscription.

## About personal instructions

> **Note**
>
> Personal custom instructions are only supported for GitHub Copilot Chat in GitHub.

You can customize how Copilot Chat responds to you on GitHub.com by adding personal instructions, which Copilot will only apply to you. You do this in a popup on the Copilot Chat page on GitHub.com. See [Adding personal custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-personal-instructions).

## About repository custom instructions

You can use three types of repository custom instructions in Copilot on GitHub.com:

- **Repository-wide custom instructions**, which apply to all requests made in the context of a repository.

    These are specified in a `copilot-instructions.md` file in the `.github` directory of the repository.

- **Path-specific custom instructions**, which apply to requests made in the context of files that match a specified path.

    These are specified in one or more `NAME.instructions.md` files within or below the `.github/instructions` directory in the repository.

    By using path-specific instructions you can avoid overloading your repository-wide instructions with information that only applies to files of certain types, or in certain directories.

- **Agent instructions**, which are similar to repository-wide custom instructions, but are currently not supported by all Copilot features.

    These are specified in files called `AGENTS.md`, `CLAUDE.md`, or `GEMINI.md`.

For details of support for each of these types of repository custom instructions across different Copilot features, see [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support).

For a curated collection of examples, see [Custom instructions](https://docs.github.com/en/copilot/tutorials/customization-library/custom-instructions).

## About organization custom instructions

> **Note**
>
> **Support:** Organization custom instructions are currently only supported for Copilot Chat on GitHub.com, Copilot code review on GitHub.com and Copilot cloud agent on GitHub.com.

Organization owners can add instructions for Copilot, to tailor responses to the needs and preferences of your organization. For example, you can choose to always have Copilot respond in your company's language of choice or with a particular style.

Custom instructions defined in an organization's Copilot settings are used for all members of the organization, irrespective of whether they receive their Copilot subscription from that organization.

Some examples of instructions you could add are:

- `Always respond in Spanish.`
- `Do not generate code blocks in responses.`
- `For questions related to security, use the Security Docs Knowledge Base.`

## Precedence of custom instructions

Multiple types of custom instructions can apply to a request sent to Copilot. Personal instructions take the highest priority. Repository instructions come next, and then organization instructions are prioritized last. However, all sets of relevant instructions are provided to Copilot.

The following list shows the complete order of precedence, with instructions higher in this list taking precedence over those lower in the list:

- **Personal** instructions
- **Repository** custom instructions:
  - **Path-specific** instructions in any applicable `.github/instructions/**/*.instructions.md` file
  - **Repository-wide** instructions in the `.github/copilot-instructions.md` file
  - **Agent** instructions (for example, in an `AGENTS.md` file)
- **Organization** custom instructions

Whenever possible, try to avoid providing conflicting sets of instructions. If you are concerned about response quality, you can temporarily disable repository instructions. See [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions?tool=webui#enabling-or-disabling-custom-instructions-for-copilot-code-review).

## Using custom instructions

Custom instructions consist of natural language instructions and are most effective when they are short, self-contained statements. Consider the scope over which you want the instruction to apply when choosing whether to add an instruction on the personal, repository, or organization level.

Here are some common use cases and examples for each type of custom instructions:

- **Personal instructions:**
  - Preferred individual language: `Always respond in Portuguese.`
  - Individual response preferences: `Explain a single concept per line. Be clear and concise.`
- **Repository custom instructions:**
  - Coding standards: `Use early returns whenever possible.`
  - Frameworks: `Use Vue with the PrimeVue library.` or `Use Typescript rather than Javascript.`
  - Code style preferences: `Use camel case for variable names.`
- **Organization custom instructions:**
  - Describe how to answer certain questions: `For questions related to security, use the Security Docs Knowledge Base or advise people to consult with #security on Slack.`
  - Preferred language for a company which exclusively speaks a single language: `Always respond in Portuguese.`
  - Organization-wide preferences: `Do not generate code blocks in responses.`

> **Note**
>
> When reviewing a pull request, Copilot reads repository custom instructions, agent instructions, and agent skills from the head branch (the branch with your changes), not the base branch. For example, when merging `my-feature-branch` into `main`, Copilot uses the instructions and skills in `my-feature-branch`, so you can test changes to them in the same pull request without merging them first.

## Writing effective custom instructions

The instructions you add to your custom instruction file(s) should be short, self-contained statements that provide Copilot with relevant information to help it work in this repository. Because the instructions are sent with every chat message, they should be broadly applicable to most requests you will make in the context of the repository.

The exact structure you utilize for your instructions file(s) will vary by project and need, but the following guidelines provide a good starting point:

- Provide an overview of the project you're working on, including its purpose, goals, and any relevant background information.
- Include the folder structure of the repository, including any important directories or files that are relevant to the project.
- Specify the coding standards and conventions that should be followed, such as naming conventions, formatting rules, and best practices.
- Include any specific tools, libraries, or frameworks that are used in the project, along with any relevant version numbers or configurations.

The following instructions file is an example of these practices in action:

```markdown
# Project Overview

This project is a web application that allows users to manage their tasks and to-do lists. It is built using React and Node.js, and uses MongoDB for data storage.

## Folder Structure

- `/src`: Contains the source code for the frontend.
- `/server`: Contains the source code for the Node.js backend.
- `/docs`: Contains documentation for the project, including API specifications and user guides.

## Libraries and Frameworks

- React and Tailwind CSS for the frontend.
- Node.js and Express for the backend.
- MongoDB for data storage.

## Coding Standards

- Use semicolons at the end of each statement.
- Use single quotes for strings.
- Use function based components in React.
- Use arrow functions for callbacks.

## UI guidelines

- A toggle is provided to switch between light and dark mode.
- Application should have a modern and clean design.
```

You should also consider the size and complexity of your repository. The following types of instructions may work for a small repository with only a few contributors, but for a large and diverse repository, **these may cause problems**:

- Requests to refer to external resources when formulating a response
- Instructions to answer in a particular style
- Requests to always respond with a certain level of detail

For example, the following instructions **may not have the intended results**:

```markdown
Always conform to the coding styles defined in styleguide.md in repo my-org/my-repo when generating code.

Use @terminal when answering questions about Git.

Answer all questions in the style of a friendly colleague, using informal language.

Answer all questions in less than 1000 characters, and words of no more than 12 characters.
```

## Next steps

- [Adding personal custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-personal-instructions)
- [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions)
- [Adding organization custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions)

## Further reading

- [About GitHub Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory)
