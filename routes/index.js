const sensorRoutes = require(./sensor);

const constructorMethod = app => {
app.use("/sensor", sensorRoutes);
app.get("/", (req, res) => {
res.render('layouts/form') });
app.use("*", (req,res) => {
res.status(404).json({ error: "404 Not Found"});});};
module.exports = constructorMethod;