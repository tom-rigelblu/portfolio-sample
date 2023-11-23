# rb / ops / linear airtable sync

**What it does:** Syncs linear to airtable (one-way)

**How it works:**

- Listens for linear's webhook messages
- Sends requests to airtable to update

## Getting started

- Set up dot env files

  ```sh
  make env_files
  ```

- Set ENV in .env

- Set up linear wehook

  - Create [Lnear Webookhook](https://linear.app/rigelblu/settings/api)

    | Env   | Local                                             | Production                                                  |
    | ----- | ------------------------------------------------- | ----------------------------------------------------------- |
    | Name  | `linear-airtable-issue-local`                     | `linear-airtable-issue-prod`                                |
    | URL   | {Paste url from ngrok}/_webhook/linear_           | https://rigelblu.com/_webhook/linear_                       |
    | Token | Copy signing secret into [.env.local](.env.local) | Copy signing secret into [.env.production](.env.production) |

- Set up airtable

  - Create [AirTable Personal Access Token](https://airtable.com/create/tokens)

    | Env   | Local                                             | Production                                                  |
    | ----- | ------------------------------------------------- | ----------------------------------------------------------- |
    | Name  | `linear-airtable-issue-local`                     | `linear-airtable-issue-prod`                                |
    | Token | Copy signing secret into [.env.local](.env.local) | Copy signing secret into [.env.production](.env.production) |
    | URL   | {Paste url from ngrok}/_webhook/linear_           | https://rigelblu.com/_webhook/linear_                       |
    | Token |                                                   | Add scopes ` data.record:read` `data.record:write`          |

- Start service

  ```sh
  make start

  # If testing locally
  ngrok http 8080
  ```

## Pull requests

- Do the following if env vars or google cloud function name changes

  ```sh
  make load-env # for development env
  make deploy-dev-env
  ```

## VSCode

- Copy path of poetry virtual env

  ```sh
  poetry env info --path
  ```

- In VS Code, open the Command Palette

- Type `Python: Select Interpreter` in the Command Palette and select it

- Select `enter interpreter path...`

- Paste path from the first step and press `Enter`
