# UOW Sculptures Admin Dashboard
- A multi-functional and comprehensive admin dashboard for UOWAC staff to manage data for the UOW Sculptures mobile app. The app was built using Next.js (SSR React), Ant Design and styled-components for frontend; Typescript Node.js, PostgreSQL, Auth0 (authentication) and AWS S3 (cloud storage) for backend.  
- Checkout the mobile app [here](https://play.google.com/store/apps/details?id=com.UOW.UOWSculptures&hl=en) (built using React Native and Redux).  
- Checkout the Marketing website [here](https://uowac-sculptures.netlify.app/).  

## Getting started
### Prerequisites
Download Node.js and npm here: https://nodejs.org/en/
### Installation
1. `npm install`
2. `npm run dev` 
3. Go to http://localhost:3000 to see your app.

### Build
`npm run build` and `npm run start` to run the production version after build.

### Functionalities
**Note:** Please use this credential to login:   
- Email: uowac-admin@gmail.com
- Password: uowsculptures
#### 1. General trends and statistics of the system
![general1](https://i.imgur.com/DCMBxOE.png)
#### 2. Customized date picker to see trends and statistics in time interval
![general2](https://i.imgur.com/BRW9ir5.png)
#### 3. User proportion statistics
![user-proportion1](https://i.imgur.com/vcej4ua.png)
#### 4. View sculptures list (with support for searching and sorting)
![sculpture-list1](https://i.imgur.com/4aUgDnI.png)
#### 5. View sculptures detailed information
![sculpture-info](https://i.imgur.com/S0NQnR3.png)
#### 6. View social statistics (likes, comments, visits) of sculptures
![sculpture-social](https://i.imgur.com/ZCkAYpY.png)
#### 7. Populate data for new sculpture (with support for map integration and image upload)
![create1](https://i.imgur.com/Hc0J3XF.png)
![create2](https://i.imgur.com/pfK6c03.png)
#### 8. User management (with support for searching and sorting)
![user-list1](https://i.imgur.com/ogvKBaK.png)
#### 9. User profile
![user-list2](https://i.imgur.com/ibEvmGo.png)
#### 10. Recent activity management
![recent-act1](https://i.imgur.com/h0JusAP.png)
![recent-act2](https://i.imgur.com/Z21M4Hv.png)

## Built with
- [Next.js](https://github.com/vercel/next.js/) - Universal/Isomorphic React Framework with blazing-fast load time
- [Ant Design](https://github.com/ant-design/ant-design) - An enterprise-class UI design language and React UI library
- [styled-components](https://github.com/styled-components/styled-components) - Write CSS-in-JS, removes the mapping between components and styles
- [react-map-gl](https://github.com/visgl/react-map-gl) - React friendly API wrapper around Mapbox (map component)
- [Auth0 SPA SDK](https://github.com/auth0/auth0-spa-js) - Auth0 SDK for Single Page Applications (authentication)

## Authors and contributors
- Hieu Chu
- Long Hung Nguyen
- Hoang Nam Bui

## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
