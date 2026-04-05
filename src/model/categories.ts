interface Category {
  ruleName: string;
  source: string;
  category: string;
}

export const Categories: Record<string, Category[]> = {
  correctness: [
    {
      ruleName: "alt-text",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "anchor-has-content",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "anchor-is-valid",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "aria-activedescendant-has-tabindex",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "aria-props",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "aria-proptypes",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "aria-role",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "aria-unsupported-elements",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "autocomplete-valid",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "await-thenable",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "bad-array-method-on-arguments",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "bad-char-at-comparison",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "bad-comparison-sequence",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "bad-min-max-func",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "bad-object-literal-comparison",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "bad-replace-all-arg",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "check-property-names",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "check-tag-names",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "click-events-have-key-events",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "consistent-each-for",
      source: "vitest",
      category: "correctness",
    },
    {
      ruleName: "const-comparisons",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "constructor-super",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "default",
      source: "import",
      category: "correctness",
    },
    {
      ruleName: "double-comparisons",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "erasing-op",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "exhaustive-deps",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "expect-expect",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "for-direction",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "forward-ref-uses-ref",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "google-font-display",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "google-font-preconnect",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "heading-has-content",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "hoisted-apis-on-top",
      source: "vitest",
      category: "correctness",
    },
    {
      ruleName: "html-has-lang",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "iframe-has-title",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "img-redundant-alt",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "implements-on-classes",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "inline-script-id",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "jsx-key",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "jsx-no-duplicate-props",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "jsx-no-undef",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "jsx-props-no-spread-multi",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "label-has-associated-control",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "lang",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "media-has-caption",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "missing-throw",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "mouse-events-have-key-events",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "namespace",
      source: "import",
      category: "correctness",
    },
    {
      ruleName: "next-script-for-ga",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-access-key",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "no-aria-hidden-on-focusable",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "no-array-delete",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-arrow-functions-in-watch",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "no-assign-module-variable",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-async-client-component",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-async-promise-executor",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-autofocus",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "no-await-in-promise-methods",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-base-to-string",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-before-interactive-script-outside-document",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-callback-in-promise",
      source: "promise",
      category: "correctness",
    },
    {
      ruleName: "no-caller",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-children-prop",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-class-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-compare-neg-zero",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-cond-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-conditional-expect",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "no-conditional-tests",
      source: "vitest",
      category: "correctness",
    },
    {
      ruleName: "no-const-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-constant-binary-expression",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-constant-condition",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-control-regex",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-css-tags",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-danger-with-children",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-debugger",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-defaults",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "no-delete-var",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-deprecated-destroyed-lifecycle",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "no-did-mount-set-state",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-direct-mutation-state",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-disabled-tests",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "no-distracting-elements",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "no-document-import-in-page",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-dupe-class-members",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-dupe-else-if",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-dupe-keys",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-duplicate-case",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-duplicate-enum-values",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-duplicate-head",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-duplicate-type-constituents",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-empty-character-class",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-empty-file",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-empty-pattern",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-empty-static-block",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-eval",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-ex-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-export",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "no-export-in-script-setup",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "no-extra-boolean-cast",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-extra-non-null-assertion",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-find-dom-node",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-floating-promises",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-focused-tests",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "no-for-in-array",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-func-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-global-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-head-element",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-head-import-in-document",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-html-link-for-pages",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-img-element",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-implied-eval",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-import-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-invalid-fetch-options",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-invalid-regexp",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-invalid-remove-event-listener",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-irregular-whitespace",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-is-mounted",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-iterator",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-lifecycle-after-await",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "no-loss-of-precision",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-meaningless-void-operator",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-misleading-character-class",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-misused-new",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-misused-spread",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-new-array",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-new-native-nonconstructor",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-new-statics",
      source: "promise",
      category: "correctness",
    },
    {
      ruleName: "no-non-null-asserted-optional-chain",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-noninteractive-tabindex",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "no-nonoctal-decimal-escape",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-obj-calls",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-page-custom-font",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-redundant-roles",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "no-redundant-type-constituents",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-render-return-value",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-script-component-in-head",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-self-assign",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-setter-return",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-shadow-restricted-names",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-single-promise-in-promise-methods",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-sparse-arrays",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-standalone-expect",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "no-static-element-interactions",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "no-string-refs",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-styled-jsx-in-document",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-sync-scripts",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-thenable",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-this-alias",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-this-before-super",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-this-in-before-route-enter",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "no-this-in-sfc",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-title-in-document-head",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-typos",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-unassigned-vars",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unnecessary-await",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-unnecessary-parameter-property-assignment",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-unsafe",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-unsafe-declaration-merging",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-unsafe-finally",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unsafe-negation",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unsafe-optional-chaining",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unsafe-unary-minus",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-unused-expressions",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unused-labels",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unused-private-class-members",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unused-vars",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-unwanted-polyfillio",
      source: "nextjs",
      category: "correctness",
    },
    {
      ruleName: "no-useless-backreference",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-useless-catch",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-useless-empty-export",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "no-useless-escape",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-useless-fallback-in-spread",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-useless-length-check",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-useless-rename",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-useless-spread",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "no-will-update-set-state",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "no-with",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "no-wrapper-object-types",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "number-arg-out-of-range",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "only-used-in-recursion",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "prefer-as-const",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "prefer-import-from-vue",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "prefer-namespace-keyword",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "prefer-set-size",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "prefer-string-starts-ends-with",
      source: "unicorn",
      category: "correctness",
    },
    {
      ruleName: "prefer-tag-over-role",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "require-array-sort-compare",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "require-awaited-expect-poll",
      source: "vitest",
      category: "correctness",
    },
    {
      ruleName: "require-local-test-context-for-concurrent-snapshots",
      source: "vitest",
      category: "correctness",
    },
    {
      ruleName: "require-mock-type-parameters",
      source: "vitest",
      category: "correctness",
    },
    {
      ruleName: "require-property",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "require-property-description",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "require-property-name",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "require-property-type",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "require-to-throw-message",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "require-yield",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "require-yields",
      source: "jsdoc",
      category: "correctness",
    },
    {
      ruleName: "restrict-template-expressions",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "role-has-required-aria-props",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "role-supports-aria-props",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "scope",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "tabindex-no-positive",
      source: "jsx-a11y",
      category: "correctness",
    },
    {
      ruleName: "triple-slash-reference",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "unbound-method",
      source: "typescript",
      category: "correctness",
    },
    {
      ruleName: "uninvoked-array-callback",
      source: "oxc",
      category: "correctness",
    },
    {
      ruleName: "use-isnan",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "valid-define-emits",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "valid-define-props",
      source: "vue",
      category: "correctness",
    },
    {
      ruleName: "valid-describe-callback",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "valid-expect",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "valid-params",
      source: "promise",
      category: "correctness",
    },
    {
      ruleName: "valid-title",
      source: "jest",
      category: "correctness",
    },
    {
      ruleName: "valid-typeof",
      source: "eslint",
      category: "correctness",
    },
    {
      ruleName: "void-dom-elements-no-children",
      source: "react",
      category: "correctness",
    },
    {
      ruleName: "warn-todo",
      source: "vitest",
      category: "correctness",
    },
  ],
  pedantic: [
    {
      ruleName: "accessor-pairs",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "array-callback-return",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "ban-ts-comment",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "ban-types",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "checked-requires-onchange-or-readonly",
      source: "react",
      category: "pedantic",
    },
    {
      ruleName: "consistent-assert",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "consistent-empty-array-spread",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "display-name",
      source: "react",
      category: "pedantic",
    },
    {
      ruleName: "eqeqeq",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "escape-case",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "explicit-length-check",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "jsx-no-target-blank",
      source: "react",
      category: "pedantic",
    },
    {
      ruleName: "jsx-no-useless-fragment",
      source: "react",
      category: "pedantic",
    },
    {
      ruleName: "max-classes-per-file",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "max-dependencies",
      source: "import",
      category: "pedantic",
    },
    {
      ruleName: "max-depth",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "max-lines",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "max-lines-per-function",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "max-nested-callbacks",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "new-for-builtins",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-array-callback-reference",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-array-constructor",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-case-declarations",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-conditional-in-test",
      source: "jest",
      category: "pedantic",
    },
    {
      ruleName: "no-confusing-void-expression",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-constructor-return",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-deprecated",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-else-return",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-fallthrough",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-hex-escape",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-immediate-mutation",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-inline-comments",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-inner-declarations",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-instanceof-array",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-lonely-if",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-lonely-if",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-loop-func",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-misused-promises",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-mixed-enums",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-negated-condition",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-negation-in-equality-check",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-new-buffer",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-new-wrappers",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-object-as-default-parameter",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-object-constructor",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-promise-executor-return",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-prototype-builtins",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-redeclare",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-self-compare",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-static-only-class",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-this-assignment",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-throw-literal",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-typeof-undefined",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-unescaped-entities",
      source: "react",
      category: "pedantic",
    },
    {
      ruleName: "no-unnecessary-array-flat-depth",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-unnecessary-array-splice-count",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-unnecessary-slice-end",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-unreadable-iife",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-unsafe-argument",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-unsafe-assignment",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-unsafe-call",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-unsafe-function-type",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-unsafe-member-access",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-unsafe-return",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "no-useless-promise-resolve-reject",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-useless-return",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "no-useless-switch-case",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-useless-undefined",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "no-warning-comments",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "only-throw-error",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "prefer-array-flat",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-array-some",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-at",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-blob-reading-methods",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-code-point",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-date-now",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-dom-node-append",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-dom-node-dataset",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-dom-node-remove",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-enum-initializers",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "prefer-event-target",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-includes",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "prefer-math-min-max",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-math-trunc",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-native-coercion-functions",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-nullish-coalescing",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "prefer-promise-reject-errors",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "prefer-prototype-methods",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-query-selector",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-regexp-test",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-string-replace-all",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-string-slice",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-top-level-await",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "prefer-ts-expect-error",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "prefer-type-error",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "radix",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "related-getter-setter-pairs",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "require-await",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "require-await",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "require-number-to-fixed-digits-argument",
      source: "unicorn",
      category: "pedantic",
    },
    {
      ruleName: "require-param",
      source: "jsdoc",
      category: "pedantic",
    },
    {
      ruleName: "require-param-description",
      source: "jsdoc",
      category: "pedantic",
    },
    {
      ruleName: "require-param-name",
      source: "jsdoc",
      category: "pedantic",
    },
    {
      ruleName: "require-param-type",
      source: "jsdoc",
      category: "pedantic",
    },
    {
      ruleName: "require-returns",
      source: "jsdoc",
      category: "pedantic",
    },
    {
      ruleName: "require-returns-description",
      source: "jsdoc",
      category: "pedantic",
    },
    {
      ruleName: "require-returns-type",
      source: "jsdoc",
      category: "pedantic",
    },
    {
      ruleName: "restrict-plus-operands",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "return-await",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "rules-of-hooks",
      source: "react",
      category: "pedantic",
    },
    {
      ruleName: "sort-vars",
      source: "eslint",
      category: "pedantic",
    },
    {
      ruleName: "strict-boolean-expressions",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "switch-exhaustiveness-check",
      source: "typescript",
      category: "pedantic",
    },
    {
      ruleName: "symbol-description",
      source: "eslint",
      category: "pedantic",
    },
  ],
  perf: [
    {
      ruleName: "jsx-no-constructed-context-values",
      source: "react",
      category: "perf",
    },
    {
      ruleName: "jsx-no-jsx-as-prop",
      source: "react-perf",
      category: "perf",
    },
    {
      ruleName: "jsx-no-new-array-as-prop",
      source: "react-perf",
      category: "perf",
    },
    {
      ruleName: "jsx-no-new-function-as-prop",
      source: "react-perf",
      category: "perf",
    },
    {
      ruleName: "jsx-no-new-object-as-prop",
      source: "react-perf",
      category: "perf",
    },
    {
      ruleName: "no-accumulating-spread",
      source: "oxc",
      category: "perf",
    },
    {
      ruleName: "no-array-index-key",
      source: "react",
      category: "perf",
    },
    {
      ruleName: "no-await-in-loop",
      source: "eslint",
      category: "perf",
    },
    {
      ruleName: "no-map-spread",
      source: "oxc",
      category: "perf",
    },
    {
      ruleName: "no-useless-call",
      source: "eslint",
      category: "perf",
    },
    {
      ruleName: "prefer-array-find",
      source: "unicorn",
      category: "perf",
    },
    {
      ruleName: "prefer-array-flat-map",
      source: "unicorn",
      category: "perf",
    },
    {
      ruleName: "prefer-set-has",
      source: "unicorn",
      category: "perf",
    },
  ],
  restriction: [
    {
      ruleName: "anchor-ambiguous-text",
      source: "jsx-a11y",
      category: "restriction",
    },
    {
      ruleName: "bad-bitwise-operator",
      source: "oxc",
      category: "restriction",
    },
    {
      ruleName: "button-has-type",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "catch-or-return",
      source: "promise",
      category: "restriction",
    },
    {
      ruleName: "check-access",
      source: "jsdoc",
      category: "restriction",
    },
    {
      ruleName: "class-methods-use-this",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "complexity",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "default-case",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "empty-tags",
      source: "jsdoc",
      category: "restriction",
    },
    {
      ruleName: "explicit-function-return-type",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "explicit-module-boundary-types",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "extensions",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "forbid-dom-props",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "forbid-elements",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "handle-callback-err",
      source: "node",
      category: "restriction",
    },
    {
      ruleName: "jsx-filename-extension",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "max-props",
      source: "vue",
      category: "restriction",
    },
    {
      ruleName: "no-abusive-eslint-disable",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-alert",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-amd",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "no-anonymous-default-export",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-array-for-each",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-array-reduce",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-async-await",
      source: "oxc",
      category: "restriction",
    },
    {
      ruleName: "no-barrel-file",
      source: "oxc",
      category: "restriction",
    },
    {
      ruleName: "no-bitwise",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-clone-element",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "no-commonjs",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "no-console",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-const-enum",
      source: "oxc",
      category: "restriction",
    },
    {
      ruleName: "no-cycle",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "no-danger",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "no-default-export",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "no-div-regex",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-document-cookie",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-dynamic-delete",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-dynamic-require",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "no-empty",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-empty-function",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-empty-object-type",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-eq-null",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-explicit-any",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-import-compiler-macros",
      source: "vue",
      category: "restriction",
    },
    {
      ruleName: "no-import-type-side-effects",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-invalid-void-type",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-length-as-slice-end",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-magic-array-flat-depth",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-multi-comp",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "no-multiple-slot-args",
      source: "vue",
      category: "restriction",
    },
    {
      ruleName: "no-namespace",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-new-require",
      source: "node",
      category: "restriction",
    },
    {
      ruleName: "no-non-null-asserted-nullish-coalescing",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-non-null-assertion",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-optional-chaining",
      source: "oxc",
      category: "restriction",
    },
    {
      ruleName: "no-param-reassign",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-path-concat",
      source: "node",
      category: "restriction",
    },
    {
      ruleName: "no-plusplus",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-process-env",
      source: "node",
      category: "restriction",
    },
    {
      ruleName: "no-process-exit",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-proto",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-react-children",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "no-regex-spaces",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-relative-parent-imports",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "no-require-imports",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-rest-spread-properties",
      source: "oxc",
      category: "restriction",
    },
    {
      ruleName: "no-restricted-globals",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-restricted-imports",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-restricted-types",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-sequences",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-undefined",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-unknown-property",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "no-use-before-define",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-useless-error-capture-stack-trace",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "no-var",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-var-requires",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "no-void",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "no-webpack-loader-syntax",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "non-nullable-type-assertion-style",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "only-export-components",
      source: "react",
      category: "restriction",
    },
    {
      ruleName: "prefer-literal-enum-member",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "prefer-modern-math-apis",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "prefer-module",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "prefer-node-protocol",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "prefer-number-properties",
      source: "unicorn",
      category: "restriction",
    },
    {
      ruleName: "promise-function-async",
      source: "typescript",
      category: "restriction",
    },
    {
      ruleName: "require-test-timeout",
      source: "vitest",
      category: "restriction",
    },
    {
      ruleName: "spec-only",
      source: "promise",
      category: "restriction",
    },
    {
      ruleName: "unambiguous",
      source: "import",
      category: "restriction",
    },
    {
      ruleName: "unicode-bom",
      source: "eslint",
      category: "restriction",
    },
    {
      ruleName: "use-unknown-in-catch-callback-variable",
      source: "typescript",
      category: "restriction",
    },
  ],
  style: [
    {
      ruleName: "adjacent-overload-signatures",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "array-type",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "arrow-body-style",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "avoid-new",
      source: "promise",
      category: "style",
    },
    {
      ruleName: "ban-tslint-comment",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "capitalized-comments",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "catch-error-name",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "class-literal-property-style",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "consistent-date-clone",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "consistent-existence-index-check",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "consistent-generic-constructors",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "consistent-indexed-object-style",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "consistent-test-filename",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "consistent-test-it",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "consistent-type-assertions",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "consistent-type-definitions",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "consistent-type-imports",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "consistent-type-specifier-style",
      source: "import",
      category: "style",
    },
    {
      ruleName: "consistent-vitest-vi",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "curly",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "custom-error-definition",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "default-case-last",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "default-param-last",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "define-emits-declaration",
      source: "vue",
      category: "style",
    },
    {
      ruleName: "define-props-declaration",
      source: "vue",
      category: "style",
    },
    {
      ruleName: "define-props-destructuring",
      source: "vue",
      category: "style",
    },
    {
      ruleName: "empty-brace-spaces",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "error-message",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "exports-last",
      source: "import",
      category: "style",
    },
    {
      ruleName: "filename-case",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "first",
      source: "import",
      category: "style",
    },
    {
      ruleName: "func-names",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "func-style",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "global-require",
      source: "node",
      category: "style",
    },
    {
      ruleName: "group-exports",
      source: "import",
      category: "style",
    },
    {
      ruleName: "grouped-accessor-pairs",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "guard-for-in",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "id-length",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "init-declarations",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "jsx-boolean-value",
      source: "react",
      category: "style",
    },
    {
      ruleName: "jsx-curly-brace-presence",
      source: "react",
      category: "style",
    },
    {
      ruleName: "jsx-fragments",
      source: "react",
      category: "style",
    },
    {
      ruleName: "jsx-handler-names",
      source: "react",
      category: "style",
    },
    {
      ruleName: "jsx-max-depth",
      source: "react",
      category: "style",
    },
    {
      ruleName: "jsx-pascal-case",
      source: "react",
      category: "style",
    },
    {
      ruleName: "jsx-props-no-spreading",
      source: "react",
      category: "style",
    },
    {
      ruleName: "max-expects",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "max-nested-describe",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "max-params",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "max-statements",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "new-cap",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-alias-methods",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-anonymous-default-export",
      source: "import",
      category: "style",
    },
    {
      ruleName: "no-array-method-this-argument",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "no-await-expression-member",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "no-confusing-set-timeout",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-console-spaces",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "no-continue",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-deprecated-functions",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-done-callback",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-duplicate-hooks",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-duplicate-imports",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-duplicates",
      source: "import",
      category: "style",
    },
    {
      ruleName: "no-empty-interface",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "no-exports-assign",
      source: "node",
      category: "style",
    },
    {
      ruleName: "no-extra-label",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-hooks",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-identical-title",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-implicit-coercion",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-import-node-test",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "no-importing-vitest-globals",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "no-inferrable-types",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "no-interpolation-in-snapshots",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-jasmine-globals",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-label-var",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-labels",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-large-snapshots",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-lone-blocks",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-magic-numbers",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-mocks-import",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-multi-assign",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-multi-str",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-mutable-exports",
      source: "import",
      category: "style",
    },
    {
      ruleName: "no-named-default",
      source: "import",
      category: "style",
    },
    {
      ruleName: "no-named-export",
      source: "import",
      category: "style",
    },
    {
      ruleName: "no-namespace",
      source: "import",
      category: "style",
    },
    {
      ruleName: "no-nested-ternary",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-nested-ternary",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "no-nesting",
      source: "promise",
      category: "style",
    },
    {
      ruleName: "no-new-func",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-nodejs-modules",
      source: "import",
      category: "style",
    },
    {
      ruleName: "no-null",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "no-redundant-should-component-update",
      source: "react",
      category: "style",
    },
    {
      ruleName: "no-restricted-jest-methods",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-restricted-matchers",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-return-assign",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-return-wrap",
      source: "promise",
      category: "style",
    },
    {
      ruleName: "no-script-url",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-set-state",
      source: "react",
      category: "style",
    },
    {
      ruleName: "no-template-curly-in-string",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-ternary",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-test-prefixes",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-test-return-statement",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-unneeded-async-expect-function",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-unreadable-array-destructuring",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "no-untyped-mock-factory",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "no-useless-collection-argument",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "no-useless-computed-key",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "no-zero-fractions",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "number-literal-case",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "numeric-separators-style",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "operator-assignment",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "padding-around-test-blocks",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "param-names",
      source: "promise",
      category: "style",
    },
    {
      ruleName: "parameter-properties",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-array-index-of",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-await-to-callbacks",
      source: "promise",
      category: "style",
    },
    {
      ruleName: "prefer-await-to-then",
      source: "promise",
      category: "style",
    },
    {
      ruleName: "prefer-bigint-literals",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-called-exactly-once-with",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-called-once",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-called-times",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-called-with",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-catch",
      source: "promise",
      category: "style",
    },
    {
      ruleName: "prefer-class-fields",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-classlist-toggle",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-comparison-matcher",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-const",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-default-export",
      source: "import",
      category: "style",
    },
    {
      ruleName: "prefer-default-parameters",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-describe-function-title",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-destructuring",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-dom-node-text-content",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-each",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-equality-matcher",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-es6-class",
      source: "react",
      category: "style",
    },
    {
      ruleName: "prefer-expect-resolves",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-expect-type-of",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-exponentiation-operator",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-find",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-for-of",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-function-type",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-global-this",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-hooks-in-order",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-hooks-on-top",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-import-in-mock",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-includes",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-jest-mocked",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-keyboard-event-key",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-logical-operator-over-ternary",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-lowercase-title",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-mock-promise-shorthand",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-mock-return-shorthand",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-modern-dom-apis",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-negative-index",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-numeric-literals",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-object-from-entries",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-object-has-own",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-object-spread",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-optional-catch-binding",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-promise-reject-errors",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-readonly",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-reduce-type-parameter",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-reflect-apply",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-regexp-exec",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-response-static-json",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-rest-params",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-return-this-type",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-spread",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-spread",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-spy-on",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-strict-boolean-matchers",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-strict-equal",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-string-raw",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-string-starts-ends-with",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "prefer-string-trim-start-end",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-structured-clone",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-template",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "prefer-ternary",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "prefer-to-be",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-to-be-falsy",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-to-be-object",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-to-be-truthy",
      source: "vitest",
      category: "style",
    },
    {
      ruleName: "prefer-to-contain",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-to-have-been-called",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-to-have-been-called-times",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-to-have-length",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "prefer-todo",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "relative-url-style",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "require-array-join-separator",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "require-hook",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "require-module-attributes",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "require-top-level-describe",
      source: "jest",
      category: "style",
    },
    {
      ruleName: "require-typed-ref",
      source: "vue",
      category: "style",
    },
    {
      ruleName: "self-closing-comp",
      source: "react",
      category: "style",
    },
    {
      ruleName: "sort-imports",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "sort-keys",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "state-in-constructor",
      source: "react",
      category: "style",
    },
    {
      ruleName: "switch-case-braces",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "text-encoding-identifier-case",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "throw-new-error",
      source: "unicorn",
      category: "style",
    },
    {
      ruleName: "unified-signatures",
      source: "typescript",
      category: "style",
    },
    {
      ruleName: "vars-on-top",
      source: "eslint",
      category: "style",
    },
    {
      ruleName: "yoda",
      source: "eslint",
      category: "style",
    },
  ],
  suspicious: [
    {
      ruleName: "always-return",
      source: "promise",
      category: "suspicious",
    },
    {
      ruleName: "approx-constant",
      source: "oxc",
      category: "suspicious",
    },
    {
      ruleName: "block-scoped-var",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "consistent-function-scoping",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "iframe-missing-sandbox",
      source: "react",
      category: "suspicious",
    },
    {
      ruleName: "jsx-no-comment-textnodes",
      source: "react",
      category: "suspicious",
    },
    {
      ruleName: "jsx-no-script-url",
      source: "react",
      category: "suspicious",
    },
    {
      ruleName: "misrefactored-assign-op",
      source: "oxc",
      category: "suspicious",
    },
    {
      ruleName: "no-absolute-path",
      source: "import",
      category: "suspicious",
    },
    {
      ruleName: "no-accessor-recursion",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "no-array-reverse",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "no-array-sort",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "no-async-endpoint-handlers",
      source: "oxc",
      category: "suspicious",
    },
    {
      ruleName: "no-commented-out-tests",
      source: "jest",
      category: "suspicious",
    },
    {
      ruleName: "no-confusing-non-null-assertion",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-empty-named-blocks",
      source: "import",
      category: "suspicious",
    },
    {
      ruleName: "no-extend-native",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-extra-bind",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-extraneous-class",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-instanceof-builtins",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "no-multiple-resolved",
      source: "promise",
      category: "suspicious",
    },
    {
      ruleName: "no-named-as-default",
      source: "import",
      category: "suspicious",
    },
    {
      ruleName: "no-named-as-default-member",
      source: "import",
      category: "suspicious",
    },
    {
      ruleName: "no-namespace",
      source: "react",
      category: "suspicious",
    },
    {
      ruleName: "no-new",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-promise-in-callback",
      source: "promise",
      category: "suspicious",
    },
    {
      ruleName: "no-required-prop-with-default",
      source: "vue",
      category: "suspicious",
    },
    {
      ruleName: "no-self-import",
      source: "import",
      category: "suspicious",
    },
    {
      ruleName: "no-shadow",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-this-in-exported-function",
      source: "oxc",
      category: "suspicious",
    },
    {
      ruleName: "no-unassigned-import",
      source: "import",
      category: "suspicious",
    },
    {
      ruleName: "no-unexpected-multiline",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-unmodified-loop-condition",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-unnecessary-boolean-literal-compare",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-unnecessary-template-expression",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-unnecessary-type-arguments",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-unnecessary-type-assertion",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-unnecessary-type-constraint",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-unneeded-ternary",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-unsafe-enum-comparison",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-unsafe-type-assertion",
      source: "typescript",
      category: "suspicious",
    },
    {
      ruleName: "no-useless-concat",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "no-useless-constructor",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "prefer-add-event-listener",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "preserve-caught-error",
      source: "eslint",
      category: "suspicious",
    },
    {
      ruleName: "react-in-jsx-scope",
      source: "react",
      category: "suspicious",
    },
    {
      ruleName: "require-default-export",
      source: "vue",
      category: "suspicious",
    },
    {
      ruleName: "require-module-specifiers",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "require-post-message-target-origin",
      source: "unicorn",
      category: "suspicious",
    },
    {
      ruleName: "style-prop-object",
      source: "react",
      category: "suspicious",
    },
  ],
};
