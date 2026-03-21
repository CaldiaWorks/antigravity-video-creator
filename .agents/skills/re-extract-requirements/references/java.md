# Java Language Reference — Requirements Extraction

## EARS Pattern Detection Guide

### Ubiquitous — Unconditional behavior
- Constructor body — always runs on instantiation
- Static initializer blocks `static { }` — class-level initialization
- `@PostConstruct` methods — Spring bean initialization
- Unconditional `return` in main flow
- Default values in builder patterns: `.withTimeout(30)`
- Field initializers: `private int value = 42;`

### Event-driven — Triggered by input
- `@GetMapping` / `@PostMapping` — Spring MVC handlers
- `@EventListener` — Spring event handlers
- `@JmsListener` / `@RabbitListener` — message queue consumers
- `@Scheduled(cron = "...")` — scheduled execution
- `doGet` / `doPost` — Servlet methods
- `@Path` + `@GET` / `@POST` — JAX-RS endpoints
- `main(String[] args)` — CLI invocation

### Unwanted — Error/validation conditions
- `if (x == null) throw new IllegalArgumentException(...)` — null guard
- `Objects.requireNonNull(x, "message")` — null check utility
- `try { } catch (SpecificException e) { }` — typed error handling
- `@Valid` / `@NotNull` / `@Size` — Bean Validation annotations
- Custom `Validator<T>` — Spring validator
- `Optional.orElseThrow()` — absent value guard
- `assert condition : "message"` — assertion (dev/test only)

### State-driven — Background/stateful behavior
- `@Scheduled(fixedRate = 5000)` — periodic execution
- `while (!Thread.interrupted()) { }` — service loops
- `ExecutorService.submit(...)` — async task submission
- `@Async` methods — Spring async execution
- `CompletableFuture.supplyAsync(...)` — async computation

### Optional — Configurable behavior
- `@Value("${property.key}")` — Spring property injection
- `@ConditionalOnProperty(name = "feature.enabled")` — conditional beans
- `System.getProperty("key")` / `System.getenv("KEY")` — system properties/env vars
- `@Profile("dev")` — profile-specific beans
- `application.properties` values — external configuration

## Concrete Value Extraction

### Thresholds and Constants
- `static final int MAX_RETRIES = 3;` — compile-time constants
- `private static final Duration TIMEOUT = Duration.ofSeconds(30);` — typed constants
- `enum` definitions — fixed value sets
- `@Max(100)` / `@Min(0)` / `@Size(max = 255)` — constraint annotation values

### Error Messages
- `throw new Exception("message")` — exception messages
- `logger.error("message", args)` — structured log messages
- `ResponseEntity.badRequest().body(...)` — API error responses
- HTTP status codes in `@ResponseStatus(HttpStatus.NOT_FOUND)`

### Configuration Keys
- `@Value("${section.key}")` — property key paths
- `@ConfigurationProperties(prefix = "section")` — property binding
- `@RequestParam("name")` / `@PathVariable("name")` — API parameter names
- Connection pool properties in `application.properties`

## Validation Patterns

- `Objects.requireNonNull(x)` — null check
- `StringUtils.isBlank(x)` / `StringUtils.isEmpty(x)` — string validation
- Bean Validation: `@NotNull`, `@NotBlank`, `@Size`, `@Pattern`, `@Email`
- Spring `Validator.validate(target, errors)` — programmatic validation
- `Optional.isPresent()` / `Optional.ifPresent(...)` — optional value handling
- `Preconditions.checkArgument(condition)` — Guava preconditions
