const controller = require("../controller/logic/teacher.controller");

module.exports = (app) => {


    app.get("/teacher", (req, res, next)=>{
        controller.getAll(req, res, next);
    });

    app.get("/teacher/bydocumento/:documento", (req, res, next)=>{
        controller.getByDocumento(req, res, next);
    });

    app.post("/teacher", (req, res, next)=>{
        controller.createTeacher(req, res, next);
    });

    app.put("/teacher", (req, res, next)=>{
        controller.updateTeacher(req, res, next);
    });

    app.delete("/teacher", (req, res, next)=>{
        controller.deleteTeacher(req, res, next);
    });
};