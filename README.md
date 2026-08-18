# ambi-ui

My custom component library used in new projects

## Tooling

- pnpm
- Vite +
- Storybook

## Dependencies

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

## Styling

- Tokens.css has primitives + roles. Always use roles never primitives in components.
- Some styles are exposed as data-attributes they are:
  -- fill

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

Use either Docker as your normal user or `sudo docker` consistently. They can
point to different Docker daemons, so an image built without `sudo` may not be
available to a command run with `sudo`.

Stop and remove the local container with:

```bash
docker stop ambi-ui
docker rm ambi-ui
```

### Rebuilding and relaunching an existing container

Rebuilding the image does not replace an existing container. If a container
named `ambi-ui` already exists, stop and remove it before starting the rebuilt
image:

```bash
docker build --load -t ambi-ui:latest .

docker stop ambi-ui
docker rm ambi-ui

docker run -d \
  --name ambi-ui \
  --restart unless-stopped \
  --network cephadex_2_internal-network-1 \
  ambi-ui:latest
```

Verify that the replacement container is running:

```bash
docker ps --filter name=ambi-ui
docker logs --tail 100 ambi-ui
```

If Docker reports that the container does not exist, check for similarly named
containers with:

```bash
docker ps -a --filter name=ambi-ui
```

Do not remove the shared Docker network. The replacement container will join
the existing network when it starts. Use either `docker` or `sudo docker`
consistently throughout these commands.

### Running behind a Docker reverse proxy

On a server where the reverse proxy runs in Docker, attach Ambi UI to the same
Docker network. Publishing a host port is not required:

```bash
docker run -d \
  --name ambi-ui \
  --restart unless-stopped \
  --network cephadex_2_internal-network-1 \
  ambi-ui:latest
```
