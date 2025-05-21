function Component(constructor: Function){
    console.log(`Bu ${constructor.name} class`)
};
function LogProperty(target: any, propertyKey: string){
    console.log(`Bu ${propertyKey} property`)
}
function LogMethod(target: any, methodName: string, descriptor:PropertyDescriptor){
    console.log(`Bu ${methodName} method`)

}
function LogAccessor(target: any, name: string, descriptor:PropertyDescriptor){
    console.log(`Bu ${name} accessor`)
}

function LogParam(target: any, methodName: string, parametrIndex: number){
    console.log(`Bu ${methodName} ning ${parametrIndex} parametri`)
}






@Component
class Decorator{
    @LogProperty

    name: string = "Yamalinyoooo";
    contructor(name:string){
        this.name = name
    }
    @LogMethod
    logName(){
        console.log(this.name)
    }
    @LogAccessor
    get getName(){
        return this.name
    }
    add(@LogParam x: number,@LogParam y: number){
        return x + y
    }
    
}
