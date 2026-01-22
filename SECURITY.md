# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Omniplex, please report it responsibly. **Do not open a public GitHub issue** as this could expose the vulnerability to bad actors.

### Reporting Process

1. **Email** - Send a detailed report to [security@omniplex.gg](mailto:security@omniplex.gg)
2. **Include** - Version affected, description of vulnerability, steps to reproduce, and potential impact
3. **Wait** - We will acknowledge receipt within 48 hours
4. **Collaborate** - Work with us on a fix before public disclosure

### What to Include

```
Subject: [SECURITY] Vulnerability Report

Application Version: 0.1.0
Vulnerability Type: [e.g., XSS, CSRF, Authentication Bypass, etc.]
Affected Component: [e.g., search functionality, login, settings]

Description:
[Clear description of the vulnerability]

Steps to Reproduce:
[Detailed steps]

Potential Impact:
[What could an attacker do with this vulnerability?]

Suggested Fix (optional):
[If you have suggestions for fixing it]

Timeline Preference:
[How much time would you like before public disclosure?]
```

## Vulnerability Disclosure Timeline

- **Day 0**: Vulnerability reported
- **Day 1**: Acknowledgment and initial assessment
- **Days 2-7**: Development and testing of fix
- **Day 8**: Security patch released (if critical)
- **Day 30**: Public disclosure and credit in release notes

For critical vulnerabilities (CVSS 9.0-10.0), we may accelerate this timeline.

## Supported Versions

We provide security updates for:

| Version | Supported       |
| ------- | --------------- |
| 0.1.x   | ✅ Current      |
| < 0.1   | ❌ Not supported |

## Security Best Practices

### For Users

- Keep Omniplex updated to the latest version
- Use strong, unique passwords for your accounts
- Never share your authentication tokens or API keys
- Report suspicious activity to support@omniplex.gg
- Review our [Privacy Policy](https://omniplex.gg/privacy)

### For Developers

- Follow the [CONTRIBUTING.md](CONTRIBUTING.md) security guidelines
- Never commit sensitive data (tokens, API keys, credentials)
- Use the secure logger system that automatically redacts sensitive data
- Run security checks before submitting pull requests
- Report security issues in dependencies via the reporting process above

## Known Vulnerabilities

### Fixed Vulnerabilities

- **v0.1.0** - No known vulnerabilities

## Dependencies Security

We regularly update dependencies to patch security vulnerabilities. Check [CHANGELOG.md](CHANGELOG.md) for security-related updates.

To check your local installation:

```bash
# Check for vulnerable dependencies
bun audit

# Update all dependencies safely
bun upgrade --latest
```

## Responsible Disclosure

We follow the responsible disclosure principles:

1. **No Public Disclosure Before Fix** - We won't publicly discuss vulnerabilities until a patch is available
2. **Timely Response** - We respond quickly to vulnerability reports
3. **Good Faith Effort** - We won't pursue legal action against researchers reporting responsibly
4. **Credit** - We credit security researchers in our release notes (with permission)

## Security Contacts

- **Security Issues**: [security@omniplex.gg](mailto:security@omniplex.gg)
- **Code of Conduct Violations**: [conduct@omniplex.gg](mailto:conduct@omniplex.gg)
- **General Support**: [support@omniplex.gg](mailto:support@omniplex.gg)

## PGP Key (Optional)

For highly sensitive reports, you may encrypt your email using our PGP key:

```
Coming soon - check back for updates
```

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE/SANS Top 25](https://cwe.mitre.org/top25/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CVE Details](https://www.cvedetails.com/)

## Changes to This Policy

This policy may be updated from time to time. Changes will be reflected in our repository with a new commit message clearly indicating "security policy update".

---

Thank you for helping keep Omniplex secure! 🔒
