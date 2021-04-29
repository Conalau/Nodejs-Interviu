## Installation

After downloading the repo, open the project with VSCode and run:

```node.js
npm install
```

### Starting the solution

1. In order to start the server, run in terminal:

```js
npm run dev
```

2. Atferwards, open Postman and add a new header for all POST requests with the key:

```js
x - vamf - jwt;
```
and the value:Base64 encoding for the following format or similar:

```js
{
  "authenticated": true,
  "iss": "JWT Builder",
  "facility": ["12", "13"],
  "roles": ["Admin"]
}
```
3. Then, in the Postman body of the POST request, add either:
   - paste raw JSON payload with the following format or similar:

```js
    {
        "id" : "1",
        "resourceType" : "Practitioner",
        "name": [{"family":"TestFamily","given":["TestGiven"],"text":"TestFamily TestGiven"}],
        "facility": [
            {
                "value": "1",
                "system": "http://us.gov/NPI",
                "name": "Facility Name"
            },
            {
                "value": "2",
                "system": "http://us.gov/NPI",
                "name": "Other Facility Name"
            }
        ],
        "active": true
    }
```
