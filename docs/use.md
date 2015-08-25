# Stand alone tool

You can install and run this tool as a stand alone CLI application.

    npm install -g ggit
    ggit --help
    # get last commit id in the current folder, save into json file
    ggit last -f build.json

# API

{%= _.doc("./docs/cloneRepo.md") %}
{%= _.doc("./docs/exec.md") %}
{%= _.doc("./docs/blame.md") %}
{%= _.doc("./docs/is-tracked.md") %}
{%= _.doc("./docs/has-changes.md") %}
{%= _.doc("./docs/commit.md") %}
{%= _.doc("./docs/push.md") %}
{%= _.doc("./docs/commits.md") %}
{%= _.doc("./docs/tracked-files.md") %}
{%= _.doc("./docs/commit-per-line.md") %}
{%= _.doc("./docs/numstat.md") %}
{%= _.doc("./docs/last-commit-id.md") %}
{%= _.doc("./docs/branch-name.md") %}
{%= _.doc("./docs/changed-files.md") %}
{%= _.doc("./docs/file-contents.md") %}
