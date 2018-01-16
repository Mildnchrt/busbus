console.log('hello');
function sendMCU(something) {
  $.ajax({
    url:'http://10.32.176.4/exvariable/'+something
  }).done(function(data) { console.log(data)});

}
var data="000";
var remain=20;
var buttonStatus=false;
var button=$('#hexagon3');

button.click(function(){
  if(buttonStatus)
  {
    var checked=confirm('Cancel reserve, confirm?');
    if(checked)
    {
      button.html('Reserve');
       buttonStatus=false;
       sendMCU('false');
    }
  }
  else {
          button.html('<font color="red">Cancel</font>');
          buttonStatus=true
          sendMCU('true');
  }
});

function running(max,value){
  console.log('ready');
var progressbar = $('#progress_bar');
time = 500/max;
  var loading = function() {
    value+=(max>value)?1:-1;

    addValue = progressbar.val(value);

    $('.progress-value').html(value + '%');
    var $ppc = $('.progress-pie-chart'),
    deg = 360 * value / 100;
    if (value > 50) {
      $ppc.addClass('gt-50');
    }
    else {
      $ppc.removeClass('gt-50');
    }

    $('.ppc-progress-fill').css('transform', 'rotate(' + deg + 'deg)');
    $('.ppc-percents span').html('<span style="font-size:50%">remain:</span>'+Math.round(value/5)+'<span style="font-size:50%">seat</span>');
    $('.ppc-percents span').css('color','#'+(150-value).toString(16)+'10'+(value).toString(16));


    if (value == max) {
      clearInterval(animate);
    }
};

var animate = setInterval(function() {
  loading();
  }, time);
}

$(document).ready(running(100,100));

function getServerData() {
  $.ajax({
    url:'http://10.32.176.4/exvariable'
  }).done(function(x){
    data=x.split(',');
  }
  )
}
setInterval(function(){
  getServerData();
   $('#hexagon2').html('enter<br><span style="font-size: 250%">'+data[0]+'</span>');
   $('#hexagon1').html('exit<br><span style="font-size: 250%">'+data[1]+'</span>');
},1000);
setInterval(function(){
  var date=new Date();
  $('#hexagon4').html('Time<br><span style="font-size:150%">'+date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()+":"+(date.getSeconds()<10?'0':"")+date.getSeconds()+"</span>");
console.log(date.getHours()+":"+(date.getMinutes()<10?'0':'')+date.getMinutes()+":"+(date.getSeconds()<10?'0':"")+date.getSeconds());
},100);
setInterval(function(){
  var newremain=20-parseInt(data[0])+parseInt(data[1]);
  if(buttonStatus)newremain-=1
  if(remain!=newremain&&typeof data[1]!='undefined')running(newremain*5,remain*5)
  remain=newremain;
},1000);
