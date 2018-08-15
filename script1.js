/*Variable declaration*/
let button=document.querySelector("button");
let input=document.querySelector("input");
let label=document.querySelector("label");
let container=document.querySelector(".container");
let container1=document.querySelector(".container1");
let question=document.querySelector("#question");
let question_number=document.querySelector("#question_number");
let question_button=document.querySelector("#question_button");
let answer1=document.querySelector(".ans1");
let answer2=document.querySelector(".ans2");
let answer3=document.querySelector(".ans3");
let answer4=document.querySelector(".ans4");
let startagain=document.querySelector("#startagain_button");
let skipquestion=document.querySelector("#skip_button");
let submitanswer=document.querySelector("#answer_button")
let question_counter=0;
let arr=[];
let duplicate=false;
let allradio=document.querySelectorAll(".radio_select");
let temp=0;
let counter=0;
let alllabel=document.querySelectorAll("label");
let popupbox=document.querySelector(".popup_box");
let questionAttempted=0;
let questionCorrect=0;
let questionIncorrect=0;
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let question_attempted=document.querySelector("#question_attempted");
let correct_question=document.querySelector("#correct_question");
let incorrect_question=document.querySelector("#incorrect_question");
let success=document.querySelector("#success");
let ans_row1=document.querySelector(".ans_row1");
let ans_row2=document.querySelector(".ans_row2");
let ans_row3=document.querySelector(".ans_row3");
let ans_row4=document.querySelector(".ans_row4");
let blink=0;
let temp_duplicate=[];
let timer_stop;
var x2 = document.getElementById("time_counter");
/*Button event to take the number from user for which table is to be practiced*/
button.addEventListener("click",function(){
	if(input.value===""){
		var popup = document.getElementById("myPopup");
    	popup.classList.toggle("show");
	}else{
		counter=input.value;
		button.parentNode.removeChild(button);
		input.parentNode.removeChild(input);
		label.parentNode.removeChild(label);
		container.parentNode.removeChild(container);
		createPuzzle();
		startTimer();
		}
});


/*Button event to start the program again*/
startagain.addEventListener("click",function(){
	window.location.href="index.html";
});


/*Button event to skip the question*/
skipquestion.addEventListener("click",function(){
	clearInterval(timer_stop);
	createPuzzle();
	startTimer();
})

/*Function to create question for tables*/
function createPuzzle(){
question_counter++;
clearRadio();	
		if(question_counter<=5){
			container1.style.display="block";
			temp=Math.floor(Math.random()*10);
				if(temp===0){	
					question_counter--;
					createPuzzle();
				}
					question.textContent=(counter+" X "+ temp +" = ?");
					question_number.textContent=("Question No. "+question_counter);

					let final_arr=displayAnswer();
					answer1.textContent=final_arr[0];
					answer2.textContent=final_arr[1];
					answer3.textContent=final_arr[2];
					answer4.textContent=final_arr[3];
						if(question_counter===1){
							question_button.addEventListener("click",function(){
								submitanswer.disabled=true;
								skipquestion.disabled=false;
								clearInterval(blink);
								ans_row1.classList.remove("blink_label1","blink_label");
								ans_row2.classList.remove("blink_label1","blink_label");
								ans_row3.classList.remove("blink_label1","blink_label");
								ans_row4.classList.remove("blink_label1","blink_label");
								createPuzzle();
								startTimer();
							});
						}
						
		}else
		{
			clearInterval(timer_stop);
			question_attempted.textContent=("Total Questions Attempted = "+questionAttempted);
			correct_question.textContent=("Correct Questions = "+questionCorrect);
			incorrect_question.textContent=("Incorrect Questions = "+questionIncorrect);
			success.textContent=("Success Percentage = "+((questionCorrect/5)*100)+"%");
			modal.style.display = "block";
			return;
		}
			
}

/*to deselect all radio button*/
function clearRadio(){
	for(var h=0;h<allradio.length;h++){
		allradio[h].checked=false;
	}
return;
}

/*function checkDuplicate(temp){
	for(var q=0;q<arr.length;q++){
		if(temp===arr[q]){
			break;
		}
	}
if (q===arr.length){
	arr.push(temp);
	return true;
}else{
	return false;
}
}*/


