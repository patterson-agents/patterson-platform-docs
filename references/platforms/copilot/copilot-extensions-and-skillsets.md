<!--
source: https://docs.github.com/en/copilot/building-copilot-extensions/setting-up-copilot-extensions?tool=skillsets
fetched: 2026-08-11
status: partial
notes: PARTIAL. The ?tool=skillsets tab fetched cleanly and is reproduced verbatim below. Several related pages are now REDIRECTED/RETIRED on docs.github.com as of this fetch:
notes:   - https://docs.github.com/en/copilot/concepts/extensions/skillsets  -> redirects to "About Model Context Protocol (MCP)"
notes:   - https://docs.github.com/en/copilot/concepts/build-copilot-extensions/skillsets-for-copilot-extensions -> returned empty body
notes:   - https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-skillset-for-your-copilot-extension/about-copilot-skillsets -> returned empty body
notes:   - ?tool=agents variant of this same page -> returned empty body on retry
notes: TAKEAWAY: GitHub is consolidating Copilot Extensions / Skillsets docs into MCP. Treat Extensions/Skillsets as legacy; MCP servers are the current extensibility mechanism. Inline links below were not resolvable to URLs in the text extraction.
-->

# Setting up Copilot Extensions

Follow these steps to start building Copilot Extensions.

This article is designed to help you build an entirely new GitHub Copilot Extension. To instead learn how to quickly build and test a demo Copilot Extension created by GitHub, see "Quickstart for GitHub Copilot Extensions using agents."

## Skillsets vs. agents

Skillsets and agents are the two ways to extend Copilot's capabilities and context through the **Copilot Extensibility Platform**. They let you integrate external services and APIs into Copilot Chat, but each one serves different use cases and offers different levels of control and complexity:

- **Skillsets** are lightweight and streamlined, designed for developers who need Copilot to perform specific tasks (e.g., data retrieval or simple operations) with minimal setup. They handle routing, prompt crafting, function evaluation, and response generation automatically, making them ideal for quick and straightforward integrations. For more information about skillsets, see "About Copilot skillsets."
- **Agents** are for complex integrations that need full control over how requests are processed and responses are generated. They let you implement custom logic, integrate with other LLMs and/or the Copilot API, manage conversation context, and handle all aspects of the user interaction. While Agents require more engineering and maintenance, they offer maximum flexibility for sophisticated workflows. For more information about agents, see "About Copilot agents."

## 1. Learn about GitHub Copilot skillsets

GitHub Copilot skillsets contain the custom code for your Copilot Extension, and integrate with a GitHub App to form the Copilot Extension itself.

Unlike Copilot agents, Copilot skillsets handle the logic behind prompt crafting, function evaluation, and response generation, making them an ideal choice for developers seeking quick and effective integrations with minimal effort. For more information, see "About Copilot skillsets."

## 2. Build a Copilot skillset

To explore an example of a skillset implementation, see the `skillset-example` repository in the `copilot-extensions` organization.

To build a skillset, see "Building Copilot skillsets."

## 3. Deploy your Copilot skillset

To make your Copilot skillset accessible to the Copilot platform and GitHub, you need to deploy it to a server that is reachable by HTTP request. See "Configuring your server to host your Copilot extension."

## 4. Create a GitHub App and integrate it with your Copilot skillset

To create a Copilot Extension, you need to create and configure a GitHub App, then integrate it with your Copilot skillset. See "Creating a GitHub App for your Copilot Extension" and "Configuring your GitHub App for your Copilot extension."

## 5. Choose the availability of your Copilot skillset

Choose one of two visibility levels for your Copilot Extension:

- **Public**: Any user or organization account with the installation page link for the extension can install it.
- **Private**: Only the user or organization account that created the extension can install it.

If you make your Copilot Extension public, you can then choose to list it on the GitHub Marketplace.

To learn how to change the visibility of your Copilot Extension and list it on the GitHub Marketplace, see "Managing the availability of your Copilot Extension."

## Next steps

To learn how to use your Copilot Extension, see "Using extensions to integrate external tools with Copilot Chat."
