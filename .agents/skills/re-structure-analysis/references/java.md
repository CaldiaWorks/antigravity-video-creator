# Java Language Reference — Structure Analysis

## Entry Point Patterns

```java
// Standard entry point
public static void main(String[] args)

// Spring Boot
@SpringBootApplication
public class Application { public static void main(String[] args) { SpringApplication.run(...); } }

// Servlet
@WebServlet("/path")
public class MyServlet extends HttpServlet

// Quarkus
@QuarkusMain
public class Main implements QuarkusApplication
```

Grep patterns:
- `public static void main` — standard entry points
- `@SpringBootApplication` — Spring Boot entry
- `@WebServlet\|extends HttpServlet` — servlet entry
- `@QuarkusMain` — Quarkus entry

## Project Configuration Files

| File | Purpose |
|:-----|:--------|
| `pom.xml` | Maven project and dependencies |
| `build.gradle` / `build.gradle.kts` | Gradle project and dependencies |
| `settings.gradle` | Multi-project Gradle config |
| `application.properties` / `application.yml` | Spring config |
| `web.xml` | Servlet deployment descriptor |
| `module-info.java` | Java module system (Java 9+) |

## Class and Function Definition Patterns

Grep patterns:
- `(public\|private\|protected).*(class\|interface\|enum\|record) ` — type definitions
- `(public\|private\|protected).*(static )?(synchronized )?\w+(<.*>)? \w+\(` — method definitions
- `@\w+` — annotations (Spring, JPA, etc.)
- `package ` — package declarations

## Import and Dependency Patterns

```java
import java.util.List;                // Standard import
import java.util.*;                   // Wildcard import
import static java.lang.Math.PI;     // Static import
```

Grep patterns:
- `^import ` — all imports
- `^import static` — static imports
- `<dependency>` / `<groupId>` — Maven dependencies (in pom.xml)
- `implementation\|api\|compileOnly` — Gradle dependencies

## Framework-Specific Patterns

### Spring Boot / Spring Framework
- `@Controller` / `@RestController` — web controllers
- `@Service` — service layer
- `@Repository` — data access layer
- `@Component` — generic Spring bean
- `@Autowired` / `@Inject` — dependency injection
- `@GetMapping` / `@PostMapping` — request mappings
- `@Entity` / `@Table` — JPA entities
- `@Configuration` / `@Bean` — Java-based config

### JPA / Hibernate
- `EntityManager` — persistence context
- `@Entity` / `@Table` / `@Column` — ORM mapping
- `CrudRepository` / `JpaRepository` — Spring Data repositories

### Jakarta EE
- `@EJB` — Enterprise JavaBeans injection
- `@Path` / `@GET` / `@POST` — JAX-RS REST endpoints
- `@Named` / `@RequestScoped` — CDI beans

## Version Detection

| Indicator | Java Version |
|:----------|:-------------|
| `var` local type inference | Java 10+ |
| `record` keyword | Java 16+ |
| `sealed` classes | Java 17+ |
| Text blocks (`"""..."""`) | Java 15+ |
| `switch` expressions with `->` | Java 14+ |
| Pattern matching `instanceof` | Java 16+ |
| `module-info.java` | Java 9+ |
| Source version in pom.xml: `<maven.compiler.source>` | Version indicator |
