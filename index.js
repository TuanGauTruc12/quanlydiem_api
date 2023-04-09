import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import router from "./routes/routes.js";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);


app.get('/', function(req, res){
    res.json({ message: 'Welcome to quan ly diem sinh vien api' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
