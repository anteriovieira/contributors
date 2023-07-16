# contributors

Contributors provides a simplified, cached, and anonymous layer to the GitHub API for retrieving contributors from a repository.

### Get contributors from respository

_Request_:

[https://contributors.laravel-auditing.com/owen-it/laravel-auditing](https://contributors.laravel-auditing.com/owen-it/laravel-auditing)

_Response_:

```json
{
  "contributors": [
    {
      "id": 4260727,
      "username": "raphaelfranca",
      "contributions": 495
    },
    {
      "id": 1490347,
      "username": "anteriovieira",
      "contributions": 422
    },
    {
      "id": 29139614,
      "username": "renovate[bot]",
      "contributions": 41
    }
  ]
}
```

# Development

- Clone this repository
- Install dependencies using `yan install`
- Run develop mode using `yan dev`

# License

Published under MIT [License](License).
