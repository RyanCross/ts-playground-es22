You are given a set of files that contain the logs for various different client sites.

The logs are in the following format:
[HH:MM:SS MM:DD:YYYY] [LOG_LEVEL] [SITE_ID] - LOG_MESSAGE

Each log is a single line. 

SITE_ID is a whole number
LOG_LEVEL is an enum whose values whose possible values are as follows: DEBUG, INFO, WARNING, ERROR, CRITICAL


For example:
[12:21:21 03.19.2024] [DEBUG] [123] - Database connection attempt failed retrying..
[12:21:22 03.19.2024] [INFO] [123] - Database connection active. connection ID
[12:21:22 03.19.2024] [ERROR] [42] - Database could not be reached error code: 1000.


Generate me 3 log files adhering strictly to this format. Each file should contain multiple site ids and log levels, and should be around 10 entries log.

c log contains a site log entry from  505, another user login
b log contains a site log entry from 50