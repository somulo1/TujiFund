# TujiFund


```
/chama-app
├── /backend
│   ├── /cmd
│   │   └── chama-server/
│   │       └── main.go               # Entry point for the backend service
│   ├── /config
│   │   └── config.go                 # Configuration settings (e.g., DB, JWT keys)
│   ├── /controllers
│   │   ├── authController.go         # Authentication controller
│   │   ├── adminController.go        # Admin management functions
│   │   └── memberController.go       # Member contribution and dividend functions
│   ├── /models
│   │   ├── user.go                   # User model (with role-based permissions)
│   │   ├── contribution.go           # Contribution model
│   │   ├── transaction.go            # Transaction model (including dividends)
│   │   └── report.go                 # Report model for financial data
│   ├── /routes
│   │   ├── authRoutes.go             # Authentication routes
│   │   ├── adminRoutes.go            # Admin-specific routes
│   │   └── memberRoutes.go           # Member-specific routes
│   ├── /services
│   │   ├── authService.go            # Authentication logic (JWT, login)
│   │   ├── contributionService.go    # Logic for adding and updating contributions
│   │   ├── dividendService.go        # Logic for dividend calculation and disbursement
│   │   ├── reportService.go          # Financial reports logic (charts, statistics)
│   │   └── chatService.go            # WebSocket logic for real-time communication
│   ├── /utils
│   │   ├── db.go                     # Database connection utility
│   │   ├── jwt.go                    # JWT token generation and verification
│   │   └── helper.go                 # Other utility functions
│   ├── /middleware
│   │   ├── authMiddleware.go         # Middleware for protected routes
│   │   └── roleMiddleware.go         # Middleware to check user roles (admin, member)
│   ├── /websocket
│   │   └── websocketServer.go        # WebSocket server logic for real-time updates
│   └── go.mod                        # Go modules file (for dependency management)
├── /frontend
│   ├── /public
│   │   └── index.html                # Main HTML file for the frontend
│   ├── /src
│   │   ├── /assets
│   │   │   ├── /images               # Images for the UI (logo, icons, etc.)
│   │   │   └── /styles               # Global styles (CSS/SCSS files)
│   │   ├── /components
│   │   │   ├── Header.js             # Common header component
│   │   │   ├── Footer.js             # Common footer component
│   │   │   ├── MemberDashboard.js    # Member dashboard component
│   │   │   ├── AdminDashboard.js     # Admin dashboard component (secretary, chairman, etc.)
│   │   │   ├── ContributionList.js   # Contribution history component
│   │   │   └── Chat.js               # Real-time chat component
│   │   ├── /contexts
│   │   │   └── AuthContext.js        # Auth context to manage user authentication state
│   │   ├── /pages
│   │   │   ├── Home.js               # Landing page for the app
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Dashboard.js          # Main dashboard page (conditional for admin/member)
│   │   │   └── Reports.js            # Page for viewing financial reports
│   │   ├── /services
│   │   │   ├── authService.js        # Authentication functions (login, signup)
│   │   │   ├── apiService.js         # API requests handling (Axios or Fetch)
│   │   │   └── websocketService.js   # WebSocket service for real-time updates
│   │   ├── /utils
│   │   │   └── helpers.js            # Helper functions (date formatting, etc.)
│   │   ├── App.js                    # Main App component (router, layout)
│   │   └── index.js                  # Entry point for React
│   ├── package.json                  # Frontend dependencies
│   └── .env                          # Environment variables (API URL, WebSocket URL)
├── /docs
│   └── README.md                     # High-level documentation and project overview
└── /scripts
    └── deploy.sh                     # Deployment scripts (Docker, CI/CD, etc.)
```