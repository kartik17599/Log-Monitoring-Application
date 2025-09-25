# 📊 Log Monitoring Application

A Node.js utility to monitor job execution times from a CSV-style log file.
It pairs START and END events by PID, calculates durations, and highlights jobs exceeding defined thresholds:

Status	Description
```
✅ OK	Job finished under 5 minutes
⚠️ Warning	Job runs longer than 5 minutes
❌ Error	Job runs longer than 10 minutes
```

📂 Project Structure
```
project-root/
├── logMonitor.js         # Main application logic
├── logMonitor.test.js    # Jest test cases
├── logs.log              # Sample log file
├── package.json          # npm config (scripts: start, test)
├── package-lock.json     # Auto-generated lock file
├── README.md             # Documentation
└── .gitignore            # Ignore node_modules and temp files
```

🚀 Getting Started
----------------------------------------------------
1️⃣ Clone the Repository
```
git clone <your-repo-url>
cd <repo-folder>
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Run the Application
```bash
npm run start
or
node logMonitor.js
```
4️⃣ Run Tests
```bash
npm test
```
📝 Log File Format
---------------------------------------------------------------------
Each log entry should follow:
```bash
HH:MM:SS,PID,START|END,Description
```
Example logs.log:
```bash
12:00:00,46578,START,Data Backup
12:07:30,46578,END,Data Backup
12:10:00,54321,START,File Sync
12:25:30,54321,END,File Sync
13:00:00,67890,START,ETL Process
13:04:30,67890,END,ETL Process
```
📊 Example Output
-----------------------------------------------------------------------
```bash
=== Job Report ===
PID: 46578 | Job: Data Backup   | Duration: 450s | Status: WARNING ⚠️
PID: 54321 | Job: File Sync     | Duration: 930s | Status: ERROR ❌
PID: 67890 | Job: ETL Process   | Duration: 270s | Status: OK ✅
```
📊 Actaul Output
-----------------------------------------------------------------------
<img width="693" height="883" alt="image" src="https://github.com/user-attachments/assets/70002091-818d-40bb-b62c-ac260a800e3d" />


🔧 Scripts
-----------------------------------------------------------------------
Add these to package.json:
```bash
"scripts": {
  "start": "node logMonitor.js",
  "test": "jest"
}
```
🧪 Testing
-----------------------------------------------------------------------
Unit tests are written using Jest and validate:
```
⏱️ parseTimeToSeconds → converts HH:MM:SS to seconds
```
🏷️ processLogs → identifies job durations and status (OK, WARNING, ERROR)
```
npm test
```
✔️ Example Test Output
 PASS  ./logMonitor.test.js
  Log Monitoring Application
    ✓ parseTimeToSeconds should correctly convert time (5 ms)
    ✓ processLogs should handle jobs and detect OK, WARNING, and ERROR (10 ms)

✨ Features
-----------------------------------------------------------------
🔍 Parse CSV log file with PID-based job tracking

⏱️ Calculate job durations

⚠️ Detect warnings (>5 min) and errors (>10 min)

🧪 Automated tests with Jest

📑 Easy to extend (log unfinished jobs, JSON output, or file reports)

📌 Next Improvements

📁 Output report to a file (CSV/JSON) instead of console

📊 Visualize job durations with a dashboard

⏰ Alerting mechanism (email/Slack notification for errors)

🕵️ Detect jobs that never finished (START but no END)

👨‍💻 Author
---------------------------------------------------
Built with ❤️ by Kartik Karanwal
