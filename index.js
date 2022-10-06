import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import methodOverride from 'method-override'
import { fileURLToPath } from 'url';
import { router } from './src/routes/turnoRouter.js';
import 'dotenv/config';
import './src/db/conexion.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

//Middelwares
app.use(morgan('common')); // 'dev' - 'combined'
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Setteo motor plantilla
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'));

app.use(router);
app.get('/', (req, res) =>{
    res.render('home')
})

app.listen(PORT, () => {
    console.log(`Aplicación con Yarn y ES6 corriendo en el Puerto: ${PORT}`);
});
