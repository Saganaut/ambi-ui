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

- Buttons
- Pagination
- Popover & utility PopoverWrapper
- Dropdown Menu

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

### Running behind a Docker reverse proxy

On a server where the reverse proxy runs in Docker, attach Ambi UI to the same
Docker network. Publishing a host port is not required:

```bash
docker run -d \
  --name ambi-ui \
  --restart unless-stopped \
  --network ceph_default \
  ambi-ui:latest
```

Replace `ceph_default` with the reverse proxy's network. The proxy can then
forward requests to `http://ambi-ui:80`.
