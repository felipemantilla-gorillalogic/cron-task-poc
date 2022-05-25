# Starting the project

just run the `yarn install` command, then run `yarn dev`, that's it

# routes

- [/sync-cancellations](http://localhost:3000/sync-cancellations)
- [/sync-odds-boosts](http://localhost:3000/sync-odds-boosts)
- [/sync-player-props](http://localhost:3000/sync-player-props)
- [/sync-user-stats](http://localhost:3000/sync-user-stats)
- [/sync-visitor-stats](http://localhost:3000/sync-visitor-stats)

# How to test it

Make any GET request to any of the above routes, then check the console, you should get a message with the next structure:

```json
{
  "route": "/sync-cancellations",
  "params": {},
  "startAt": 1653488401383,
  "endAt": 1653488401384,
  "executionTime": 1,
  "errors": [],
  "warnings": []
}
```

In some cases i included some errors and warnings inside the processes, just to show how its handle each situation. 
