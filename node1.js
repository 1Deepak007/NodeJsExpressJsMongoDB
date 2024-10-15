//========================================================================
//==========================> File system <===============================
//========================================================================


const fs = require('fs');
// const input = process.argv;
// fs.writeFileSync(input[2],input[3])                 //filename,filecontent     //  nodemon node1.js apple.txt 'Apply is a tasty fruit.'


//================> Read file
const readfile = (filename) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
        if (err) {
            console.log('Error reading file. ', err)
            return;
        }
        else {
            console.log('File content : \n', data)
        }
    });
}
readfile('myfile.txt');



//===============> Writing in a file
const writefile = (filename, content) => {
    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.log('Error writing in file. ', err)
            return;
        }
        else {
            console.log('Content written in file successfully')
        }
    });
}
writefile('myfile.txt', 'Hello, this file is created using nodejs')

readfile('myfile.txt');



//================> Appending to a file
const addcontentinfile = (filename, content) => {
    fs.appendFile(filename, content,
        (err) => {
            if (err) {
                console.log('Error while appending in file', err);
                return;
            }
            else {
                console.log('File appended successfully')
            }
        }
    );
}
addcontentinfile('myfile.txt', '\nThis line is appended in this file using appendFile function of nodejs');

readfile('myfile.txt');



//=================> Check if file exists
const dofileexist = (filename) => {
    if (fs.existsSync(filename)) {
        console.log('File exists')
    }
    else {
        console.log('File do not exists')
    }
}

dofileexist('myfile.txt');


//================> Delete a file
const deleteFile = (filename) => {
    fs.unlink(filename, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
            return;
        }
        console.log('File deleted successfully');
    });
}
deleteFile('apple.txt')



//======> making file in a folder, pathmodule, getfilename, printfile in console <========
const path = require('path');

const filespath = path.join(__dirname,'files')
console.log('files_path : ',filespath);              // files_path : D:\LearnNGrow\Programming\NodeJs\files

const dirPath = path.join(__dirname);               // gives currant directory path
console.log('main_dir_path : ',dirPath);            // main_dir_path :  D:\LearnNGrow\Programming\NodeJs

// creating multiple file
for(i=1; i<=5; i++){
    fs.writeFileSync(filespath+`/multifile${i}.txt`,'text file created using loop')
}


// read and list files in files diractory
fs.readdir(filespath,(err,files)=>{
    console.log(files);
});


//====================================================================================
//===============================> FILE SYSTEM CRUD <=================================
//====================================================================================

const dirpath = path.join(__dirname,'crud');
const filepath = `${dirpath}/papaya.txt`
fs.writeFileSync(filepath,'This is a sample file.');
fs.readFile(filepath,(err,data)=>{
    console.log('Papaya file content : \n',data.toString());
})

// Append content in file
fs.appendFile(filepath,'\nPapaya is yellow in color.',(err)=>{
    if(err) console.log('Error while appending to papaya file',err);
    else console.log('Content appended to papaya file successfully')
})

// Renaming file
fs.rename(filepath, `${dirpath}/fruit_papaya.txt`,(err)=>{
    if(err) console.log('Error while renaming file',err);
    else console.log('file ranamed.')
})

// deleting file
fs.unlinkSync(`${dirpath}/fruit_papaya.txt`);
