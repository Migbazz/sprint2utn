import 'dotenv/config';
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient;


export const homeTurnos = (req, res) => {
    res.render('home')
}

export const getTurno = (req, res) =>{
    res.render('turno')
}

export const servicioHome = (req, res) => {
    res.render('servicios')
}
// Obtenemos las tareas
export const mostrarTurno = (req, res) =>{

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('myFirstDatabase');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);
            database.collection('turnos').find({}).toArray((error, results) =>{
                if (error) {
                    throw error;
                }else{
                    res.render('listadoturno', { 
                        results
                    })
                }
            })
        }
    });
};


export const getTurnoByID = (req, res) => {
    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('myFirstDatabase');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let { id } = req.params;

            database.collection('turnos').findOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.render('editarturno', { 
                        result
                    })
                }
            })
        }
    });
}


//Creación de las tareas
export const formTurno = (req, res) => {

    
    const { nombre, telefono, fecha, hora } = req.body;

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('myFirstDatabase'); 
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{ 

        console.log(`Conexion correcta a la Database`);        
            database.collection('turnos').insertOne({ nombre, telefono, fecha, hora }, (error, result) => {
                if (error) {
                    throw error;
                }else{
                    res.redirect('listadoturno')
                }
            })  
        } 
    }); 
}

//Actualizar Tareas
export const updateTurnos = (req, res) =>{

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('myFirstDatabase');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let {id} = req.params;

            console.log(ObjectId(id));
            
            const { nombre, telefono, fecha, hora} = req.body;

            database.collection('turnos').findOne({_id: ObjectId(id)}, {$set: {nombre, telefono, fecha, hora}} ,(error, result) => {
                error? console.log(error.message) :
                database.collection('turnos').replaceOne({_id: ObjectId(id)},{nombre, telefono, fecha, hora}, )
                //console.log(req.body)
                    res.redirect('/')
                })
        }
    });
};

//Eliminar tareas
export const borrarTurno = (req, res) => {

    MongoClient.connect(process.env.MONGOATLAS, (error, db) =>{
        const database = db.db('myFirstDatabase');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);
            
            const ObjectId = mongodb.ObjectId;
            const { id } = req.params;
            
        database.collection('turnos').deleteOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    res.redirect('/listadoturno')
                }
            })
        }
    });
}

