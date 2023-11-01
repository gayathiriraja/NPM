const { async } = require("@firebase/util");
const express=require("express")
const app=express();

app.set('view engine','ejs');


var admin = require("firebase-admin");
const path = require("path");

app.set('views',path.join(__dirname,'public/views'))

const firebaseConfig = {
  "type": "service_account",
  "project_id": "noise-pollution-monitering",
  "private_key_id": "0eb420a3f3d71492a36e7cc9de39f4c8bfa68b9f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCH3JzxUE/YyIei\nqbA0YNQCK3QfTHx9dPnIXxKGcn0le19geFkqTePWm09VIYhpUAJwTwLnP9NUnQih\n4nF+K5LLUS35/QjMt0wqTOQN1XV4eCkb8JiGWEDMr95/VYqkuG2s5oR4h5M9XW2v\nqodYhqfZ4iawMa+B2q81mt1Q70aj8rl+k81nQ26z6zVBCE25Zo8YrxqcLVpB06VP\n+karY3xGSwUjNE7Eo6v4afAL3FyT968ad19hZQXoRkmExR+xC498gz8QErsfthMo\nXJN8oq5TuDuH3egQpxy2RCi4MGX5qmT3ZIsBOs4+kjPFnnQNGxn7qccFF+BEj6qp\nxrI5dKMnAgMBAAECggEACRpP7Z8q6mRtKgnig2/lZIvSyPIP+TvoLHOqQxXSqrs8\nZbNKjhoP5OYdB6AqipvQvgOdNy9Ako++71HDtudme3bh9LjuaQDy+naSZRbjOwIa\nBwQ0w/OPy+cQqklp86Vju8zqHUVAKUFkQvvS+6xx/Jg5bV622qVzTc0lfPG7MurM\nYuyuiXBWPe/xc5/IDcr/sAQdNBb3eo/G+cjWeV5njbJZ/LWdpWLzVNTaRBXLFiGK\nlme2Xgh+f9m2lbF75CQNJ5i7U0AzQHoOzSEzhyotZHRa7VL0QLKW45BqI9pXfZ4d\nbcZbjvuq8R+qFjkGLPgnBrFB3a9JJTFXRLn36dDiAQKBgQC8NcLH+M69OumypcxV\nKllgyVF5+wlfBUbmfCtrfRzxTfEp/3gM9kErl6LJrrz4h3TUdDDWpw3/DeySMfMG\nUPh9s6heUVQL9xj2ppBM3SkgWPQEW7a52ncvUxNkbng24hpbHG3zarVkQ+MnJQI/\ntGwoXYSxy1LzYpLqpvF2GUo4JwKBgQC4y/1rc4kPFpU48GYGV7h/7j9qKhRwrrA4\nLW16cn6w+f0s/aEvRC0sJUzUGsXFpjbnepctgGWSLCJr27Ul0LcrdSQquuy2dxGj\nlGVWDSgEaRY5DosEQVT4+v0hFnHaUxxsvYid7ETSHfqYYbJk2nFC9PBJszOXNemZ\ntA3srIIdAQKBgDxn3M4lsuTVBbCKuhwTbYA83OOTiJxwqyLKc30aOLHR3DcogTVX\ny+7byimE5a22e+68I/igwUM9CtKZKXC7iCWABefPnnQAqIhxSRsCWHLDWf4UGX9o\n+Ju9xBmVwwuKYf8gDsHzW6iEiWFE5YXguF30NeSCZ2sqFhEt542J7GI9AoGAGwhk\nOvq8uwNPsvOfyR+98qD0j+A1+0Hir2Ud1cK3+8WmHpW/pX1wqjuOoJyF/+LPt078\nnIBi214vbt3GAxEkKmxJbSLJC+whHW/Q3ySvjO2efZw+A9JWztFQhC2XXBu6VcHo\nIUn1y1LtXKs2AIDf/q58FBvt2Rne4UgwnUWjBwECgYB5c07XS065nY9mrUEZZjPK\nCBtbtEAkkx3uEkiGr58YWb3WhH8ks2fnvOdpCBUnz/0vbLcBV3vzgc4814K5bRVA\nEc8XJOEbiPdfcHiYYYqj1X/ZFHAhK49tRdwfT2pNcXRqRpHWaao0eh2ag8eBNY12\n6NxpmIZ1S5mNMUcnHtLLww==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-defb1@noise-pollution-monitering.iam.gserviceaccount.com",
  "client_id": "108808938227631267877",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-defb1%40noise-pollution-monitering.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://noise-pollution-monitering-default-rtdb.firebaseio.com"
});

// Reference to the databas
const db = admin.database();
var data1
setInterval(()=>{let ref = db.ref('sensor_data/NoiseLevelDB');

ref.once('value',(snapshot) => {
  data1 = snapshot.val()
})
.catch((error) => {
  console.error('Error retrieving data:', error);
});

},1500)

app.get('/monitoring',(req,res)=>{
  res.render('index.ejs',{value:data1});
})

app.use(express.static(path.join(__dirname+'/public')))

app.listen(8080,()=>{
  console.log('from 8080');
})

