#!/usr/bin/env node
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");

inquirer
  .prompt([
    { type: "input", message: "old-name", name: "oldName" },
    { type: "input", message: "new-name", name: "newName" },
    { type: "input", message: "relative path to the directory", name: "path" },
  ])
  .then((answers) => {
    (async () => {
      try {
        // Get the files as an array
        const files = await fs.promises.readdir(answers.path);

        // Loop them all with the new for...of
        for (const file of files) {
          // Get the full path for the iterated files
          const filePath = path.join(answers.path, file);

          //checks too see if anything contains the oldName
          if (filePath.includes(answers.oldName)) {
            //replaces old name with new in all directories
            const renamedPath = file.replace(answers.oldName, answers.newName);
            fs.rename(filePath, path.join(answers.path, renamedPath), (err) => {
              if (err) console.log(err);
            });
          }
        }
      } catch (e) {
        // Catch anything bad that happens
        console.error("We've thrown! Whoops!", e);
      }

      //changes name of main directory
      fs.rename(
        answers.path,
        answers.path.replace(answers.oldName, answers.newName),
        (err) => {
          if (err) console.log(err);
        }
      );
    })(); // Wrap in parenthesis and call now
  })
  .catch((e) => {
    console.log(e);
  });
