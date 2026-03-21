# C# Language Reference — Requirements Extraction

## EARS Pattern Detection Guide

### Ubiquitous — Unconditional behavior
- Constructor body — always runs on instantiation
- Static constructors — class-level initialization (runs once)
- `Configure` / `ConfigureServices` — ASP.NET pipeline setup
- Unconditional `return` in main flow
- Default parameter values: `void Method(int x = 10)`
- Property initializers: `public int Value { get; set; } = 42;`

### Event-driven — Triggered by input
- `[HttpGet]` / `[HttpPost]` — ASP.NET action methods
- `IRequestHandler<TRequest, TResponse>.Handle` — MediatR handlers
- `INotificationHandler<T>.Handle` — MediatR event handlers
- `event EventHandler<T>` / `+= handler` — .NET event subscriptions
- `IConsumer<T>.Consume` — MassTransit message consumers
- `BackgroundService.ExecuteAsync` — hosted service trigger

### Unwanted — Error/validation conditions
- `if (x == null) throw new ArgumentNullException(...)` — null guard
- `if (!condition) throw new InvalidOperationException(...)` — state guard
- `try { } catch (SpecificException ex) { }` — typed error handling
- `catch (Exception ex) when (filter)` — exception filter
- `ModelState.IsValid` — ASP.NET model validation
- `FluentValidation` rules — declarative validation
- `Guard.Against.*` — Ardalis GuardClauses

### State-driven — Background/stateful behavior
- `BackgroundService.ExecuteAsync` with `while (!stoppingToken.IsCancellationRequested)` — service loop
- `IHostedService.StartAsync` — hosted service lifecycle
- `Timer` callbacks — periodic execution
- `Channel<T>.Reader.ReadAllAsync` — channel consumption loop

### Optional — Configurable behavior
- `IConfiguration["Key"]` / `IOptions<T>` — ASP.NET configuration
- `#if DEBUG` / `#if RELEASE` — conditional compilation
- `[Conditional("DEBUG")]` — conditional method execution
- Environment-specific config: `appsettings.Development.json`
- Feature flags: `IFeatureManager.IsEnabledAsync("flag")`

## Concrete Value Extraction

### Thresholds and Constants
- `const int MaxRetries = 3;` — compile-time constants
- `static readonly TimeSpan Timeout = ...` — runtime constants
- `enum` definitions — fixed value sets
- `[MaxLength(100)]` / `[Range(0, 100)]` — data annotation values

### Error Messages
- `throw new Exception("message")` — exception messages
- `_logger.LogError("message", args)` — structured log messages
- `ProblemDetails` / `ValidationProblem` — API error responses
- HTTP status codes in `StatusCode(...)` / `BadRequest(...)` calls

### Configuration Keys
- `Configuration["Section:Key"]` — config key paths
- `services.Configure<Options>(Configuration.GetSection("Section"))` — options binding
- `[FromQuery]` / `[FromRoute]` parameter names — API parameter names
- Connection string names in `GetConnectionString("name")`

## Validation Patterns

- `ArgumentNullException.ThrowIfNull(x)` — .NET 6+ null check
- `if (string.IsNullOrEmpty(x))` — string validation
- Data annotations: `[Required]`, `[StringLength]`, `[Range]`
- FluentValidation: `RuleFor(x => x.Property).NotEmpty().MaximumLength(100)`
- Custom `IValidatableObject.Validate` — self-validation
