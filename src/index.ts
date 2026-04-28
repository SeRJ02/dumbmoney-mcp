#!/usr/bin/env node
/**
 * DumbMoney MCP Server
 * Provides AI assistants with real-time access to verified coupons
 * and hot deals from DumbMoney.in
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_URL = "https://dumbmoney-mcp.somaniakshat02.workers.dev/mcp";

// ─── Tool Definitions ──────────────────────────────────────────────────────────

const TOOLS: Tool[] = [
  {
    name: "get_hot_deals",
    description: "Get today's hottest exclusive/verified deals from DumbMoney.in",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Max deals to return (default: 10)",
        },
      },
    },
  },
  {
    name: "get_coupons_by_store",
    description:
      "Get verified coupon codes for a specific store on DumbMoney.in (e.g. 'zomato', 'amazon', 'flipkart')",
    inputSchema: {
      type: "object",
      properties: {
        store_slug: {
          type: "string",
          description: "URL slug of the store e.g. 'zomato', 'flipkart'",
        },
        limit: {
          type: "number",
          description: "Max coupons to return (default: 10)",
        },
      },
      required: ["store_slug"],
    },
  },
  {
    name: "get_coupons_by_category",
    description: "Get coupons for a category on DumbMoney.in",
    inputSchema: {
      type: "object",
      properties: {
        category_slug: {
          type: "string",
          description:
            "Category slug e.g. 'food-and-beverage', 'travel-coupons', 'electronics-coupon-codes'",
        },
        limit: {
          type: "number",
          description: "Max coupons (default: 10)",
        },
      },
      required: ["category_slug"],
    },
  },
  {
    name: "search_coupons",
    description: "Search DumbMoney.in for coupon codes by keyword",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search term e.g. 'food delivery', 'flight'",
        },
        limit: {
          type: "number",
          description: "Max results (default: 10)",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "list_categories",
    description: "List all coupon categories available on DumbMoney.in",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

// ─── API Helper ────────────────────────────────────────────────────────────────

async function callDumbMoneyAPI(
  toolName: string,
  args: Record<string, unknown>
): Promise<unknown> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: toolName, arguments: args },
    }),
  });

  if (!response.ok) {
    throw new Error(`DumbMoney API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { result?: unknown; error?: { message: string } };

  if (data.error) {
    throw new Error(`DumbMoney API error: ${data.error.message}`);
  }

  return data.result;
}

// ─── Server Setup ──────────────────────────────────────────────────────────────

const server = new Server(
  { name: "dumbmoney-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  try {
    const result = await callDumbMoneyAPI(name, args);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// ─── Start ─────────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("DumbMoney MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
