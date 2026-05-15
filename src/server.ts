// server.ts - the MCP server that registers tools and handles agent requests 
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"; 
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"; 
// import { z } from "zod"; 
import { scanRepo, getFindings, ScanRepoInput, GetFindingsInput } from "./tools"


// create MCP server instance
const server = new McpServer({
name: "legit-security-server", 
version: "1.0.0"
});

// register the scan_repo tool 
server.tool(
    "scan_repo", 
    "Scans a repository for security vulnerabilites and stores findings for the tenant", 
    ScanRepoInput.shape, 
    async ({ apiKey, repoUrl }) => {
        // 1. call scanRepo with apiKey and repoUrl
            const result = scanRepo({apiKey, repoUrl}); 
            return { content: [{type: "text", text: JSON.stringify(result)}]}
    }
); 

// register the get_findings tool
server.tool(
    "get_findings",
    "Returns all security findings for the authenticated tenant",
    GetFindingsInput.shape, 
    async ({ apiKey }) => {
        // 1. call getFindings with {apiKey}
        const result = getFindings({apiKey}); 
        return { content: [{type: "text", text: JSON.stringify(result)}] }
        // 2. return { content [{type: "text", text: JSON.stringify(result) }] }
    }
);  

// start the sever using stdio transport
// stdio means the AI agent communcicates with this serve via stdin/stdout
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport); 
    console.error("Legit MCP server running"); 
}

main().catch(console.error); 