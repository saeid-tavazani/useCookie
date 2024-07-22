# React Custom Hooks for Cookie and Local Storage Management

این پروژه شامل دو Hook سفارشی React برای مدیریت کوکی‌ها و Local Storage است. این Hooks به شما امکان می‌دهند تا به راحتی مقادیر را در کوکی‌ها و Local Storage ذخیره، خوانده و به‌روز رسانی کنید.

## ویژگی‌ها

- مدیریت ساده کوکی‌ها با قابلیت تنظیم زمان انقضا
- ذخیره و بازیابی داده‌ها از Local Storage
- استفاده آسان با TypeScript

## نصب

برای استفاده از این Hooks‌ها، ابتدا باید پکیج `js-cookie` را نصب کنید:

```bash
npm install js-cookie
# یا
yarn add js-cookie



## نحوه استفاده

### استفاده از Hook مدیریت کوکی (`useCookie`)

برای استفاده از Hook مدیریت کوکی، از `useCookie` استفاده کنید. این Hook برای خواندن و نوشتن مقادیر کوکی‌ها کاربرد دارد و می‌توانید زمان انقضای کوکی را نیز تنظیم کنید.

#### مثال

```jsx
import React from 'react';
import useCookie from './path/to/useCookie'; // مسیر صحیح فایل hook

const App = () => {
  // استفاده از Hook برای خواندن و نوشتن مقادیر کوکی
  const [name, setName] = useCookie('name', 'defaultValue', 7);

  // تابعی برای به‌روز رسانی مقدار کوکی
  const updateCookie = () => {
    setName('newValue');
  };

  return (
    <div>
      <p>Current Cookie Value: {name}</p>
      <button onClick={updateCookie}>Update Cookie</button>
    </div>
  );
};

export default App;
