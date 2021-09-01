class Calculator {
    constructor(prevTextElement,currTextElement){
        this.prevTextElement = prevTextElement
        this.currTextElement = currTextElement
        this.clear()
    }

    clear(){
        this.currOp = ''
        this.prevOp = ''
        this.operation = undefined       
    }

    delete(){
        this.currOp = this.currOp.toString().slice(0,-1)
        

    }

    appendNum(num){
        if(num == '.' && this.currOp.includes('.')) return
        this.currOp = this.currOp.toString() + num.toString()
    }

    chooseOp(operation){
        if(this.currOp == '') return
        if(this.prevOp != '') {
            this.compute()
        }
            this.operation = operation
            this.prevOp = this.currOp
            this.currOp = ''

    }

    compute(){

        let computation 
        const previous = parseFloat(this.prevOp)
        const current = parseFloat(this.currOp)
        if(isNaN(previous) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = previous + current
                break;
             case '-':
                computation = previous - current
                break;
             case '*':
                computation = previous * current
                break;
             case '÷':
                computation = previous / current
                break;    
            default:
                return
        }
        this.currOp = computation
        this.operation = undefined
        this.prevOp = ''

    }

getDisplayNum(num){
    const stringNumber = num.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDispaly 
    if(isNaN(integerDigits)){
        integerDispaly = ''
    } else {
        integerDispaly = integerDigits.toLocaleString('en' , {
            maximumFractionDigits: 0 })   
    }
    if(decimalDigits != null) {
        return `${integerDisplay}.${displayDigits}`
    } else {
        return integerDispaly
    }
}

    update(){
this.currTextElement.innerText = this.getDisplayNum(this.currOp)
if(this.operation != null){
    this.prevTextElement.innerText = 
        `${this.getDisplayNum(this.prevOp)} ${this.operation}`
} else {
    this.prevTextElement.innerText = ''
    }
  }
}




const numButtons = document.querySelectorAll('[data-num]')
const operButtons = document.querySelectorAll('[data-op]')
const deleteButton = document.querySelector('[data-del]') 
const equalsButton = document.querySelector('[data-eq]') 
const allclearButton = document.querySelector('[data-clear]') 
const prevTextElement = document.querySelector('[data-prev]') 
const currTextElement = document.querySelector('[data-curr]') 


const calculator = new Calculator(prevTextElement,currTextElement)

numButtons.forEach(button => {
button.addEventListener('click' , () => {
    calculator.appendNum(button.innerText)
    calculator.update()
})
})

operButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOp(button.innerText)
        calculator.update()
    })
    })
    

equalsButton.addEventListener('click' , button => {
    calculator.compute()
    calculator.update()
        })

allclearButton.addEventListener('click' , button => {
    calculator.clear()
    calculator.update()
        })        
 
deleteButton.addEventListener('click' , button => {
    calculator.delete()
    calculator.update()
        })        

