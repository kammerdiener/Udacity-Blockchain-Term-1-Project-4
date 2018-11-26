# Udacity Web Service Blockchain Project

Project built using the Express Framework

## USAGE
### Get Block
```
curl "http://localhost:8000/block/{{HEIGHT}}"
```
### Post Block
```
curl "http://localhost:8000/block/"

BODY: {
    "body": {{DATA FOR BLOCK}}
}
```

## SET UP
1. Run npm install
2. Run node server.js