/*Function to display answers in 4 options*/
function displayAnswer(){
	let temp1_duplicate=[];
	let answer_a=[0,0,0,0];
	
	answer_a[Math.floor(Math.random()*4)]=(counter*temp);
	temp1_duplicate.push(temp);
out1:for(var w=0;w<answer_a.length;w++){
	if(answer_a[w]===0){
		let temp11=Math.floor(Math.random()*10);
		
			for(var t=0;t<temp1_duplicate.length;t++){
				if(temp1_duplicate[t]===temp11){
					w--;
					continue out1;
				}
			}
		temp1_duplicate.push(temp11);
		answer_a[w]=(counter*temp11);
		}
}
return answer_a;
}


/*Code to detect radio button click event*/
for(var p=0;p<allradio.length;p++){
	allradio[p].addEventListener("change",function(){
		submitanswer.disabled=false;
		question_button.disabled=true;
		skipquestion.disabled=true;
		questionAttempted++;
		clearInterval(timer_stop);
	});
}


/*Checking answer corectness*/
	submitanswer.addEventListener("click",function(){
			outer:for(var r=0;r<allradio.length;r++){
			if(allradio[r].checked){
					for(var s=0;s<alllabel.length;s++){
						if(alllabel[s].getAttribute("for")===allradio[r].getAttribute("id")){
							if(Number(alllabel[s].textContent)==Number(counter*temp)){
								win(s);
								break outer;
							}else
							{
								lose(s);
								break outer;
							}
						}
					}
				
			}
		}
	});
	
	span.addEventListener("click",function(){
		modal.style.display = "none";
	});

	function startTimer(){
		if(question_counter<=5){
		let timer_right=document.querySelector("#timer_number");
		let timer=document.querySelector("#timer");
		timer_right.textContent=15;
		timer.textContent="00:";
		timer_stop=setInterval(function(){
		console.log("sound played");
		x2.play(); 
			if((Number(timer_right.textContent))<=10){
				timer_right.textContent="0"+((Number(timer_right.textContent))-1);
			}else{
				timer_right.textContent=((Number(timer_right.textContent))-1);
			}
			if((Number(timer_right.textContent))==0){
				timer.textContent="";
				timer_right.textContent="Time Up";
				clearInterval(timer_stop);
				lose();
			}
		},1000);}
	}

function win(s){
	var x = document.getElementById("winner"); 
							    x.play(); 
								switch(s){
									case 1:
										blink=setInterval(function(){
											ans_row1.classList.toggle("blink_label");
										},500);
										break;
									case 2:
										blink=setInterval(function(){
											ans_row2.classList.toggle("blink_label");
										},500);
										break;
									case 3:
										blink=setInterval(function(){
											ans_row3.classList.toggle("blink_label");
										},500);
										break;
									case 4:
										blink=setInterval(function(){
											ans_row4.classList.toggle("blink_label");
										},500);
										break;
										}
								question_button.disabled=false;
								skipquestion.disabled=true;								
								submitanswer.disabled=true;
								questionCorrect++;
								return;
}

function lose(s="null"){
	var x1 = document.getElementById("looser"); 
							    x1.play(); 
								switch(s){
									case 1:
										ans_row1.classList.add("blink_label1");
										break;
									case 2:
										ans_row2.classList.add("blink_label1");
										break;
									case 3:
										ans_row3.classList.add("blink_label1");
										break;
									case 4:
										ans_row4.classList.add("blink_label1");
										break;
								}
								for(var g=0;g<alllabel.length;g++){
									if(alllabel[g].textContent==(Number(counter*temp))){
										switch(g){
											case 1:
												blink=setInterval(function(){
												ans_row1.classList.toggle("blink_label");
												},500);
												break;
											case 2:
												blink=setInterval(function(){
												ans_row2.classList.toggle("blink_label");
												},500);
												break;
											case 3:
												blink=setInterval(function(){
												ans_row3.classList.toggle("blink_label");
												},500);
												break;
											case 4:
												blink=setInterval(function(){
												ans_row4.classList.toggle("blink_label");
												},500);
												break;
										}
									}
								}
								question_button.disabled=false;
								skipquestion.disabled=true;
								submitanswer.disabled=true;
								questionIncorrect++;
								return;
}
