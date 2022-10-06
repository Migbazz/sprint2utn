import 'dotenv/config';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;


export const turnosHome = (req, res) => {
    res.render('home')
}

export const listadoHome = (req, res) => {

    MongoClient.connect(process.env.MONGOATLAS, (error, db) => {

        const database = db.db(process.env.MONGOATLAS)

        if (error) {
            console.log('Error en la conexión');
        } else{
            //console.log(`Base de Datos Conectada ${database}`);
            database.collection('tareas').find({}).toArray((error, result) =>{
                if(error){
                    console.log('Error en la conexión');
                }else{
                    res.render('tareas', { result });
                }
            })
        }
    });
} 

export const agregarTareas = (req, res) => {
    
    MongoClient.connect(process.env.MONGOLOCAL, (error, db) => {

        const database = db.db(process.env.DATABASE)

        if (error) {
            console.log('Error en la conexión');
        } else{

            const { titulo, autor, descripcion, nivel } = req.body;
            let dia = new Date();
            let fechaString = dia.toLocaleDateString();
            
            database.collection('tareas').insertOne({titulo, autor, descripcion, nivel, fecha: fechaString}, (error, result) =>{
                if(error){
                    console.log('Error en la conexión');
                }else{
                    console.log('Dato guardado correctamente' + JSON.stringify(req.body));
                    res.render('index');
                }
            })
        }
    });
}
