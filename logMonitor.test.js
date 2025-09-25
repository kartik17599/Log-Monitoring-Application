const fs = require('fs');
const path = require('path');
const { parseTimeToSeconds, processLogs } = require('./logMonitor');

test('parseTimeToSeconds basic conversions', () => {
  expect(parseTimeToSeconds('01:00:00')).toBe(3600);
  expect(parseTimeToSeconds('00:05:30')).toBe(330);
});

test('processLogs detects OK, WARNING, ERROR', async () => {
  const data = `
12:00:00,111,START,Short Job
12:04:00,111,END,Short Job
12:00:00,222,START,Warning Job
12:07:10,222,END,Warning Job
12:00:00,333,START,Error Job
12:15:30,333,END,Error Job
  `.trim();

  const tmp = path.join(__dirname, 'temp_test.log');
  fs.writeFileSync(tmp, data);
  const results = await processLogs(tmp);
  fs.unlinkSync(tmp);

  expect(results).toEqual([
    { pid: '111', description: 'Short Job', duration: 240, status: 'OK' },
    { pid: '222', description: 'Warning Job', duration: 430, status: 'WARNING' },
    { pid: '333', description: 'Error Job', duration: 930, status: 'ERROR' },
  ]);
});
