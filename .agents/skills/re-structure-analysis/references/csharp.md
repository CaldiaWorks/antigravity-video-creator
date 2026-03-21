# C# Language Reference — Structure Analysis

## Entry Point Patterns

```csharp
// Modern (.NET 6+) top-level statements
var builder = WebApplication.CreateBuilder(args);

// Traditional
static void Main(string[] args)
static async Task Main(string[] args)

// ASP.NET Core
public class Startup { public void Configure(...) }
public class Program { public static void Main(...) }

// Worker Service
public class Worker : BackgroundService
```

Grep patterns:
- `static.*void Main\|static.*Task Main` — traditional entry points
- `WebApplication\.CreateBuilder\|Host\.CreateDefaultBuilder` — ASP.NET Core
- `BackgroundService\|IHostedService` — background workers
- `top-level statements` — .NET 6+ (no Main method, code at file root)

## Project Configuration Files

| File | Purpose |
|:-----|:--------|
| `*.csproj` | Project file — target framework, dependencies, build settings |
| `*.sln` | Solution file — project grouping |
| `Directory.Build.props` | Shared MSBuild properties |
| `global.json` | SDK version pinning |
| `nuget.config` | NuGet package source configuration |
| `appsettings.json` / `appsettings.*.json` | Application configuration |
| `launchSettings.json` | Debug/launch profiles |

## Class and Function Definition Patterns

Grep patterns:
- `(public\|internal\|private\|protected).*(class\|struct\|record\|interface\|enum) ` — type definitions
- `(public\|internal\|private\|protected).*(static )?(async )?\w+ \w+\(` — method definitions
- `namespace ` — namespace declarations

Note: C# uses file-scoped namespaces (`namespace Foo;`) since C# 10.

## Import and Dependency Patterns

```csharp
using System.Collections.Generic;     // Namespace import
using static System.Math;             // Static import
using Alias = Full.Namespace.Type;    // Alias import
global using System.Linq;             // Global using (C# 10+)
```

Grep patterns:
- `^using ` — all using directives
- `<PackageReference Include=` — NuGet dependencies (in .csproj)
- `<ProjectReference Include=` — project-to-project references

## Framework-Specific Patterns

### ASP.NET Core
- `[ApiController]` / `[Controller]` — controller classes
- `[HttpGet]` / `[HttpPost]` — action methods
- `[Route("...")]` — routing attributes
- `services.Add*` / `builder.Services.Add*` — DI registration
- `app.Map*` / `app.Use*` — middleware pipeline

### Entity Framework Core
- `DbContext` — database context
- `DbSet<T>` — entity collections
- `OnModelCreating` — fluent configuration
- `Migrations/` — database migrations

### MediatR / CQRS
- `IRequest<T>` / `IRequestHandler<T>` — commands/queries
- `INotification` / `INotificationHandler` — events

## Version Detection

| Indicator | .NET / C# Version |
|:----------|:-------------------|
| Top-level statements | C# 9 / .NET 5+ |
| File-scoped namespace (`namespace Foo;`) | C# 10 / .NET 6+ |
| `record` keyword | C# 9 / .NET 5+ |
| `required` modifier | C# 11 / .NET 7+ |
| Primary constructors on classes | C# 12 / .NET 8+ |
| `<TargetFramework>net8.0</TargetFramework>` | .NET 8 (in .csproj) |
