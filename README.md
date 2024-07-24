


# هوک‌های سفارشی React برای کوکی و localStorage

این مخزن شامل دو هوک سفارشی React است: `useCookie` و `useLocalStorage`. این هوک‌ها راهی ساده و مؤثر برای مدیریت حالت‌هایی که با کوکی‌های مرورگر و `localStorage` همگام می‌شوند، فراهم می‌کنند.

## فهرست مطالب

- [نصب](#نصب)
- [استفاده](#استفاده)
  - [useCookie](#usecookie)
  - [useLocalStorage](#uselocalstorage)
- [API](#api)


## نصب

برای استفاده از این هوک‌ها در پروژه خود، نیاز به نصب `react` و `js-cookie` دارید. می‌توانید آنها را با استفاده از npm یا yarn نصب کنید:

```bash
npm install js-cookie
```

یا

```bash
yarn add js-cookie
```

## استفاده

### `useCookie`

هوک `useCookie` برای مدیریت حالت‌هایی که با کوکی‌های مرورگر همگام می‌شوند استفاده می‌شود.

```javascript
import { useState, useEffect } from "react";
import Cookie from "js-cookie";

export default function useCookie<T>(
  key: string,
  initialValue: T | (() => T),
  expiresTime: number
) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = Cookie.get(key);
    if (jsonValue !== undefined) {
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value !== undefined) {
      Cookie.set(key, JSON.stringify(value), { expires: expiresTime });
    }
  }, [key, value, expiresTime]);

  return [value, setValue] as [typeof value, typeof setValue];
}
```

**نمونه استفاده:**

```javascript
import useCookie from './useCookie';

function App() {
  const [user, setUser] = useCookie('user', { name: 'John Doe' }, 7);

  return (
    <div>
      <h1>سلام، {user.name}</h1>
      <button onClick={() => setUser({ name: 'Jane Doe' })}>
        تغییر نام
      </button>
    </div>
  );
}
```

### `useLocalStorage`

هوک `useLocalStorage` برای مدیریت حالت‌هایی که با `localStorage` همگام می‌شوند استفاده می‌شود.

```javascript
import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    if (typeof initialValue === "function") {
      return (initialValue as () => T)();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
```

**نمونه استفاده:**

```javascript
import { useLocalStorage } from './useLocalStorage';

function App() {
  const [user, setUser] = useLocalStorage('user', { name: 'John Doe' });

  return (
    <div>
      <h1>سلام، {user.name}</h1>
      <button onClick={() => setUser({ name: 'Jane Doe' })}>
        تغییر نام
      </button>
    </div>
  );
}
```

## API

### `useCookie`

- `key` (`string`): کلید کوکی.
- `initialValue` (`T | (() => T)`): مقدار اولیه.
- `expiresTime` (`number`): زمان انقضای کوکی به روز.

### `useLocalStorage`

- `key` (`string`): کلید `localStorage`.
- `initialValue` (`T | (() => T)`): مقدار اولیه.

## مجوز

این پروژه تحت مجوز MIT منتشر شده است.
```
