import { addition } from '../operations/addition.es6';
import { subtraction } from '../operations/subtraction.es6';
import { multiplication } from '../operations/multiplication.es6';
import { division } from '../operations/division.es6';

let commands = {};

function addCommand(name, command){
    if(commands.hasOwnProperty(name)){
        throw new Error('commands had ' + name);
    }else{
        commands[name] = command;
    }
}

addCommand('addition', addition);
addCommand('subtraction', subtraction);
addCommand('multiplication', multiplication);
addCommand('division', division);

export {
    commands,
    addCommand
};
