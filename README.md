# ambi-ui

My custom component library used in new project.

## Main features

- 3 base shapes: default, pill, squircle
- 3 base color variants: Primary, Secondary, Brand
- Dark mode that works with all color variants
- 4 status color variants: Info, Error, Warning, Success
- 4 universal sizes: sm, md, lg, xl
- Container query sizing (in progress)
- Responsive components (in progress)

## Tooling

- pnpm
- Vite +
- Storybook

## Dependencies

- CSS modules
- Floating-ui - manage pop overs, modals and toolbars
- Lucide icons - icon package
- MorphIcons - small package allowing icons to morph into each other

## Components

- Buttons (regular, icon, split)
- Pagination
- Popover & utility PopoverWrapper
- Dropdown Menu (need to decide on hover effect here, unfinished)
- Form components:
-- Input
-- Input with button
-- Checkbox
-- File upload
-- Combobox
-- Dropdown

## Styling

- Tokens.css has primitives + roles. Always use roles never primitives in components.
- Some styles are exposed as data-attributes they are:
  -- fill
- Each component has their own derived custom properties that can be overwritten
- A new design system can be implemented by replacing tokens

## CSS patterns

- CSS classes are nested for better organization and readability
- CSS modules to isolate styling into own files per component
- Components styles are composed of shared + individual style sheets

## Accessibility

- All the components aim to fully abide by accessibility best practices
- Color contrasts are evaluated according to the APCA contrast checker instead of WCAG so may fail some automatic accessibility checks, but APCA should be sufficient.  If not problematic colors can be overwritten by modifying tokens.css or overriding specific custom properties.

## Testing

Run the test suite in watch mode:

```bash
pnpm test
```

Run the test suite once, for example in CI:

```bash
pnpm test --run
```

## Linting

Run all code checks, including the CSS linter:

```bash
pnpm check
```

To lint only the CSS files, run:

```bash
pnpm lint:css
```

## Running Storybook locally

Install the dependencies:

```bash
pnpm install
```

Start Storybook's development server:

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006). Changes to components and
stories are reflected automatically while the server is running.

To rebuild the library continuously while developing against it from another
project, run this in a separate terminal:

```bash
pnpm dev
```

## Changelog and releases

This project uses [Changesets](https://github.com/changesets/changesets) to
record user-facing changes and generate `CHANGELOG.md`. Add a changeset in the
same branch as each feature or fix:

```bash
pnpm changeset
```

The prompt asks which package changed, whether the release is a patch, minor,
or major, and for a short summary:

- `patch`: backwards-compatible bug fix
- `minor`: backwards-compatible feature or component
- `major`: breaking API or behavior change

Commit the generated `.changeset/*.md` file with the code change. Write its
summary for library users—for example, “Add a disabled state to Button”—rather
than describing implementation details. Documentation, tests, refactors, and
other changes that do not affect package users normally do not need a
changeset.

Check the pending release plan at any time with:

```bash
pnpm changeset:status
```

When preparing a release, first make sure the branch is clean and up to date,
then generate the version and changelog update:

```bash
pnpm changeset:version
```

This command updates `package.json`, creates or updates `CHANGELOG.md`, and
removes the consumed files from `.changeset/`. Review and commit those generated
changes. Finally, after authenticating with npm, validate and publish with:

```bash
pnpm release
```

Do not run `pnpm changeset:version` for every feature branch; run it only when
cutting a release. Never edit a published changelog entry to describe a new
change—add another changeset instead.

## Running Storybook with Docker

Build the production Storybook image and load it into the local Docker image
store:

```bash
docker build --load -t ambi-ui:latest .
```

The `--load` option is required when Docker uses the `docker-container` Buildx
driver. Without it, the result remains only in the build cache and cannot be
used by `docker run`.

Run the site on port 8080:

```bash
docker run -d \
  --name ambi-ui \
  --restart unless-stopped \
  -p 8080:80 \
  ambi-ui:latest
```

Open [http://localhost:8080](http://localhost:8080) and verify the container if
needed:

```bash
docker ps --filter name=ambi-ui
docker logs ambi-ui
curl -I http://localhost:8080
```
