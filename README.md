#  DumbMoney MCP Server

> A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that gives AI assistants real-time access to verified coupon codes and hot deals from [DumbMoney.in](https://dumbmoney.in).

[![npm version](https://img.shields.io/npm/v/dumbmoney-mcp)](https://www.npmjs.com/package/dumbmoney-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.io)

---

## ✨ What It Does

Connect your AI assistant (Claude, Cursor, etc.) to DumbMoney's coupon database and let it:

- 🔥 Fetch today's **hottest deals** across all categories
- 🏪 Look up **verified coupon codes** for any store (Zomato, Flipkart, Amazon, etc.)
- 🗂️ Browse coupons by **category** (Food, Travel, Electronics, Fashion, and more)
- 🔍 **Search** for coupons by keyword

---

## 🛠️ Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_hot_deals` | Get today's hottest exclusive/verified deals | `limit?` (default: 10) |
| `get_coupons_by_store` | Get verified coupons for a specific store | `store_slug` (required), `limit?` |
| `get_coupons_by_category` | Get coupons for a category | `category_slug` (required), `limit?` |
| `search_coupons` | Search coupons by keyword | `query` (required), `limit?` |
| `list_categories` | List all available categories | — |

### Available Categories

| Category | Slug |
|----------|------|
| Beauty | `beauty-coupon-codes` |
| Electronics | `electronics-coupon-codes` |
| Fashion | `fashion-coupon-codes` |
| Food and Beverage | `food-and-beverage` |
| Health and Nutrition | `health-nutrition-coupon-codes` |
| Sports | `sports-coupon-codes` |
| Travel | `travel-coupons` |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- An MCP-compatible client (Claude Desktop, Cursor, etc.)

### Installation

```bash
npm install dumbmoney-mcp
```

Or run directly with `npx`:

```bash
npx dumbmoney-mcp
```

---

## ⚙️ Configuration

### Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "dumbmoney": {
      "command": "npx",
      "args": ["dumbmoney-mcp"]
    }
  }
}
```

**Config file location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Cursor

Add to your Cursor MCP settings:

```json
{
  "mcpServers": {
    "dumbmoney": {
      "command": "npx",
      "args": ["dumbmoney-mcp"]
    }
  }
}
```

### Remote / SSE Mode (Claude.ai)

The server also runs as a remote SSE endpoint at:

```
https://dumbmoney-mcp.somaniakshat02.workers.dev/mcp
```

To use it with Claude.ai connectors, add the above URL as an MCP App.

---

## 💬 Example Prompts

Once connected, try asking your AI assistant:

> "What are the best deals available on DumbMoney right now?"

> "Find me Zomato coupon codes."

> "Show me travel coupons from DumbMoney."

> "Search for discounts on electronics."

---

## 🗂️ Project Structure

```
dumbmoney-mcp/
├── src/
│   └── index.ts          # MCP server entry point & tool definitions
├── dist/                 # Compiled output (generated)
├── .github/
│   └── workflows/
│       └── publish.yml   # Auto-publish to npm on release
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🧑‍💻 Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/dumbmoney-mcp.git
cd dumbmoney-mcp

# Install dependencies
npm install

# Build
npm run build

# Run locally
npm start
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR for any bugs or feature requests.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push and open a PR

---

## 📄 License

[MIT](./LICENSE) © Akshat Somani
