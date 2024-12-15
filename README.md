# TujiFund App

TujiFund App is a powerful financial management platform designed specifically for cooperative groups (Chamas). It enables seamless tracking of individual contributions, dividend calculation, transaction management, and real-time updates, empowering members and administrators with greater control and visibility of their finances.

## Features

User Authentication & Authorization: Secure sign-up, login, and role-based access for members and admins.

Contribution Tracking: Track individual member contributions, making it easier to monitor progress and ensure transparency.

Dividend Calculation & Distribution: Automated calculations and fair distribution of dividends based on contributions.

Real-time Updates: Stay updated with live data using WebSockets for an interactive user experience.

Financial Reports & Visualizations: Access comprehensive financial reports and interactive visualizations to understand the group's financial health.

Admin Dashboard: Manage group members, track activities, and oversee all transactions from a dedicated admin interface.

## Getting Started

Follow these instructions to set up and run the TujiFund App locally on your machine.

## Prerequisites

Before you begin, ensure the following software are installed:

   * Go version 1.22.2 or higher (ServerSide)
   * React.js (for frontend)
   * SQLite3 (for database management)

## Installation

Clone the repository:

```bash
git clone https://github.com/somulo1/TujiFund.git
```

Navigate to the project directory:

```bash
cd TujiFund
```

Install Go dependencies:

* Run the following command to install required Go packages:

  go mod tidy

* Install Node.js dependencies (if applicable):

* Set up SQLite3 database:

Create and configure your SQLite3 database file (if not already created).
Update any necessary environment variables in .env or configuration files for database connection and other settings.

Run the application:

To start the application, run the following command:

```bash
go run backend/cmd/main.go
```

our application will be running locally at http://localhost:8080.

## Contributing

We welcome contributions to improve TujiFund App. To contribute:

* Fork the repository.
* Create a new branch (git checkout -b feature-branch).
* Make your changes and commit (git commit -am 'Add new feature').
* Push to the branch (git push origin feature-branch).
* Open a pull request for review.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License - see the LICENSE file for details.

## Contributors

Fred Gitonga    [FredMunene](https://github.com/FredMunene)

Godwin Ouma     [oumaoumag](https://github.com/oumaoumag)

Samuel Omullo   [samuelomulo](https://github.com/somulo1/TujiFund.git)

Stephens Odhiambo [steodhiambo](https://github.com/steodhiambo)

Hilary Omondi   [Hilary505](https://github.com/Hilary505/)

<div style="display: flex; gap: 10px;">
  <img src="https://learn.zone01kisumu.ke/git/avatars/1070f57cab96cb5627875bdb2b968ea5?size=870" alt="User Avatar 1" width="100" height="100" style="border-radius: 50%;" />
  <img src="https://learn.zone01kisumu.ke/git/avatars/9697c89a28a5879bddc2e28fac7b679e?size=870" alt="User Avatar 2" width="100" height="100" style="border-radius: 50%;" />
  <img src="https://learn.zone01kisumu.ke/git/avatars/d8351a9a577a3ef57486ba1e24819c8c?size=870" alt="User Avatar 3" width="100" height="100" style="border-radius: 50%;" />
  <img src="https://learn.zone01kisumu.ke/git/avatars/21a8520289459579567a739fc8de9d33?size=870" alt="User Avatar 4" width="100" height="100" style="border-radius: 50%;" />
  <img src="https://learn.zone01kisumu.ke/git/avatars/d05acb5758f408a6bf45142f8d5462ca?size=870" alt="User Avatar 5" width="100" height="100" style="border-radius: 50%;" />
</div>
