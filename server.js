var express =require('express'),
app=express();
cors=require('cors'),
bodyParser=require('body-parser'),
jwt=require('jsonwebtoken');


app.use(cors({
    origin:'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/authenticate', function(req, res){
    var token=jwt.sign({'uname':req.body.username}, 'marlabs-secret-key', {
        expiresIn:'1h'
    });
    if(req.body.username && req.body.password){
        res.send({
            isLoggedIn:true,
            token:token
        });
    } else {
        res.send({
            isLoggedIn:false
        });
    }
});
app.use(function(req,res,next){
    var token=req.body.authtoken || req.query.authtoken || req.headers['authtoken'];
jwt.verify(token, 'marlabs-secret-key', function(err,decoded){
    if(err){
res.send({
    err:true,
    msg: 'Invalid request'
});
    }
    else{
        req.decoded=decoded;
        next();
    }

});
});

app.get('/getproducts', function(req, res){
    console.log(req.decoded);
    res.send([
        {
          "productId": 1,
          "productName": "Leaf Rake",
          "productCode": "GDN-0011",
          "releaseDate": "March 19, 2016",
          "description": "Leaf rake with 48-inch wooden handle.",
          "price": 19.95,
          "starRating": 3.2,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
      },
      {
          "productId": 2,
          "productName": "Garden Cart",
          "productCode": "GDN-0023",
          "releaseDate": "March 18, 2016",
          "description": "15 gallon capacity rolling garden cart",
          "price": 32.99,
          "starRating": 4.2,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
      },
      {
          "productId": 5,
          "productName": "Hammer",
          "productCode": "TBX-0048",
          "releaseDate": "May 21, 2016",
          "description": "Curved claw steel hammer",
          "price": 8.9,
          "starRating": 4.8,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
      },
      {
          "productId": 8,
          "productName": "Saw",
          "productCode": "TBX-0022",
          "releaseDate": "May 15, 2016",
          "description": "15-inch steel blade hand saw",
          "price": 11.55,
          "starRating": 3.7,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
      },
      {
          "productId": 10,
          "productName": "Video Game Controller",
          "productCode": "GMG-0042",
          "releaseDate": "October 15, 2015",
          "description": "Standard two-button video game controller",
          "price": 35.95,
          "starRating": 4.6,
          "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
      }
      ]);
});
app.listen(3000, function(){
    console.log('server running @ localhost:3000');

})