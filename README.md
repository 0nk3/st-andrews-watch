# St. Andrews Watch

An anonymous reporting system for precinct residents to report crime, theft, and corruption.

## Features

- **Anonymous Reporting**: Submit reports without providing any personal information
- **Multiple Report Types**: Report crimes, theft, corruption, or other incidents
- **Reports Dashboard**: View all submitted reports in a clean, organized interface
- **Privacy-First**: No tracking or collection of personal data

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Submitting a Report

1. Visit the home page
2. Fill out the anonymous report form:
   - Select the type of incident (Crime, Theft, Corruption, Other)
   - Provide the location where the incident occurred
   - Enter the date of the incident
   - Describe what happened in detail
3. Click "Submit Anonymous Report"
4. Your report is saved securely and anonymously

### Viewing Reports

- Navigate to `/reports` to view all submitted reports
- Reports are displayed with their type, location, date, description, and submission time
- Each report has a unique ID for reference

## Data Storage

Reports are stored in a JSON file at `data/reports.json`. For production use, consider implementing a proper database solution.

## Privacy

This application is designed with privacy as a priority:
- No user authentication required
- No IP addresses or personal data collected
- No cookies or tracking mechanisms
- Reports are truly anonymous

## License

ISC