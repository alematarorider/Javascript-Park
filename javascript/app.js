const fs = require('node:fs');
// const fs = require('node:fs/prmise');
const path = require('node:path');
const os = require('node:os');

const usuario=os.userInfo().username;

let rutaDocumentos;

if(os.platform() === "win32"){
    rutaDocumentos=path.join("C:", usuario, "Documents")
}else{
    rutaDocumentos=path.join("/home", usuario, "Documents")
    }

    const contenido="hola Alumnos De coder"

    const archivoPath=path.join(rutaDocumentos, "miArchivoCoder.txt")

    fs.writeFile(archivoPath, contenido,(err)=> {
        if(err){
            console.log("error al crear archivo")
        }else{
            console.log("archivo guradado : ",archivoPath )
        }
    })
