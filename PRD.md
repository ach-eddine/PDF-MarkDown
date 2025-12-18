# Product Requirements Document (PRD) - MarkPDF

## 1. Project Overview
**Project Name:** MarkPDF  
**Concept:** A secure, lightweight Single Page Application (SPA) to convert Markdown text into professional PDF documents instantly.  
**Philosophy:** "Client-Side Only." To ensure total user privacy, no data should ever be sent to a server. Processing happens 100% in the user's browser.

---

## 2. Technical Stack & Objectives
- **Framework:** Next.js latest (App Router) or React (Vite).
- **Styling:** Tailwind CSS + @tailwindcss/typography (for elegant document rendering).
- **Markdown Logic:** `react-markdown` + `rehype-sanitize`.
- **PDF Generation:** Native Browser Print API (`window.print()`) with specific `@media print` CSS directives.

---

## 3. Key Features (Scope)

### A. Real-Time Editor
- **Split-Screen Interface:** Live synchronization between input (left) and preview (right).
- **Full Markdown Support:** Headers, lists, tables, code blocks, blockquotes, and checkboxes.
- **Auto-save:** Local storage persistence (optional) so users don't lose work on refresh.

### B. Secure Export
- Dedicated "Export to PDF" button.
- Custom Print CSS to ensure only the document content is visible in the final PDF (hiding UI elements like buttons and editor panes).

---

## 4. Security & Privacy (Mandatory)

### A. XSS Protection (Cross-Site Scripting)
- **Input Sanitization:** The application MUST use `rehype-sanitize` to strip any malicious HTML or JavaScript injected into the Markdown input.
- **Safe Rendering:** Avoid the use of `dangerouslySetInnerHTML` without a strict, audited sanitization layer.

### B. Data Sovereignty
- **Static Architecture:** The app must be deployable as a static site (SSG).
- **Zero-Data Logging:** No tracking or storage of user-entered text on any external database or cloud service.

---

## 5. UI/UX Specifications

- **Header:** Branding "MarkPDF" + "Download PDF" primary action button.
- **Layout:**
    - **Left Column:** Textarea with a monospaced font for clean editing.
    - **Right Column:** Clean, white-background preview (A4 paper style).
- **Responsive Design:** On mobile devices, switch to a tabbed view (Toggle between Editor and Preview).

---

## 6. Development Guidelines (AI Instructions)

1. **Modularity:** Separate the `Editor` logic from the `Preview` component.
2. **Performance:** Implement "Debouncing" on the markdown input if necessary to maintain UI fluidity during long document editing.
3. **Print CSS Strategy:** Use `.no-print` classes to hide UI components during the PDF generation process.
4. **Accessibility:** Ensure color contrasts meet WCAG standards and the editor is keyboard-navigable.

---

## 7. Acceptance Criteria
- Markdown text renders accurately into HTML.
- The "Download PDF" button triggers the system print dialog.
- Any `<script>` tag injection in the editor is neutralized and not executed.
- The layout is fully functional and aesthetic on both desktop and mobile.