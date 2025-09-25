/**
 * Log Monitoring Application - Node.js
 * 
 * This application reads a log file containing job start and end times,
 */

const fs = require("fs");
const path = require("path");

// Path to the log file (make sure logs.log is in same folder)
const logFile = path.join(__dirname, "logs.log");

// Thresholds (in seconds)
const WARNING_THRESHOLD = 5 * 60; // 5 minutes
const ERROR_THRESHOLD = 10 * 60;  // 10 minutes

/**
 * Convert HH:MM:SS string into total seconds.
 */
function parseTimeToSeconds(timeStr) {
  const [hh, mm, ss] = timeStr.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
}

/**
 * Process logs and return job results.
 */
function processLogs(filePath) {
  const lines = fs.readFileSync(filePath, "utf-8")
    .trim()
    .split("\n")
    .map(l => l.trim()) // remove whitespace
    .filter(Boolean);   // remove empty lines

  const jobTracker = {};
  const results = [];

  for (let line of lines) {
    // Split safely and trim
    const parts = line.split(",").map(p => p.trim());
    if (parts.length < 4) continue; // skip malformed lines

    const [timeStr, pid, actionRaw, ...descParts] = parts;
    const action = actionRaw.toUpperCase(); // normalize
    const description = descParts.join(",").trim();
    const timestamp = parseTimeToSeconds(timeStr);

    if (action === "START") {
      jobTracker[pid] = { start: timestamp, description };
    } else if (action === "END" && jobTracker[pid]) {
      const duration = timestamp - jobTracker[pid].start;
      let status = "OK";

      if (duration > ERROR_THRESHOLD) status = "ERROR";
      else if (duration > WARNING_THRESHOLD) status = "WARNING";

      results.push({
        pid,
        description: jobTracker[pid].description,
        duration,
        status,
      });

      delete jobTracker[pid]; // clear completed job
    }
  }

  return results;
}

/**
 * Print report
 */
function generateReport(results) {
  console.log("=== Job Report ===");
  if (results.length === 0) {
    console.log("No jobs processed.");
    return;
  }
  results.forEach(job => {
    console.log(
      `PID: ${job.pid} | Job: ${job.description} | Duration: ${job.duration}s | Status: ${job.status}`
    );
  });
}

// Run
if (require.main === module) {
  try {
    const results = processLogs(logFile);
    generateReport(results);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

module.exports = { parseTimeToSeconds, processLogs };
