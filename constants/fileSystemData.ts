
import type { Directory } from '../types';

export const root: Directory = {
  type: 'directory',
  name: 'MCP_ROOT',
  children: [
    {
      type: 'directory',
      name: 'documents',
      children: [
        { 
          type: 'file', 
          name: 'project_brief.txt', 
          content: 'Project Gemini Integration:\n\nGoal: Integrate Gemini API to analyze local file content.\nPhase 1: Build a simulated file navigator UI.\nPhase 2: Create an interaction panel for user prompts.\nPhase 3: Connect to Gemini API for analysis.\nDeadline: Q3 End.'
        },
        { 
          type: 'file', 
          name: 'quarterly_report.md', 
          content: '# Q2 Report\n\n## Summary\n- Performance exceeded targets by 15%.\n- Key project milestones were met on schedule.\n\n## Next Steps\n- Focus on user acquisition for the new feature.\n- Hire two senior engineers.'
        },
      ],
    },
    {
      type: 'directory',
      name: 'source_code',
      children: [
        {
          type: 'directory',
          name: 'gemini_service',
          children: [
            { 
              type: 'file', 
              name: 'index.ts', 
              content: `import { GoogleGenAI } from "@google/genai";\n\nconst ai = new GoogleGenAI({ apiKey: process.env.API_KEY });\n\nexport const analyzeContent = async (prompt: string) => {\n  const response = await ai.models.generateContent({\n    model: 'gemini-2.5-flash',\n    contents: prompt,\n  });\n  return response.text;\n};` 
            },
            { 
              type: 'file', 
              name: 'utils.ts', 
              content: 'export const formatPrompt = (fileContent: string, userQuery: string): string => {\n  return `Analyze the following file content and answer the user query.\\n\\nFILE CONTENT:\\n---\\n${fileContent}\\n---\\n\\nUSER QUERY: ${userQuery}`;\n};' 
            },
          ],
        },
        { 
          type: 'file', 
          name: 'App.tsx', 
          content: `import React from 'react';\n\nconst App = () => {\n  return <h1>Welcome to Gemini MCP</h1>;\n}\n\nexport default App;` 
        },
      ],
    },
    { 
      type: 'file', 
      name: 'README.md', 
      content: '# Gemini MCP Server\n\nThis application simulates a local file server and provides an interface to interact with Gemini for file content analysis. Do not upload sensitive information.' 
    },
  ],
};
