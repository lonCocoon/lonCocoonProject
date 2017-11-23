


window.onload=function(){
    var banner = document.getElementById('banner');
    var carousel = document.getElementById('carousel');
    var roundList = document.getElementById('roundList').getElementsByTagName('li');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var rou_index = 1;

    var arrowsBtned = false;
    

    //圆点切换样式
    function showRound(){
        for (i = 0; i < roundList.length; i++) {
            roundList[i].classList.remove('round');
        }

        if (rou_index>5) {
            rou_index = 1;
        }
        else if (rou_index<1) {
            rou_index = 5;
        }
        roundList[rou_index - 1].classList.add('round')
  
    }
    
    //图片切换显示
    function arrowsBtn(num){
        arrowsBtned = true;
        var newLeft = parseInt(carousel.style.marginLeft) + num;
        var time = 500; //位移总时间
        var interval = 5; //位移间隔时间
        var speed = num/(time/interval); //每次位移量
        
        function go(){
            if (speed < 0 && parseInt(carousel.style.marginLeft) > newLeft  || ((speed > 0) && parseInt(carousel.style.marginLeft) < newLeft)){
                carousel.style.marginLeft = parseInt(carousel.style.marginLeft) + speed + 'px';
                setTimeout(go,interval);
            }
            else{

                arrowsBtned = false;
                carousel.style.marginLeft = newLeft + 'px';
                if(newLeft > - 976 ){
                    carousel.style.marginLeft = -4880 + 'px';
                }
                else if(newLeft < - 4880){
                    carousel.style.marginLeft = -976 + 'px';
                }
            }

        }
        go();
        
    }
    


    //小圆点控制图片切换
    for (i = 0; i < roundList.length; i++) {
        roundList[i].onclick = function(){
            if (this.className == 'round') {
                return;
            }
            var newIndex = parseInt(this.getAttribute('index'));
            var num = - 976 * (newIndex - rou_index);

            rou_index = newIndex;
            showRound();
            if (!arrowsBtned) {
                arrowsBtn(num);
            }
        }
        
    }
    
    
    function play(){
        timer = setInterval(function(){
            next.onclick();
        },3000)
    }

    function stop(){
        clearInterval(timer);
    }


    next.onclick = function (){
        rou_index++;
        showRound();
        if (!arrowsBtned) {
            arrowsBtn(-976);
        }
        
    }
    prev.onclick = function (){
        rou_index--;
        showRound();
        if (!arrowsBtned) {
            arrowsBtn(976);
        }
    }
    
    banner.onmouseover = stop;
    banner.onmouseout = play;

    play();

}

