# C# Language Reference — Logic Visualization

## Control Flow Patterns

```csharp
// Conditional
if (condition) { } else if (other) { } else { }

// Switch statement
switch (value) {
    case "a": ...; break;
    case "b": ...; break;
    default: ...; break;
}

// Switch expression (C# 8+)
var result = value switch {
    "a" => ...,
    "b" => ...,
    _ => ...
};

// Pattern matching
if (obj is Type t) { /* use t */ }
switch (obj) {
    case Type t when t.Property > 0: ...
    case null: ...
}

// Null-conditional
obj?.Method()?.Property
var value = input ?? defaultValue;
```

## Error Handling Patterns

```csharp
try {
    ...
} catch (SpecificException ex) {
    ...
} catch (Exception ex) when (ex.InnerException != null) {  // Exception filter
    ...
} catch {  // Catch-all
    ...
} finally {
    ...
}
```

Note: `when` filters on `catch` can be easy to miss but affect control flow.

## Side Effect Patterns

### File I/O
- `File.ReadAllText` / `File.WriteAllText` — simple file ops
- `File.ReadAllLines` / `File.WriteAllLines` — line-based ops
- `StreamReader` / `StreamWriter` — streaming
- `Directory.CreateDirectory` / `Directory.Delete` — directory ops
- `JsonSerializer.Serialize` / `Deserialize` — System.Text.Json

### Network I/O
- `HttpClient.GetAsync` / `PostAsync` — HTTP client
- `TcpClient.Connect` — TCP connection
- `WebSocket.ConnectAsync` — WebSocket

### Database
- `context.Set<T>().Where(...)` — EF Core LINQ queries
- `context.SaveChangesAsync()` — EF Core persist changes
- `connection.ExecuteAsync(sql)` — Dapper
- `SqlCommand.ExecuteReader` — ADO.NET

### Logging
- `ILogger.LogInformation\|LogWarning\|LogError` — Microsoft.Extensions.Logging
- `_logger.Log*` — logger field pattern
- `Console.WriteLine` — console output
- `Debug.WriteLine` / `Trace.WriteLine` — diagnostics

### State Mutations
- `this.\w+ =` — field/property mutation
- `static \w+ =` — static state mutation
- Collection mutations: `List.Add` / `Dictionary[key] =`
- `Interlocked.Increment` / `volatile` — thread-safe mutations

### Process Control
- `Environment.Exit(` — process termination
- `Process.Start(` — child process
- `CancellationToken.ThrowIfCancellationRequested()` — cancellation

## Common Patterns Affecting Logic Flow

### Dependency Injection
Constructor-injected services are called via interface — trace the concrete implementation:
- `private readonly IService _service;` — injected dependency
- Registration in `Startup.cs` / `Program.cs` reveals concrete type

### Async/Await
- `await Task.WhenAll(...)` — parallel execution
- `await Task.WhenAny(...)` — first-to-complete
- `ConfigureAwait(false)` — context switch behavior
- `Task.Run(...)` — offload to thread pool

### LINQ
LINQ chains can hide complex logic. Deferred execution means the query runs at materialization:
- `.Where()` / `.Select()` — filtering/projection (deferred)
- `.ToList()` / `.ToArray()` / `.FirstOrDefault()` — materialization (executes query)
- `.GroupBy()` / `.OrderBy()` — aggregation (deferred)

### Middleware Pipeline (ASP.NET Core)
- `app.Use(...)` — inline middleware (calls `next()` to continue)
- `app.Map(...)` — branch pipeline
- `app.UseWhen(...)` — conditional middleware
