# Java Language Reference — Logic Visualization

## Control Flow Patterns

```java
// Conditional
if (condition) { } else if (other) { } else { }

// Switch statement
switch (value) {
    case "a": ...; break;
    case "b": ...; break;
    default: ...; break;
}

// Switch expression (Java 14+)
var result = switch (value) {
    case "a" -> ...;
    case "b" -> ...;
    default -> ...;
};

// Pattern matching instanceof (Java 16+)
if (obj instanceof String s) { /* use s */ }

// Enhanced for
for (var item : collection) { }

// Traditional for
for (int i = 0; i < n; i++) { }
```

## Error Handling Patterns

```java
try {
    ...
} catch (SpecificException e) {
    ...
} catch (IOException | SQLException e) {  // Multi-catch
    ...
} catch (Exception e) {  // Broad catch
    ...
} finally {
    ...
}

// Try-with-resources (auto-close)
try (var resource = new Resource()) {
    ...
}
```

Note: Try-with-resources auto-closes in reverse declaration order. This is an implicit `finally` block.

## Side Effect Patterns

### File I/O
- `Files.readString` / `Files.writeString` — NIO2 (Java 11+)
- `Files.readAllLines` / `Files.write` — NIO2
- `BufferedReader` / `BufferedWriter` — streaming
- `Files.createDirectories` — directory creation
- `ObjectMapper.writeValue` / `readValue` — Jackson JSON

### Network I/O
- `HttpClient.send(request)` — Java 11+ HTTP client
- `HttpURLConnection` — legacy HTTP
- `Socket` / `ServerSocket` — TCP
- `RestTemplate.getForObject` — Spring RestTemplate
- `WebClient.get()` — Spring WebFlux

### Database
- `jdbcTemplate.query(sql)` — Spring JdbcTemplate
- `entityManager.find(Entity.class, id)` — JPA EntityManager
- `repository.findById(id)` — Spring Data JPA
- `connection.prepareStatement(sql)` — JDBC
- `session.createQuery(hql)` — Hibernate

### Logging
- `logger.info\|warn\|error\|debug` — SLF4J / Log4j2
- `log.info\|warn\|error` — Lombok @Slf4j
- `System.out.println` — stdout (informal logging)

### State Mutations
- `this.\w+ =` — field mutation
- `static \w+ =` — static state mutation
- `Collections.synchronizedList` / `ConcurrentHashMap` — thread-safe collections
- `AtomicInteger.incrementAndGet` — atomic operations
- `synchronized (lock) { }` — synchronized blocks

### Process Control
- `System.exit(` — process termination
- `Runtime.getRuntime().exec(` — child process
- `Thread.interrupt()` — thread interruption

## Common Patterns Affecting Logic Flow

### Spring Dependency Injection
- `@Autowired` / `@Inject` — field/constructor injection
- `@Qualifier` — disambiguation
- `@Value("${property}")` — configuration injection
- Trace interface to implementation via `@Service` / `@Component` annotations

### Streams API
Stream pipelines create functional-style logic flow:
- `.filter()` / `.map()` — intermediate (lazy)
- `.collect()` / `.forEach()` / `.reduce()` — terminal (triggers execution)
- `.flatMap()` — nested collection flattening
- `parallelStream()` — parallel execution

### Reactive (Spring WebFlux)
- `Mono.just()` / `Flux.fromIterable()` — reactive publishers
- `.flatMap()` / `.map()` — transformation
- `.subscribe()` — terminal operation (triggers execution)
- `.onErrorResume()` / `.onErrorReturn()` — error handling

### AOP (Aspect-Oriented Programming)
Aspects can add invisible behavior around methods:
- `@Before` / `@After` / `@Around` — advice types
- `@Transactional` — transaction management (implicit begin/commit/rollback)
- `@Cacheable` — caching (implicit early return)
- `@Async` — async execution (offloads to thread pool)
