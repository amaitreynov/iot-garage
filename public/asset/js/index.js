// JavaScript Document
$( "#i" ).mousedown(function() {
  $( "#o" ).css({'-webkit-animation': 'rotation 2.0s infinite linear','box-shadow':'0em 4.2em 0.1em 0.35em #fff,0.2em 4.2em 0.1em 0.35em #fff,0em 4.2em 0.6em 0.5em #7151ff,0.2em 4.2em 0.6em 0.5em #7151ff'});
  $( "#n" ).css({'background':'-webkit-radial-gradient(circle, rgba(255,208,255, 0.8) 2px, transparent 4px),-webkit-radial-gradient(circle, rgba(255,208,255, 0.8) 2px, transparent 4px) 5px 2px, #8046EF','background-size':'10px 5px'});
});

$( "#i" ).mouseup(function() {
  $( "#o" ).css({'-webkit-animation': '','box-shadow':''});
  $( "#n" ).css({'background':'','background-size':''});
});
