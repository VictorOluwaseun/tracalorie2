# tracalorie2
A simple meal calorie tracker using Vanilla Javascript. Module design pattern is used.

---
## Note from the class. Please check

---
# TypeScript: When to Use **Type** vs **Interface**
A complete guide to understanding when to choose **type aliases** and when to choose **interfaces** in modern TypeScript.

---
## Table of Contents
- [Introduction](#introduction)
- [Quick Decision Guide](#quick-decision-guide)
- [When to Use Interface](#when-to-use-interface)
    - [Why Interfaces Are Powerful](#why-interfaces-are-powerful)
    - [Interface Examples](#interface-examples)
- [When to Use Type](#when-to-use-type)
    - [Why Types Are More Flexible](#why-types-are-more-flexible)
    - [Type Examples](#type-examples)
- [Type vs Interface: Side by Side Comparison](#type-vs-interface-side-by-side-comparison)
- [Advanced Scenarios](#advanced-scenarios)
- [Practical Guidelines for Real Projects](#practical-guidelines-for-real-projects)
- [Common Mistakes and Fixes](#common-mistakes-and-fixes)
- [Examples from Real Code](#examples-from-real-code)
- [Conclusion](#conclusion)

---

## Introduction
Both **type** and **interface** allow you to describe shapes of data in TypeScript. Choosing correctly improves readability and scalability.

### This guide explains:
- What each is best used for 
- How large teams choose between them 
- Examples from real world TypeScript development

---

## Quick Decision Guide
| Use Case                            | Choose        |
|-------------------------------------|---------------|
| Describing an object shape          | **Interface** |
| A DTO, API model, domain model      | **Interface** |
| Class contracts (implements)        | **Interface** |
| Extending multiple structures       | **Interface** |
| Union or intersection               | **Type**      |
| Function signature                  | **Type**      |
| Template literal types              | **Type**      |
| Complex mapped or conditional types | **Type**      |

---

## When to Use Interface
Interfaces are ideal for describing **object structures**.

## Use interface for:
- Object models 
- DTOs 
- API request and response types 
- Config objects 
- Class contracts 
- Anything expected to be extended or implemented

---

### Why Interfaces Are Powerful

Interfaces provide several advantages when modeling object shapes in TypeScript:

✔ **Extendable**  
Interfaces can extend one or more interfaces, allowing clear hierarchical modeling.

✔ **Mergeable**  
Multiple interface declarations with the same name automatically merge, making them flexible for library and API augmentation.

✔ **Clean syntax for object modelling**  
Interfaces provide a simple structure that is easy to read and ideal for describing domain entities, DTOs, and configuration objects.

✔ **Better developer experience for large systems**  
Interfaces play well with classes, dependency injection systems, and tooling, making them preferred in enterprise codebases.

---

## Interface Examples

### Basic Object Shape

```ts
interface User {
  id: string;
  name: string;
}
```
### Extending Interfaces

```ts
interface Product extends User {
  price: number;
}
```

### Declaration Merging

```ts
interface Profile {
  email: string;
}

interface Profile {
  age: number;
}

// Merged result
interface Profile {
  email: string;
  age: number;
}
```
This is not possible with `type`.

---
## When to Use Type
Use `type` when you need **advanced compositions** beyond simple objects.

### Why Types Are More Flexible
- Unions `(A | B)`
- Intersections `(A & B)`
- Template literal strings `api/${string}`
- Primitive aliases
- Function types 
- Conditional types 
- Complex mapped types

---

## Type Examples
### Union
```ts
type Status = "pending" | "success" | "failed";
```

### Extracting a specific literal
```ts
type SuccessStatus = Extract<Status, "success">;
```

### Intersection
```ts
type WithTimestamp = { createdAt: number };
type Entity = { id: string } & WithTimestamp;
```

### Function signature
```ts
type Callback = (value: number) => void;
```

### Template literal type
```ts
type Route = `api/${string}`;
```

## Type vs Interface: Side by Side Comparison
| Feature                  | Interface            | Type                       |
|--------------------------|----------------------|----------------------------|
| Extend another structure | ✅ `extends`          | ✅ using intersection (`&`) |
| Merge declarations       | ✅ Yes                | ❌ No                       |
| Supports unions          | ❌ No                 | ✅ Yes                      |
| Supports intersections   | ❌ No                 | ✅ Yes                      |
| Function signatures      | Possible but awkward | ✅ Recommended              |
| Template literal types   | ❌ No                 | ✅ Yes                      |
| Best for                 | Object shapes        | Complex type logic         |


---

## Advanced Scenarios

### 1. Interfaces for object hierarchies

Good for entity modelling:

```ts
interface Base {
  id: string;
}

interface User extends Base {
  username: string;
}
```

### 2. Types for reusable logic

```ts
type Nullable<T> = T | null;
```

### 3. Mix and match

You can combine both:

```ts
interface User {
  id: string;
}

type UserResponse = User | null;
```

---

## Practical Guidelines for Real Projects

### ✔ Always use **interface** when modelling domain objects
DTOs, responses, requests, entities.

### ✔ Use **type** when
You need union, intersection, template literals, function signatures.

### ✔ Avoid mixing both for the exact same thing
Stay consistent in the codebase.

### ✔ Interfaces scale better in large systems
Especially when collaborating with multiple developers.

---

## Common Mistakes and Fixes

### ❌ Mistake

Using `Pick` on a union type:

```ts
type Status = "pending" | "success" | "failed";
type SuccessStatus = Pick<Status, "success">;
```

### ✔ Fix

```ts
type SuccessStatus = Extract<Status, "success">;
```

---

## Examples from Real Code

### ❌ Wrong

```ts
type Item = {
  id: string;
}
```

### ✔ Correct

```ts
interface Item {
  id: string;
  name: string;
  calories: number;
}
```

---

## Conclusion

Use:

- **interface** when describing object shapes, models, or class structures
- **type** when doing unions, advanced composition, conditional types, or function signatures

Both are powerful, but each has a clearer purpose when applied correctly.

