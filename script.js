
const typingTexts = [
    "Life doesn’t always give us perfect moments, but the imperfect ones often teach us more than we expect.",
    "Growing up means learning to let go, to heal slowly, and to trust the process even when it feels uncertain.",
    "Technology keeps evolving, making the world faster, smarter and more connected than ever before.",
    "Some friendships feel like home, warm and familiar, even after years of silence and distance.",
    "Every great story begins with a small decision to try, even when the outcome is still unknown.",
    "Music has a strange way of bringing back memories we thought we forgot long ago.",
    "Happiness is not a destination, but small moments of joy collected throughout life.",
    "Sometimes we need to pause, breathe, and remind ourselves that progress is progress, no matter how slow.",
    "Courage is continuing to move forward even when the path is dark and unfamiliar.",
    "Dreams remain dreams until effort turns them into reality through patience and action.",
    "A cup of coffee, an open window and soft rain can bring peace on the toughest days.",
    "Every failure is a lesson dressed in disappointment, waiting to make us stronger.",
    "Books hold entire worlds inside them, waiting for curious minds to open and explore.",
    "Even a small act of kindness can change someone's entire day without us realizing it.",
    "Time moves fast, but memories slow it down when we look back and smile.",
    "Some people enter our lives like chapters, teaching us something before they exit the story.",
    "Travel broadens the soul, showing us cultures, colors and perspectives beyond our own.",
    "Sunsets remind us that endings can be beautiful too, soft and gentle like a final warm note.",
    "Success isn't loud—it’s silent nights of work, effort, revision and belief.",
    "Sometimes strength is not fighting harder, but knowing when to rest and try again tomorrow.",
    "Movies let us escape reality for a while, living a thousand lives in two hours.",
    "Motivation gets you started, discipline keeps you going when motivation fades away.",
    "Not every day will be good, but every day holds something good if you look closely.",
    "Even the tallest tree was once a small seed buried in darkness before it grew.",
    "When we look up at the stars, our problems feel a little smaller than before.",
    "Confidence grows when your mind stops fearing judgment and starts believing in effort.",
    "Rainy days slow the world down, giving us time to think, dream and reset our minds.",
    "Learning is a never-ending journey, and every skill begins with a single uncertain step.",
    "Sometimes silence says more than words, especially when shared with the right person.",
    "Life is not a race, it's a long walk — enjoy the view while you move forward."
];


const textdisplay=document.getElementById("textdisplay");
const inputfield=document.getElementById("inputarea");
const timeEl=document.getElementById("time");
const wpmEl=document.getElementById("wpm");
const accuracyEl=document.getElementById("accuracy");
const startbtn=document.getElementById("startbtn");
const restartBtn=document.getElementById("restartBtn"); // FIXED ✔

// VARIABLES
let timeleft=60;
let timer=null;
let isRunning=false;
let originaltext="";
let typedwords=0;



// RESET FUNCTION
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

// START BUTTON
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
        timeEl.innerText=timeleft;      // FIXED ✔
        if(timeleft===0) finishTest();
    },1000);
});

// FINISH FUNCTION
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

    restartBtn.style.display="block";  // FIXED ✔
}

// RESTART BUTTON
restartBtn.addEventListener("click",()=>{
    resetTEST();
    restartBtn.style.display="none";
    textdisplay.innerText="Click Start to type!";
});
