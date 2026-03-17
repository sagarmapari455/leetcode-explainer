# 🚀 GitHub Repository Guide

This document explains how to work with this GitHub repository and make the most of its features.

## 📋 Quick Navigation

| Section | Purpose |
|---------|---------|
| [Issues](#issues--bugs) | Report bugs and request features |
| [Pull Requests](#pull-requests) | Contribute code changes |
| [Discussions](#discussions) | Ask questions and discuss ideas |
| [Projects](#projects) | Track development progress |
| [Wiki](#wiki) | Community documentation |

---

## 🐛 Issues & Bugs

### Creating an Issue

1. **Go to Issues Tab** → Click "New Issue"
2. **Choose Template:**
   - 🐛 **Bug Report** - Something is broken
   - ✨ **Feature Request** - New functionality
   - 📚 **Documentation** - Docs improvement
   - 💬 **Question** - General question

3. **Fill in the Template** - Provide as much detail as possible
4. **Add Labels** - Help categorize your issue
5. **Submit** - Click "Submit new issue"

### Before Creating an Issue

- [ ] Check existing issues (both open and closed)
- [ ] Search with relevant keywords
- [ ] Review the documentation
- [ ] Check the FAQ section

### Good Issue Titles

✅ Good:
- "Backend returns 500 error when explaining problem #1234"
- "Add support for Urdu language explanations"
- "Python 3.12 compatibility issues with dependencies"

❌ Bad:
- "It doesn't work"
- "Help!"
- "Error"

---

## 🔄 Pull Requests

### Creating a Pull Request

1. **Fork the Repository** (if you haven't already)
2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/leetcode-ai-explainer.git
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes** - Write your code and tests
5. **Commit with Clear Messages**
   ```bash
   git commit -m "feat: add Tamil language support"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request on GitHub**
   - Click "Compare & pull request"
   - Fill in the PR template
   - Add description and linked issues
   - Request reviewers if you know them

### PR Review Process

1. **Automated Checks** - CI/CD pipeline runs tests
2. **Code Review** - Maintainers review your code
3. **Feedback** - Address any comments or suggestions
4. **Approval** - Once approved, ready to merge
5. **Merge** - Your changes are merged to main

### Tips for Quick Approval

- ✅ Write clear commit messages
- ✅ Include tests for new features
- ✅ Update documentation
- ✅ Keep changes focused on one issue
- ✅ Be responsive to feedback

---

## 💬 Discussions

### Using Discussions

Discussions are for:
- ❓ Questions about usage
- 💡 Ideas and suggestions
- 📢 Announcements
- 🤝 Community engagement

**NOT for:**
- 🐛 Bug reports → Use Issues
- ✨ Feature requests → Use Issues
- 💻 Code changes → Use Pull Requests

### Starting a Discussion

1. Go to **Discussions** tab
2. Click **"New discussion"**
3. Choose category
4. Write your topic
5. Engage with the community

---

## 📊 Projects

We use GitHub Projects to track development progress.

### Current Projects

- **🎯 Version 1.0** - Main release roadmap
- **🔒 Security** - Security improvements
- **⚡ Performance** - Optimization tasks
- **📚 Documentation** - Doc improvements

### Finding Tasks

1. Go to **Projects** tab
2. Select a project
3. View tasks organized by status:
   - 📋 **To Do** - Not started
   - 🔄 **In Progress** - Being worked on
   - 👀 **In Review** - Waiting for feedback
   - ✅ **Done** - Completed

### Contributing to Projects

- Check open issues in the project
- Comment on tasks you're interested in
- Ask to be assigned if you want to help
- Open a PR referencing the task

---

## ⭐ Starring & Following

### Why Star This Repo?

⭐ Starring shows your appreciation and helps:
- Increase project visibility
- Attract more contributors
- Motivate the maintainers

**If you find this helpful, please star! ⭐**

### Following Updates

- **Watch** (🔔) → Get notifications for all activity
- **Unwatch** → Stop notifications
- **Subscribe** to specific issues → Watch only certain threads

---

## 🔐 Security

### Reporting Security Issues

**DO NOT** create a public issue for security vulnerabilities!

Instead:
1. Email: sagarmapari30@gmail.com
2. Subject: `[SECURITY] vulnerability description`
3. Provide:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (optional)

We'll work with you privately to resolve it.

---

## 📝 Commits & History

### Viewing Commit History

```bash
# View commits
git log --oneline

# View specific file history
git log -- filename

# View changes in a commit
git show commit-hash
```

### Understanding Commit Types

- **`feat:`** - New feature
- **`fix:`** - Bug fix
- **`docs:`** - Documentation
- **`style:`** - Formatting
- **`refactor:`** - Code restructuring
- **`perf:`** - Performance improvement
- **`test:`** - Test addition
- **`chore:`** - Maintenance

---

## 🏷️ Labels

Labels help organize issues. Here are common ones:

| Label | Meaning | Color |
|-------|---------|-------|
| `bug` | Something broken | 🔴 Red |
| `enhancement` | New feature | 🟢 Green |
| `documentation` | Docs update | 📘 Blue |
| `good first issue` | Great for beginners | 💛 Yellow |
| `help wanted` | Need assistance | 🟠 Orange |
| `in progress` | Being worked on | 🟣 Purple |
| `discussion` | Topic for discussion | 🔵 Cyan |

---

## 👥 Community

### Meet the Team

- **Maintainer:** [Sagar Mapari](https://github.com/sagarmapari455)
  - Email: sagarmapari30@gmail.com
  - LinkedIn: [Sagar Mapari](https://www.linkedin.com/in/sagar-mapari-00b00a321)

### Becoming a Contributor

1. Find an issue you want to help with
2. Comment that you'd like to work on it
3. Create your solution
4. Submit a pull request
5. Celebrate your contribution! 🎉

---

## 📚 Resources

### Documentation in This Repo

- [README.md](../README.md) - Project overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contributing guidelines
- [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) - Community standards
- [CHANGELOG.md](../CHANGELOG.md) - Version history
- [SECURITY_SETUP.md](../SECURITY_SETUP.md) - Security guide
- [API_KEY_REFACTORING.md](../API_KEY_REFACTORING.md) - API key management

### External Resources

- [GitHub Guides](https://guides.github.com/)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Issues Documentation](https://docs.github.com/en/issues)
- [Creating Pull Requests](https://docs.github.com/en/pull-requests)

---

## 🎯 Workflow Summary

### For Bug Reports
```
1. Create Issue (type: bug)
2. Describe problem with clear steps
3. Wait for acknowledgment
4. (Optional) Submit PR with fix
5. Celebrate the fix! 🎉
```

### For New Features
```
1. Create Issue (type: feature request)
2. Discuss approach with maintainers
3. Get approval
4. Create PR with implementation
5. Address feedback
6. Celebrate the new feature! 🎉
```

### For Documentation
```
1. Create Issue (type: documentation)
2. Suggest improvements
3. Submit PR with edits
4. Get review
5. Merged and live! 🎉
```

---

## ❓ FAQ

**Q: How do I update my fork?**
```bash
git fetch upstream
git rebase upstream/main
git push origin main
```

**Q: How do I fix a merge conflict?**
See [GitHub's guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)

**Q: Can I use multiple commits in a PR?**
Yes! Keep them logical and well-described.

**Q: How long does review take?**
Usually 2-7 days. Be patient! Maintainers are volunteers.

**Q: Can I work on multiple issues?**
Yes, but focus on one at a time for better quality.

---

## 🤝 Code of Conduct

This project is committed to providing a welcoming environment. Please read [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) and treat everyone with respect.

---

<div align="center">

**Thank you for making this project awesome!** 🚀

Your contributions matter, no matter their size.

</div>
