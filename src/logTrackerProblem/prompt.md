You are given a set of log files populated with entries

[12:21:21 03.19.2024] [DEBUG] [123] - Database connection attempt failed retrying..
[12:21:22 03.19.2024] [INFO] [123] - Database connection active. connection ID
[12:21:22 03.19.2024] [ERROR] [42] - Database could not be reached error code: 1000.

Task:
Create a tracker that will ingest these logs and provide 3 pieces of functionality:

1. Give a count of all logs of a given log type.
2. Return sites with 3 or more errors.
3. Return select log entries of a given site

Bonus: How would you change your solution, if the log file was 10 gigs?