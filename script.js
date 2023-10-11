console.log("Welcome to Spotify");

let songIndex=0;
let audioElement=new Audio("./songs/0.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterSongName=document.getElementById("masterSongName");
let songItems=Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName:"Mission Impossible", filePath:"./songs/0.mp3", coverPath:"./covers/1.jpg"},
    {songName:"Chitta Kurta", filePath:"./songs/1.mp3", coverPath:"./covers/2.jpg"},
    {songName:"Aiven Aiven", filePath:"./songs/2.mp3", coverPath:"./covers/3.jpg"},
    {songName:"Ishq Wala Love", filePath:"./songs/3.mp3", coverPath:"./covers/4.jpg"},
    {songName:"Baby", filePath:"./songs/4.mp3", coverPath:"./covers/5.jpg"},
    {songName:"Stay", filePath:"./songs/5.mp3", coverPath:"./covers/6.jpg"}
]

songItems.forEach((element,i)=>
{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});


// audioElement.play();

// listen to events 

masterPlay.addEventListener('click',()=>
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;
    }
});

audioElement.addEventListener('timeupdate',()=>
{
    progress=((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=parseInt((myProgressBar.value*audioElement.duration)/100);
})

const makeAllPlays=()=>{
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.classList.add('fa-play');
})
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>
{
    element.addEventListener('click',(e)=>
    {
        gif.style.opacity=1;
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src=`songs/${songIndex}.mp3`;
        masterSongName.innerHTML=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
});


document.getElementById("previous").addEventListener("click",(e)=>
{
    if(songIndex===0)
    {
        songIndex=5;
    }
    else{
        songIndex=songIndex-1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById("forward").addEventListener("click",(e)=>
{
    if(songIndex>4)
    {
        songIndex=0;
    }
    else{
        songIndex=songIndex+1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})
