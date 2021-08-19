//Alexandru-Andrei Carmici

//##############################
//1
//##############################
const obj={
    property: "A property",
    message1(){
        console.log("Hello Word!");
    },
    message2(){
        console.log("My name is Andrei!");
    },
    ["message"+3](){
        console.log("*DEFAULT MESSAGE*");
    },
    generator: function* () {
        let index=0;
        while (true)
            yield index++;
    },
    writeProperty(){
        return this.property;
    },
    get propertyUppercase(){
        return this.property.toUpperCase();
    },
    set propertySetter(prop){
        this.property=prop;
    },
    async msg1(){
        await this.message1();
    },
    async msg2(){
        await this.message2();
    }
};

obj.message1();
obj.message2();
obj.message3();
const iterator=obj.generator()
console.log(iterator.next().value)  // 0
console.log(iterator.next().value)  // 1
console.log(iterator.next().value)  // 2
console.log(iterator.next().value)  // 3
obj.msg1();
obj.msg2();
console.log(obj.propertyUppercase);
obj.propertySetter="A new property";
console.log(obj.propertyUppercase);

//##################################
//2
//##################################
var varMsg="message with var";

function action(){
    const constMsg="message with const";
    let letMsg="message with let";
    console.log(varMsg); //it is a global variable
    console.log(letMsg); //it is a local variable
    console.log(constMsg); //it is a constant variable
}
action();

const constMsg="message with const";
console.log(constMsg);

//##################################
//3
//##################################
const sum=(x,y,z,t) => {
    return x+y+z+t;
};

const numbers=[1,2,3,4];

console.log(sum(...numbers));// 10

console.log(sum.apply(null,numbers));//also 10

//##########################
//4
//##########################
const person={
    isHuman: false,
    printIntroduction: function() {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    }
}

function copyDeep(obj){
    let copy={};
    for(let i in obj)
        if(obj[i]&&typeof(obj[i])=="object")
            copy[i]=copyObject(obj[i]);
        else
            copy[i]=obj[i];
    return copy;
}

const Andrei=Object.create(person);

Andrei.name="Andre";
Andrei.isHuman=true;

Andrei.printIntroduction();

const newAndrei=copyDeep(Andrei);

newAndrei.name="New Andrei";
newAndrei.isHuman=true;

newAndrei.printIntroduction();

//##################################
//5
//##################################
const array=["Andrei","Alex","Bogdan"];
console.log("\n"+array[0]+"\n"+array[1]+"\n"+array[2]);

console.log(array.length);

console.log();
array.forEach((result)=>console.log(result));

console.log();
array.push("George");
array.forEach((result)=>console.log(result));

console.log();
array.pop();
array.forEach((result)=>console.log(result));

console.log();
array.shift();
array.forEach((result)=>console.log(result));

console.log();
array.unshift("\n");
array.forEach((result)=>console.log(result));

console.log();
array.splice(array.indexOf("Alex"),1);
array.forEach((result)=>console.log(result));
console.log();

//###########################
//6
//###########################
const successCallback=() => {
    console.log("SUCCESS CALLBACK!");
}
const errorCallback=() => {
    console.log("ERROR CALLBACK!");
}
const fct=(err,success) => {
    if(1+1==2)
        success();
    else
        err();
}

fct(errorCallback,successCallback);

const exp=true;

const promise=new Promise((resolve,reject) => {
    if(exp)
        resolve("DOABLE");
    else
        reject(new Error("NOT DOABLE"));
});

promise
    .then(result => console.log(result))
    .catch(err => console.log(err));

//###################################
//7
//###################################
function printMsg(msg){
    console.log(msg);
}

async function dateNow()
{
    try{
        const date=new Date;
        await printMsg(date.toString());
    }
    catch(err){
        console.log(err);
    }
}
dateNow();

//###################################
//8
//###################################
function makeFunction(){
    let text = "Hello!";
    function displayText(){
        console.log(text);
    }
    return displayText;
}

const func=makeFunction();
func();
