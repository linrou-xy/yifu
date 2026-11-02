# AI Artboard Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use incremental implementation to execute this plan task-by-task.

**Goal:** Rebuild the four linked interior pages so their content, navigation, and interactive states match the approved Illustrator artboards.

**Architecture:** Keep the site dependency-free and static. Share the existing header through consistent HTML and `site.js`, use a single editorial stylesheet for all interior pages, and add a small page-interaction script for the manufacturing tabs and shop colour states.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node's built-in test runner, local image assets.

---

### Task 1: Navigation contract and missing garment assets

**Files:**
- Create: `tests/site-navigation.test.mjs`
- Modify: `index.html`
- Modify: `clothes.config.js`
- Create: `assets/side/*.png`

1. Write tests for the five-page navigation contract and homepage action links.
2. Run `node --test tests/site-navigation.test.mjs` and confirm the new artboard requirements fail.
3. Connect the supplied side-view garments and correct every site link.
4. Run the test again and confirm the navigation slice passes.

### Task 2: Heritage and manufacturing pages

**Files:**
- Modify: `heritage.html`
- Modify: `behind-the-garment.html`
- Modify: `pages.css`
- Create: `interior.js`
- Create: `assets/story/*`

1. Add failing structural tests for the heritage chapters and five manufacturing steps.
2. Rebuild the heritage page from artboards 11-12.
3. Rebuild the manufacturing page from artboards 3 and 6-10, with accessible tabs.
4. Run structural and JavaScript syntax tests.

### Task 3: Then/Now and shop pages

**Files:**
- Modify: `then-and-now.html`
- Modify: `shop.html`
- Modify: `pages.css`
- Modify: `interior.js`

1. Add failing tests for the comparison content and product colour controls.
2. Rebuild the comparison page from artboard 13.
3. Rebuild the shop page from artboards 14-16 and connect all five product colours.
4. Run structural and JavaScript syntax tests.

### Task 4: Browser verification

1. Serve the site locally.
2. Visit all five routes at desktop and mobile widths.
3. Verify navigation, manufacturing tabs, shop colour switching, console output, and missing requests.
4. Correct any visual or runtime defects and run the full test suite once more.

**Note:** The workspace is not a Git repository, so commit steps are intentionally omitted rather than initializing source control without user authorization.
