```mermaid
sequenceDiagram
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server-->>Browser: {"message":"note created"}
    Note over Browser,Server: The browser re-renders the notes without refereshing the page
```