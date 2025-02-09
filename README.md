# Family Tree Management App

This is a family tree management application built using **React**, **Redux**, and **Material UI**. The app allows users to manage a family tree by adding, updating, and viewing family members in a hierarchical structure. The family tree is displayed using expandable accordion components, where users can view parents and their children.

## Features

- **Add Person**: Allows users to add new people to the family tree, including the option to specify their parents.
- **Update Person**: Enables users to update the details (name and age) of an existing person in the family tree.
- **View Family Tree**: Displays a hierarchical tree of family members where parents are the top-level nodes, and their children are nested beneath them.
- **Dynamic Accordion**: Each person’s details can be expanded or collapsed to view their children, making the tree structure intuitive and easy to navigate.

## Tech Stack

- **React**: Frontend UI.
- **Redux**: State management.
- **Redux-Saga**: Asynchronous Redux side effects.
- **Material UI**: UI components and styling.
- **TypeScript**: Static typing for the project.
- **Axios**: For making HTTP requests (assumed for API interaction).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/family-tree-client.git

2. Navigate into the project directory:
   ```bash
   cd family-tree-client
3. Install the dependencies:
   ```bash
   yarn install

## Development

To start the development server:
```bash
yarn start
```
This will run the app in development mode and open it in your browser. The page will automatically reload if you make edits.

## License

This project is licensed under the MIT License.


