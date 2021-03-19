const express = require("express");
const path = require("path");

require("./db/conn")
const User = require("./models/usermsg")

const hbs = require("hbs");
const { registerPartials } = require("hbs");
 
const app = express();
const port = process.env.PORT || 4000;



const staticpath = path.join(__dirname, "../public")
const templatepath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")


app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
hbs.registerPartials(partialpath);
app.set("views", templatepath);



app.get("/", (req, res) => {
    res.render("index");
})


app.post("/contact", async (req, res) => {
    try {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index")
    } catch {
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log(`server run at ${port}`)
})