# responsive-smart-tv-interface

A simple React application that lets users explore historical currency exchange
rates.

## Prerequisites

You need to have PNPM package manager installed. You can check the install
instructions on this [link](https://pnpm.io/installation).

If you have problems installing PNPM, you can delete "pnpm-lock.yaml" file and
install project dependencies using NPM or Yarn

## Installing and Running the Application

To install and run the application, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone git@github.com:tranquilEU/responsive-smart-tv-interface.git
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Start the app:**
   ```sh
   pnpm run start
   ```

### Optional

When you open the project in the Visual Studio Code editor, a small popup will
appear at the right bottom of the screen informing you that you can install the
recommended Visual Studio Code extension
[Tasks](https://marketplace.visualstudio.com/items?itemName=actboy168.tasks) for
this project. Installing it will add tasks to your Visual Studio Code status bar
at the bottom of the screen next to the current branch name.

This is a list of the available tasks which you can use by clicking on it:

- Install Dependencies => will install the project dependencies
- Start Frontend => will start the application in the browser in a new tab
- Start Proxy Server => will start the proxy server needed to avoid CORS error
  when fetching EPG data
- Start Frontend + Proxy Server => will start the application and the proxy
  server in the browser in a new tab
- Lint => will check the code for Eslint errors
- Type-check => will check the code for type errors
- Build => will build the project

You can use this tasks instead of typing the commands inside the terminal.
