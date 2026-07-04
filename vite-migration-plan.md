# Vite Migration Plan

## Phase 1: Dependency Updates and Cleanup
* Audit and remove completely unused dependencies such as Redux, RxJS, and Normalizr from the project.
* Uninstall Create React App dependencies including react-scripts, craco, and any related legacy plugins.
* Install Vite along with the necessary Vite plugins for React and TypeScript integration.
* Upgrade core dependencies like React, React DOM, and TypeScript to versions that work smoothly with Vite.
* Clean up any forced version resolutions in the package configuration that were meant for the old build system.

## Phase 2: Configuration and File Relocation
* Relocate the main HTML template from the public folder to the root directory of the project.
* Modify the root HTML file to include a module script tag pointing to the main React entry file.
* Create a new Vite configuration file to handle React compilation, TypeScript, and basic path resolutions.
* Delete the outdated configuration files, specifically the Craco and Webpack configuration files.
* Update the TypeScript configuration file to use Vite-compatible compiler options and include the appropriate Vite environment types.

## Phase 3: Scripts Update and Verification
* Replace the legacy start, build, and test scripts in the package configuration with their Vite equivalents.
* Start the Vite development server to verify that the application compiles without errors and that environment variables are loaded properly.
* Run the Vite build command to ensure the production assets are generated correctly.
* Perform a manual run-through of the application in the browser to confirm that styling, routing, and core features function exactly as they did before.
