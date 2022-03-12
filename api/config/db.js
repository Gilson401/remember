const mongoose = require('mongoose');


const modulodb = "mongodb://localhost:27017/acoes" 


const connectDB = async (db =   modulodb ) => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

	console.log('MongoDB está conectado e pronto para uso');
	} catch (err) {
		console.error("MONGO NÃO CONECTADO",err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
