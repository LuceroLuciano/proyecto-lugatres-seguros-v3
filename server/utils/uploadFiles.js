// archivo para acargar las imagenes
const fs = require("fs");
const path = require("path");


const fileUpload = (file, namePath) => {
    try {
        let matches = file.match(/^data:(.+);base64,(.+)$/);
        //console.log("Match=>" + matches);
        let response = {};
        if(matches.length !== 3) 
            return new Error("Invalid input string file base64");
            console.log("Matches position 0 => " + matches[1]);
            response.type = matches[1];
            let extension = response.type.split("/");
            extension = extension[1];
            response.data = Buffer.from(matches[2],"base64");
            console.log("Extension => " + extension);

            if(!fs.existsSync(`${path.dirname(require.main.filename)}/server/public`)
            )   {
                fs.mkdirSync(
                    `${path.dirname(require.main.filename)}/server${namePath}`,
                    true
                );
            };

            let fileName = `${new Date().getTime()}.${extension}`;

            fs.writeFileSync(
                `${path.dirname(
                    require.main.filename
                )}/server${namePath}/${fileName}`,
                response.data,
                {
                    encoding:"utf8",
                }
            );           

        // esta es la imagen que se carga con base64
        return `${namePath}/${fileName}`;
    } catch (error) {
        return new Error("Internal Server Error");
    }
};

module.exports = { fileUpload };
