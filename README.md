# Intro-to-build-matrix-and-code-quality-checks-in-CI-with-GitHub-workflow

My Learnings from using github actions in CI operations
Brush up (retrospective)
1. Secure push activities require tokens that are time bound. Use the token /username every time to push.


create blank.yml
* This didn't run the workflow because there was no package.json file in the root repository. Error code ENOENT

create .eslintrc.json
*This didn't run because there was no lock file. npm ci requires a lock file to know what dependencies to install and that way ensure reproducible builds. 

other errors
* The eslintrc.json is wrongly located at ./GitHub/workflows 
* This didn't allow lint to run from the blank.yml file as there was no config file to lint from. Also, there was no
js file to begin with. The index.js file is the file with the app code.
* test file was also not provided. Down below, you will find why it is necessary for code correctness.





## 🧪 What Is the Purpose of a Test File?

A **test file** is used to verify that your code behaves as expected. It contains **automated checks** (called “tests”) that run every time you make changes, so you can catch bugs early.

### ✅ Why It Matters:
- **Prevents regressions**: Ensures new changes don’t break existing functionality.
- **Documents behavior**: Shows how your code is supposed to work.
- **Speeds up debugging**: You know exactly what failed and where.
- **Builds confidence**: You can refactor without fear.

### 🧠 Example:
If `index.js` has a function like:
```js
export function add(a, b) {
  return a + b;
}
```

Then `index.test.js` might contain:
```js
import { add } from './index';

test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

This test confirms that `add(2, 3)` returns `5`. If someone changes the function and breaks it, the test will fail — alerting you immediately.

---

## 🧹 Why Do You Lint the Same File?

**Linting** and **testing** serve different purposes:

| Tool     | Purpose                            | What It Checks                          |
|----------|------------------------------------|------------------------------------------|
| ESLint   | Code quality and style             | Syntax errors, unused variables, formatting, best practices |
| Jest     | Code correctness and behavior      | Functional bugs, logic errors, expected outputs |

### 🔍 Why You Do Both:
- **Linting** catches issues before the code even runs.
- **Testing** ensures the code runs correctly and produces the right results.

So yes — you lint `index.js` to keep it clean and readable, and you test it with `index.test.js` to make sure it works.

---

### 🧭 Think of It Like This:
Linting is like proofreading your essay for grammar and style. Testing is like reading it aloud to make sure it makes sense and delivers the message.



-----------------------------------------------------------------------------


---

## 🧠 ESLint Has Two Config Systems

### 1. **Legacy Config System**
- Uses `.eslintrc.js`, `.eslintrc.json`, `.eslintrc.yaml`, or even `eslintConfig` in `package.json`
- Configuration is written in CommonJS (`module.exports = { ... }`)
- ESLint automatically detects these files
- Still widely used, but being phased out

### 2. **Flat Config System (Modern)**
- Introduced in ESLint v8.21.0+
- Uses `eslint.config.js` or `eslint.config.mjs`
- Written in **ES Modules** (`import/export`)
- More powerful, faster, and better for monorepos and plugin ecosystems
- ESLint **ignores legacy config files** when flat config is present

---

## 🔍 Difference Between `.js` and `.mjs`

| File Name           | Format       | Use Case                                |
|---------------------|--------------|------------------------------------------|
| `eslint.config.js`  | CommonJS     | Flat config if your Node supports ESM in `.js` |
| `eslint.config.mjs` | ES Modules   | Flat config with guaranteed ESM support |

If you're using modern syntax like `import` and `export`, you should use `.mjs`. ESLint will treat it as an ES Module automatically.

------

