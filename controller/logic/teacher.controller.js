/** Dto */
const userDto = require("../../model/dto/user.dto");
const teacherDto = require("../../model/dto/teacher.dto");
const config = require("config");

/** Helper */
const helper = require("../helpers/general.helper");
const notHelper = require("../helpers/notification.helper")

exports.createTeacher = (req, res, next) => {
    let teacher = {
        documento: req.body.documento,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        department: req.body.department
    };
    teacherDto.create(teacher, (err, data) =>{
        if(err){
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        let r = config.get("roles").teacher;
        let user = {
            name: teacher.name,
            lastname: teacher.lastname,
            username: teacher.documento,
            password: helper.EncryptPassword(req.body.password),
            role: r
        };
        userDto.create(user, (err, u) => {
            if(err){
                teacherDto.delete({_id: data._id}, (err,data) => {
                console.log("Deleting due to not user creation.");

                return res.status(400).json(
                    {
                        error: err
                    }
                );
                });
                
                
            }
            notHelper.sendSMS(teacher.phone);
            res.status(201).json(
                {
                    info: data 
                }
            );
        });
    });
};

exports.updateTeacher = (req, res, next) => {
    let teacher = {
        documento: req.body.documento,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        office: req.body.office,
        department: req.body.department
    };
    teacherDto.update({_id: req.body.id}, teacher, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );

        }
        console.log("Fuera:"+req.body.olddocumento);
        if(req.body.olddocumento){
            console.log("Old Document:" + req.body.olddocumento)
            let r = config.get("roles").teacher;
            let user = {
            name: teacher.name,
            lastname: teacher.lastname,
            username: teacher.documento,
            password: helper.EncryptPassword(req.body.password),
            role: r
        };
        userDto.update({documento: req.body.olddocumento}, user, (err, u) => {
            if(err){

                return res.status(400).json(
                    {
                        error: err
                    }
                );
            }
            notHelper.sendSMS(teacher.phone);
            return res.status(201).json(
                {
                    info: data 
                }
            );
        });
        }
        res.status(201).json(
            {
                info: data
            }
        );
        
    });
};

exports.getAll = (req, res, next) => {

    teacherDto.getAll({},(err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );

    });
};

exports.getByDocumento = (req, res, next) => {

    teacherDto.getByDocumento({documento: req.params.documento}, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(200).json(
            {
                info: data
            }
        );

    });
};

exports.deleteTeacher = () =>{
    teacherDto.delete({ _id: req.body.id }, (err, data) => {
        if (err) {
            return res.status(400).json(
                {
                    error: err
                }
            );
        }
        res.status(204).json();

    });
}