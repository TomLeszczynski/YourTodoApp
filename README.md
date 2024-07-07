# BACKEND

## API DESCRIPTION

## **GET**

http://127.0.0.1:3000

OR

http://127.0.0.1:3000/tasks

Returns all tasks in JSON format, e.g.

```javascript
// Action
fetch("http://localhost:3000/tasks")
    .then((res) => res.json())
    .((data) => data);
    
// Return
[
  {
    "id": "nsdo-dhhsd-8hs-dfg-7G",
    "task": "Pay taxes",
    "isDone": false
  },
  {
    "id": "hs-qh38g-74gh-4-h5g",
    "task": "Feed the cat",
    "isDone": true
  }
]
```

## **POST**

http://127.0.0.1:3000/tasks

Adds the whole task. Returns the added task in JSON format. Requires sending the appropriate headers and body with data, e.g.

```javascript
// Action
fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        task: "Pay taxes",
    }),
})
    .then((res) => res.json())
    .((data) => data);
    
// Return    
{
    "id": "sf48-8sr-ie7-fb3",
    "task": "Make a white tea",
    "isDone": false
},
```

## **PATCH**

http://127.0.0.1:3000/tasks/**ID**

Updates the task field by given id. Returns the updated task in JSON format. Requires sending **ID** parameter in address URL, the appropriate headers and body with data, e.g.

```javascript
// ACTION
fetch("http://localhost:3000/tasks/ID", {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        task: "Buy a good Gin",
    }),
})
    .then((res) => res.json())
    .((data) => data);
    
// RETURN
{
    "id": "dfgb-fgh-34g-ubo3-4g",
    "task": "Buy a good Gin",
    "isDone": false
},    
```

## **PATCH**

[http://127.0.0.1:3000/tasks/](http://127.0.0.1:3000/tasks/)**ID**/isDone

Updates the isDone field to value true by given id. Returns the updated task in JSON format. Requires sending **ID** parameter in address URL, e.g.

```javascript
// ACTION
fetch("http://localhost:3000/tasks/ID/isDone", {
    method: "PATCH",
})
    .then((res) => res.json())
    .((data) => data);
    
// RETURN
{
    "id": "ebfr-b3-b43-u4f-buh",
    "task": "Fix the car",
    "isDone": true
},
```

## **DELETE**

http://127.0.0.1:3000/tasks/**ID**

Deletes the whole task by given id. Returns id of the deleted task in JSON format. Requires sending **ID** parameter in address URL, e.g.

```javascript
// ACTION
fetch("http://localhost:3000/task/ID", {
    method: "DELETE",
    })
    .then((res) => res.json())
    .((data) => data);

// RETURN
{“id”:  “udSF-34uyv-u3rvu-vu4“}
```

******************************************************************************

# FRONTEND