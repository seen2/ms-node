const express = require('express');
const {createProxyMiddleware}=require('http-proxy-middleware');

const app = express();
const port = 5000;

// Define routes for your microservices
const routes=[
    {
        route:'/users',
        target:'http://localhost:3003'
    },
    {
        route:'/auth',
        target:'http://localhost:3001'
    },
    {
        route:'/todo',
        target:'http://localhost:3002'
    }
];

for(const route of routes){
    app.use(route.route,createProxyMiddleware({
        target:route.target,
        changeOrigin:true,
        pathRewrite:{
            [`^${route.route}`]:''
        }
    }));

}

//start server
app.listen(port, () => {
    console.log(`API Gateway listening at http://localhost:${port}`);
});