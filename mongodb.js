const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/StudentFeedback")

.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("failed to connect mongodb")
});

const LoginSchema=new mongoose.Schema({
    mail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    roll_number:{
        type:Number
    }
})

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    message: {
        type: String,
        required: true
    }
});

const ProgramSchema = new mongoose.Schema({
    clarity: {
        type: Number,
        required: true
    },
    materials: {
        type: Number,
        required: true
    },
    engagement: {
        type: Number,
        required: true
    },
    assessments: {
        type: String,
        required: true
    },
    realWorld: {
        type: String,
        required: true
    },
    suggestions: {
        type: String,
        required: true
    }
});

const CocurcularSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        required: true
    },
    satisfaction: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    suggestions: {
        type: String,
        required: true
    }
});


const credentials=new mongoose.model("credentials",LoginSchema);

const contactus=new mongoose.model("contactus",ContactSchema);

const program=new mongoose.model("program",ProgramSchema);

const cocurcular=new mongoose.model("cocurlcular",CocurcularSchema);


module.exports={credentials,contactus,program,cocurcular};