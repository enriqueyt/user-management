## Yarn Workspaces Setup

Yarn Workspaces allow you to setup multiple packages in such a way that you only need to run `yarn install` 

### Using Yarn Workspaces

To run a specific workspace, you can use the `yarn workspace` command followed by the workspace name and the command you want to run. For example:

```
yarn workspace workspace-name script-command
```

Replace `workspace-name` with the name of your workspace and `script-command` with one of the script commands defined in the `package.json` of that workspace.