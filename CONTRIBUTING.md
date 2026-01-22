# Contributing to Omniplex

Thank you for your interest in contributing to Omniplex! We're excited to have you help make the Discord bot discovery platform even better.

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Git
- GitHub account

### Setup Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Omniplex.git
cd Omniplex

# Add upstream remote to stay in sync
git remote add upstream https://github.com/InfinityBotList/Omniplex.git

# Install dependencies
bun install

# Start development server
bun run dev
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update your local main branch
git fetch upstream
git checkout main
git rebase upstream/main

# Create a new feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Changes

- Write clear, descriptive commit messages
- Follow the [Code Style Guidelines](#code-style-guidelines)
- Test your changes thoroughly
- Keep commits focused and atomic

### 3. Commit and Push

```bash
# Stage your changes
git add .

# Commit with a clear message
git commit -m "feat: add new search filter option"
# or
git commit -m "fix: resolve loading state issue in search bar"

# Push to your fork
git push origin feature/your-feature-name
```

### 4. Create a Pull Request

- Go to the [Omniplex repository](https://github.com/InfinityBotList/Omniplex)
- Click "New Pull Request"
- Select your branch
- Fill out the PR template with:
  - Clear description of changes
  - Related issues (use `Fixes #123`)
  - Testing notes
  - Screenshots if applicable
- Submit the PR

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, missing semicolons, etc)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Code changes that improve performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, or tooling

### Examples

```
feat(search): add advanced filtering options

fix(header): prevent infinite loading state on empty query

docs: update README with deployment instructions

style: format code with biome

refactor(logger): extract data sanitization to separate module

perf(backgrounds): optimize animation performance with will-change

test(queries): add tests for search API integration

chore(deps): update tailwindcss to v4.1.0
```

## Code Style Guidelines

### TypeScript

- Use strict TypeScript mode
- Always specify return types for functions
- Use interfaces over type aliases when possible
- Avoid `any` type; use `unknown` if necessary

```typescript
// ✅ Good
const useSearch = (query: string): UseQueryResult<SearchResponse> => {
  return useQuery({
    // ...
  })
}

// ❌ Bad
const useSearch = (query) => {
  return useQuery({
    // ...
  })
}
```

### React Components

- Use functional components with hooks
- Use `useMemo` and `useCallback` appropriately
- Keep components focused and single-responsibility
- Use proper TypeScript interfaces for props

```typescript
// ✅ Good
interface HeaderProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export function Header({ onSearch, isLoading }: HeaderProps): JSX.Element {
  // ...
}

// ❌ Bad
export function Header(props: any) {
  // ...
}
```

### Styling

- Use Tailwind CSS utility classes
- Use OKLCH color space with CSS variables
- Mobile-first responsive design
- Follow the existing design system

```tsx
// ✅ Good
<div className="rounded-xl bg-muted/50 border border-transparent focus:border-primary/50 transition-all duration-200">

// ❌ Bad
<div style={{ borderRadius: '8px', backgroundColor: '#2a2a2a' }}>
```

### Logging

- Always use the logger module, never `console.log`
- Sensitive data is automatically redacted
- Use appropriate log levels: `log`, `info`, `warn`, `error`, `debug`

```typescript
// ✅ Good
logger.info(`Search completed with ${results.length} results`)
logger.debug(`API response:`, data)
logger.error(`Search failed:`, error)

// ❌ Bad
console.log(userData) // Might leak sensitive data
console.log('Search completed')
```

## Testing

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with coverage
bun run test:coverage
```

### Writing Tests

- Write tests for new features and bug fixes
- Aim for meaningful coverage, not 100% coverage
- Use descriptive test names
- Keep tests focused and isolated

```typescript
// ✅ Good test
describe('useSearch', () => {
  it('should fetch search results when query is provided', async () => {
    const { result } = renderHook(() => useSearch('discord'))
    
    await waitFor(() => {
      expect(result.current.data).toBeDefined()
    })
  })

  it('should not fetch when query is empty', () => {
    const { result } = renderHook(() => useSearch(''))
    expect(result.current.data).toBeUndefined()
  })
})
```

## Linting and Formatting

### Check Code Quality

```bash
# Run linter
bun run lint

# Format code
bun run format

# Run complete checks
bun run check
```

All pull requests must pass linting and formatting checks before merging.

## Documentation

### Writing Documentation

- Update README.md for user-facing changes
- Update CHANGELOG.md for all notable changes
- Add JSDoc comments to complex functions
- Include code examples where helpful

### JSDoc Format

```typescript
/**
 * Searches for bots, servers, and packs
 * @param query - The search query string
 * @returns Query result with search data
 * @example
 * const { data } = useSearch('minecraft')
 */
export const useSearch = (query: string): UseQueryResult => {
  // ...
}
```

## Pull Request Review Process

1. **Automated Checks** - All workflows must pass (linting, tests, build)
2. **Code Review** - At least one maintainer review required
3. **Testing** - Changes should be manually tested
4. **Approval** - PR must be approved before merging
5. **Merge** - Use "Squash and merge" for feature branches

### Addressing Feedback

- Make requested changes in new commits
- Mark conversations as resolved once addressed
- Ask for clarification if feedback is unclear
- Rebase if needed to keep history clean

## Issues and Bug Reports

### Before Creating an Issue

- Check existing issues to avoid duplicates
- Search the documentation and FAQ
- Try the latest development version
- Provide environment details (OS, browser, Node version)

### Creating an Issue

Use the appropriate issue template:
- **Bug Report** - For reporting bugs with reproduction steps
- **Feature Request** - For suggesting new features or improvements
- **Documentation** - For documentation updates or clarifications

### Good Issue Example

```markdown
## Bug Report: Loading animation never stops

### Description
The search bar shows a loading spinner continuously even after results appear.

### Steps to Reproduce
1. Open the search bar
2. Type "discord"
3. Wait for results to appear
4. Observe the spinner continues spinning

### Expected Behavior
The spinner should stop once results are loaded.

### Current Behavior
The spinner never stops spinning.

### Environment
- OS: Windows 11
- Browser: Chrome 120
- Node: 18.17.0
```

## Feature Requests

### Before Requesting a Feature

- Check if the feature already exists
- Check existing open feature requests
- Consider if it aligns with Omniplex goals
- Think about implementation complexity

### Creating a Feature Request

```markdown
## Feature Request: Dark mode toggle in header

### Description
Add a quick dark/light mode toggle in the header for faster theme switching.

### Motivation
Users want quick access to theme switching without opening the settings panel.

### Proposed Implementation
Add a moon/sun icon next to the settings gear in the header that toggles the theme.

### Additional Context
Could use the existing `useTheme` hook for state management.
```

## Security Issues

**Please do not publicly disclose security vulnerabilities.** Email security@omniplex.gg with details instead.

## Licensing

By contributing to Omniplex, you agree that your contributions will be licensed under the same [AGPL 3.0](LICENSE) license.

## Questions?

- 📖 Check the [README.md](README.md) and [CHANGELOG.md](CHANGELOG.md)
- 💬 Ask on [Discord](https://discord.gg/yGNfjyPKxb)
- 🐛 Open an issue for bugs
- 📧 Email support@omniplex.gg

## Resources

- [TanStack Documentation](https://tanstack.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

Thank you for contributing to make Omniplex better! 🎉
