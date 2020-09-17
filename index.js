const inquirer = require('inquirer');
const fs = require('fs')
const path = require('path')


inquirer.prompt([
    { type: 'input', message:"old-name", name:"oldName"} ,{ type: 'input', message:"exact path to the directory", name:"path"}, {type:'input', message:"new-name", name:"newName"}
]).then(answers => {
    console.log(answers);
    (async ()=>{
        // Our starting point
        try {
            // Get the files as an array
            const files = await fs.promises.readdir( answers.path );
    
            // Loop them all with the new for...of
            for( const file of files ) {
                // Get the full paths
                const filePath = path.join( answers.path, file );    
                // Stat the file to see if we have a file or dir
                const stat = await fs.promises.stat( filePath ).catch(e => {console.log(e);});
                if( stat.isFile() )
                    //console.log( "'%s' is a file.", filePath );
                    console.log()
                else if( stat.isDirectory() )
                    //console.log( "'%s' is a directory.", filePath );
                    if(filePath.includes(answers.oldName)){
                        console.log(filePath.replace(answers.oldName,answers.newName))
                        //console.log(path.join(answers.path,))
                    //     fs.rename(filePath, path.join(answers.path,answers.newName), function(err) {
                    //     if (err) {
                    //       console.log(err)
                    //     } else {
                    //       console.log("Successfully renamed the directory.")
                    //     }
                    //   })
                    }
                    

            }
        }
        catch( e ) {
            // Catch anything bad that happens
            console.error( "We've thrown! Whoops!", e );
        }
    
    })(); // Wrap in parenthesis and call now
}).catch((e) => {console.log(e);})