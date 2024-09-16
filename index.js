const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const {credentials,contactus,program,cocurcular} = require("./mongodb")

const templatePath = path.join(__dirname, '../web_tech_assign/tempelates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))//telling your Express application to use the built-in middleware function to parse URL-encoded data from incoming requests and make it available on the req.body object.
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/home", (req, res) => {
    res.render("home")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/contactus", (req, res) => {
    res.render("contactus")
})

app.get("/admin", (req, res) => {
    res.render("admin")
})

app.get("/studentportal", (req, res) => {
    res.render("studentportal")
})

app.get("/feedback_cards_page", (req, res) => {
    res.render("feedback_cards_page")
})

app.get("/cocurcular", (req, res) => {
    res.render("cocurcularform")
})

app.get("/studentfeed", (req, res) => {
    res.render("studentfeed")
})

app.get("/contactList", async (req, res) => {
    try {
        const contacts = await contactus.find();
        res.render('contactList', { contacts });
    } catch (error) {
        console.error('Error fetching contact list:', error);
        res.status(500).send('Error fetching contact list');
    }
});

app.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await program.find();
        res.render('feedbacks', { feedbacks }); 
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).send('Error fetching feedbacks');
    }
});

app.get('/cocurcularfeedback', async (req, res) => {
    try {
        const feedbacks = await cocurcular.find();
        res.render('cocurcularfeedback', { feedbacks }); 
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
        res.status(500).send('Error fetching feedbacks');
    }
});

app.post("/signup", async (req, res) => {
    const data = {
        mail: req.body.mail,
        password: req.body.password,
        status: req.body.status,
        roll_number:req.body.roll_number,
    }

    await credentials.insertMany([data])

    res.render("studentportal")

})

app.post("/contactus", async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    };

    try {
        await contactus.create(data);
        res.render('home');
    } catch (error) {
        console.error('Error saving contact form data:', error);
        res.status(500).send('Error saving contact form data');
    }
});

app.post("/studentfeed", async (req, res) => {
    const data = {
        clarity: req.body.clarity,
        materials: req.body.materials,
        engagement: req.body.engagement,
        assessments: req.body.assessments,
        realWorld: req.body.realWorld,
        suggestions: req.body.suggestions
    };

    try {
        await program.create(data); 
        res.render('success');
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).send('Error saving feedback');
    }
});

app.post("/cocurcular", async (req, res) => {
    const data = {
        rollno: req.body.rollno,
        satisfaction: req.body.satisfaction,
        rating: req.body.rating,
        suggestions: req.body.suggestions
    };

    try {
        await cocurcular.create(data); 
        res.render('success');
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).send('Error saving feedback');
    }
});

app.post("/login", async (req, res) => {
    try{
        
        if (req.body.mail!==''){
            const check = await credentials.findOne({ mail: req.body.mail })
            if (check.password === req.body.password) {
                if (req.body.status === 'student' && req.body.status===check.status) {
                    res.render("studentportal")
                }
                else {
                    res.send("invalid student credentials")
                }
            }


            else {
                res.send("wrong password")
            }

        }
        else{
            const check = await credentials.findOne({ mail: req.body.amail })
            if (check.password === req.body.apassword) {
                if (req.body.astatus === 'admin' && req.body.astatus===check.status) {
                    res.render("admin")
                }
                else {
                    res.send("invalid admin credentials")
                }
            }


            else {
                res.send("wrogn password")
            }

        }
        
        }
    
    catch{
        res.send("invalid details")
    }
})

app.listen(3000, () => {
    console.log("port connected");
})