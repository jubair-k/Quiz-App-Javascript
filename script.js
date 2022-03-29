let mark = 0;
let index = 0;
let buttons = document.querySelectorAll(".btn")
let qst = document.querySelector("#qst")
let qstno = document.querySelector("#qstno")
let submit = document.querySelector(".submit")
let scoreBox=document.querySelector('.score')
let wraper=document.querySelector('.wraper')
let again=document.querySelector('.again')
let container=document.querySelector('.container')

scoreBox.hidden = true;

fetch('json.json')
.then( res => res.json() )
.then( data => {
    function opt() {
        scoreBox.hidden = true;
        qst.textContent = data.questions[index].question
        qstno.textContent = index + 1
        for (i = 0; i <= buttons.length - 1; i++)buttons[i].textContent = data.questions[index].answers[i]
    }
    opt()

    buttons.forEach((ele,ind) => {
        ele.addEventListener('click',function(){
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('active_btn');
            }
            ele.classList.add('active_btn')
            submit.classList.add('active_submit')
        })
    })

    selectOption=""
    submit.addEventListener('click',function(e){
        if(e.target.classList.contains('active_submit')){
            selectOption=document.querySelector(".active_btn")
            if(selectOption.textContent == data.questions[index].answers[data.questions[index].correctIndex]){
                mark += 1;
                container.classList.add('correct_answer')
                selectOption.classList.add('correct_answer')
            }
            else{
                container.classList.add('wrong_answer')
                selectOption.classList.add('wrong_answer')
                buttons[data.questions[index].correctIndex].classList.add('correct_answer')
            }

            e.target.textContent="Next";
            e.target.classList.add('next')
            e.target.classList.remove('active_submit')

        }
        else if(e.target.classList.contains('next')){
            index++
            console.log(index);
            if (index <= data.questions.length - 1) { 
                opt() 
                e.target.textContent="Submit";
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove('active_btn');
                    buttons[i].classList.remove('wrong_answer');
                    buttons[i].classList.remove('correct_answer');
                }    
                e.target.classList.remove('active_submit')
                e.target.classList.remove('next')
                container.classList.remove('correct_answer')
                container.classList.remove('wrong_answer')
            }
            else{
                container.classList.add('score_container')
                wraper.hidden = true;
                scoreBox.hidden = false;
                document.querySelector('.score h1').textContent=`You answered correctly at ${mark}/${data.questions.length} questions`
            }
        }
    })

})

again.addEventListener('click',() => window.location="index.html" )






