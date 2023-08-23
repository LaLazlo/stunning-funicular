import  express  from 'express' ;
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './Config/db.js';
import  userRouter from './Routes/UserRouter.js';
import  mejRouter from './Routes/MEJRouter.js';
import  incidentRouter from './Routes/IncidentRouter.js';
import  contractRouter from './Routes/ContractRouter.js';
import { errorHandler } from './Middlewares/errorMiddleware.js';
import multer from 'multer';
import MEJ from './Models/MEJModel.js'





dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();



const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
      const fileContent = req.file.buffer.toString();
      const instanceRegex = /product:([\s\S]*?)(?=\n\n|$)/g;
      const instances = fileContent.match(instanceRegex);

      if (instances) {
          for (const instance of instances) {
              const lines = instance.trim().split('\n');
              const parsedData = {
                  isAssigned: false,
              };

              for (const line of lines) {
                  const match = line.match(/(.*?):\s*(.*)/);
                  if (match) {
                      const [, key, value] = match;
                      parsedData[key.trim()] = value.trim();
                  }
              }
              const newDocument = new MEJ(parsedData);
              await newDocument.save();
          }
          res.status(200).send('Fichier téléchargé et données enregistrées');
      } else {
          res.status(400).send('Aucune instance trouvée dans le fichier téléchargé');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue');
  }
});


  
  
  

app.get('/', (req, res) =>{
    res.send('API is running...');
});

app.use('/api/users', userRouter);
app.use('/api/mej', mejRouter);
app.use('/api/incident', incidentRouter);
app.use('/api/contract', contractRouter);




app.use(errorHandler);



const PORT = process.env.PORT || 3000;


app.listen(PORT, () =>{
    console.log(`Server running in http://localhost/${PORT}`);
});