# 🄱🄰🄽🄶🄻🄰🄿🄰🅈
  \- Get payed, not played

[BanglaPay](https://bangla-pay-f4de.vercel.app/) is a fullstack application for viewing and posting salary compensations from Bangladeshi tech companies anonymously. 

## :pancakes: Technology Stack

- [TypeScript](https://www.typescriptlang.org/)
- Frontend
  - [Next.js](https://nextjs.org/)
  - [Tanstack Query](https://tanstack.com/query/latest)
  - [React Hook Form](https://react-hook-form.com/)
  - [ShadcnUi](https://ui.shadcn.com/)
  - [TailwindCSS](https://tailwindcss.com/)
- Backend
  - [Node.js](https://nodejs.org/en)
  - [Express](https://expressjs.com/)
  - [Google Sheets](https://workspace.google.com/intl/en_ca/products/sheets/) (As database)
  - [Firebase Auth](https://firebase.google.com/products/auth)
  - [Firebase Functions](https://firebase.google.com/products/functions)


## :european_castle: Architecture
This project is a monorepo where the frontend and backend code reside in the same repository. The Nextjs frontend communicates with the `Nodejs` backend. `Google Sheets` has been used as the backend and authentications is implemented using `Firebase Authentication`. The backend is deployed using Firebase functions, which is basically a serverless framework that lets us automatically run backend code in response to events triggered by HTTPS requests. The frontend is deployed using `Vercel hosting`.

### Frontend
<img width="500" alt="Frontend code structure" src="https://github.com/user-attachments/assets/bb17621a-12d3-45ee-9ec4-250714849f77">

### Backend
<img width="450" alt="Backend code structure" src="https://github.com/user-attachments/assets/f223250f-2477-4f53-89d1-904902692aae">

## :camera: Screenshots

### Login Page
Users can login with traditional email & password or with third party authentication such as Google and Github.

![Login page](https://github.com/user-attachments/assets/65b19367-a458-469d-bf74-565a480c0b96 "Login page")


### Registration Page
Users can register with traditional email & password.

![Registration page](https://github.com/user-attachments/assets/f9a45c05-4a1c-4172-832f-c661b4fbe740 "Registration page")


### Forgot password page
Users can reset their password in case they have forgotten it.

![Forgot password page](https://github.com/user-attachments/assets/d09371d1-15c0-48bb-9cfa-89d1321d6720 "Forgot password page")

### Compensations page
Users can view all the compensations posted by other users

![Compensations page](https://github.com/user-attachments/assets/a4ab1ad0-ed2c-47b1-973d-b46050e30c0d "Compensations page")


### Add compensation page
Users can anonymously add their own salary compensations

![Add compensation page](https://github.com/user-attachments/assets/d58a2b19-c688-4fef-a5bc-fa3c4ad171c8 "Add compensation page")


## :rocket: How to launch
Just click on <a href="https://bangla-pay-f4de.vercel.app" target="_blank">this</a> link!
