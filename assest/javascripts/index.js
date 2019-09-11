const homeHeader = document.querySelector('.header.home');

const feedHeader1 = document.querySelector('.header.feed1');
const feedHeader2 = document.querySelector('.header.feed2');
const feedHeader3 = document.querySelector('.header.feed3');

const activityHeader = document.querySelector('.header.activity');
const photoHeader = document.querySelector('.header.photo');

const mainPage = document.querySelector('.page-container.main-page');

const feedPage1 = document.querySelector('.page-container.feed-page1');
const feedPage2 = document.querySelector('.page-container.feed-page2');
const feedPage3 = document.querySelector('.page-container.feed-page3');

const activityPage = document.querySelector('.page-container.activity-page');
const photoPage = document.querySelector('.page-container.photo-page');

const mainImage1 = document.querySelector('.main-image1');
const mainImage2 = document.querySelector('.main-image2');
const mainImage3 = document.querySelector('.main-image3');

const imageSliderNav = document.querySelector('.image-slider-nav');
const storeInfo = document.querySelector('.store-info');
const contentUserName = document.querySelector('.store-info__content__name');
const contentName = document.querySelector('.store-info__content__name2');
const date = document.querySelector('.date-text .date');
const contentText = document.querySelector('.content-text');
const likeText = document.querySelector('.like-text');
const feed3Textarea = feedPage3.querySelector('.form-wrapper textarea');
const contentImage = document.querySelector('.store-info img');
const contentImageShare = document.querySelector('.store-info img.share');

const footer = document.querySelector('.footer');
const progress = document.querySelector('.progress');
const writeFeed = document.querySelector('.write-feed');
const writeFeedText = document.querySelector('.write-feed__text');

window.home = () => {
    location.reload();
}
window.brand = () => {
    //change main image
    if(mainPage.classList.contains('hide')){
        return false;
    }
    mainImage1.classList.add('hide');
    mainImage2.classList.remove('hide');
    imageSliderNav.classList.remove('hide');

    contentName.textContent = '伊勢丹新宿店';
    date.textContent = ' 2019.9.4wed-17tue';
    likeText.textContent = 'いいね！285件';
    contentText.innerHTML = `YOAK Pop-Up<br>on Men's Building <a class="" href="/explore/tags/b1f_mensshoes/">#B1F_MensShoes</a><br>・<br><a class="" href="/explore/tags/yoak/">#yoak</a><br>・<br>www.imn.jp`;

    footer.querySelector('.active').classList.remove('active');
    footer.querySelector('.person').classList.add('active');
    document.body.scrollTop = 0;
}

window.writeFeed = () => {
    console.log(feedPage1);
    homeHeader.classList.add('hide');
    feedHeader1.classList.remove('hide');
    mainPage.classList.add('hide');
    feedPage1.classList.remove('hide');

    footer.querySelector('.active').classList.remove('active');
    document.body.scrollTop = 0;
}

window.moveFeed2 = () => {
    feedPage1.classList.add('hide');
    feedPage2.classList.remove('hide');
    feedHeader1.classList.add('hide');
    feedHeader2.classList.remove('hide');
}

window.moveFeed3 = () => {
    feedPage2.classList.add('hide');
    feedPage3.classList.remove('hide');
    feedHeader2.classList.add('hide');
    feedHeader3.classList.remove('hide');
}

window.animationKey = false;
window.keyboardAnimation = () => {
    event.preventDefault();
    if(animationKey){
        return false;
    }
    animationKey = true;
    var text = '伊勢丹メンズ館でオーダーしたシャツが最高過ぎ！迷っていたシャツも買っちゃおうかな〜 #isetanmens #カスタムオーダーシャツ';
    feed3Textarea.value = '';
    for(var i=0,len=text.length; i<len; i++){
        delayAnimation(text,i);
    }

    function delayAnimation(text,index) {
        setTimeout(function(){
            feed3Textarea.value = feed3Textarea.value+text[index]; 
            if(text.length-1 == index){
                animationKey = false;
            }
        },100*index)
    }
}

window.share = () => {
    feedPage3.classList.add('hide');
    mainPage.classList.remove('hide');
    feedHeader3.classList.add('hide');
    homeHeader.classList.remove('hide');
    contentName.classList.add('hide');
    
    contentImage.classList.add('hide');
    contentImageShare.classList.remove('hide');
    contentUserName.textContent = "user name";
    footer.querySelector('.home').classList.add('active');
    
    storeInfo.classList.add('loading');
    mainImage3.classList.add('loading');
    
    mainImage1.classList.add('hide');
    mainImage2.classList.add('hide');
    mainImage3.classList.remove('hide');
    writeFeed.classList.remove('hide');
    
    setTimeout(function(){
        date.textContent = ' 2019.9.24';
        likeText.textContent = 'いいね！0件';
        storeInfo.classList.remove('loading');
        mainImage3.classList.remove('loading');
        progress.classList.add('hide');
        writeFeedText.textContent = "完了";
    },5000);
}
window.showTooltip = () =>{
    if(event.target.classList.contains('like')){
        event.target.querySelector('.tooltip').classList.toggle('hide');
    }else{
        activity();
    }
}

window.activity = () => {
    homeHeader.classList.add('hide');
    activityHeader.classList.remove('hide');
    mainPage.classList.add('hide');
    activityPage.classList.remove('hide');
    document.querySelector('.tooltip').classList.add('hide');
}

window.photo = () => {
    activityHeader.classList.add('hide');
    activityPage.classList.add('hide');
    photoHeader.classList.remove('hide');
    photoPage.classList.remove('hide');
    
}