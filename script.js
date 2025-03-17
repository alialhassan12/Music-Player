let music=[{
    name:'Ajmal Sake',
    songPath:'audio/اجمل ساقي __ عباس عجيد العامري __ موكب وحسينية.mp3',
    imgPath:'posters/ajmal sake.jpg',
    artist:'Abbas Ajed Alaameri',
},{
    name:'Jber Alsada',
    songPath:'audio/جبير السادة__ عباس عجيد العامري__ هيئه شباب ال.m4a',
    imgPath:'posters/jber lsada.jpeg',
    artist:'Abbas Ajed Alaameri',
},{
    name:'Dokhan Karbala',
    songPath:'audio/دخان كربلاء _ الرادود حسن عميص _ كلمات علي الم.m4a',
    imgPath:'posters/do5an karbla.jpg',
    artist:'Hassan Amis',
},
];

let currentSongIndex=0;
let progress =document.querySelector('.musicRange');
let song =document.querySelector('.song');
let ctrlIcon =document.querySelector('#ctrlIcon');
let ctrlContainer=document.querySelector('#ctrlContainer');
song.onloadmetadata=function(){
    progress.max=song.duration;
    progress.value=song.currentTime;
}
ctrlContainer.onclick=function(){
    if(ctrlIcon.classList.contains('fa-pause')){
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    }else{
        song.play();
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
}
if(song.play()){
    setInterval(()=>{
        progress.value=song.currentTime;
    },500);
}
progress.onchange=function(){
    song.play();
    song.currentTime=progress.value;
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');
}
let sidebar=document.querySelector('.sidebar');
let sideBtn=document.querySelector('#sideBtn');
sideBtn.onclick=function(){
    sidebar.classList.toggle('hide');
}
function showSongs(){
    music.forEach((song,index)=>{
        let songElement=document.createElement('div');
        songElement.classList.add('songElement');
        songElement.setAttribute('data-index',index);
        songElement.innerHTML=`
        <img src="${song.imgPath}">
        <div>
            <h4>${song.name}</h4>
            <p>${song.artist}</p>
        </div>`
        sidebar.appendChild(songElement);
    });
}
showSongs();
let songImg=document.querySelector('.songImg');
let songElement=document.querySelectorAll('.songElement');
let songName=document.querySelector('.name');
let songArtist=document.querySelector('.artist');
Array.from(songElement).forEach((e)=>{
    e.onclick=function(){
        currentSongIndex=e.getAttribute('data-index');
        songImg.src=music[currentSongIndex].imgPath;
        song.src=music[currentSongIndex].songPath;
        songName.innerHTML=music[currentSongIndex].name;
        songArtist.innerHTML=music[currentSongIndex].artist;
        song.play();
        songElement.forEach((e)=>{
            e.classList.remove('active');
        });
        e.classList.add('active');
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
});
let nextBtn=document.querySelector('#nextBtn');
let prevBtn=document.querySelector('#prevBtn');
nextBtn.onclick=function(){
    currentSongIndex++;
    if(currentSongIndex>music.length-1){
        currentSongIndex=0;
    }
    songImg.src=music[currentSongIndex].imgPath;
    song.src=music[currentSongIndex].songPath;
    songName.innerHTML=music[currentSongIndex].name;
    songArtist.innerHTML=music[currentSongIndex].artist;
    song.play();
    songElement.forEach((e)=>{
        e.classList.remove('active');
    });
    songElement[currentSongIndex].classList.add('active');
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');
}
prevBtn.onclick=function(){
    currentSongIndex--;
    if(currentSongIndex<0){
        currentSongIndex=music.length-1;
    }
    songImg.src=music[currentSongIndex].imgPath;
    song.src=music[currentSongIndex].songPath;
    songName.innerHTML=music[currentSongIndex].name;
    songArtist.innerHTML=music[currentSongIndex].artist;
    song.play();
    songElement.forEach((e)=>{
        e.classList.remove('active');
    });
    songElement[currentSongIndex].classList.add('active');
    ctrlIcon.classList.remove('fa-play');
    ctrlIcon.classList.add('fa-pause');
}