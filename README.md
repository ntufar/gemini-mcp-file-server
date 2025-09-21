# Gemini MCP File Server

## Description

This application provides a simulated local file server interface. It allows you to browse a predefined file structure, select text-based files, and use the Google Gemini API to analyze, summarize, or ask questions about their content.

This project serves as a demonstration of how to integrate the `@google/genai` SDK into a React application to perform content analysis tasks in a user-friendly interface.

## Features

- **File Explorer**: A responsive, collapsible file navigator to browse through a simulated directory structure.
- **File Content Viewer**: Displays the content of any selected file.
- **Gemini Interaction Panel**: An intuitive interface to write prompts and receive analysis from the Gemini API based on the selected file's content.
- **Loading & Error States**: Clear visual feedback to the user during API calls and for handling potential errors.
- **Modern UI/UX**: A clean, dark-themed interface built with Tailwind CSS for a professional look and feel.

## How to Set Up

This application is designed to work in an environment where the Google Gemini API key is securely managed.

1.  **API Key**: The application expects the Gemini API key to be available as an environment variable named `API_KEY`. The code directly uses `process.env.API_KEY` to initialize the Gemini client. You must configure this environment variable in your deployment or local development setup.

    **Note**: Do not hardcode your API key directly into the source code.

2.  **Running the Application**: No build step is required. You can run this application by serving the `index.html` file with any simple static file server.

## How to Use

1.  Once the application is running, you will see a file explorer on the left-hand side.
2.  Click on the folders to expand them and view their contents.
3.  Click on a file (e.g., `project_brief.txt`) to select it.
4.  The content of the selected file will appear in the main panel on the right.
5.  In the "Ask Gemini" text area, type a question or instruction related to the file's content. For example:
    - "Summarize this file."
    - "What is the deadline mentioned in this document?"
    - "Explain the purpose of the `formatPrompt` function in `utils.ts`."
6.  Click the **Generate Analysis** button.
7.  The application will show a loading indicator while communicating with the Gemini API. The response will then be displayed in the "Gemini's Response" section.
