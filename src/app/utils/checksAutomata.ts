function checkAutomata(matricula: string){
    const regex =/^S[S-Y]-([1-9]\d{3}|0[1-9]\d{2}|00[1-9]\d{1}|000[1-9])-[A-Z]$/;
    return regex.test(matricula)
}


function checkGrafAutomata(matricula: string){
    const trueError=checkAutomata(matricula)
    const matriculaChain = matricula.split('');
    const matriculaletterAndNumber = matricula.split('-');
    const secondChar=/^[S-Y]$/;
    const notZero=/^000[1-9]$/;
    const isNumber=/^([1-9]\d{3}|0[1-9]\d{2}|00[1-9]\d{1})$/
    const lastChar=/^([A-Z])$/

    console.log(notZero.test(matriculaletterAndNumber[1]))
    if(matriculaChain.length !==9){
        return "incorrect";
    }
    if(matriculaChain[0]!="S"){ //q0-q1
        return "q0-q1";
    }
    if (!secondChar.test(matriculaChain[1])){ //q1-q2
        return "q1-q2";
    }
    if(matriculaChain[2]!="-"){ //q2-q3
        return "q2-q3";
    }
    if(matriculaChain[7]!="-"){ //q7-q8
        return "q7-q8";
    }
    if(!lastChar.test(matriculaChain[8])){ //q8-q9
        return "q8-q9";
    }
    if(!isNumber.test(matriculaletterAndNumber[1])&& !trueError){ //q12-q7
        return "q3-q10";
    }
    if(!notZero.test(matriculaletterAndNumber[1])&& !trueError){ //q6-q7
        return "q6-q7";
    }
   
   
    
    return "correct";
}


export {checkAutomata, checkGrafAutomata}