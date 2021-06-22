## Thomas Henocque Test Project 6-21-21

This project was built with [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

with my limited knowledge of React this framework allowed me to get up and running quickly with Routing States SASS etc.

The code for this app lives mainly in the following folders:

- pages/
- pages/team/
- page/teams/ (alternate version with filter)
- components/ 


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project has 3 pages

HomePage/Filterable Teams Lists

http://localhost:3000

Team View (fetch member data in User component)

eg. http://localhost:3000/team/5071b4fc-43f2-47a2-8403-e934dc270606

Team View with Filterable Team Members (slow fetch all member data on page load)

eg. http://localhost:3000/teams/5071b4fc-43f2-47a2-8403-e934dc270606



## Unit Testing: 

Using Jest -- issue figuring out which depencencies work with what. not enough time for this.

```bash
npm test
```

## Install: 

If a dependency is missing run

```bash
npm install
```


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.


