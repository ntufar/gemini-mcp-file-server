# Gemini MCP File Server

## Description

This application provides a simulated local file server interface. It allows you to select a directory from your local machine, browse its file structure, select text-based files, and use the Google Gemini API to analyze, summarize, or ask questions about their content.

This project serves as a demonstration of how to integrate the `@google/genai` SDK and the browser's File System Access API into a React application to perform content analysis tasks in a user-friendly interface.

## Features

- **Real File System Access**: Uses the File System Access API to let you securely browse your own local directories.
- **File Explorer**: A responsive, collapsible file navigator to browse through the selected directory structure.
- **File Content Viewer**: Displays the content of any selected text-based file.
- **Gemini Interaction Panel**: An intuitive interface to write prompts and receive analysis from the Gemini API based on the selected file's content.
- **Demo Mode**: Includes a built-in demo file system to explore the app's functionality without needing to grant local file system access, or in environments where the API is not available (like sandboxed iframes).
- **Loading & Error States**: Clear visual feedback to the user during API calls and for handling potential errors.
- **Modern UI/UX**: A clean, dark-themed interface built with Tailwind CSS for a professional look and feel.

## How to Set Up

This application is designed to work in an environment where the Google Gemini API key is securely managed.

1.  **Browser Support**: This application requires a modern browser that supports the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API), such as Google Chrome or Microsoft Edge. If the API is unavailable, the application provides a fallback demo mode.

2.  **API Key**: The application expects the Gemini API key to be available as an environment variable named `API_KEY`. The code directly uses `process.env.API_KEY` to initialize the Gemini client. You must configure this environment variable in your deployment or local development setup.

    **Note**: Do not hardcode your API key directly into the source code.

3.  **Running the Application**: No build step is required. You can run this application by serving the `index.html` file with any simple static file server.

## How to Use

1.  Once the application is running, you will see a welcome screen.
2.  Click the **Select Directory** button. Your browser will open a dialog to choose a folder from your local file system.
3.  Alternatively, click **Load Demo** to use the built-in sample file system.
4.  After selecting a directory, a file explorer for that directory will appear on the left.
5.  Click on the folders to expand them and view their contents.
6.  Click on a file (e.g., `project_brief.txt`) to select it.
7.  The content of the selected file will appear in the main panel on the right.
8.  In the "Ask Gemini" text area, type a question or instruction related to the file's content. For example:
    - "Summarize this file."
    - "What is the deadline mentioned in this document?"
    - "Explain the purpose of the `formatPrompt` function in `utils.ts`."
9.  Click the **Generate Analysis** button.
10. The application will show a loading indicator while communicating with the Gemini API. The response will then be displayed in the "Gemini's Response" section.
