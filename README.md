Sync Users
=========


Getting started
---------------

Start app:
```
docker compose up -d
```

API server will be available at http://localhost:8000.

<br>

V1 Endpoints
---------------

**Start a Sync - POST `users`**
```
curl --request POST  http://localhost:8000/v1/users
```

Example Response
```
"Sync queued at 5/29/2021, 4:55:20 AM"
```
<br>

**Get Sync Status - GET `users/sync`**

```
curl --request GET http://localhost:8000/v1/users/sync
```

Example Response
```
"No syncs yet"
// OR
{
    "status": "Finished",
    "percentComplete": "100",
    "errors": [
        {
            "message": "User with email test4@example.com already updated in this sync",
            "external_id": "9"
        }
    ]
}
```
<br>

**List Users - GET `users`**
```
curl --request GET http://localhost:8000/v1/users
```

Example Response
```
[
    {
        "id": "10f91541-54e8-4d2c-bf45-4f5c04641324",
        "first_name": "test1",
        "last_name": "test1",
        "email": "jitewaboh@lagify.com",
        "external_id": "1",
        "gravatar": "https://gravatar.com/avatar/09abd59eb5653a7183ba812b8261f48b?d=404"
    },
    {
        "id": "26d37288-aa7d-45c6-b75b-7df701cc298f",
        "first_name": "test2",
        "last_name": "test2",
        "email": "test2@example.com",
        "external_id": "2",
        "gravatar": "https://gravatar.com/avatar/43b05f394d5611c54a1a9e8e20baee21?d=404"
    },
    {
        "id": "f0196efd-3172-41cf-99bc-61bdc7736749",
        "first_name": "test3",
        "last_name": "test3",
        "email": "test3@example.com",
        "external_id": "3",
        "gravatar": "https://gravatar.com/avatar/fedd8b80a7a813966263853b9af72151?d=404"
    },
    {
        "id": "a04c60a1-2c6e-4e3f-bfc0-00266c184156",
        "first_name": "test4",
        "last_name": "test4",
        "email": "test4@example.com",
        "external_id": "4",
        "gravatar": null
    },
    {
        "id": "8bec4ce6-5083-4b5d-99fd-0a4c02c6a030",
        "first_name": "test5",
        "last_name": "test5",
        "email": "test5@example.com",
        "external_id": "5",
        "gravatar": null
    },
    {
        "id": "c5d6350e-1681-444f-a759-100535fd5d9b",
        "first_name": "test6",
        "last_name": "test6",
        "email": "test6@example.com",
        "external_id": "6",
        "gravatar": null
    },
    {
        "id": "db0d0086-744b-4647-aaa5-59b47050513e",
        "first_name": "test7",
        "last_name": "test7",
        "email": "test7@example.com",
        "external_id": "7",
        "gravatar": null
    },
    {
        "id": "b5644fdb-5b22-44e3-94e8-3bb321df95f0",
        "first_name": "test8",
        "last_name": "test8",
        "email": "test8@example.com",
        "external_id": "8",
        "gravatar": null
    },
    {
        "id": "7a45200a-0a10-4d15-8649-5a8349cfe7de",
        "first_name": "test10",
        "last_name": "test10",
        "email": "test10@example.com",
        "external_id": "10",
        "gravatar": null
    },
    {
        "id": "517399c8-ea00-422f-9867-80de23f238e6",
        "first_name": "test11",
        "last_name": "test11",
        "email": "test11@example.com",
        "external_id": "11",
        "gravatar": null
    },
    {
        "id": "fe9f2394-c9a7-46c3-9fd8-1328838b82be",
        "first_name": "test12",
        "last_name": "test12",
        "email": "test12@example.com",
        "external_id": "12",
        "gravatar": null
    },
    {
        "id": "2a126d06-ee09-4388-add8-f715a2037bfd",
        "first_name": "test13",
        "last_name": "test13",
        "email": "test13@example.com",
        "external_id": "13",
        "gravatar": null
    },
    {
        "id": "22f0790c-a4c5-486d-b793-3bf148483e9e",
        "first_name": "test14",
        "last_name": "test14",
        "email": "test14@example.com",
        "external_id": "14",
        "gravatar": null
    },
    {
        "id": "9e9c1324-afeb-4c62-be9d-a8aed1214dd5",
        "first_name": "test15",
        "last_name": "test15",
        "email": "test15@example.com",
        "external_id": "15",
        "gravatar": null
    },
    {
        "id": "c09712c1-3c6b-456d-90c5-c9a44a92f189",
        "first_name": "test16",
        "last_name": "test16",
        "email": "test16@example.com",
        "external_id": "16",
        "gravatar": null
    },
    {
        "id": "ac96ed8b-53da-42a9-a80c-82a21d0997eb",
        "first_name": "test17",
        "last_name": "test17",
        "email": "test17@example.com",
        "external_id": "17",
        "gravatar": null
    },
    {
        "id": "ad6b9737-a10b-4fec-8dd6-dbdbfc6beffa",
        "first_name": "test18",
        "last_name": "test18",
        "email": "test18@example.com",
        "external_id": "18",
        "gravatar": null
    },
    {
        "id": "8e944fab-8854-4558-a7c8-5d7f31bdf659",
        "first_name": "test19",
        "last_name": "test19",
        "email": "test19@example.com",
        "external_id": "19",
        "gravatar": null
    },
    {
        "id": "a738e72b-e555-4f4c-88d5-220698239226",
        "first_name": "test20",
        "last_name": "test20",
        "email": "test20@example.com",
        "external_id": "20",
        "gravatar": null
    }
]
```
