---
title: "Discriminated Unions in TypeScript"
description: "Using discriminated unions for type-safe pattern matching"
date: 2025-03-22
tags: ["typescript", "patterns", "type-safety"]
status: "evergreen"
---

# Discriminated Unions in TypeScript

One of TypeScript's most powerful features is the ability to create discriminated unions. These provide compile-time safety when handling different variants of data structures.

## The Problem: Handling Different Shapes

Consider a scenario where we need to handle different API response types:

```typescript
// Without discriminated unions
type ApiResponse = {
  data?: any;
  error?: string;
  loading?: boolean;
};

// This is problematic because properties are optional
function handleResponse(response: ApiResponse) {
  if (response.error) {
    // Show error...
  } else if (response.data) {
    // Process data...
  } else if (response.loading) {
    // Show loading state...
  } else {
    // What happens here? TypeScript doesn't help us
  }
}
```

This approach has several issues:

- Properties are optional, making it error-prone
- Nothing prevents incompatible combinations (data + error)
- TypeScript can't verify we've handled all cases

## Discriminated Unions Solution

A discriminated union uses a common property (the "discriminant") to differentiate between variants:

```typescript
type ApiSuccess<T> = {
  status: "success";
  data: T;
};

type ApiError = {
  status: "error";
  error: string;
};

type ApiLoading = {
  status: "loading";
};

type ApiResponse<T> = ApiSuccess<T> | ApiError | ApiLoading;
```

## The Power of Exhaustiveness Checking

Now we can use exhaustive pattern matching:

```typescript
function handleResponse<T>(response: ApiResponse<T>) {
  switch (response.status) {
    case "success":
      // TypeScript knows response.data exists here
      return processData(response.data);

    case "error":
      // TypeScript knows response.error exists here
      return showError(response.error);

    case "loading":
      return showLoadingIndicator();

    default:
      // Exhaustiveness check - this line should never execute
      // If we add a new status type, TypeScript will error here
      const _exhaustiveCheck: never = response;
      throw new Error(`Unhandled response status: ${_exhaustiveCheck}`);
  }
}
```

## Real-World Example: State Management

This pattern is particularly useful for state management:

```typescript
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { status: "loading" };

    case "FETCH_SUCCESS":
      return {
        status: "success",
        data: action.payload,
      };

    case "FETCH_ERROR":
      return {
        status: "error",
        error: action.payload,
      };

    default:
      return state;
  }
}
```

## Benefits in Vue and Nuxt Apps

When working with Vue and Nuxt, discriminated unions help create type-safe:

- Component props
- Store states
- API integrations
- Form validation states
