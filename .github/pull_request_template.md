name: Pull Request
description: Submit a pull request to contribute changes
title: ""
body:
  - type: markdown
    attributes:
      value: |
        Thank you for submitting a pull request! Please fill out the form below to help us review your changes.

  - type: checkboxes
    attributes:
      label: Prerequisites
      description: Make sure you have completed the following steps
      options:
        - label: I have read the CONTRIBUTING.md guide
          required: true
        - label: I have formatted my code with `bun run format`
          required: true
        - label: I have run `bun run check` and all checks pass
          required: true
        - label: I have tested my changes locally
          required: true
        - label: I have updated the documentation if needed
          required: true

  - type: textarea
    attributes:
      label: Description
      description: Provide a clear description of the changes made
      placeholder: |
        This PR fixes the loading state issue in the search bar by checking if a query is active before showing the loader...
    validations:
      required: true

  - type: textarea
    attributes:
      label: Related Issues
      description: Link to related issues (use `Fixes #123` to auto-close on merge)
      placeholder: |
        Fixes #123
        Related to #456
    validations:
      required: true

  - type: dropdown
    attributes:
      label: Type of Change
      options:
        - "🐛 Bug Fix"
        - "✨ Feature"
        - "📚 Documentation"
        - "♻️ Refactoring"
        - "⚡ Performance"
        - "🎨 Styling"
        - "🧪 Testing"
        - "🔧 Chore"
      validations:
        required: true

  - type: textarea
    attributes:
      label: Changes Made
      description: List the specific changes in this PR
      placeholder: |
        - Fixed loader icon showing when search query is empty
        - Updated Header component to check if searchQuery exists before showing spinner
        - Added proper dependency management to prevent infinite loops
    validations:
      required: true

  - type: textarea
    attributes:
      label: Testing
      description: Describe how you tested these changes
      placeholder: |
        - Tested on Chrome and Firefox
        - Verified loader only shows when typing
        - Confirmed loader hides once results appear
        - Tested on mobile view as well
    validations:
      required: true

  - type: textarea
    attributes:
      label: Screenshots/Screen Recordings
      description: Add screenshots or recordings if applicable (especially for UI changes)
      placeholder: Paste images/videos here (optional)

  - type: checkboxes
    attributes:
      label: Checklist
      options:
        - label: I have followed the code style guidelines of this project
        - label: I have performed a self-review of my own code
        - label: I have commented my code, particularly in hard-to-understand areas
        - label: My changes generate no new warnings or errors
        - label: I have added tests that prove my fix is effective or my feature works
        - label: New and existing unit tests pass locally with my changes

  - type: textarea
    attributes:
      label: Breaking Changes
      description: Describe any breaking changes or API changes
      placeholder: "No breaking changes" or "This changes the search API response format from..."

  - type: textarea
    attributes:
      label: Additional Context
      description: Add any other relevant information
      placeholder: Links to relevant discussions, design docs, etc.
