const typingTexts = [
    "Sometimes life moves too fast, and we forget to slow down and breathe. But in quiet moments, with a cup of coffee and soft rain outside, we remember that peace doesn't always come from grand achievements, but from small pauses that allow us to feel alive again.",
    
    "We grow through the seasons of our life, just like trees that lose their leaves only to bloom again. Strength is not about never falling, but about standing up with hope even when yesterday felt heavy on our shoulders.",
    
    "Technology has changed the way we connect, learn, and dream. A single idea written in code can turn into something that helps millions, reminding us that creativity and persistence can shape the future one line at a time.",
    
    "Some days feel like tangled thoughts and unfinished plans, but it's okay to move slowly. Progress doesn’t need to be loud or perfect. Even one small step can mark the beginning of a completely new chapter in our story.",
    
    "Travel teaches us more than textbooks ever could, showing us mountains that kiss the sky, oceans that hold mysteries, and people with stories woven from different cultures, yet similar dreams beating inside their hearts.",
    
    "Friendship isn't measured by constant presence, but by the comfort of knowing that someone will return no matter how long the silence lasts. Real friends pick up conversations like pages of a book bookmarked by love.",
    
    "We chase dreams not because they are easy, but because something inside us refuses to settle. Every late night, every failed attempt, every retry shapes us into someone stronger and more prepared than we were before.",
    
    "The universe moves in strange and beautiful ways. Sometimes things fall apart so better things can fall together. Sometimes we lose what we wanted to find what we truly needed. Time has a gentle way of revealing why.",
    
    "Books hold entire worlds inside simple pages. With a single sentence, we can travel to magical lands, feel heartbreak, witness wars, or fall in love with characters who never existed, yet live forever in our minds.",
    
    "Look at the stars and remember how tiny we are, yet how incredibly powerful our thoughts can be. Every invention, every work of art, every story began as a small spark inside someone's mind — maybe your next spark changes the world."
];



const textdisplay=document.getElementById("textdisplay");
const inputfield=document.getElementById("inputarea");
const timeEl=document.getElementById("time");
const wpmEl=document.getElementById("wpm");
const accuracyEl=document.getElementById("accuracy");
const startbtn=document.getElementById("startbtn");
const restartBtn=document.getElementById("restartBtn"); // FIXED ✔


let timeleft=60;
let timer=null;
let isRunning=false;
let originaltext="";
let typedwords=0;

function resetTEST(){
    timeleft=60;
    timeEl.innerText=timeleft;
    inputfield.value="";
    textdisplay.innerText="";
    wpmEl.innerText="0";
    accuracyEl.innerText="0%";
    clearInterval(timer);
    isRunning=false;
}


startbtn.addEventListener("click",()=>{
    if(isRunning) return;

    resetTEST();

    originaltext=typingTexts[Math.floor(Math.random()*typingTexts.length)];
    textdisplay.innerText=originaltext;

    inputfield.disabled=false;
    inputfield.focus();
    isRunning=true;

    timer=setInterval(()=>{
        timeleft--;
        timeEl.innerText=timeleft;      
        if(timeleft===0) finishTest();
    },1000);
});


function finishTest(){
    clearInterval(timer);
    inputfield.disabled=true;
    isRunning=false;

    let typed=inputfield.value.trim().split(" ").length;
    wpmEl.innerText=typed;

    let correct=0;
    let originalWords=originaltext.split(" ");
    let typedWords=inputfield.value.split(" ");
    
    typedWords.forEach((word,i)=>{
        if(word===originalWords[i]) correct++;
    });

    accuracyEl.innerText=Math.floor((correct/originalWords.length)*100)+"%";

    restartBtn.style.display="block";  
}


restartBtn.addEventListener("click",()=>{
    resetTEST();
    restartBtn.style.display="none";
    textdisplay.innerText="Click Start to type!";
});

