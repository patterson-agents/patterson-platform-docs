<!--
source: https://code.visualstudio.com/docs/setup/enterprise (redirects to https://code.visualstudio.com/docs/enterprise/overview)
fetched: 2026-08-11
status: complete
notes: The old /docs/setup/enterprise URL 301-redirects to /docs/enterprise/overview. Docs page last updated 8/5/2026. Site nav chrome stripped; body prose preserved verbatim.
-->

# VS Code for enterprise

Visual Studio Code can be used as a development tool for enterprise teams of all sizes. As an IT admin, you can configure VS Code to achieve consistency and compliance across your organization.

## Enterprise policies

VS Code supports centrally managed policies that override user settings on managed devices. Policies can be deployed through device management solutions like Microsoft Intune, Active Directory Group Policy, or MDM solutions on macOS.

Policies are available to control:

- [AI and Copilot features](https://code.visualstudio.com/docs/enterprise/ai-settings) - Agent mode, MCP servers, and tool approvals
- [Extensions](https://code.visualstudio.com/docs/enterprise/extensions) - Allowed extensions and private marketplace
- [Telemetry](https://code.visualstudio.com/docs/enterprise/telemetry) - Data collection levels and feedback mechanisms
- [Automatic updates](https://code.visualstudio.com/docs/enterprise/updates) - Control when and how VS Code updates

See the [enterprise policies reference](https://code.visualstudio.com/docs/enterprise/policies) for a complete list of available policies.

## Extension management

Organizations can control which extensions are installed on users' machines and host a private extension marketplace.

- **Allowed extensions** - Specify which extensions can be installed by publisher, extension ID, or version
- **Private marketplace** - Self-host extensions for your organization and control access to the public marketplace

Learn more about [managing extensions in enterprise environments](https://code.visualstudio.com/docs/enterprise/extensions).

## Network configuration

VS Code requires network access for several features, including automatic updates, extension marketplace, and telemetry. For environments with restricted network access or proxy servers, you might need to configure:

- **Firewall allowlist** - Allow specific hostnames for VS Code functionality
- **Proxy server** - VS Code uses system proxy settings by default
- **SSL certificates** - Configure trusted certificates for HTTPS proxies

For detailed network configuration, see [Network connections in VS Code](https://code.visualstudio.com/docs/setup/network).

### Common hostnames

If your firewall requires an allowlist, the key hostnames to allow include:

- `update.code.visualstudio.com` - Updates
- `marketplace.visualstudio.com` - Extension marketplace
- `*.gallery.vsassets.io` - Extension assets
- `vscode.download.prss.microsoft.com` - Downloads

See the [complete list of hostnames](https://code.visualstudio.com/docs/setup/network#_common-hostnames) in the network documentation.

## Preinstalled extensions

You can prepare machine images or virtual machines with VS Code and a set of preinstalled extensions. When users launch VS Code for the first time, the extensions are installed automatically.

Learn more about [preinstalling extensions](https://code.visualstudio.com/docs/enterprise/extensions#_preinstall-extensions).

## Related resources

- [Enterprise policies reference](https://code.visualstudio.com/docs/enterprise/policies) - Complete list of policies
- [Network connections](https://code.visualstudio.com/docs/setup/network) - Proxy and firewall configuration
- [Settings Sync](https://code.visualstudio.com/docs/configure/settings-sync) - Synchronize settings across devices

_Docs page date: 8/5/2026_

## Enterprise docs section (site nav, for reference)

- Overview — https://code.visualstudio.com/docs/enterprise/overview
- Enterprise Policies — https://code.visualstudio.com/docs/enterprise/policies
- AI Settings — https://code.visualstudio.com/docs/enterprise/ai-settings
- Extensions — https://code.visualstudio.com/docs/enterprise/extensions
- Telemetry — https://code.visualstudio.com/docs/enterprise/telemetry
- Updates — https://code.visualstudio.com/docs/enterprise/updates
