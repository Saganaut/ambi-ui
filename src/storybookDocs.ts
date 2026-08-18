interface ComponentDocsOptions {
  summary: string;
  typeName: string;
  example: string;
  styles: string;
}

const componentDocs = ({ summary, typeName, example, styles }: ComponentDocsOptions) => `${summary}

### How to use

~~~tsx
${example}
~~~

### Types

The public props type is \`${typeName}\`. The API table below is generated from the TypeScript definition, including inherited native element attributes.

### Styles

${styles}`;

const referenceDocs = ({
  summary,
  usage,
  styles,
}: {
  summary: string;
  usage: string;
  styles: string;
}) => `${summary}

### How to use this reference

${usage}

### Types

Canvas labels use the exported TypeScript unions from the components, keeping this reference aligned with the supported API.

### Styles

${styles}`;

export { componentDocs, referenceDocs };
