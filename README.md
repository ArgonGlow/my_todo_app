As of commit de77d27 the app stores the users task in localStorage. The state of the task list should correctly store and be able to reproduce the users list between sessions. If a user is browsing in incognito mode, or they've configured their browser to remove cookies and other user data when it's closed, their tasks will be removed as well.
