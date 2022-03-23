let mark = 0;
let index = 0;
let buttons = document.querySelectorAll(".btn")
let qst = document.querySelector("#qst")
let qstno = document.querySelector("#qstno")
let submit = document.querySelector(".submit")
let scoreBox=document.querySelector('.score')
let wraper=document.querySelector('.wraper')
let again=document.querySelector('.again')

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
            }

            index++
            if (index <= data.questions.length - 1) { 
                opt() 
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove('active_btn');
                }    
                e.target.classList.remove('active_submit')
            }
            else{
                wraper.hidden = true;
                scoreBox.hidden = false;
                document.querySelector('.score h1').textContent=`You answered correctly at ${mark}/${data.questions.length} questions`
            }
        }
    })

})

again.addEventListener('click',() => window.location="index.html" )






